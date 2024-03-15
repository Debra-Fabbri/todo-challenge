from django.shortcuts import render, get_object_or_404, redirect
from django.views import generic
from .models import Todo
from django.http import HttpResponseRedirect
from django.db.models import Q

class IndexView(generic.ListView):
    template_name = 'todoApp/index.html'
    context_object_name = 'todo_list'

    def get_queryset(self):
        search_query = self.request.GET.get('search', '')

        # Si hay un término de búsqueda, filtra las tareas por su contenido
        if search_query:
            return Todo.objects.filter(title__icontains=search_query).order_by('-created_at')
        else:
            # Si no hay término de búsqueda, muestra todas las tareas
            return Todo.objects.order_by('-created_at')

def add(request):
    title = request.POST['title']
    Todo.objects.create(title=title)

    return redirect('todoApp:index')

def delete(request, todo_id):
    todo = get_object_or_404(Todo, pk=todo_id)
    todo.delete()

    return redirect('todoApp:index')

def update(request, todo_id):
    todo = get_object_or_404(Todo, pk=todo_id)
    isCompleted = request.POST.get('isCompleted', False)
    if isCompleted == 'on':
        isCompleted = True
    
    todo.isCompleted = isCompleted
    todo.save()

    return redirect('todoApp:index')
