# Generated by Django 4.2.13 on 2024-05-17 11:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('students', '0003_rename_registerstudent_registeruser'),
    ]

    operations = [
        migrations.AlterField(
            model_name='addstudents',
            name='id',
            field=models.IntegerField(primary_key=True, serialize=False, unique=True),
        ),
    ]
