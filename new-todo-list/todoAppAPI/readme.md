# Resolución del Desafío Todo List

Esta resolución contiene cada punto y se le agregó unos tests para verificar si las vistas apiOverview y taskList están funcionando correctamente y responden con los códigos de estado HTTP esperados.

## Pruebas Unitarias
test_apiOverview:
Esta prueba verifica si la vista apiOverview responde correctamente con un código de estado HTTP 200 (OK). La vista apiOverview parece ser una vista general que proporciona una descripción de la API y sus endpoints. Por lo tanto, esta prueba verifica si la vista está accesible y responde correctamente.

test_taskList:
Esta prueba verifica si la vista taskList responde correctamente con un código de estado HTTP 200 (OK). La vista taskList parece ser una vista que devuelve una lista de todas las tareas disponibles en la base de datos. Por lo tanto, esta prueba verifica si la vista está accesible y si puede recuperar la lista de tareas correctamente.

# Para ejecutar las mismas

```bash
$ python ./manage.py test
```