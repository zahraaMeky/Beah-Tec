# Generated by Django 4.1.2 on 2023-02-16 09:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backapi', '0031_beahteamvote_otp'),
    ]

    operations = [
        migrations.AddField(
            model_name='beahteamvote',
            name='Active',
            field=models.IntegerField(default=0),
        ),
    ]