// SEO Monitor for Kids Center Costa Rica
// This script monitors and reports on SEO-related metrics

(function() {
    'use strict';
    
    // SEO Health Check Configuration
    const SEO_CONFIG = {
        siteName: 'Kids Center Costa Rica',
        expectedTitle: 'Kids Center Costa Rica',
        minTitleLength: 30,
        maxTitleLength: 60,
        minDescriptionLength: 120,
        maxDescriptionLength: 160,
        requiredMetaTags: [
            'description',
            'keywords',
            'author',
            'robots',
            'viewport',
            'og:title',
            'og:description',
            'og:image',
            'twitter:card'
        ],
        structuredDataTypes: [
            'LocalBusiness',
            'FAQPage',
            'BreadcrumbList',
            'WebSite',
            'Review',
            'Course'
        ]
    };
    
    // SEO Health Check Class
    class SEOMonitor {
        constructor() {
            this.results = {
                passed: [],
                warnings: [],
                errors: [],
                score: 0
            };
        }
        
        // Check Meta Tags
        checkMetaTags() {
            const title = document.querySelector('title');
            const metaTags = document.querySelectorAll('meta');
            
            // Check title
            if (title) {
                const titleLength = title.textContent.length;
                if (titleLength >= SEO_CONFIG.minTitleLength && titleLength <= SEO_CONFIG.maxTitleLength) {
                    this.results.passed.push('✓ Title tag length is optimal');
                } else {
                    this.results.warnings.push(`⚠ Title length (${titleLength}) should be between ${SEO_CONFIG.minTitleLength}-${SEO_CONFIG.maxTitleLength} characters`);
                }
            } else {
                this.results.errors.push('✗ Missing title tag');
            }
            
            // Check meta tags
            const foundMetaTags = {};
            metaTags.forEach(tag => {
                const name = tag.getAttribute('name') || tag.getAttribute('property');
                if (name) {
                    foundMetaTags[name] = tag.getAttribute('content');
                }
            });
            
            // Check required meta tags
            SEO_CONFIG.requiredMetaTags.forEach(tagName => {
                if (foundMetaTags[tagName]) {
                    this.results.passed.push(`✓ Meta tag "${tagName}" is present`);
                } else {
                    this.results.errors.push(`✗ Missing required meta tag: ${tagName}`);
                }
            });
            
            // Check description length
            if (foundMetaTags['description']) {
                const descLength = foundMetaTags['description'].length;
                if (descLength >= SEO_CONFIG.minDescriptionLength && descLength <= SEO_CONFIG.maxDescriptionLength) {
                    this.results.passed.push('✓ Meta description length is optimal');
                } else {
                    this.results.warnings.push(`⚠ Description length (${descLength}) should be between ${SEO_CONFIG.minDescriptionLength}-${SEO_CONFIG.maxDescriptionLength} characters`);
                }
            }
        }
        
        // Check Structured Data
        checkStructuredData() {
            const scripts = document.querySelectorAll('script[type="application/ld+json"]');
            const foundTypes = [];
            
            scripts.forEach(script => {
                try {
                    const data = JSON.parse(script.textContent);
                    if (data['@type']) {
                        foundTypes.push(data['@type']);
                    }
                } catch (e) {
                    this.results.errors.push('✗ Invalid JSON-LD structured data found');
                }
            });
            
            SEO_CONFIG.structuredDataTypes.forEach(type => {
                if (foundTypes.includes(type)) {
                    this.results.passed.push(`✓ Structured data type "${type}" is present`);
                } else {
                    this.results.warnings.push(`⚠ Missing structured data type: ${type}`);
                }
            });
        }
        
        // Check Images
        checkImages() {
            const images = document.querySelectorAll('img');
            let missingAlt = 0;
            let missingDimensions = 0;
            
            images.forEach(img => {
                if (!img.getAttribute('alt')) {
                    missingAlt++;
                }
                if (!img.getAttribute('width') || !img.getAttribute('height')) {
                    missingDimensions++;
                }
            });
            
            if (missingAlt === 0) {
                this.results.passed.push('✓ All images have alt attributes');
            } else {
                this.results.warnings.push(`⚠ ${missingAlt} images missing alt attributes`);
            }
            
            if (missingDimensions === 0) {
                this.results.passed.push('✓ All images have width/height attributes');
            } else {
                this.results.warnings.push(`⚠ ${missingDimensions} images missing dimensions (may cause CLS issues)`);
            }
        }
        
        // Check Headers
        checkHeaders() {
            const h1Tags = document.querySelectorAll('h1');
            const headers = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
            
            if (h1Tags.length === 1) {
                this.results.passed.push('✓ Single H1 tag found (good for SEO)');
            } else if (h1Tags.length === 0) {
                this.results.errors.push('✗ No H1 tag found');
            } else {
                this.results.warnings.push(`⚠ Multiple H1 tags found (${h1Tags.length})`);
            }
            
            if (headers.length > 0) {
                this.results.passed.push(`✓ ${headers.length} header tags found`);
            } else {
                this.results.errors.push('✗ No header tags found');
            }
        }
        
        // Check Links
        checkLinks() {
            const links = document.querySelectorAll('a');
            let externalLinks = 0;
            let nofollowLinks = 0;
            let brokenAnchors = 0;
            
            links.forEach(link => {
                const href = link.getAttribute('href');
                if (!href || href === '#') {
                    brokenAnchors++;
                }
                if (href && (href.startsWith('http://') || href.startsWith('https://'))) {
                    externalLinks++;
                    if (!link.getAttribute('rel') || !link.getAttribute('rel').includes('noopener')) {
                        this.results.warnings.push(`⚠ External link missing rel="noopener": ${href.substring(0, 50)}`);
                    }
                }
                if (link.getAttribute('rel') && link.getAttribute('rel').includes('nofollow')) {
                    nofollowLinks++;
                }
            });
            
            this.results.passed.push(`✓ ${links.length} total links found`);
            if (brokenAnchors > 0) {
                this.results.warnings.push(`⚠ ${brokenAnchors} broken anchor links found`);
            }
        }
        
        // Check Performance Hints
        checkPerformance() {
            // Check for lazy loading
            const lazyImages = document.querySelectorAll('img[loading="lazy"]');
            if (lazyImages.length > 0) {
                this.results.passed.push(`✓ ${lazyImages.length} images use lazy loading`);
            } else {
                this.results.warnings.push('⚠ No images using lazy loading');
            }
            
            // Check for defer/async scripts
            const scripts = document.querySelectorAll('script[src]');
            const deferredScripts = document.querySelectorAll('script[defer], script[async]');
            if (deferredScripts.length > 0) {
                this.results.passed.push(`✓ ${deferredScripts.length}/${scripts.length} scripts use defer/async`);
            }
        }
        
        // Calculate Score
        calculateScore() {
            const totalChecks = this.results.passed.length + this.results.warnings.length + this.results.errors.length;
            const passedWeight = this.results.passed.length * 1;
            const warningWeight = this.results.warnings.length * 0.5;
            const errorWeight = this.results.errors.length * 0;
            
            this.results.score = Math.round(((passedWeight + warningWeight) / totalChecks) * 100);
        }
        
        // Run All Checks
        runAllChecks() {
            console.log('🔍 Running SEO Health Check...');
            
            this.checkMetaTags();
            this.checkStructuredData();
            this.checkImages();
            this.checkHeaders();
            this.checkLinks();
            this.checkPerformance();
            this.calculateScore();
            
            this.displayResults();
        }
        
        // Display Results
        displayResults() {
            console.group(`📊 SEO Health Check Results - ${SEO_CONFIG.siteName}`);
            console.log(`Score: ${this.results.score}/100`);
            
            if (this.results.passed.length > 0) {
                console.group('✅ Passed Checks:');
                this.results.passed.forEach(item => console.log(item));
                console.groupEnd();
            }
            
            if (this.results.warnings.length > 0) {
                console.group('⚠️ Warnings:');
                this.results.warnings.forEach(item => console.warn(item));
                console.groupEnd();
            }
            
            if (this.results.errors.length > 0) {
                console.group('❌ Errors:');
                this.results.errors.forEach(item => console.error(item));
                console.groupEnd();
            }
            
            console.groupEnd();
            
            // Send to analytics if available
            if (typeof gtag !== 'undefined') {
                gtag('event', 'seo_health_check', {
                    'event_category': 'SEO',
                    'event_label': 'Health Check',
                    'value': this.results.score
                });
            }
        }
    }
    
    // Run SEO Monitor when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            const monitor = new SEOMonitor();
            monitor.runAllChecks();
        });
    } else {
        const monitor = new SEOMonitor();
        monitor.runAllChecks();
    }
    
    // Expose to global scope for manual checks
    window.SEOMonitor = SEOMonitor;
})();