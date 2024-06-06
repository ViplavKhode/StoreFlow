# Generated by Django 5.0.4 on 2024-04-19 06:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_alter_user_managers'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='role',
            field=models.CharField(blank=True, choices=[('admin', 'admin'), ('inventory_manager', 'inventory_manager'), ('warehouse_supervisor', 'warehouse_supervisor')], max_length=50),
        ),
    ]
