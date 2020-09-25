# Generated by Django 3.0.1 on 2020-09-25 10:16

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('checkyourcar', '0003_auto_20200915_0107'),
    ]

    operations = [
        migrations.CreateModel(
            name='CarIssue',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('car', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='checkyourcar.Car')),
                ('issue', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='checkyourcar.Issue')),
            ],
        ),
    ]
