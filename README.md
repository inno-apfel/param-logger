<div align="center">
  <br><br>
  <img src="https://www.svgrepo.com/show/216069/coral.svg" alt="Logo" width="200">
  <br><br>
</div>

# Overview

Web-first tank-management dashboard for aquarium and reef tank enthusiasts, enabling them to log, visualize, and monitor key water parameters such as calcium, alkalinity, magnesium, nitrate, and phosphate. Users can track trends over time, manage recurring maintenance tasks, and maintain a healthy aquarium with a clean, intuitive interface designed for ease of use across devices.

## Features

- 🧪 Track essential water parameters (Ca, Alk, Mg, NO₃, PO₄, etc.)
- 📈 Visualize trends with interactive charts
- 🗓️ Schedule and track recuring
- 🌐 Web-first design to be accessible across devices  
- 🎨 Minimalist, clutter-free interface for ease of use


## Documentation

#### Tech Stack

- **Frontend:** React / TailwindCSS
- **Backend:** Node.js / Express / PostgreSQL

#### Project Folder Structure

```
.
└── .
    ├── client/                     # Frontend React app
    │   ├── public/         
    │   └── src/            
    │       ├── components/   
    │       │   ├── ui/             # Shadcn UI components
    │       │   ├── tiptap-*        # Tiptap UI components
    │       │   └── ...             # Common UI components
    │       ├── context/      
    │       ├── pages/              # Page components (landing, login, dashboard)
    │       ├── router/             # SPA route definitions
    │       ├── hooks/        
    │       ├── utils/
    │       ├── lib/        
    │       ├── types/
    │       ├── styles/             # Tiptap scss files
    │       ├── assets/       
    │       ├── index.css
    │       └── main.tsx            # Main client entry point
    ├── server/                     # Backend Express API
    │   ├── docs/                   # Swagger API docs
    │   ├── tests/
    │   ├── prisma/                 # PrismaORM config and database schema
    │   └── src/
    │       ├── config/             # Configuration (e.g., passport auth)
    │       ├── db/                 # Prisma and S3 access setup
    │       ├── routes/             # API route definitions
    │       ├── controllers/    
    │       ├── services/       
    │       ├── middlewares/
    │       ├── utils/    
    │       └── errors/
    └── docs/                       # Project-level documentation and assets               
```

#### AWS Architecture Diagram

<div align="center">
  <img src="docs/assets/param_logger_aws.png" alt="Logo" width="100%">
</div>