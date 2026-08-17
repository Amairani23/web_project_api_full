# Around — Full Stack Web Application

Aplicación web full stack desarrollada como proyecto final de formación. El proyecto permite a los usuarios registrarse, iniciar sesión, editar su perfil, crear y eliminar tarjetas, y gestionar los "me gusta".

La aplicación está compuesta por un **frontend desarrollado con React** y un **backend desarrollado con Node.js, Express y MongoDB**.

## 🌐 Demo

**Frontend:**
https://inariama.mooo.com 
https://www.inariama.mooo.com

**API:**
https://api.inariama.mooo.com


---

## 📁 Estructura del proyecto


El repositorio contiene dos partes principales:

* `frontend/`: aplicación cliente desarrollada con React.
* `backend/`: API REST desarrollada con Node.js y Express.

---

## ✨ Funcionalidades

### Autenticación y usuarios

* Registro de nuevos usuarios.
* Inicio de sesión mediante correo electrónico y contraseña.
* Contraseñas almacenadas mediante hash.
* Autenticación mediante JWT.
* Token con una duración de una semana.
* Protección de rutas mediante middleware de autorización.
* Edición del perfil.

### Tarjetas

* Obtener tarjetas.
* Crear nuevas tarjetas.
* Eliminar tarjetas propias.
* Agregar y eliminar "me gusta".

### Seguridad

* Contraseñas excluidas de las respuestas de la API.
* Validación de datos mediante `celebrate` y Joi.
* Validación de URLs mediante `validator`.
* Middleware de autorización mediante JWT.
* Variables sensibles almacenadas mediante `.env` en producción.
* Configuración de CORS.

### Manejo de errores

* Middleware centralizado para el manejo de errores.
* Código HTTP `401` para errores de autenticación.
* Código HTTP `403` para accesos no autorizados.
* Código HTTP `404` para recursos inexistentes.
* Código HTTP `500` para errores inesperados.
* Registro de solicitudes en `request.log`.
* Registro de errores en `error.log`.

---

## 🛠️ Tecnologías utilizadas

### Frontend

* React
* JavaScript
* HTML5
* CSS3
* Vite

### Backend

* Node.js
* Express
* MongoDB
* Mongoose
* JWT
* bcrypt
* Joi
* Celebrate
* Validator
* CORS

### Despliegue

* Google Cloud
* Nginx
* PM2
* HTTPS / SSL
* FreeDNS

---


# ☁️ Servidor

La API está desplegada en un servidor cloud y ejecutada mediante **PM2**.

PM2 permite mantener el proceso de Node.js activo y reiniciarlo automáticamente si el proceso se detiene inesperadamente.


---

# 🌍 Nginx

Nginx se utiliza como servidor web y reverse proxy para conectar el frontend con la API.

La configuración permite:

* Servir los archivos estáticos del frontend.
* Redirigir las solicitudes de la API al servidor Node.js.
* Utilizar el dominio configurado.
* Servir la aplicación mediante HTTPS.

---

# 🔒 HTTPS

La aplicación utiliza HTTPS para proteger la comunicación entre el cliente y el servidor.

El certificado SSL se configura en el servidor y Nginx se encarga de gestionar las conexiones HTTPS.

---

# 📝 Logs

La API registra las solicitudes y errores en archivos separados:

```text
request.log
error.log
```

Estos archivos se generan en el servidor y **no forman parte del repositorio Git**.

---

# 📌 Estado del proyecto

Proyecto final de formación **Around Full Stack**, que integra frontend, backend, autenticación, autorización, base de datos, validación, manejo de errores y despliegue en un servidor cloud.

---

