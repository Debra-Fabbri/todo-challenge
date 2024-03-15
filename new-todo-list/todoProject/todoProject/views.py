from django.shortcuts import redirect

def index(request):
    return redirect('/todoApp')
    # return redirect('/api/todos')