from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    return(HttpResponse('now you are on the index page'))
# Create your views here.
