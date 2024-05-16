# from django.views.generic import ListView


# class StudentsListView(ListView):
#     model = Students

from django.shortcuts import render
from django.http import HttpResponse


def login(request):
    return render(request, "students/login.html")


def register(request):
    return render(request, "students/register.html")
