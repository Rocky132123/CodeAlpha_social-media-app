from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import User

from .serializers import (
    RegisterSerializer,
    UserProfileSerializer,
    UpdateProfileSerializer
)


class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer


class CurrentUserView(generics.RetrieveAPIView):

    serializer_class = UserProfileSerializer

    permission_classes = [
        IsAuthenticated
    ]

    def get_object(self):
        return self.request.user


class UpdateProfileView(generics.UpdateAPIView):

    serializer_class = UpdateProfileSerializer

    permission_classes = [
        IsAuthenticated
    ]

    def get_object(self):
        return self.request.user


class UserProfileView(generics.RetrieveAPIView):

    queryset = User.objects.all()

    serializer_class = UserProfileSerializer

    lookup_field = "id"