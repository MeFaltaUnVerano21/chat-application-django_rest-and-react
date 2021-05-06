from django.db import models

# Create your models here.

class User(models.Model):
    username = models.CharField(default="", max_length=20, null="")
    email = models.CharField(default="", max_length=20, null="")
    url = models.CharField(default="", max_length=200, null=False)