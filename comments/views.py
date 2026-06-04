from django.shortcuts import render

# Create your views here.
from rest_framework import generics

from rest_framework.permissions import (
    IsAuthenticated
)

from .models import Comment

from .serializers import (
    CommentSerializer
)


class CreateCommentView(
    generics.CreateAPIView
):

    serializer_class = CommentSerializer

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


class PostCommentsView(
    generics.ListAPIView
):

    serializer_class = CommentSerializer

    def get_queryset(self):

        post_id = self.kwargs[
            "post_id"
        ]

        return Comment.objects.filter(
            post_id=post_id
        )


class DeleteCommentView(
    generics.DestroyAPIView
):

    serializer_class = CommentSerializer

    permission_classes = [
        IsAuthenticated
    ]

    def get_queryset(self):

        return Comment.objects.filter(
            author=self.request.user
        )