# 🛍️ Backend E-commerce

Este repositorio contiene el backend para un e-commerce.

## 📦 Tecnologías utilizadas

- **Node.js**  
- **Express.js** para manejar rutas y lógica del servidor  
- **MongoDB**   
- **Mongoose** 
- **Dotenv**
- **bcrypt** para hasheo de contraseñas 
- **cors**  para permitir conexiones del frontend 
- **nodemon**
- Variables de entorno (`.env`) para configuración de datos sensibles 
- Configuración modular (uso de `config.js`, `db.js`, etc.)

## 📁 Estructura del Proyecto

📁 proyecto-backend
├── 📁 src
│   ├── 📁 controllers          
│   │   ├── 📄 authController.js
│   │   └── 📄 cartController.js
│   │   ├── 📄 categoryController.js
│   │   └── 📄 productController.js
│   │   ├── 📄 userController.js
│   ├── 📁 middlewares          
│   │   ├── 📄 adminMiddleware.js
│   │   └── 📄 authMiddleware.js
│   │   └── 📄 errorMiddleware.js
│   ├── 📁 models              
│   │   ├── 📄 cartModel.js
│   │   └── 📄 categoryModel.js
│   │   ├── 📄 productModel.js
│   │   └── 📄 resetTokenModel.js
│   │   ├── 📄 userModel.js
│   ├── 📁 routes               
│   │   ├── 📄 authRoute.js
│   │   └── 📄 cartRoute.js
│   │   ├── 📄 categoryRoute.js
│   │   └── 📄 productRoute.js
│   │   ├── 📄 userRoute.js
│   ├── 📁 services           
│   │   └── 📄 cartService.js
│   │   ├── 📄 categoryService.js
│   │   └── 📄 productService.js
│   │   ├── 📄 userService.js
│   ├── 📁 utils                
│   │   ├── 📄 generateToken.js
│   │   └── 📄 userHelpers.js
│   │   ├── 📄 validators.js
│   │   └── 📄 verifyToken.js 
├──    .env   
├── 🔧 .env.example  
└── 🔧 .gitignore 
└──     config.js
└──     db.js
└──     index.js   
├── 📦 package-lock.json
├── 📦 package.json         
├── 📄 README.md             

## 🔍 Modelos (Entidades)

- **User**: usuario del sistema (con campos  `email`, `password`, `role`)  
- **Product**: productos que se venden (nombre, precio, descripción, stock)  
- **Cart (Carrito)**: para manejar los items que el usuario quiere comprar  
- **Category**: categorías de productos

## 🚀 Funcionalidades clave

Algunas de las funcionalidades principales 

- Registro y autenticación de usuarios  
- Gestión de productos (CRUD)  
- Manejo del carrito de compras   
- Validación de datos a través de rutas protegidas  
- Configuración de ambiente a través de variables de entorno  

## 🌐 Endpoints y Verbos HTTP

| Endpoint | Verbo HTTP | Descripción |
|---|---|---|
| `POST /api/auth/register` | `POST` | Registrar un nuevo usuario |
| `POST /api/auth/login` | `POST` | Login de usuario |
| `GET /api/products` | `GET` | Obtener lista de productos |
| `GET /api/products/:id` | `GET` | Obtener detalle de un producto |
| `POST /api/products` | `POST` | Crear un nuevo producto |
| `PUT /api/products/:id` | `PUT` | Actualizar un producto |
| `DELETE /api/products/:id` | `DELETE` | Eliminar un producto |
| `GET /api/cart` | `GET` | Ver el carrito del usuario |
| `POST /api/cart/add` | `POST` | Agregar un ítem al carrito |
| `PUT /api/cart/update` | `PUT` | Actualizar cantidad de un ítem en el carrito |
| `DELETE /api/cart/remove` | `DELETE` | Remover un ítem del carrito |


## 🧱 Arquitectura

- La app está modularizada: separación entre configuración (`config.js`), conexión DB (`db.js`), y lógica de servidor (`index.js` + rutas / controladores).  
- Uso de variables de entorno para mayor seguridad y flexibilidad.  


## ✅ Cómo correr el proyecto localmente

1. Hacer `git clone` del repositorio  
2. Instalar dependencias con `npm install` 
3. Crear un archivo `.env` basado en `.env.example` (llenar variables como URL de DB, puerto, etc.)  
4. Levantar el servidor con `npm run dev` (o el comando que uses)  
5. Usar herramientas como Postman o Thunder Client para probar los endpoints

## 🛠️ Posibles mejoras / ToDo
 
- Agregar validaciones y manejo de errores más robusto.    
- Tests para endpoints.  
- Integración con pasarela de pagos (Stripe, PayPal) si se planea producción.    



