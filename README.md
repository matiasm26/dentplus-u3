# DentPlus MVC

Sistema de afiliados desarrollado con:

- Node.js
- Express
- TypeScript
- Express Handlebars
- Arquitectura MVC

---

# Funcionalidades

- Listar afiliados
- Ver detalle de afiliado
- Crear afiliado
- Editar afiliado
- Eliminar afiliado
- Simulador de descuentos

---

# Tecnologías utilizadas

- Node.js
- Express
- TypeScript
- Express Handlebars
- Git

---

# Instalación

Instalar dependencias:

```bash
npm install
```

# Ejecutar proyecto

```bash
npm run dev
```

# Abrir en el navegador

```text
http://localhost:3000
```

# Arquitectura MVC
- Model
    Encargado del manejo de datos y lógica de negocio.

- Controller
    Coordina las peticiones HTTP y conecta Model con Views.

- Routes
    Define las rutas de la aplicación.

- Views
    Muestra la interfaz utilizando Handlebars.

# Estructura del proyecto

```text
src/
├── controllers/
├── models/
├── routes/
├── views/
│   ├── affiliates/
│   └── layouts/
└── app.ts
```