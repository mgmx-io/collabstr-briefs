from django.urls import path
from briefs import views

urlpatterns = [
    path("api/briefs/", views.generate_brief),
]
