import json
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User, Group
from .models import Notifications


class NotificationTests(APITestCase):
    def setUp(self):
        self.user1 = User.objects.create_user(username="user_test",
                                        email="test@email.fr",
                                        password="password_test")
        
        self.user2 = User.objects.create_user(username="user_test2",
                                        email="test2@email.fr",
                                        password="password_222",
                                        is_staff=True
                                        )
        
        self.user3 = User.objects.create_user(username="user_test3",
                                        email="test3@email.fr",
                                        password="password_222"
                                        )

        self.group = Group.objects.create(name="Groupe_test")
        self.user2.groups.add(self.group)
        self.notif = Notifications.objects.create(sender=self.user2, ricipient=self.user1, group=self.group, description="Invite sur le groupe")
        

        url = reverse('token_obtain_pair')
        data = {'username': 'user_test2', 'password': 'password_222'}
        response = self.client.post(url, data, format='json')
        self.access = response.data['access']
        self.refresh =  response.data['refresh']

    def test_get_notifications_user(self):
        #Test get all the notifications of a user
        url = 'http://127.0.0.1:8000/api/notification/'
        params = {'ricipient': self.user1.id}
        response = self.client.get(url, parmas=params, HTTP_AUTHORIZATION=f'Bearer {self.access}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(json.dumps(response.data['results'][0]['sender_name']), '"user_test2"')

    def test_get_all_notifications(self):
        #Test get all the notifications of a user
        url = 'http://127.0.0.1:8000/api/notification/'
        response = self.client.get(url,  HTTP_AUTHORIZATION=f'Bearer {self.access}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(json.dumps(response.data['count']), '1')  

    def test_send_notification_user(self):
        #Test send a notification to user
        url ='http://127.0.0.1:8000/api/notification/'
        data = {"sender": self.user2.id, "ricipient": self.user3.id, "group": self.group.id, "description": "Invite sur le groupe"}
        response = self.client.post(url, data, HTTP_AUTHORIZATION=f'Bearer {self.access}')
        self.assertEqual(response.status_code,  status.HTTP_201_CREATED)

    def test_delete_notification(self):
        #Test delete notification
        url =f'http://127.0.0.1:8000/api/notification/{self.notif.id}/'
        response = self.client.delete(url, HTTP_AUTHORIZATION=f'Bearer {self.access}')
        self.assertEqual(response.status_code,  status.HTTP_204_NO_CONTENT)
 