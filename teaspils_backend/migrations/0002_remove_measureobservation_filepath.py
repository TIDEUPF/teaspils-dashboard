# Generated by Django 4.0.4 on 2022-04-26 19:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('teaspils_backend', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='measureobservation',
            name='filePath',
        ),
    ]
