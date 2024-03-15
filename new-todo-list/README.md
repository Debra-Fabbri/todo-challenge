### Setup
# Bienvenido a new-todo-list

Aca encontraran dos carpetas que contienen 2 resoluciones

```bash
$ cd todoAppAPI
```

o

```bash
$ cd todoProject
```

ambas tienen la misma funcionalidad pero la diferencia es que uno se maneja con API y la otra mediante modelos y vistas.

Luego de elegir alguna de las 2 y 
una vez dentro, ejecuta:
```bash
$ python manage.py makemigrations
```

Esto creará todos los archivos de migraciones (migraciones de base de datos) necesarios para ejecutar esta aplicación.

Ahora, para aplicar estas migraciones ejecute el siguiente comando:
```bash
$ python manage.py migrate
```

Un último paso y nuestra App Todo estará lista. Necesitamos crear un usuario administrador para ejecutar esta App. En el terminal, escriba el siguiente comando y proporcionar nombre de usuario, contraseña y correo electrónico para el usuario administrador. 
```bash
$ python manage.py createsuperuser
```

Ahora le daremos vida a la aplicación.
Inicia el servidor con el siguiente comando:

```bash
$ python manage.py runserver
```

Una vez que el servidor está alojado, dirígete sobre http://127.0.0.1:8000/todoApp (CTRL + CLICK) 
para abrir la App.

Ahora puedes gestionar todas tus tareas/pendientes en un solo lugar :)

