from rest_framework import serializers

from .models import User


class RegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)

    class Meta:
        model = User

        fields = [
            "id",
            "username",
            "email",
            "password",
        ]

    def create(self, validated_data):

        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"]
        )

        return user


from rest_framework import serializers
from .models import User


class UserProfileSerializer(serializers.ModelSerializer):

    followers_count = serializers.SerializerMethodField()

    following_count = serializers.SerializerMethodField()

    is_following = serializers.SerializerMethodField()

    class Meta:

        model = User

        fields = [

            "id",

            "username",

            "email",

            "bio",

            "profile_picture",

            "created_at",

            "followers_count",

            "following_count",

            "is_following",
        ]

    def get_followers_count(
        self,
        obj
    ):
        return obj.followers.count()

    def get_following_count(
        self,
        obj
    ):
        return obj.following.count()

    def get_is_following(
        self,
        obj
    ):

        request = self.context.get(
            "request"
        )

        if (
            request and
            request.user.is_authenticated
        ):

            return obj.followers.filter(
                id=request.user.id
            ).exists()

        return False
class UpdateProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = User

        fields = [
            "bio",
            "profile_picture"
        ]