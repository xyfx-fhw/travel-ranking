import os
import zipfile
import shutil
from pathlib import Path

def extract_and_flatten_jpegs():
    print("Starting JPEG extraction...")
    base_dir = Path(".").resolve() # Use current directory
    raw_images_dir = base_dir / "raw_images"
    
    # Temp folder to hold unzipped contents before flattening
    temp_extract_dir = base_dir / "temp_unzipped_content"

    if not raw_images_dir.exists():
        print(f"Directory {raw_images_dir} does not exist.")
        return

    # Clean legacy temp
    if temp_extract_dir.exists():
        try:
            shutil.rmtree(temp_extract_dir)
        except Exception as e:
            print(f"Warning: Could not clear temp dir: {e}")
            
    temp_extract_dir.mkdir(parents=True, exist_ok=True)

    zip_files = list(raw_images_dir.glob("*.zip"))
    print(f"Found {len(zip_files)} zip files in {raw_images_dir}")

    total_extracted = 0

    for zip_file in zip_files:
        print(f"\nProcessing {zip_file.name}...")
        
        # Create a unique temp subfolder for this specific zip
        current_zip_temp = temp_extract_dir / zip_file.stem
        # Ensure safe directory name
        current_zip_temp.mkdir(exist_ok=True)

        try:
            with zipfile.ZipFile(zip_file, 'r') as zip_ref:
                zip_ref.extractall(current_zip_temp)
            
            # Find all jpeg/jpg files recursively
            found_images = []
            extensions = ['*.jpg', '*.jpeg', '*.JPG', '*.JPEG']
            
            # Use rglob for recursive search
            for ext in extensions:
                found_images.extend(current_zip_temp.rglob(ext))
            
            print(f"  Found {len(found_images)} JPEGs.")

            for i, img_path in enumerate(found_images):
                # Construct a new filename to avoid collisions when flattening
                # Format: zipFilename_originalName.jpg
                
                # Sanitize zip stem for filename use
                safe_zip_name = "".join([c if c.isalnum() else "_" for c in zip_file.stem])
                
                # Use original filename
                new_filename = f"{safe_zip_name}_{img_path.name}"
                destination = raw_images_dir / new_filename

                if destination.exists():
                    print(f"  Skipping {new_filename}, already exists.")
                else:
                    # Move or copy the file
                    try:
                        shutil.copy2(img_path, destination)
                        print(f"  Extracted: {new_filename}")
                        total_extracted += 1
                    except Exception as e:
                        print(f"  Failed to copy {img_path.name}: {e}")

        except Exception as e:
            print(f"  Error processing zip {zip_file.name}: {e}")

    # Cleanup temp directory
    if temp_extract_dir.exists():
        try:
            shutil.rmtree(temp_extract_dir)
            print("\nTemporary files cleaned up.")
        except Exception as e:
            print(f"\nWarning: Could not remove temp dir: {e}")

    print(f"\nDone! Extracted {total_extracted} JPEG images to {raw_images_dir}")

if __name__ == "__main__":
    extract_and_flatten_jpegs()
