from django.contrib import admin
from django.urls import path

from students.views import login, register

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", login, name="login"),
    path("register", register, name="register"),
]
