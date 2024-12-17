# 🌞 API RESTful - Hotel Sol de San Javier  

**Una API RESTful para la gestión de reservas, habitaciones y usuarios del [Hotel Sol de San Javier](https://github.com/WalterGonzalez33/hotelSolDeSanJavierFront).**  
Este proyecto está desarrollado con Node.js, Express y MongoDB, proporcionando una solución eficiente y escalable para la administración del hotel.  

---

<div align='center' style="display: flex; gap: 8px; wrap: wrap;">
  <a href="https://nodejs.org/en/">
    <img src="https://img.shields.io/badge/-Node.js-417E38?labelColor=gray&style=plastic&logo=node.js&logoColor=417E38&logoWidth=30" alt="Node.js">
  </a>
  <a href="https://expressjs.com/es/">
    <img src="https://img.shields.io/badge/-Express%20js-417E38?labelColor=gray&style=plastic&logo=express&logoColor=E6EDF3&logoWidth=30" alt="Express js">
  </a>

  <a href="https://www.mongodb.com">
    <img src="https://img.shields.io/badge/-MongoDB-00684A?labelColor=gray&style=plastic&logo=mongodb&logoColor=00684A&logoWidth=30" alt="MongoDB">
  </a>
</div>

<br>

## Tabla de Contenidos 📑

- [Características 📢](#📢-Características-principales)
- [Tecnologías 🚀](#🚀-Tecnologías-utilizadas)
- [Estructura del proyecto 📂](#📂-Estructura-del-proyecto)
- [Instalación ⚙️](#Instalación-⚙️)
- [Usuario administrador 👤](#👤-Usuario-administrador)
- [Endpoints 🛠️](#🛠️-Endpoints-de-la-API)
- [Contribuciones 📊](#📊-Contribuciones)
- [Equipo 💻](#desarrolladores-💻)

<br>

---

<br>

## 📢 Características principales

Las principales funcionalidades de la API, son:

- Gestión de usuarios con roles (Admin/Usuario).
- Disponibilidad de habitaciones según fechas específicas.
- Administración de reservas, habitaciones y clientes.
- Validaciones de datos y control de errores.
- Autenticación y autorización con JWT.

<br>

---

<br>

## 🚀 Tecnologías utilizadas  

- **[Node.js](https://nodejs.org/en/)**: Entorno de ejecución de JavaScript.  
- **[Express.js](https://expressjs.com/es/)**: Framework minimalista para aplicaciones web y APIs.  
- **[MongoDB](https://www.mongodb.com)**: Base de datos NoSQL para almacenar la información de usuarios, habitaciones y reservas.  
- **[Mongoose](https://mongoosejs.com/)**: ODM para trabajar con MongoDB.  
- **[dotenv](https://www.npmjs.com/package/dotenv)**: Gestión de variables de entorno.  
- **[jsonwebtoken](https://jwt.io/)**: Autenticación mediante JWT.  

  <a href="https://jwt.io/">
    <img src="https://jwt.io/img/badge-compatible.svg" alt="JWT" width="90">
  </a>

<br>

---

<br>

## 📂 Estructura del proyecto

```
project-root/
│
├── src/
│ ├── controllers/          # Controladores de las rutas  
│ │ 
│ ├── database/
│ │    ├── models/          # Modelos de datos 
│ │    └── dbConnection.js  # Conexión a la BD
│ │
│ ├── helpers/              # Funciones y validaciones
│ │
│ ├── routes/               # Definición de rutas
│ │
│ └── validations/          # Validaciones de datos 
│
├── .env.example            # Muestra de variables de entorno necesarias
│
└── index.js                # Configuración principal de Express 
```

<br>

---

<br>

## Instalación ⚙️

### Requisitos previos
- Node.js (v20+ recomendado)
- npm o yarn instalado
- Base de datos MongoDB

**Clonar el Repositorio:**

```bash
$ git clone https://github.com/WalterGonzalez33/hotelSanJavier_back.git
$ cd hotelSanJavier_back
```

**Instalar dependencias:**

```bash
$ npm install
```

### 🌐 Configura las variables de entorno:

Crea un archivo `.env` basado en el archivo `.env.example`.

**Iniciar el servidor:**

```bash
$ npm start
```

<br>

---

<br>

### 👤 Usuario administrador
El sistema crea un usuario Admin si es la primera vez que lo vinculas con una base de datos.   
Con este usuario podrás acceder a las rutas protegidas.

**credenciales:**
- **email:** admin@hotel.com
- **password:** Admin@1234   

>    
>NOTA: Crea otro usuario administrador y deshabilita este para evitar vulnerabilidades
>   

<br>

---

<br>

## 🛠️ Endpoints de la API

### 🧾 Gestión de usuarios  

| Método | Ruta                | Descripción                              | Autenticación |
|--------|---------------------|------------------------------------------|---------------|
| POST   | `/api/users`          | Registra un nuevo usuario.                | ❌            |
| POST   | `/api/login`          | Inicia sesión y devuelve un token JWT.    | ❌            |
| GET    | `/api/users`          | Muestra los datos de todos los usuarios.  | ✅ (Admin)    |
| GET    | `/api/users/:id`   | Muestra los datos del usuarios especificado. | ✅ (Admin)    |
| GET    | `/api/get-roll-user/:id` | Devuelve el roll del usuario.          | ❌            |
| PUT    | `/api/users/:id`      | Actualiza los datos del usuario.          | ✅ (Admin)    |
| DELETE | `/api/users/:id`      | Elimina el usuario.                       | ✅ (Admin)    |

### 🏨 Gestión de habitaciones  

| Método | Ruta                     | Descripción                              | Autenticación |
|--------|--------------------------|------------------------------------------|---------------|
| GET    | `/api/rooms`             | Lista todas las habitaciones disponibles.| ❌            |
| GET    | `/api/rooms/:check_in/:check_out` | Lista las habitaciones que están disponibles en esas fechas.| ❌   |
| GET    | `/api/rooms/:id`         | Muestra los datos de la habitación.      | ✅ (Admin)    |
| POST   | `/api/rooms`             | Crea una nueva habitación.               | ✅ (Admin)    |
| PUT    | `/api/rooms/:id`         | Actualiza los detalles de una habitación.| ✅ (Admin)    |
| DELETE | `/api/rooms/:id`         | Elimina una habitación.                  | ✅ (Admin)    |

### 📅 Gestión de reservas  

| Método | Ruta                     | Descripción                              | Autenticación |
|--------|--------------------------|------------------------------------------|---------------|
| GET    | `/api/reservation/list`   | Lista todas las reservas.              | ✅ (Admin)    |
| GET    | `/api/reservation/:id`    | Muestra los datos de la reservación.   | ✅ (Admin)    |
| POST   | `/api/reservation/create` | Crea una nueva reserva.                | ✅            |
| PUT    | `/api/reservation/:id`    | Actualiza una reserva.                 | ✅ (Admin)    |
| DELETE | `/api/reservation/:id`    | Cancela una reserva.                   | ✅ (Admin)    |

### ✅ Verifica la veracidad de un token  

| Método | Ruta                | Descripción                              | Autenticación |
|--------|---------------------|------------------------------------------|---------------|
| GET    | `/api/checkToken`   | Devuelve `{ access: true }` si el token es valido. | ✅  |

<br>

---

<br>

## 📊 Contribuciones

¡Te gustaría contribuir al proyecto! Para hacerlo:

1. Haz un fork del repositorio.

2. Crea una rama para tu funcionalidad o corrección: `git checkout -b feature/nueva-funcionalidad.`

3. Realiza tus cambios y haz un commit: `git commit -m "Descripción de los cambios".`

<br>

---

<br>

### Desarrolladores 💻

| [![Mauro Coniglio](https://avatars.githubusercontent.com/u/172056402?v=4)](https://github.com/MauroConiglio)  | [![Isaías Gius](https://avatars.githubusercontent.com/u/169393660?v=4)](https://github.com/G1U5) | [![Tomas Santamarina](https://avatars.githubusercontent.com/u/68829637?v=4)](https://github.com/Tomas2845)  | [![Fernando Valdivia](https://avatars.githubusercontent.com/u/159139593?v=4)](https://github.com/Fernando-Valdivia) | [![Walter Gonzalez](https://avatars.githubusercontent.com/u/83594534?v=4)](https://github.com/WalterGonzalez33) |
|---|---|---|---|---|
| [Mauro Coniglio](https://github.com/MauroConiglio) | [Isaías Gius](https://github.com/G1U5) | [Tomas Santamarina](https://github.com/Tomas2845) | [Fernando Valdivia](https://github.com/Fernando-Valdivia) | [Walter Gonzalez](https://github.com/WalterGonzalez33) |

<br>

---

<br>

<div align="center">
    <p>¡Gracias por visitar este repositorio! 🎉</p>
</div>