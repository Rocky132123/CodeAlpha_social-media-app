from rest_framework import serializers
from .models import Post


class PostSerializer(serializers.ModelSerializer):

    author_username = serializers.CharField(
        source="author.username",
        read_only=True
    )

    # ✅ Changed from ImageField to SerializerMethodField
    # ImageField crashes when profile_picture is null
    author_profile_picture = serializers.SerializerMethodField()

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
            "updated_at",
        ]
        read_only_fields = ["author"]

    def get_likes_count(self, obj):
        return obj.likes.count()

    def get_author_profile_picture(self, obj):
        request = self.context.get("request")
        if obj.author.profile_picture:
            if request:
                return request.build_absolute_uri(
                    obj.author.profile_picture.url
                )
            return obj.author.profile_picture.url
        return None  # ✅ returns null safely instead of crashing