import os
import zipfile
import shutil
from pathlib import Path
from PIL import Image
from pillow_heif import register_heif_opener
import concurrent.futures

# Register HEIF opener
register_heif_opener()

def process_image(img_path, output_dir):
    try:
        path = Path(img_path)
        # Use filename as base, but maybe we should rename? For now keep original names
        # Or maybe add parent folder name to avoid collision?
        # Let's just keep original name for now
        output_filename = path.stem + ".webp"
        output_path = output_dir / output_filename
        
        if output_path.exists():
            print(f"Skipping {path.name}, already exists.")
            return

        with Image.open(path) as img:
            # Convert to RGB if necessary
            if img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
                img = img.convert('RGBA')
            else:
                img = img.convert('RGB')
            
            # Resize if too large (e.g., width > 1600) to save space and load time
            max_width = 1600
            if img.width > max_width:
                ratio = max_width / img.width
                new_height = int(img.height * ratio)
                img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)

            img.save(output_path, 'WEBP', quality=85)
            print(f"Converted: {path.name} -> {output_filename}")
            
    except Exception as e:
        print(f"Error converting {img_path}: {e}")

def unzip_and_convert():
    raw_images_dir = Path("raw_images")
    output_dir = Path("images/processed") # New output directory for processed user images
    
    if not output_dir.exists():
        output_dir.mkdir(parents=True, exist_ok=True)

    # 1. Unzip all files
    temp_extract_dir = raw_images_dir / "temp_extracted"
    if temp_extract_dir.exists():
        shutil.rmtree(temp_extract_dir)
    temp_extract_dir.mkdir()

    zip_files = list(raw_images_dir.glob("*.zip"))
    print(f"Found {len(zip_files)} zip files.")

    for zip_file in zip_files:
        print(f"Unzipping {zip_file.name}...")
        try:
            with zipfile.ZipFile(zip_file, 'r') as zip_ref:
                # Extract to a subfolder named after the zip to avoid collisions initially
                extract_path = temp_extract_dir / zip_file.stem
                zip_ref.extractall(extract_path)
        except Exception as e:
             print(f"Error unzipping {zip_file.name}: {e}")

    # 2. Find and Convert Images
    print("Scanning for images...")
    image_extensions = {'.jpg', '.jpeg', '.png', '.heic', '.heif'}
    all_images = []
    
    for ext in image_extensions:
        # Case insensitive search
        all_images.extend(temp_extract_dir.rglob(f"*{ext}"))
        all_images.extend(temp_extract_dir.rglob(f"*{ext.upper()}"))

    print(f"Found {len(all_images)} images to process.")

    # 3. Process concurrently
    with concurrent.futures.ThreadPoolExecutor() as executor:
        futures = [executor.submit(process_image, img, output_dir) for img in all_images]
        for future in concurrent.futures.as_completed(futures):
            pass # Just wait for completion

    # 4. Cleanup (User might want to rename/map images manually later)
    # shutil.rmtree(temp_extract_dir) 
    print("Done! Processed images are in 'images/processed'.")
    print(f"Temporary extracted files are in '{temp_extract_dir}'. You can delete this folder if conversion is verified.")

if __name__ == "__main__":
    unzip_and_convert()
