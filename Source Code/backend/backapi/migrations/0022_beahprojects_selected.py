# Generated by Django 4.1.2 on 2022-10-25 08:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backapi', '0021_alter_beaharticles_articleimage_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='beahprojects',
            name='selected',
            field=models.IntegerField(default=0),
        ),
    ]
