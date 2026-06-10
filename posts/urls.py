from django.urls import path

from .views import (
    PostListView,
    PostDetailView,
    CreatePostView,
    UserPostsView,
    DeletePostView,
    LikePostView,
    UnlikePostView
)

urlpatterns = [

    path(
        "",
        PostListView.as_view(),
        name="feed"
    ),

    path(
        "create/",
        CreatePostView.as_view(),
        name="create-post"
    ),

    path(
        "<int:pk>/",
        PostDetailView.as_view(),
        name="post-detail"
    ),

    path(
        "user/<int:user_id>/",
        UserPostsView.as_view(),
        name="user-posts"
    ),

    path(
        "<int:pk>/delete/",
        DeletePostView.as_view(),
        name="delete-post"
    ),
    path(
    "like/<int:id>/",
    LikePostView.as_view(),
    name="like-post"
),

path(
    "unlike/<int:id>/",
    UnlikePostView.as_view(),
    name="unlike-post"
),
]