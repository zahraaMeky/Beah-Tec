# Generated by Django 4.0.3 on 2022-09-01 07:14

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('backapi', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='beahnotifications',
            name='DjangoID',
            field=models.ForeignKey(blank=True, default='', null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='beahnotifications',
            name='UserID',
            field=models.ForeignKey(blank=True, default='', null=True, on_delete=django.db.models.deletion.CASCADE, to='backapi.beahusers'),
        ),
    ]
