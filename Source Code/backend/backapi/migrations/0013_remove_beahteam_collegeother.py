# Generated by Django 4.1.2 on 2022-10-18 11:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backapi', '0012_beahteam_collegeother'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='beahteam',
            name='CollegeOther',
        ),
    ]
