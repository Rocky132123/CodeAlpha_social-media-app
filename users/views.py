from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Q

from notifications.models import Notification
from .serializers import (
    RegisterSerializer,
    UserProfileSerializer,
    UpdateProfileSerializer,
    UserSearchSerializer

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

class UserProfileView(
    generics.RetrieveAPIView
):

    queryset = User.objects.all()

    serializer_class = (
        UserProfileSerializer
    )

    lookup_field = "id"

    permission_classes = [
        IsAuthenticated
    ]

    def get_serializer_context(
        self
    ):

        context = super(
        ).get_serializer_context()

        context["request"] = (
            self.request
        )

        return context
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import User


class FollowUserView(APIView):
    from notifications.models import (
    Notification
)
   

    permission_classes = [IsAuthenticated]

    def post(self, request, id):

        target_user = User.objects.get(id=id)

        if target_user == request.user:

            return Response(
                {
                    "error": "Cannot follow yourself"
                },
                status=400
            )

        target_user.followers.add(request.user)

        Notification.objects.create(
                recipient=target_user,

                sender=request.user,

                notification_type="follow",

                message=
                f"{request.user.username} followed you"
            )

        
        

        return Response(
            {
                "message": "Followed Successfully"
            }
        )


class UnfollowUserView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request, id):

        target_user = User.objects.get(id=id)

        if target_user == request.user:

            return Response(
                {
                    "error": "Cannot unfollow yourself"
                },
                status=400
            )

        target_user.followers.remove(request.user)

        return Response(
            {
                "message": "Unfollowed Successfully"
            }
        )
class UserSearchView(
    generics.ListAPIView
):

    serializer_class = (
        UserSearchSerializer
    )

    permission_classes = [
        IsAuthenticated
    ]

    def get_queryset(self):

        query = self.request.GET.get(
            "q",
            ""
        )

        return User.objects.filter(

            Q(username__icontains=query)

        ).exclude(

            id=self.request.user.id

        )