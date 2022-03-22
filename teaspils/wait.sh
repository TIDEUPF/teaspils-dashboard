#!/bin/sh

while ! nc -z mysql 3306 ; do
    echo "Waiting for the MySQL Server"
    sleep 3
done

set -m

python manage.py makemigrations teaspils-db
python manage.py migrate
python manage.py runserver 0.0.0.0:80 &

python ./fake_generator/app.py