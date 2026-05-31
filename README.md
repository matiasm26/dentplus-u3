# DentPlus - Evaluación Unidad 3

## Descripción

DentPlus es una aplicación web desarrollada con arquitectura MVC utilizando Express, TypeScript y Handlebars. El sistema permite gestionar afiliados mediante operaciones CRUD, incorporando validaciones, autenticación de usuarios, persistencia en PostgreSQL y soporte para Docker.

---

## Tecnologías utilizadas

* Node.js
* TypeScript
* Express
* Express Handlebars
* PostgreSQL
* Prisma ORM
* Zod
* bcryptjs
* express-session
* Docker
* Docker Compose

---

## Instalación y ejecución local

### 1. Clonar repositorio

```bash
git clone https://github.com/matiasm26/dentplus-u3.git
cd dentplus-u3
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crear un archivo `.env` basado en `.env.example`.

Ejemplo:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/dentplus_db"
SESSION_SECRET="dentplus-secret"
```

### 4. Ejecutar migraciones Prisma

```bash
npx prisma migrate dev
```

### 5. Iniciar aplicación

```bash
npm run dev
```

La aplicación estará disponible en:

```text
http://localhost:3000
```

---

## Uso con Docker

### Levantar PostgreSQL mediante Docker

```bash
docker compose up -d
```

Verificar estado:

```bash
docker compose ps
```

Detener contenedor:

```bash
docker compose down
```

---

## Funcionalidades implementadas

### Validaciones con Zod

* Validación de formularios de creación y edición.
* Mensajes de error inline.
* Repoblado de formularios cuando existen errores.

### Autenticación

* Registro de usuarios.
* Inicio de sesión.
* Cierre de sesión.
* Contraseñas protegidas con bcryptjs.
* Protección de rutas mediante sesiones.

### Aislamiento de datos

Cada usuario solo puede visualizar y administrar sus propios afiliados.

El identificador del usuario se obtiene desde:

```ts
req.session.userId
```

y no desde formularios enviados por el cliente.

### Persistencia

* PostgreSQL
* Prisma ORM
* Migraciones versionadas

---

## Decisión de arquitectura

bcryptjs se utiliza dentro del Controller y no en el Model.

Motivo:

El Controller contiene la lógica de negocio de la aplicación. El Model solamente debe encargarse de acceder y persistir datos.

El proceso de hashear contraseñas corresponde a una regla de negocio relacionada con la seguridad, por lo que debe permanecer en la capa Controller.

---

## Uso de Inteligencia Artificial

Durante el desarrollo del proyecto se utilizó ChatGPT como herramienta de apoyo para:

* Resolver dudas sobre Prisma y PostgreSQL.
* Comprender la configuración de Docker.
* Revisar errores de TypeScript.
* Comprender mejores prácticas de arquitectura MVC.
* Apoyar la implementación de validaciones con Zod.

Todo el código fue revisado, probado y comprendido antes de ser incorporado al proyecto.

---

## Autor

Matías Martínez

Evaluación Unidad 3 - Desarrollo de Software Web I
