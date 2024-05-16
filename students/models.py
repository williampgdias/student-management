from django.db import models


class Student(models.Model):
    name = models.CharField(max_length=100, null=False, blank=False)
    email = models.CharField(max_length=100, null=False, blank=False)
    pps_number = models.CharField(max_length=10, null=False, blank=False)
