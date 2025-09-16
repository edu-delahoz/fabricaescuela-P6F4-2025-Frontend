# Fabrica Escuela – Proyecto 6 (Feature 4) – Frontend

CourierSync es una plataforma web para optimizar los procesos logísticos de transporte y distribución.

Este repositorio corresponde al **Frontend** de la Feature 4: **Control de Inventario en Tránsito**, cuyo objetivo es monitorear los paquetes en todas las etapas del transporte, minimizando pérdidas y errores mediante una interfaz amigable y eficiente para los usuarios.

---

## 🚀 Tecnologías utilizadas

- **NextJs**  
- **TailwindCSS**  
- **Git & GitHub**  

---

## 🔀 Estrategia de ramas

El flujo colaborativo del proyecto se basa en una estrategia simplificada inspirada en Git Flow:

- **main** → Rama estable con el código listo para entrega o demos.
- **develop** → Rama de integración donde se fusionan las historias de usuario (HU) desarrolladas en el frontend.
- **hu/**... → Ramas individuales para cada historia de usuario.
- **feature/**... → Ramas para componentes reutilizables o funcionalidades generales.
- **hotfix/**... → Ramas para correcciones urgentes directamente en main.

**Ejemplos de ramas:**
- `hu/rastreo-envio-cliente`
- `hu/gestion-estado-paquetes`
- `hu/interfaz-consulta-informacion`
- `feature/componentes-base`
- `feature/navegacion-principal`
- `hotfix/correccion-bug-rastreo`

**Buenas prácticas:**
- Cada integrante trabaja en su propia rama `hu/...` y realiza un Pull Request hacia `develop`.
- Las ramas `feature/...` se utilizan para funcionalidades generales que serán usadas en varias HU (ej: componentes base, navegación principal).
- Los hotfix se aplican sobre main y luego se fusionan en develop.
- Al finalizar el sprint, **develop** se integra en **main**.

---

## 📦 Estructura del proyecto

```
app/                # Vistas principales y rutas Next.js (pages, layouts, templates)
components/         # Componentes reutilizables
hooks/              # Custom hooks
lib/                # Funciones utilitarias y lógica compartida
public/             # Archivos estáticos (imágenes, favicon, etc)
styles/             # Archivos de estilos globales (Tailwind, CSS)
components.json     # Configuración de componentes
next.config.mjs     # Configuración de Next.js
package.json        # Dependencias y scripts del proyecto
postcss.config.mjs  # Configuración de PostCSS
tsconfig.json       # Configuración de TypeScript
```

---

## 🛠 Instalación y ejecución

1. Clona el repositorio:  
   `git clone https://github.com/edu-delahoz/fabricaescuela-P6F4-2025-Frontend.git`
2. Instala las dependencias:  
   `npm install`
3. Ejecuta el proyecto en modo desarrollo:  
   `npm run dev`


---

## 👥 Equipo

Este módulo es desarrollado en el marco de la Fábrica Escuela 2025-2.

**Integrantes del equipo:**
- Eduardo de la Hoz
- Sarah
---

## Preview 

https://fabricaescuela-p6-f4-2025-frontend.vercel.app/
---

## 📄 Licencia

Este proyecto es de uso académico y colaborativo en el marco de la Fábrica Escuela.
