# Proyecto-Apis 

Este proyecto integra múltiples microservicios y un frontend Angular en un solo entorno orquestado con Docker Compose. Está compuesto por:

- **Categories-Api**: Microservicio para la gestión de categorías.
- **Products-Api**: Microservicio para la gestión de productos.
- **Frontend Angular**: Interfaz web para consumir ambos microservicios.

---

## Estructura del repositorio

```
Proyecto-Apis/
├── categorias/           # Microservicio Spring Boot - Categorías
├── productos/            # Microservicio Spring Boot - Productos
├── frontend/             # Aplicación Angular
├── docker-compose.yml    # Archivo para levantar todo el sistema
├── .gitignore
└── README.md             # Este archivo
```

---

## Imágenes en Docker Hub

Las imágenes de los microservicios y el frontend también están disponibles públicamente en Docker Hub:

-  **Products-Api**: [`antonio215/products-api`](https://hub.docker.com/r/antonio215/products-api)
-  **Categories-Api**: [`antonio215/categories-api`](https://hub.docker.com/r/antonio215/categories-api)
-  **Frontend Angular**: [`antonio215/front-apis`](https://hub.docker.com/r/antonio215/front-apis)

---

## Requisitos

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

---

## Cómo ejecutar el proyecto

### 1. Clonar el repositorio

```bash
git clone https://github.com/RevillaA/Proyecto-Apis.git
```

### 2. Entrar a la ruta del proyecto donde esten los archivos

```bash
cd Proyecto-Apis
```

### 3. Construir y levantar servicios

Ejecutar en consola el siguiente comando 

```bash
docker-compose up --build
```

Esto ejecutará los siguientes servicios:

- **Categories-Api** en: [http://localhost:8001](http://localhost:8001)
- **Products-Api** en: [http://localhost:8002](http://localhost:8002)
- **Frontend Angular (Nginx)** en: [http://localhost:8084](http://localhost:8084)
- **PhpMyAdmin** (opcional) en: [http://localhost:8003](http://localhost:8003)

### 4. Acceder a la aplicación web

Una vez todo esté levantado, abre tu navegador y accede a:

**[http://localhost:8084](http://localhost:8084)**

Desde ahí podrás probar la interfaz web que consume las APIs de productos y categorías.

---

### 3. Apagar los contenedores

```bash
docker-compose down
```

---

## Notas adicionales

- Asegúrate de que los puertos **8001**, **8002**, **8084** (y **8003** si usas PhpMyAdmin) estén libres.
- Las APIs están desarrolladas con **Spring Boot + MySQL**.
- El frontend está construido en **Angular 19 + Bootstrap**, servido con **Nginx**.
- PhpMyAdmin está configurado para visualizar la base de datos MySQL si lo habilitas en el `docker-compose.yml`.

---
