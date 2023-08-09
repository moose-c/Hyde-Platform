# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models

import numpy as np

class Model_template(models.Model):
    iso_code = models.IntegerField(primary_key=True)
    class Meta:
        abstract=True

# create labels through list comprehesion,
# note, now data until 2017
labels = [
    f'bce_{value}' for value in np.linspace(10000, 1000, 10, dtype=int)] + [
    f'ce_{value}' for value in np.linspace(0, 1700, 18, dtype=int)] + [
    f'ce_{value}' for value in np.linspace(1710, 2000, 30, dtype=int)] + [
    f'ce_{value}' for value in np.linspace(2001, 2017, 17, dtype=int)
    ]

for label in labels:
    Model_template.add_to_class(label, models.FloatField())

Population Count
Population Density
Urban
Rural
Build Area
Cropland
Other Irrigated
Other Rainfed
Rice Irrigated
Rice Rainfed
Total Irrigated
Total Rainfed
Conventional Rangeland
Rangeland
Grazig
Pasture    