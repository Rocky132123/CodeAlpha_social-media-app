from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import (
    IsAuthenticated,
    IsAuthenticatedOrReadOnly
)
from rest_framework.parsers import (
    MultiPartParser,
    FormParser
)

from .models import Post

from .serializers import PostSerializer

from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import Post
from .serializers import PostSerializer

from notifications.models import Notification

class PostListView(
    generics.ListAPIView
):

    serializer_class = (
        PostSerializer
    )

    permission_classes = [
        IsAuthenticated
    ]

    def get_queryset(self):

        user = self.request.user

        followed_users = (
            user.following.all()
        )

        return Post.objects.filter(

            author__in=(
                list(followed_users)
                + [user]
            )

        ).order_by(
            "-created_at"
        )


class PostDetailView(
    generics.RetrieveAPIView
):

    queryset = Post.objects.all()

    serializer_class = PostSerializer


class CreatePostView(
    generics.CreateAPIView
):

    serializer_class = PostSerializer

    permission_classes = [
        IsAuthenticated
    ]

    parser_classes = [
        MultiPartParser,
        FormParser
    ]

    def perform_create(
        self,
        serializer
    ):

        serializer.save(
            author=self.request.user
        )

class UserPostsView(
    generics.ListAPIView
):

    serializer_class = PostSerializer

    def get_queryset(self):

        user_id = self.kwargs["user_id"]

        return Post.objects.filter(
            author_id=user_id
        )


class DeletePostView(
    generics.DestroyAPIView
):

    serializer_class = PostSerializer

    permission_classes = [
        IsAuthenticated
    ]

    def get_queryset(self):

        return Post.objects.filter(
            author=self.request.user
        )
class LikePostView(
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

        post = Post.objects.get(
            id=id
        )

        post.likes.add(
            request.user
        )

        if post.author != request.user:

            Notification.objects.create(

                recipient=post.author,

                sender=request.user,

                notification_type="like",

                message=
                f"{request.user.username} liked your post"
            )

        return Response(
            {
                "message":
                "Post Liked"
            }
        )
class UnlikePostView(
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

        post = Post.objects.get(
            id=id
        )

        post.likes.remove(
            request.user
        )

        return Response(
            {
                "message":
                "Post Unliked"
            }
        )