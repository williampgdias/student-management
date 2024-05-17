from django.contrib import admin
from django.urls import path

from students.views import (
    login,
    register,
    StudentsListView,
    StudentsCreateView,
    StudentsUpdateView,
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", login, name="login"),
    path("register", register, name="register"),
    path("list_students", StudentsListView.as_view(), name="students_list"),
    path("add_students", StudentsCreateView.as_view(), name="students_add"),
    path(
        "list_students/update/<int:pk>",
        StudentsUpdateView.as_view(),
        name="students_update",
    ),
]
