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

🔗 [Email](hooriamughal275@gmail.com)

🔗 [GitHub](https://github.com/HooriaMujtaba1)

