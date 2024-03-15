from django.test import TestCase, Client
from rest_framework import status
from django.urls import reverse
from .models import Task
from .serializers import TaskSerializer

class TaskViewsTestCase(TestCase):
    def setUp(self):
        self.client = Client()
        self.task1 = Task.objects.create(title='Task 1', completed=False)
        self.task2 = Task.objects.create(title='Task 2', completed=True)

    def test_apiOverview(self):
        url = reverse('api-overview')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_taskList(self):
        url = reverse('task-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
