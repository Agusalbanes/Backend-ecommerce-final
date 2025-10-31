AUTH/REGISTER
POST http://localhost:3000/api/auth/register

{
  "name": "juan",
  "lastName": "perez", 
  "email": "jperez@test.com",
  "age": 25,
  "password": "Juan123"
}

para admin
{
  "name": "rosa",
  "lastName": "perez",
  "email": "rperez@test.com", 
  "age": 30,
  "password": "Rosa123",
  "role": "admin"
}

AUTH/LOGIN
POST {{base_url}}/api/auth/login

{
  "email": "rperez@test.com",
  "password": "Rosa123"
}

CATEGORY

GET {{base_url}}/api/category

PROBAR RUTAS PROTEGIDAS SIN TOKEN (debe fallar)
POST {{base_url}}/api/category

{
  "name": "Electrónicos"
}

POST {{base_url}}/api/category
Content-Type: application/json
Authorization: Bearer {{admin_token}}
{
  "name": "Electrónicos"
}

ACTUALIZAR CATEGORÍA (solo admin)
PUT http://localhost:3000/api/category/:id
Content-Type: application/json
Authorization: Bearer {{admin_token}}
{
    "name": "Electronico"
}

Eliminar categoría (solo admin)
DELETE {{base_url}}/api/category/id
Authorization: Bearer {{admin_token}}

Obtener todos los productos (público)
GET {{base_url}}/api/product

Crear producto (solo admin)
POST {{base_url}}/api/product
Content-Type: application/json
Authorization: Bearer {{admin_token}}
{
  "name": "Laptop Gaming",
  "description": "Laptop para gaming de alta gama",
  "price": 150000,
  "stock": 10,
  "category": "{{category_id}}"
}

Buscar por nombre:
GET {{base_url}}/api/product/name?name=zapatillas

Actualizar producto:
PUT {{base_url}}/api/product/:id

Obtener status:
GET {{base_url}}/api/product/status

Eliminar un producto:
DELETE {{base_url}}/api/product/:id

CART/GET
GET {{base_url}}/api/cart

CART/POST
POST {{base_url}}/api/cart/add
Authorization: Bearer {{user_token}}
{
  "productId": "{{product_id}}",
  "quantity": 2
}

CART/PUT
ACTUALIZAR CANTIDAD EN CARRITO
PUT {{base_url}}/api/cart/update
Authorization: Bearer {{user_token}}
{
  "productId": "{{product_id}}",
  "quantity": 5
}

CART/DELETE
ELIMINAR PRODUCTO DEL CARRITO
DELETE {{base_url}}/api/cart/remove
Authorization: Bearer {{user_token}}
{
  "productId": "{{product_id}}"
}

LIMPIAR CARRITO COMPLETO
DELETE {{base_url}}/api/cart/clear
Authorization: Bearer {{user_token}}


RESTABLECIMIENTO DE CONTRASEÑA
POST {{base_url}}/api/auth/forgot-password
Content-Type: application/json
{
  "email": "rperez@test.com"
}

POST {{base_url}}/api/auth/reset-password
Content-Type: application/json
{
  "token": "token_que_recibiste_en_la_respuesta_anterior",
  "newPassword": "NuevaContraseña123"
}

VERIFICAR QUE FUNCIONA
POST {{base_url}}/auth/login
Content-Type: application/json
{
  "email": "rperez@test.com",
  "password": "NuevaContraseña123"
}