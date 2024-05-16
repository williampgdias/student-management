from django.shortcuts import render

from .models import AddStudents, RegisterStudent


def students(request):
    students = AddStudents.objects.all()
    return render(request, "students/students.html", {"students": students})


def login(request):
    return render(request, "students/login.html")


def register(request):
    register_user = RegisterStudent.objects.all()
    return render(request, "students/register.html", {"register_user": register_user})


def add_students(request):
    add_students = AddStudents.objects.all()
    return render(request, "students/add_students.html", {"add_students": add_students})
