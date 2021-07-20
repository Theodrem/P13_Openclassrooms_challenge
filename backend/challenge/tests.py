import json
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from .models import Challenge, UserChallenge

class ChallengeTests(APITestCase):
    def setUp(self):
        self.user1 = User.objects.create_user(username="user_test",
                                        email="test@email.fr",
                                        password="password_test")
    
        self.challenge = Challenge.objects.create(category="Sportif", difficult=1, title ="Test le defis", icon="fa fa-icon-test")
        self.challenge2 = Challenge.objects.create(category="Santé", difficult=3, title ="Test le defis santé 2", icon="fa fa-icon-test2")
        self.user_challenge = UserChallenge.objects.create(status="En cours", challenge=self.challenge, user=self.user1)

        url = reverse('token_obtain_pair')
        data = {'username': 'user_test', 'password': 'password_test'}
        response = self.client.post(url, data, format='json')
        self.access = response.data['access']
        self.refresh =  response.data['refresh']

    def test_get_all_challenges(self):
        url = 'http://127.0.0.1:8000/challenges/'
        response = self.client.get(url, format='json', HTTP_AUTHORIZATION=f'Bearer {self.access}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(json.dumps(response.data["results"][0]['category']), '"Sportif"')
    
    def test_add_challenge(self):
        url = 'http://127.0.0.1:8000/challenges/'
        data = {"category": "Environment", "difficult": 4, "title": "Test le defis 3", "icon": "fa fa-icon-test 3"}
        response = self.client.post(url, data, HTTP_AUTHORIZATION=f'Bearer {self.access}')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(json.dumps(response.data['category']), '"Environment"')
    
    def test_delete_challenge(self):
        url = f'http://127.0.0.1:8000/challenges/{self.challenge.id}/'
        response = self.client.delete(url, HTTP_AUTHORIZATION=f'Bearer {self.access}')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_get_user_challenge(self):
        url = 'http://127.0.0.1:8000/users-challenges/'
        params = {"user_id": self.user1.id}
        response = self.client.get(url, params=params, HTTP_AUTHORIZATION=f'Bearer {self.access}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(json.dumps(response.data['results'][0]['title']), '"Test le defis"')

    def test_add_user_challenge(self):
        url = 'http://127.0.0.1:8000/users-challenges/'
        data = {"user": self.user1.id, "challenge": self.challenge2.id, "status": "En cours"}
        response = self.client.post(url, data, HTTP_AUTHORIZATION=f'Bearer {self.access}')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(json.dumps(response.data['status']), '"En cours"')

    def test_delete_user_challenge(self):
        url = f'http://127.0.0.1:8000/users-challenges/{self.user_challenge.id}/'
        response = self.client.delete(url, HTTP_AUTHORIZATION=f'Bearer {self.access}')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_update_user_challenge(self):
        url = f'http://127.0.0.1:8000/users-challenges/{self.user_challenge.id}/'
        data = {"status": "Valide", "challenge": self.challenge.id, "user": self.user1.id}
        response = self.client.put(url, data, HTTP_AUTHORIZATION=f'Bearer {self.access}')
        self.assertEqual(json.dumps(response.data['status']), '"Valide"')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        

   