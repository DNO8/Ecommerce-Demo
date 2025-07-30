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
[Screenshot 1](https://github.com/user-attachments/assets/36972988-ae61-4505-a077-5290259269ba)
[Screenshot 2](https://github.com/user-attachments/assets/6490b495-929d-45ad-b65f-87825c6afc27)
[Screenshot 3](https://github.com/user-attachments/assets/1240380a-0e3d-4907-95aa-e0851479e2a4)
[Screenshot 4](https://github.com/user-attachments/assets/7536ed37-e08f-4b79-89cd-543242d7ff96)
