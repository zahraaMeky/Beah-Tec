# Generated by Django 4.1.2 on 2022-10-30 10:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backapi', '0024_beahteam_selected'),
    ]

    operations = [
        migrations.AlterField(
            model_name='beahusers',
            name='UserPassword',
            field=models.CharField(max_length=350),
        ),
    ]
