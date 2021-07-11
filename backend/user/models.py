from django.dispatch import receiver
from django.urls import reverse
from django_rest_passwordreset.signals import reset_password_token_created
from django.core.mail import send_mail  


@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):

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