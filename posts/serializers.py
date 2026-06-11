from rest_framework import serializers
from .models import Post


class PostSerializer(serializers.ModelSerializer):

    author_username = serializers.CharField(
        source="author.username",
        read_only=True
    )

    author_profile_picture = serializers.ImageField(
        source="author.profile_picture",
        read_only=True
    )

    likes_count = serializers.SerializerMethodField()

    class Meta:

        model = Post

        fields = [
            "id",
            "author",
            "author_username",
            "author_profile_picture",
            "content",
            "image",
            "likes_count",
            "created_at",
            "updated_at"
        ]

        read_only_fields = [
            "author"
        ]

    def get_likes_count(
        self,
        obj
    ):
        return obj.likes.count()