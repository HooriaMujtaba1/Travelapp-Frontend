## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

# ✈️ Travel App – Listings & Bookings API

A Django REST Framework-based API to manage **listings** and **bookings**, including user authentication, media uploads, and email-based password reset functionality.


---

## 🚀 Features

- 🔐 User Registration & Login
- 📅 Book Listings by Date Range
- 📩 Password Reset via Email
- 🖼️ Media File Uploads for Listings
- 🛠️ Admin Dashboard
- ⚙️ Clean REST API built with Django REST Framework
- 🏘️ Create/View/ Listings

---

## 🔗 API Endpoints

Here are some of the key endpoints you can interact with:

### 📄 Listings

| Method | Endpoint                   | Description                    |
|--------|----------------------------|--------------------------------|
| GET    | `/api/listings/`           | Get all listings               |
| GET    | `/api/listings/<id>/`      | Retrieve a single listing      |
| POST   | `/admin/listings/`         | Create a new listing           |

### 📝 Bookings

| Method | Endpoint                   | Description                    |
|--------|----------------------------|--------------------------------|
| GET    | `/api/bookings/`           | View all bookings              |
| POST   | `/api/bookings/`           | Create a booking               |

### 👤 User Authentication

| Method | Endpoint                      | Description                    |
|--------|-------------------------------|--------------------------------|
| POST   | `/api/auth/register/`         | Register a new user            |
| POST   | `/api/token/`                 | Login and receive token        |
| POST   | `/api/auth/logout/`           | Logout and invalidate token    |

### 🔑 Password Reset (via email)

| Method | Endpoint                                  | Description                          |
|--------|-------------------------------------------|--------------------------------------|
| POST   | `/api/password_reset/`                    | Request a password reset email       |
| POST   | `/api/password_reset/confirm/`            | Confirm and set a new password       |

---

## 🧪 Setup Instructions

### ✅ Prerequisites

- Python 3.10+
- Git
- Virtual environment (recommended)
- Django & DRF installed

---

### 📦 Installation

```bash
# Clone the repository
git clone https://github.com/HooriaMujtaba1/travel-app.git
cd listings_project

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Apply migrations
python manage.py makemigrations
python manage.py migrate

# Create superuser (for admin access)
python manage.py createsuperuser

# Run development server
python manage.py runserver

```
---

## 🙋‍♀️ Author

Hooria Mujtaba

🔗 [GitHub](https://github.com/HooriaMujtaba1)

>>>>>>> 9479cba62ece9ff5243112dc6eef656e6eb78076
