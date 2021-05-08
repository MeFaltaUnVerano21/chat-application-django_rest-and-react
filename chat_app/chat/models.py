from django.db import models
import random
import string
# Create your models here.
def generate_unique_code():
    length = 5

    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if Room.objects.filter(code=code).count() == 0:
            break
    return code

class Room(models.Model):
    code = models.CharField(unique=True, default=generate_unique_code, max_length=5)
    host = models.CharField(unique=True, max_length=50)