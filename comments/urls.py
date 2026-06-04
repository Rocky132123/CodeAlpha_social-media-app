from django.urls import path

from .views import (

    CreateCommentView,

    PostCommentsView,

    DeleteCommentView
)

urlpatterns = [

    path(

        "create/",

        CreateCommentView.as_view(),

        name="create-comment"
    ),

    path(

        "post/<int:post_id>/",

        PostCommentsView.as_view(),

        name="post-comments"
    ),

    path(

        "<int:pk>/delete/",

        DeleteCommentView.as_view(),

        name="delete-comment"
    ),
]