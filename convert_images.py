import os
import glob
from PIL import Image
from pillow_heif import register_heif_opener

register_heif_opener()

def convert_heif_to_webp(input_dir, output_dir):
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    # Find both .heic and .heif files (case insensitive)
    files = []
    # Added jpeg/jpg support as requested
    for ext in ['*.heic', '*.HEIC', '*.heif', '*.HEIF', '*.jpg', '*.jpeg', '*.JPG', '*.JPEG']:
        files.extend(glob.glob(os.path.join(input_dir, ext)))

    if not files:
        print(f"No compatible image files found in '{input_dir}'")
        return

    print(f"Found {len(files)} files to convert...")

    for file_path in files:
        try:
            filename = os.path.basename(file_path)
            name_without_ext = os.path.splitext(filename)[0]
            output_path = os.path.join(output_dir, name_without_ext + ".webp")
            
            with Image.open(file_path) as image:
                # Convert to RGB if necessary (e.g. for PNG alpha or CMYK)
                if image.mode in ('RGBA', 'LA') or (image.mode == 'P' and 'transparency' in image.info):
                    # For webp, RGBA is fine, but for JPEG conversion it would need RGB. 
                    # WebP supports transparency, so we keep RGBA if present.
                    pass
                elif image.mode != 'RGB':
                    image = image.convert('RGB')
                
                image.save(output_path, "WEBP", quality=80)
                print(f"Converted: {filename} -> {name_without_ext}.webp")
                
        except Exception as e:
            print(f"Error converting {filename}: {e}")

if __name__ == "__main__":
    # Assuming user puts raw images in a 'raw_images' folder 
    # and we output to 'img' folder used by the website
    input_folder = "raw_images"
    output_folder = "images" 
    
    if not os.path.exists(input_folder):
        os.makedirs(input_folder)
    
    convert_heif_to_webp(input_folder, output_folder)
