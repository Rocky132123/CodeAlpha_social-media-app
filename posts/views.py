from django.shortcuts import render

# Create your views here.
from rest_framework import generics

from rest_framework.permissions import (
    IsAuthenticated,
    IsAuthenticatedOrReadOnly
)

from .models import Post

from .serializers import PostSerializer


class PostListView(
    generics.ListAPIView
):

    queryset = Post.objects.all()

    serializer_class = PostSerializer


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