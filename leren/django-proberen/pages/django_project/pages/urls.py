from django.urls import path
from .views import HomePageView

urlspatterns = [
    path("", HomePageView.as_view(), name="home"),
]