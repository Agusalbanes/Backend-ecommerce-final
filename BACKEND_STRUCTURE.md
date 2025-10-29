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