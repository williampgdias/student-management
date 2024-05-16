from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)
from django.utils import timezone


class CustomUserManager(BaseUserManager):
    def create_user(self, email, name, password=None, **extra_fields):
        if not email:
            raise ValueError("The email address needs")
        email = self.normalize_email(email)
        user = self.model(email=email, name=name, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, name, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("O superusuário deve ter is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("O Superusuário deve ter is_superuser=True.")

        return self.create_user(email, name, password, **extra_fields)


class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)

    objects = CustomUserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["name"]

    def __str__(self):
        return self.email


# class User(models.Model):
#     name = models.CharField(max_length=100, null=False)
#     email = models.CharField(max_length=100, null=False, blank=False)
#     password = models.


class Student(models.Model):
    name = models.CharField(max_length=100, null=False, blank=False)
    email = models.CharField(max_length=100, null=False, blank=False)
    pps_number = models.CharField(max_length=10, null=False, blank=False)
