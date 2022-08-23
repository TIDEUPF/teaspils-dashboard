from pathlib import Path


def handle_uploaded_file(file, id_plant, timestamp, static_root):
    try:    
        print("handling uploaded: ", file, static_root)

        ts = timestamp.strftime("%Y_%m_%d_%H_%M_%S")
        filename = Path(f'uploads/{id_plant}_{ts}.jpg')
        # filename.mkdir(parents=True, exist_ok=True)
        filename.touch(exist_ok=True)
        with open(str(filename), 'wb+') as destination:
            for chunk in file.chunks():
                destination.write(chunk)

        return filename
    except Exception as e:
        print(e)
        return None