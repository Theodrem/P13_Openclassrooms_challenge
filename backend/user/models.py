from django.contrib.auth.models import Group, User
from django.dispatch import receiver
from django.db import models
from django.utils import timezone
from django_rest_passwordreset.signals import reset_password_token_created
from django.core.mail import send_mail  


@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):
    """
    Send email with token generated
    """

    email_plaintext_message = "http://localhost:8080//reset-password-confirm//{}".format(reset_password_token.key)

    send_mail(
        # title:
        "Reset ton mot de passe sur Gloot",
        # message:
        email_plaintext_message,
        # from:
        'herin.theotim@gmail.com',
        # to:
        [reset_password_token.user.email]
    )

class Post(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    text = models.TextField()
    created_date = models.DateTimeField(default=timezone.now)

