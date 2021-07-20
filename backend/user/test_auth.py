import json
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User, Group
from django.core import mail

class UserTests(APITestCase):
    def setUp(self):
        self.user1 = User.objects.create_user(username="user_test",
                                        email="test@email.fr",
                                        password="password_test")
        
        self.user2 = User.objects.create_user(username="user_test2",
                                        email="test2@email.fr",
                                        password="password_222",
                                        is_staff=True)
        
        self.group = Group.objects.create(name="Groupe_test")

        url = reverse('token_obtain_pair')
        data = {'username': 'user_test2', 'password': 'password_222'}
        response = self.client.post(url, data, format='json')
        self.access = response.data['access']
        self.refresh =  response.data['refresh']

    def test_register(self):
        """
        Ensure we can create a new account object.
        """
        url = reverse('auth_register')
        data = {'username': 'test', 'email': 'test@test.fr', 'password': 'salut-passw', 'password2': 'salut-passw', 'first_name': '', 'last_name': ''}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 3)

    def test_register_password_not_match(self):
        """
        Ensure we can create a new account object.
        """
        url = reverse('auth_register')
        data = {'username': 'test', 'email': 'test@test.fr', 'password': 'salut-passw', 'password2': 'salut-password', 'first_name': '', 'last_name': ''}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), 2)

    def test_register_email_exist(self):
        """
        Ensure we can create a new account object.
        """
        url = reverse('auth_register')
        data = {'username': 'test', 'email': 'test2@email.fr', 'password': 'salut-password', 'password2': 'salut-password', 'first_name': '', 'last_name': ''}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), 2)

    def test_login(self):
        """
        Test the login view. Test if the satuts code is ok and if the refresh token and and access is ok with logout view.
        """
        url = reverse('token_obtain_pair')
        data = {'username': 'user_test', 'password': 'password_test'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        url_test = reverse('logout_view')
        access= response.data['access']
        refresh =  response.data['refresh']
        response_test = self.client.post(url_test, {'refresh': refresh}, HTTP_AUTHORIZATION=f'Bearer {access}')
        self.assertEqual(response_test.status_code, status.HTTP_204_NO_CONTENT)

    
    def test_logout(self):
        """
        Test the login view. Test if the satuts code is ok and if the refresh token and and access is ok with logout view.
        """
        url = reverse('logout_view')
        response = self.client.post(url, {'refresh': self.refresh}, HTTP_AUTHORIZATION=f'Bearer {self.access}')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_send_mail_reset_password(self):
        """
        Test if the email is sent with the correct content
        """
        url ='http://127.0.0.1:8000/api/password_reset/'
        data = {'email': 'test@email.fr'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(mail.outbox), 1)
        self.assertEqual(mail.outbox[0].subject, 'Reset ton mot de passe sur Gloot')
        list_body = mail.outbox[0].body.split('//')
        token_reset = list_body[-1]
        
        #Test if the password is correctly changed with the token
        url_resest ='http://127.0.0.1:8000/api/password_reset/confirm/'
        data = {'password': "new_password", "token": token_reset}
        response = self.client.post(url_resest, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        #Test if the user is logged with new password
        url_login = reverse('token_obtain_pair')
        data = {'username': 'user_test', 'password': 'new_password'}
        response = self.client.post(url_login, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
    def test_get_users(self):
        url ='http://127.0.0.1:8000/profile/'
        response = self.client.get(url, HTTP_AUTHORIZATION=f'Bearer {self.access}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(json.dumps(response.data["results"][0]['username']), '"user_test"')

    
    def test_get_user_detail(self):
        url = f'http://127.0.0.1:8000/profile/{self.user2.id}/'
        response = self.client.get(url, HTTP_AUTHORIZATION=f'Bearer {self.access}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['email'], "test2@email.fr")
        


