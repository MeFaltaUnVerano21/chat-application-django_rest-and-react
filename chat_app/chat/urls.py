from django.contrib import admin
from django.urls import path, include
from .views import UserView
urlpatterns = [
    path('home', UserView.as_view() )
]
