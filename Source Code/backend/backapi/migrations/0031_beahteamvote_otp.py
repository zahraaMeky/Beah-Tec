# Generated by Django 4.1.2 on 2023-02-02 09:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backapi', '0030_beahteamvote'),
    ]

    operations = [
        migrations.AddField(
            model_name='beahteamvote',
            name='OTP',
            field=models.TextField(default=1, max_length=6),
            preserve_default=False,
        ),
    ]
