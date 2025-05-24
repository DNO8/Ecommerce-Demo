# Ecommerce en desarrollo

**Tienda online en desarrollo para la venta y envío de productos relacionados al arte.**  
Este proyecto está construido con [Lit](https://lit.dev/) y utiliza la pasarela de pago de [Flow](https://www.flow.cl/).

---

##  Características

- ✅ Frontend moderno con **Lit**
- 💳 Integración con **FLOW**
- 📦 Gestión de productos desde archivos JSON
- 🌐 Diseño responsive adaptable a distintos dispositivos
- 📬 Cálculo de envío con **Shipit**

---
## ⚙️ Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/DNO8/Ecommerce.git
   cd Ecommerce
2. Instala las dependencias:

   ```bash
   npm install
3. Inicia el servidor en desarrollo
   ```bash
   npm run start
   Esto abrirá la tienda en http://localhost:8000
4. Inicia el servidor http
   ```bash
   node --watch server.mjs
   Esto abrirá el server en http://localhost:3001

## ⚙️ Configuracion de entorno
Crea un archivo .env en la raíz del proyecto con las credenciales necesarias para Flow y otros servicios:
FLOW_API_KEY=tu_api_key
FLOW_API_SECRET=tu_codigo_de SECRET
SHIPIT_ACCOUNT_EMAIL=tu correo en shipit
SHIPIT_ACCOUNT_TOKEN=tu token en shipit

## Dependencias Principales

Dependencias principales
lit

page.js para enrutamiento SPA

Shipit para cálculo de envíos

Flow como pasarela de pago

## Pensamientos acerca del proyecto
Tengo 3 meses trabajando en este proyecto a la fecha subida de este readme, lo que me hace pensar en lo completo que puede llegar a ser una web como esta,
aun tengo muchas cosas por trabajar en este proyecto y no paran de salir nuevos cambios para poder hacerle y que quede mejor segun mi criterio, 
al principio pensaba en hacer el front-end simplemente de la página pero con el tiempo empecé a entusiasmarme en que funcione completamente la web,
asi que comencé a investigar y aprender mas sobre backend, manejo de rutas, arquitectura como MVC y validaciones con zod, comencé a aplicar lo aprendido
sobre JavaScript y ademas de acudir a la ayuda de la IA en caso de ser necesario, normalmente intento hacerlo yo lo mas que puedo antes de recurrir a la IA,
aunque no siempre me genere lo que busco es muy rapido aprender e implementar siguiendo las ideas que da, se que no es bueno mostrar un proyecto en desarrollo pero
mis avances tengo que mostrarlos de alguna manera y siento que esta es las mas genuina , quiza, de mostrar en lo que gasto mi tiempo.


adjuntos algunas capturas de la web hasta el momento.

![Captura de pantalla 2025-05-20 095331](https://github.com/user-attachments/assets/e96fa2b0-8c35-436a-9acb-07433e1155a0)
![Captura de pantalla 2025-05-20 094536](https://github.com/user-attachments/assets/b6c8fb9d-cf72-4cef-8b77-a0b1c1488dc6)
![Captura de pantalla 2025-05-20 094453](https://github.com/user-attachments/assets/b68b2b59-60f5-4480-b9c2-2c2e36825663)
![Captura de pantalla 2025-05-20 094427](https://github.com/user-attachments/assets/7cd66900-752d-45b5-9775-6be9757755d8)
