from django.db import models

# Create your models here.
from django.db import models

from users.models import User


class Notification(models.Model):

    NOTIFICATION_TYPES = [

        ("follow", "Follow"),

        ("like", "Like"),

        ("comment", "Comment"),
    ]

    recipient = models.ForeignKey(

        User,

        on_delete=models.CASCADE,

        related_name="notifications"
    )

    sender = models.ForeignKey(

        User,

        on_delete=models.CASCADE,

        related_name="sent_notifications"
    )

    notification_type = models.CharField(

        max_length=20,

        choices=NOTIFICATION_TYPES
    )

    message = models.CharField(
        max_length=255
    )

    is_read = models.BooleanField(
        default=False
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:

        ordering = [
            "-created_at"
        ]

    def __str__(self):

        return self.message