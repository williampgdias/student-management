from django.contrib import admin
from django.urls import path

from students.views import login, register, students, add_students

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", login, name="login"),
    path("register", register, name="register"),
    path("students", students, name="students"),
    path("add_students", add_students, name="add_students"),
]
