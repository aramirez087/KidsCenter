/**
 * Build script to combine all HTML partials into a single index.html file
 * Run with: node build.js
 */

const fs = require('fs').promises;
const path = require('path');

async function buildHTML() {
    try {
        console.log('🔨 Building combined HTML file...');
        
        // Read the base template
        let baseHTML = await fs.readFile('index-modular.html', 'utf-8');
        
        // Define sections to include in order
        const sections = [
            'src/components/navigation.html',
            'src/sections/hero.html',
            { file: 'src/components/dividers.html', extractIndex: 0 },
            'src/sections/age-programs.html',
            'src/sections/about.html',
            'src/sections/features.html',
            { file: 'src/components/dividers.html', extractIndex: 1 },
            'src/sections/services.html',
            'src/sections/testimonials.html',
            'src/components/urgency-banner.html',
            'src/sections/faq.html',
            'src/sections/gallery.html',
            { file: 'src/components/dividers.html', extractIndex: 2 },
            'src/sections/contact.html',
            'src/components/footer.html',
            'src/components/chat-widget.html'
        ];
        
        // Build the combined content
        let combinedContent = '';
        
        for (const section of sections) {
            let filePath, content;
            
            if (typeof section === 'string') {
                filePath = section;
                content = await fs.readFile(filePath, 'utf-8');
            } else if (section.file && typeof section.extractIndex === 'number') {
                filePath = section.file;
                const fullContent = await fs.readFile(filePath, 'utf-8');
                // Extract specific divider by index
                const dividers = fullContent.match(/<svg[^>]*class="section-divider[^"]*"[\s\S]*?<\/svg>/g);
                if (dividers && dividers[section.extractIndex]) {
                    content = dividers[section.extractIndex];
                } else {
                    console.warn(`⚠️  Could not extract divider ${section.extractIndex} from ${filePath}`);
                    continue;
                }
            }
            
            combinedContent += `\n    ${content.trim()}\n`;
            console.log(`  ✓ Added ${typeof section === 'string' ? section : section.file}`);
        }
        
        // Read structured data script
        const structuredDataJS = await fs.readFile('src/schemas/structured-data.js', 'utf-8');
        
        // Extract the data objects from the JS file
        const dataMatch = structuredDataJS.match(/export const structuredData = ({[\s\S]*?});/);
        if (dataMatch) {
            // Parse and inject structured data as JSON-LD scripts
            const structuredDataScripts = `
    <!-- Structured Data for SEO -->
    <script type="application/ld+json">
    ${JSON.stringify(eval('(' + dataMatch[1] + ')').localBusiness, null, 4)}
    </script>
    
    <script type="application/ld+json">
    ${JSON.stringify(eval('(' + dataMatch[1] + ')').faqPage, null, 4)}
    </script>
    
    <script type="application/ld+json">
    ${JSON.stringify(eval('(' + dataMatch[1] + ')').breadcrumbList, null, 4)}
    </script>`;
            
            // Insert structured data after opening body tag
            combinedContent = structuredDataScripts + '\n' + combinedContent;
        }
        
        // Replace the app div and module script with the combined content
        let finalHTML = baseHTML
            .replace(/<body>[\s\S]*<\/body>/, `<body>${combinedContent}\n    <script src="script.js"></script>\n</body>`)
            .replace(/\s*<script type="module">[\s\S]*?<\/script>\s*/g, '');
        
        // Write the combined file
        await fs.writeFile('index-combined.html', finalHTML, 'utf-8');
        
        console.log('\n✅ Build complete! Created index-combined.html');
        console.log('\n📝 Usage options:');
        console.log('  1. Development: Use index-modular.html (loads sections dynamically)');
        console.log('  2. Production: Use index-combined.html (single file, better performance)');
        
    } catch (error) {
        console.error('❌ Build failed:', error);
        process.exit(1);
    }
}

// Run the build
buildHTML();