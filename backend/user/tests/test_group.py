import json
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User, Group
from ..models import Post


class GroupTests(APITestCase):
    def setUp(self):
        self.user1 = User.objects.create_user(username="user_test",
                                        email="test@email.fr",
                                        password="password_test")
        
        self.user2 = User.objects.create_user(username="user_test2",
                                        email="test2@email.fr",
                                        password="password_222",
                                        is_staff=True
                                        )
        self.group = Group.objects.create(name="Groupe_test")
        self.group2 = Group.objects.create(name="Group_test2")
        self.user1.groups.add(self.group)
        
        self.post = Post.objects.create(author=self.user2, group=self.group, text="Test post")

        url = reverse('token_obtain_pair')
        data = {'username': 'user_test2', 'password': 'password_222'}
        response = self.client.post(url, data, format='json')
        self.access = response.data['access']
        self.refresh =  response.data['refresh']

    def test_get_groups(self):
        url ='http://127.0.0.1:8000/api/group/'
        response = self.client.get(url, HTTP_AUTHORIZATION=f'Bearer {self.access}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(json.dumps(response.data["results"][0]['name']), '"Groupe_test"')

    def test_post_user_groups(self):
        url ='http://127.0.0.1:8000/api/profile/add_user_group/'
        data = {'user':  self.user1.id, 'group': self.group.id}
        response = self.client.post(url, data, HTTP_AUTHORIZATION=f'Bearer {self.access}')
        self.assertEqual(response.status_code,  status.HTTP_200_OK)
        self.assertEqual(json.dumps(response.data['groups'][0]['name']), '"Groupe_test"')

    def test_delete_user_groups(self):
        url ='http://127.0.0.1:8000/api/profile/delete_user_group/'
        data = {'user':  self.user2.id, 'group': self.group.id}
        response = self.client.delete(url, data, HTTP_AUTHORIZATION=f'Bearer {self.access}')
        self.assertEqual(response.status_code,  status.HTTP_200_OK)
        self.assertEqual(json.dumps(response.data['username']), '"user_test2"')
    
    def test_get_posts_group(self):
        url ='http://127.0.0.1:8000/api/post/'
        params = {'groups': 1}
        response = self.client.get(url, params=params, HTTP_AUTHORIZATION=f'Bearer {self.access}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(json.dumps(response.data['results'][0]['text']), '"Test post"')

    def test_post_posts(self):
        url ='http://127.0.0.1:8000/api/post/'
        data = {'group': self.group.id, 'author': self.user2.id, 'text': "hello"}
        response = self.client.post(url, data, HTTP_AUTHORIZATION=f'Bearer {self.access}', format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(json.dumps(response.data['text']), '"hello"')

    def test_delete_group(self):
        url =f'http://127.0.0.1:8000/api/group/{self.group.id}/'
        response = self.client.delete(url, HTTP_AUTHORIZATION=f'Bearer {self.access}')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        
    def test_create_group(self):
        url ='http://127.0.0.1:8000/api/group/'
        data = {'name': "GroupeTest2"}
        response = self.client.post(url, data, HTTP_AUTHORIZATION=f'Bearer {self.access}', format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(json.dumps(response.data['name']), '"GroupeTest2"')

    def test_delete_post(self):
        url =f'http://127.0.0.1:8000/api/post/{self.post.id}/'
        response = self.client.delete(url, HTTP_AUTHORIZATION=f'Bearer {self.access}')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_get_group_user_haspermission(self):
        url_log = reverse('token_obtain_pair')
        data_log = {'username': 'user_test', 'password': 'password_test'}
        response_log = self.client.post(url_log, data_log, format='json')
        access = response_log.data['access']

        url =f'http://127.0.0.1:8000/api/group/?id={self.group.id}'
        
        response = self.client.get(url, HTTP_AUTHORIZATION=f'Bearer {access}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(json.dumps(response.data['results'][0]['name']), '"Groupe_test"')

    def test_get_group_user_not_haspermission(self):
        url_log = reverse('token_obtain_pair')
        data_log = {'username': 'user_test', 'password': 'password_test'}
        response_log = self.client.post(url_log, data_log, format='json')
        access = response_log.data['access']

        url =f'http://127.0.0.1:8000/api/group/?id={self.group2.id}'
        
        response = self.client.get(url, HTTP_AUTHORIZATION=f'Bearer {access}')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


    





