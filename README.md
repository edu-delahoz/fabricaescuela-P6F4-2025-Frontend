# Fabrica Escuela – Proyecto 6 (Feature 4) – Frontend

CourierSync es una plataforma web para optimizar los procesos logísticos de transporte y distribución.

Este repositorio corresponde al **Frontend** de la Feature 4: **Control de Inventario en Tránsito**, cuyo objetivo es monitorear los paquetes en todas las etapas del transporte, minimizando pérdidas y errores mediante una interfaz amigable y eficiente para los usuarios.

Curso
Cloud Comp
Profesor: Juan Pablo Arango Vazques

## 🚀 Tecnologías utilizadas
- **NextJs**  
- **TailwindCSS**  
- **Git & GitHub**  
---

## 👥 Equipo

Este módulo es desarrollado en el marco de la Fábrica Escuela 2025-2.

**Integrantes del equipo:**
- Eduardo de la Hoz (AyD2) - Frontend
- Sarah (AyD2) - Frontend
- Brahian Carrera Rodriguez (Cloud Computing) - Despligue
---

## Informacion sobre el despliegue

Para este sprint se desplegaron dos servicios en render uno para el login y otro para el invetario, el del login tiene endpoitn relacionados a la gestion de la sesion del usuario y demas cuestiones de autenticacion mientras que el de invetario esta protegido y depende del jwt que retorna el servicio de login. 

Además integre los endpoints del backend en el frontend para ya no usar datos quemados en el codigo etc. 

## Preview 

[https://fabricaescuela-p6-f4-2025-frontend.vercel.app/](https://fabricaescuela-p6-f4-2025-frontend-snowy.vercel.app/)
---

Link Importantes:
Aplicación desplegada en Vercel:
[https://fabricaescuela-p6-f4-2025-frontend.vercel.app/](https://fabricaescuela-p6-f4-2025-frontend-snowy.vercel.app/)

Repositorio en GitHub:
https://github.com/BrahianCarrera/fabricaescuela-P6F4-2025-Frontend

Link del servicio de Login en render: 
https://fabricaescuela-p6f4-backend.onrender.com

Link del servicio de inventario en render: 
https://fabricaescuela-p6f4-inventary-service.onrender.com

Pipeline CI-CD
https://github.com/BrahianCarrera/fabricaescuela-P6F4-2025-Frontend/blob/main/.github/workflows/ci-cd.yaml
