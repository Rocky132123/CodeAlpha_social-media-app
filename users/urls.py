from django.urls import path

from .views import (
    RegisterView,
    CurrentUserView,
    UpdateProfileView,
    UserProfileView
)

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [

    path(
        "register/",
        RegisterView.as_view(),
        name="register"
    ),

    path(
        "login/",
        TokenObtainPairView.as_view(),
        name="login"
    ),

    path(
        "refresh/",
        TokenRefreshView.as_view(),
        name="refresh"
    ),

    path(
        "me/",
        CurrentUserView.as_view(),
        name="current-user"
    ),

    path(
        "me/update/",
        UpdateProfileView.as_view(),
        name="update-profile"
    ),

    path(
        "profile/<int:id>/",
        UserProfileView.as_view(),
        name="user-profile"
    ),
]