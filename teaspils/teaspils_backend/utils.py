from pathlib import Path

def handle_uploaded_file(f, id_plant, timestamp):
    try:    
        ts = timestamp.strftime("%Y_%m_%d_%H_%M_%S")
        filename = Path(f'./uploads/{id_plant}/{ts}.jpg')
        filename.mkdir(parents=True, exist_ok=True)
        filename.touch(exist_ok=True)

        return filename
    except Exception:
        return None