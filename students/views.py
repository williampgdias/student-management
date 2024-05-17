from django.shortcuts import render
from django.views.generic import ListView, CreateView, UpdateView
from django.urls import reverse_lazy

from .models import AddStudents


def login(request):
    return render(request, "students/login.html")


def register(request):
    # register_user = RegisterStudent.objects.all()
    return render(request, "students/register.html")


class StudentsListView(ListView):
    model = AddStudents
    template_name = "students/students_list.html"
    context_object_name = "students_list"


class StudentsCreateView(CreateView):
    model = AddStudents
    fields = ["name", "email", "pps_number"]
    success_url = reverse_lazy("students_list")

    template_name = "students/students_form.html"
    context_object_name = "student"


class StudentsUpdateView(UpdateView):
    model = AddStudents
    fields = ["name", "email", "pps_number"]
    success_url = reverse_lazy("students_list")

    template_name = "students/students_form.html"
    context_object_name = "student"


# def add_students(request):
#     add_students = AddStudents.objects.all()
#     return render(request, "students/add_students.html", {"add_students": add_students})
