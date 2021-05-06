from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import generics, status
from .serializers import UserSerializer
from .models import User

# Create your views here.
class UserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer