# Generated by Django 4.0.4 on 2022-12-18 15:18

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('teaspils_backend', '0005_rename_course_experiment'),
    ]

    operations = [
        migrations.RenameField(
            model_name='experiment',
            old_name='name',
            new_name='partner',
        ),
    ]
