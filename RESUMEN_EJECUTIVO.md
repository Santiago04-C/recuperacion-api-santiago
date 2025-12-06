# Informe del Proyecto - API RESTful

**Proyecto de Recuperación - Desarrollo Web Full Stack**  
**Alumno**: [Tu Nombre]  
**Fecha**: Diciembre 2025

---

## 1. Descripción del Proyecto

API RESTful completa desarrollada con Next.js 14+ App Router, TypeScript, y bases de datos duales (PostgreSQL/SQLite + MongoDB). Implementa autenticación JWT, autorización por roles, y CRUD completo de productos.

---

## 2. Tecnologías Utilizadas

- **Framework**: Next.js 14+ con App Router
- **Lenguaje**: TypeScript
- **Base de Datos Relacional**: Prisma ORM (SQLite en desarrollo, PostgreSQL en producción)
- **Base de Datos NoSQL**: Mongoose (MongoDB)
- **Autenticación**: JWT (JSON Web Tokens)
- **Validación**: Zod
- **Seguridad**: bcryptjs para hash de contraseñas

---

## 3. Funcionalidades Implementadas

### 3.1 Autenticación y Autorización
- ✅ Registro de usuarios con validación
- ✅ Login con generación de JWT
- ✅ Endpoint `/api/auth/me` para obtener usuario autenticado
- ✅ Sistema de roles (USER y ADMIN)
- ✅ Middleware de autenticación
- ✅ Middleware de autorización por roles

### 3.2 CRUD de Productos
- ✅ Listar todos los productos (público)
- ✅ Obtener producto por ID (público)
- ✅ Crear producto (requiere autenticación)
- ✅ Actualizar producto (requiere ser propietario o admin)
- ✅ Eliminar producto (requiere rol ADMIN)

### 3.3 Sistema de Logs
- ✅ Registro de actividad en MongoDB
- ✅ Endpoints protegidos para crear y consultar logs

---

## 4. Arquitectura del Proyecto

### 4.1 Patrón MVC
El proyecto sigue una arquitectura Modelo-Vista-Controlador:

- **Modelos**: Definidos en Prisma Schema y Mongoose
- **Controladores**: Lógica de negocio separada en `/controllers`
- **Rutas**: API Routes en `/app/api`

### 4.2 Estructura de Directorios
```
├── app/api/              # Rutas de la API
├── controllers/          # Lógica de negocio
├── middlewares/          # Autenticación y autorización
├── validators/           # Validación con Zod
├── lib/                  # Clientes de bases de datos
├── models/               # Modelos Mongoose
├── prisma/               # Schema y migraciones
└── utils/                # Utilidades (JWT, password, etc.)
```

---

## 5. Endpoints de la API

### Autenticación (Públicos)
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/auth/register` | Registrar nuevo usuario |
| POST | `/api/auth/login` | Iniciar sesión (retorna JWT) |

### Usuario Autenticado
| Método | Endpoint | Rol | Descripción |
|--------|----------|-----|-------------|
| GET | `/api/auth/me` | USER/ADMIN | Obtener información del usuario |

### Productos
| Método | Endpoint | Rol | Descripción |
|--------|----------|-----|-------------|
| GET | `/api/products` | Público | Listar todos los productos |
| GET | `/api/products/:id` | Público | Obtener producto por ID |
| POST | `/api/products` | USER/ADMIN | Crear nuevo producto |
| PUT | `/api/products/:id` | Propietario/ADMIN | Actualizar producto |
| DELETE | `/api/products/:id` | ADMIN | Eliminar producto |

### Logs
| Método | Endpoint | Rol | Descripción |
|--------|----------|-----|-------------|
| POST | `/api/logs` | USER/ADMIN | Crear log de actividad |
| GET | `/api/logs` | USER/ADMIN | Obtener logs |

---

## 6. Seguridad Implementada

### 6.1 Autenticación
- JWT con expiración de 7 días
- Tokens verificados en cada petición protegida
- Middleware de autenticación reutilizable

### 6.2 Autorización
- Sistema de roles (USER, ADMIN)
- Verificación de permisos por endpoint
- Protección de operaciones sensibles (DELETE solo para ADMIN)

### 6.3 Protección de Datos
- Contraseñas hasheadas con bcrypt (10 rounds)
- Validación de entrada con Zod
- Manejo seguro de errores sin exponer información sensible

---

## 7. Base de Datos

### 7.1 PostgreSQL/SQLite (Prisma)
**Modelos**:
- **User**: Usuarios del sistema con roles
- **Product**: Productos con relación a usuarios

**Características**:
- Migraciones automáticas
- Relaciones uno a muchos (User → Products)
- Índices en campos únicos (email)

### 7.2 MongoDB (Mongoose)
**Modelos**:
- **Log**: Registro de actividad del sistema

**Características**:
- Esquema flexible
- Timestamps automáticos
- Almacenamiento de logs de auditoría

---

## 8. Usuarios de Prueba

El sistema incluye datos de prueba (seed):

```
Administrador:
  Email: admin@local.com
  Password: 123456
  Rol: ADMIN

Usuario Normal:
  Email: user@local.com
  Password: 123456
  Rol: USER
```

---

## 9. Despliegue

### 9.1 Desarrollo Local
```bash
npm install
npx prisma migrate dev
npx ts-node prisma/seed.ts
npm run dev
```

### 9.2 Producción (Vercel)
1. Configurar PostgreSQL en Neon
2. Configurar MongoDB en Atlas
3. Actualizar variables de entorno
4. Ejecutar migraciones en producción
5. Desplegar con `vercel --prod`

---

## 10. Pruebas

### 10.1 Colección de Postman
Se incluye `postman_collection.json` con:
- Todos los endpoints configurados
- Variables de entorno
- Tests automáticos
- Guardado automático de tokens

### 10.2 Casos de Prueba Cubiertos
- ✅ Registro de usuarios
- ✅ Login y generación de JWT
- ✅ Acceso a endpoints protegidos
- ✅ Verificación de roles
- ✅ CRUD completo de productos
- ✅ Manejo de errores

---

## 11. Conclusiones

### 11.1 Objetivos Cumplidos
- ✅ API RESTful completamente funcional
- ✅ Autenticación y autorización implementadas
- ✅ Bases de datos duales (relacional + NoSQL)
- ✅ CRUD completo con validaciones
- ✅ Código limpio y bien estructurado
- ✅ Documentación completa
- ✅ Listo para producción

### 11.2 Características Destacadas
- Arquitectura MVC profesional
- Separación de responsabilidades
- Código reutilizable y mantenible
- Seguridad robusta
- Validación exhaustiva de datos
- Manejo consistente de errores

---

## 12. Enlaces

- **Repositorio GitHub**: [URL del repositorio]
- **API en Vercel**: [URL de producción]
- **Documentación**: README.md en el repositorio

---

**Proyecto completado exitosamente y listo para evaluación.**
