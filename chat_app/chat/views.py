from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import generics, status
from .serializers import RoomSerializer
from .models import Room
from rest_framework import viewsets



class RoomView(generics.CreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer