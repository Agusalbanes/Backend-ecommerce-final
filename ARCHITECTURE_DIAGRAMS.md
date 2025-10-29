┌─────────────────┐      ┌─────────────────┐
│     USUARIOS    │      │    CARRITOS     │
├─────────────────┤      ├─────────────────┤
│ _id (PK)        │1   1│ _id (PK)        │
│ name           │─────││ user_id (FK)   │
│ lastname       │      │ total          │
│ email          │      │ created_at     │
│ password       │      │ updated_at     │
│ age            │      └─────────────────┘
│ role           │              1 │
│ created_at     │                │
│ updated_at     │                │
└─────────────────┘               │
        1│                        │
         │                        │
         │                       *│
         │              ┌─────────|
         │              │                    
        1│             *│                    
         │      ┌─────────────────┐         
         │      │ ITEMS_CARRITO   │         
         └─────▶├─────────────────┤         
               *│ _id (PK)        │         
                │ cart_id (FK)    │         
                │ product_id (FK) │         
                │ quantity        │         
                │ price           │         
                │ created_at      │         
                └─────────────────┘         
                         │                  
                        1│                  
                         │                  
                         │                  
                ┌────────┴─────────┐        
                │                  │        
               *│                  │1       
        ┌─────────────────┐        │        
        │    PRODUCTOS    │        │        
        ├─────────────────┤        │        
        │ _id (PK)        │◄───────┘        
        │ name           │                                                       │ description    │                 
        │ price          │                 
        │ stock          │                 
        │ category_id (FK)│                
        │ image          │                
        │ created_at     │                
        │ updated_at     │                
        └─────────────────┘                
                1│                         
                 │                         
                 │                         
                *│                         
                 │                         
        ┌────────┴─────────┐               
        │                  │               
        │                  │1              
┌─────────────────┐        │                                                 CATEGORÍAS        │        │               
├─────────────────┤        │               
│ _id (PK)        │◄───────┘               
│ name           │                       
│ description    │                       
│ created_at     │                       
│ updated_at     │                        
└─────────────────┘                        
