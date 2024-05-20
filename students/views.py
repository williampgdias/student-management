from django.shortcuts import render, redirect
from django.views.generic import ListView, CreateView, UpdateView, DeleteView
from django.urls import reverse_lazy
from django.contrib import messages
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login as auth_login
from django.contrib.auth.mixins import LoginRequiredMixin

from django.http import HttpResponse

from .models import AddStudents


def register(request):
    if request.method == "GET":
        return render(request, "students/register.html")
    else:
        username = request.POST.get("username")
        email = request.POST.get("email")
        password = request.POST.get("password")

        user = User.objects.filter(username=username).first()

        if user:
            return HttpResponse("This user already exists!")

        user = User.objects.create_user(
            username=username, email=email, password=password
        )
        user.save()

        return HttpResponse("Usuário cadastrado com sucesso!")


def login_view(request):
    if request.method == "GET":
        return render(request, "students/login.html")
    else:
        email = request.POST.get("email")
        password = request.POST.get("password")

        user = authenticate(username=email, password=password)

        if user:
            auth_login(request, user)
            return redirect("students_list")
        else:
            return HttpResponse("Nome de usuário ou senha inválidos.")


class StudentsListView(LoginRequiredMixin, ListView):
    model = AddStudents
    template_name = "students/students_list.html"
    context_object_name = "students_list"

    login_url = "/login/"

    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            messages.warning(
                request, "Você precisa fazer login para acessar a página de estudantes"
            )
            return redirect("login")
        return super().dispatch(request, *args, **kwargs)


class StudentsCreateView(CreateView):
    model = AddStudents
    fields = ["id", "name", "email", "pps_number"]
    success_url = reverse_lazy("students_list")

    template_name = "students/students_form.html"
    context_object_name = "student"


class StudentsUpdateView(UpdateView):
    model = AddStudents
    fields = ["name", "email", "pps_number"]
    success_url = reverse_lazy("students_list")

    template_name = "students/students_form.html"
    context_object_name = "student"


class StudentsDeleteView(DeleteView):
    model = AddStudents
    success_url = reverse_lazy("students_list")

    template_name = "students/student_delete.html"
    context_object_name = "student"
