from django.db import models


class RegisterUser(models.Model):
    name = models.CharField(max_length=100, null=False, blank=False)
    email = models.EmailField()
    password = models.CharField(max_length=10, null=False, blank=False)


class AddStudents(models.Model):
    name = models.CharField(max_length=100, null=False, blank=False)
    email = models.EmailField()
    pps_number = models.CharField(max_length=10, null=False, blank=False)
