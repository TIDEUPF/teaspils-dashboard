# Generated by Django 4.0.4 on 2022-12-18 15:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('teaspils_backend', '0004_plantsettings_high_soilhum_and_more'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Course',
            new_name='Experiment',
        ),
    ]