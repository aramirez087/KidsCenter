import sys
from PIL import Image, ImageDraw, ImageFont

def create_social_image():
    # Target size
    width, height = 1200, 630
    
    # Create base image (white background)
    img = Image.new('RGB', (width, height), color=(255, 255, 255))
    
    # Load kid photo
    try:
        bg_image = Image.open('images/nina_estudiosa.webp')
        # Resize to cover
        bg_ratio = bg_image.width / bg_image.height
        target_ratio = width / height
        
        if bg_ratio > target_ratio:
            new_height = height
            new_width = int(new_height * bg_ratio)
        else:
            new_width = width
            new_height = int(new_width / bg_ratio)
            
        bg_image = bg_image.resize((new_width, new_height), Image.Resampling.LANCZOS)
        
        # Crop center
        left = (new_width - width) // 2
        top = (new_height - height) // 2
        bg_image = bg_image.crop((left, top, left + width, top + height))
        
        # Add a dark overlay so text is readable
        overlay = Image.new('RGBA', (width, height), (0, 0, 0, 128))
        img.paste(bg_image, (0, 0))
        img.paste(overlay, (0, 0), overlay)
    except Exception as e:
        print("Error loading background image:", e)
        # Fallback to dark blue background if image fails
        img = Image.new('RGB', (width, height), color=(20, 40, 80))

    draw = ImageDraw.Draw(img)

    # Load Logo
    try:
        logo = Image.open('images/logo.webp')
        if logo.mode != 'RGBA':
            logo = logo.convert('RGBA')
        
        # Resize logo
        logo_width = 400
        logo_height = int((logo.height / logo.width) * logo_width)
        logo = logo.resize((logo_width, logo_height), Image.Resampling.LANCZOS)
        
        # Paste logo at center top
        logo_x = (width - logo_width) // 2
        logo_y = 100
        img.paste(logo, (logo_x, logo_y), logo)
    except Exception as e:
        print("Error loading logo:", e)

    # Add tagline
    tagline = "Empowering Kids and Enriching Futures" # Using English based on the meta alt
    # Kids Center Costa Rica - Centro de Idiomas y Terapia de Lenguaje para Niños
    tagline2 = "Centro de Idiomas y Terapia de Lenguaje"
    
    try:
        # Try to find a reasonable font
        font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 60)
        font2 = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 40)
    except:
        font = ImageFont.load_default()
        font2 = ImageFont.load_default()

    # Draw text
    text_bbox = draw.textbbox((0, 0), tagline, font=font)
    text_width = text_bbox[2] - text_bbox[0]
    text_max_width = width - 100
    if text_width > text_max_width:
        try:
           font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 40)
        except:
           pass
        text_bbox = draw.textbbox((0, 0), tagline, font=font)
        text_width = text_bbox[2] - text_bbox[0]
        
    draw.text(((width - text_width) / 2, 400), tagline, font=font, fill=(255, 255, 255))
    
    text2_bbox = draw.textbbox((0, 0), tagline2, font=font2)
    text2_width = text2_bbox[2] - text2_bbox[0]
    draw.text(((width - text2_width) / 2, 480), tagline2, font=font2, fill=(200, 230, 255))

    # Save
    img.save('images/social-preview.webp', 'WEBP', quality=90)
    print("Generated images/social-preview.webp")

create_social_image()
