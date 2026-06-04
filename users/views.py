from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import User
from rest_framework.views import APIView
from rest_framework.response import Response

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

class FollowUserView(
    APIView
):

    permission_classes = [
        IsAuthenticated
    ]

    def post(
        self,
        request,
        id
    ):

        target_user =User.objects.get(
            id=id
        )

        target_user.followers.add(
            request.user
        )

        return Response(
            {
                "message":
                "Followed Successfully"
            }
        )


class UnfollowUserView(
    APIView
):

    permission_classes = [
        IsAuthenticated
    ]

    def post(
        self,
        request,
        id
    ):

        target_user =User.objects.get(
            id=id
        )

        target_user.followers.remove(
            request.user
        )

        return Response(
            {
                "message":
                "Unfollowed Successfully"
            }
        )
class FollowUserView(
    APIView
):

    permission_classes = [
        IsAuthenticated
    ]

    def post(
        self,
        request,
        id
    ):

        target_user =User.objects.get(
            id=id
        )

        target_user.followers.add(
            request.user
        )

        return Response(
            {
                "message":
                "Followed Successfully"
            }
        )


class UnfollowUserView(
    APIView
):

    permission_classes = [
        IsAuthenticated
    ]

    def post(
        self,
        request,
        id
    ):

        target_user =User.objects.get(
            id=id
        )

        target_user.followers.remove(
            request.user
        )

        return Response(
            {
                "message":
                "Unfollowed Successfully"
            }
        )