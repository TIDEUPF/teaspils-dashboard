import os
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    # mysql --host=127.0.0.1 --port=3306 -u root -p teaspils-db
    def generate_superuser(apps, schema_editor):
        from django.contrib.auth.models import User

        DJANGO_DB_NAME = os.environ.get('MYSQL_DATABASE', "default")
        DJANGO_SU_NAME = os.environ.get('MYSQL_USER', "admin")
        DJANGO_SU_EMAIL = 'ariel.ortiz@upf.edu'
        DJANGO_SU_PASSWORD = os.environ.get('MYSQL_PASSWORD', 'TEASPILS2021@')

        superuser = User.objects.create_superuser(
            username=DJANGO_SU_NAME,
            email=DJANGO_SU_EMAIL,
            password=DJANGO_SU_PASSWORD)

        superuser.save()

    dependencies = [
        ('teaspils_backend', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(generate_superuser)
    ]
