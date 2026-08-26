# Control de Flujo de Caja - Cigarrería y Tienda 🏪

Sistema de control financiero y flujo de caja diseñado específicamente para resolver la fatiga operativa en horas pico ("el boleo") mediante un **Modelo de Cierre Único Nocturno**.

---

## 🎯 1. Contexto y Problema de Negocio

* **Tipo de Negocio:** Cigarrería, tienda de abarrotes y postres artesanales.
* **Problema Operativo:** Registrar inventarios o ventas unitarias en tiempo real durante horas de alto flujo de clientes es inviable y genera fricción operativa.
* **Solución:**
  * **Durante el día:** Se registran únicamente salidas rápidas de dinero (**Gastos** a proveedores) o entradas extraordinarias (**Inyecciones** de capital/colchón).
  * **Al finalizar la jornada:** Se efectúa un **único balance nocturno** contando el dinero final (efectivo físico y digital) para calcular las ventas reales y el fondo acumulado ("El Colchón").

---

## 🧮 2. Lógica Matemática del Backend

El cálculo del cierre se centraliza en el servidor bajo dos fórmulas fundamentales:

### A. Cálculo de Ventas Diarias
$$\text{Ventas} = \text{Dinero Final Total} - \text{Base Inicial} + \text{Total Gastos} - \text{Total Inyecciones}$$

> *Donde $\text{Dinero Final Total} = \text{Efectivo Físico} + \text{Dinero Digital (Nequi/Daviplata)}$*

### B. Nuevo Fondo Acumulado ("El Colchón")
$$\text{Nuevo Colchón} = \text{Colchón Anterior} - \text{Total Inyecciones} + (\text{Dinero Final Total} - \text{Base Siguiente Día})$$

---

## 🛠️ 3. Stack Tecnológico & Arquitectura

Arquitectura desacoplada en **Monorepo Simplificado**:

### Frontend (App Móvil / Web)
* **Framework:** Angular 19+ (Standalone Components).
* **Enfoque:** Mobile-First (optimizado para navegación en celulares).
* **Gestión de Estado & Formularios:** Signals / RxJS, Reactive Forms con validaciones estrictas.
* **Estilos:** Vanilla CSS (Diseño moderno, limpio y adaptable).

### Backend (API REST)
* **Runtime & Framework:** Node.js + NestJS (TypeScript estricto).
* **Arquitectura:** Limpia (SOLID) - Controladores (HTTP), Servicios (Lógica de Negocio), Módulos y DTOs (Data Transfer Objects).
* **ORM:** Prisma ORM 7 (`@prisma/client`).

### Base de Datos & Infraestructura
* **Motor:** PostgreSQL en **Supabase**.
* **Precisión Numérica:** `NUMERIC(12,2)` para evitar errores de redondeo decimal.
* **Integridad:** Restricciones de integridad a nivel de esquema (`CHECK`, `UNIQUE` en fecha operativa) y transacciones ACID.
* **Índices:** B-Tree sobre campos temporales y claves foráneas.

---

## 📁 4. Estructura del Proyecto

```text
Control_Gastos/
 ├── backend/                 # API REST en NestJS
 │    ├── prisma/
 │    │    └── schema.prisma  # Esquema de Prisma introspectado de Supabase
 │    ├── src/
 │    │    ├── prisma/        # PrismaService (Conexión a PostgreSQL)
 │    │    ├── gastos/        # Módulo de Gastos (Controller, Service, DTOs)
 │    │    ├── app.module.ts  # Módulo Raíz (Orquestador)
 │    │    └── main.ts        # Punto de entrada (Puerto 3000)
 │    ├── prisma.config.ts    # Configuración de conexiones de Prisma 7
 │    └── .env                # Variables de entorno (DATABASE_URL / DIRECT_URL)
 │
 ├── frontend/                # Aplicación Angular Mobile-First
 │    ├── src/
 │    │    ├── app/           # Componentes Standalone y Rutas
 │    │    └── main.ts        # Punto de entrada Angular
 │    └── package.json
 │
 └── README.md                # Documentación oficial del proyecto
```

---

## 🚀 5. Comandos Clave (Cheat Sheet)

### Backend (NestJS)
```bash
# Entrar a la carpeta backend
cd backend

# Iniciar servidor en modo desarrollo (Hot Reload)
npm run start:dev

# Introspectar tablas de Supabase (Actualizar schema.prisma)
npx prisma db pull

# Generar cliente TypeScript de Prisma
npx prisma generate
```

### Frontend (Angular)
```bash
# Entrar a la carpeta frontend
cd frontend

# Iniciar servidor de desarrollo en Angular
npm start
# O usando Angular CLI:
ng serve --open
```

---

## 🗺️ 6. Roadmap de Aprendizaje e Implementación

- [x] **Fase 1: Dominio e Ingeniería de Requisitos** (Definición de fórmulas y pagos digitales).
- [x] **Fase 2: Modelo de Datos en Supabase** (`cierres_diarios`, `gastos`, `inyecciones`).
- [x] **Fase 3: Configuración del Monorepo** (NestJS + Angular + Prisma ORM 7).
- [ ] **Fase 4: Backend API REST (NestJS)**
  - [x] Conexión `PrismaService` a Supabase.
  - [x] Creación del recurso `Gastos` (DTOs, Service, Controller).
  - [ ] Creación del recurso `Inyecciones`.
  - [ ] Creación del recurso `CierresDiarios` con cálculo matemático y transacciones ACID.
- [ ] **Fase 5: Frontend Mobile-First (Angular)**
  - [ ] Servicio HTTP para consumir la API.
  - [ ] Formulario rápido de Gastos en Celular.
  - [ ] Formulario rápido de Inyecciones.
  - [ ] Pantalla de Cierre Nocturno con resumen automático.
- [ ] **Fase 6: Despliegue & Monitoreo** (Render/Railway para Backend, Vercel/Netlify para Frontend).