# Sistema web de gestión de inventarios

Aplicación web CRUD desarrollada para el proyecto de **Aplicaciones Web 2**

El sistema permite administrar un inventario básico de productos mediante las operaciones de **Crear, Leer, Actualizar y Borrar (CRUD)**. La aplicación cuenta con un backend desarrollado en Django y una interfaz frontend que consume los servicios mediante una API REST.

## Tecnologías utilizadas

### Backend

* Python 3.13.1
* Django 6.1
* Django REST Framework 3.18.0
* SQLite
* Django ORM

### Frontend

* HTML
* Bootstrap 5.3.3
* JavaScript

### Control de versiones

* Git
* GitHub

## Funcionalidades

* Registrar productos.
* Consultar productos.
* Editar productos.
* Eliminar productos.
* Buscar productos por nombre.
* Filtrar productos por categoría.
* Mostrar la cantidad disponible.
* Identificar productos con stock bajo.
* Establecer un nivel mínimo de existencias.
* Administrar la información mediante una API REST.

## Estructura del proyecto

```text
SistemaInventarios/
│
├── backend/
│   ├── config/
│   ├── productos/
│   ├── db.sqlite3
│   └── manage.py
│
├── frontend/
│   ├── templates/
│   │   └── index.html
│   │
│   └── static/
│       └── js/
│           └── app.js
│
├── .gitignore
└── README.md
```

## API

El sistema utiliza una API REST para realizar las operaciones sobre los productos.

| Método | Endpoint               | Función                 |
| ------ | ---------------------- | ----------------------- |
| GET    | `/api/productos/`      | Consultar productos     |
| POST   | `/api/productos/`      | Registrar producto      |
| GET    | `/api/productos/{id}/` | Consultar un producto   |
| PUT    | `/api/productos/{id}/` | Actualizar producto     |
| PATCH  | `/api/productos/{id}/` | Actualizar parcialmente |
| DELETE | `/api/productos/{id}/` | Eliminar producto       |

## Ejecución local

### 1. Clonar el repositorio

```bash
git clone https://github.com/Mario-Arturo/SistemaInventarios.git
```

### 2. Entrar al proyecto

```bash
cd SistemaInventarios
```

### 3. Activar el entorno virtual

En Windows:

```powershell
.\venv\Scripts\activate
```

Si PowerShell bloquea la ejecución de scripts:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process
```

Después:

```powershell
.\venv\Scripts\activate
```

### 4. Instalar dependencias

```bash
pip install -r requirements.txt
```

### 5. Ejecutar las migraciones

```bash
cd backend
python manage.py migrate
```

### 6. Iniciar el servidor

```bash
python manage.py runserver
```

La aplicación estará disponible en:

```text
http://127.0.0.1:8000/
```

La API estará disponible en:

```text
http://127.0.0.1:8000/api/productos/
```

## Categorías disponibles

Los productos pueden registrarse dentro de las siguientes categorías:

* Electrónica
* Oficina
* Muebles

## Modelo de datos

Cada producto contiene los siguientes campos:

* `id`
* `nombre`
* `categoria`
* `descripcion`
* `precio`
* `cantidad`
* `proveedor`
* `fecha_registro`
* `nivel_minimo`

## Arquitectura

```text
Usuario
   ↓
Frontend
HTML + Bootstrap + JavaScript
   ↓
API REST
Django REST Framework
   ↓
ProductoViewSet
   ↓
Django ORM
   ↓
SQLite
```

## Autor

**Mario Arturo López Paredes**
