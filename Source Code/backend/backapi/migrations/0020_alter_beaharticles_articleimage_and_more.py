# Generated by Django 4.1.2 on 2022-10-24 11:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backapi', '0019_rename_other_beahteccollege_main'),
    ]

    operations = [
        migrations.AlterField(
            model_name='beaharticles',
            name='ArticleImage',
            field=models.ImageField(upload_to='media/Articles'),
        ),
        migrations.AlterField(
            model_name='beahmember',
            name='MemberImage',
            field=models.ImageField(upload_to='media/MemberImage'),
        ),
        migrations.AlterField(
            model_name='beahprojects',
            name='ProjectProposal',
            field=models.FileField(upload_to='media/Proposal'),
        ),
        migrations.AlterField(
            model_name='beahprojects',
            name='projectLogo',
            field=models.ImageField(upload_to='media/projectsLogo'),
        ),
        migrations.AlterField(
            model_name='beahpromotionalimages',
            name='Image',
            field=models.ImageField(upload_to='media/Promotional'),
        ),
        migrations.AlterField(
            model_name='beahsubjectsimages',
            name='SubjectImage',
            field=models.ImageField(upload_to='media/Subjects'),
        ),
        migrations.AlterField(
            model_name='beahtec',
            name='Image',
            field=models.ImageField(upload_to='media/BeahTec'),
        ),
    ]
