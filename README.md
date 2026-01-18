# Employee Management System

A full-stack **Employee Management CRUD Application** built using  
**Angular 20 (Standalone Components)**, **Node.js (Express + TypeScript)**, and **MySQL**, following clean architecture, best practices, and professional coding standards.

---

## 📌 Features

### Employee Management
- Create, Read, Update, Delete (CRUD) employees
- Search employees by name
- Department selection via dropdown
- Client-side and server-side validation
- Centralized error handling

### Dashboard & Analytics
- Total employee count
- Department-wise employee distribution
- Pie chart visualization using Chart.js
- Optimized single API call for analytics

### Technical Highlights
- Angular 20 standalone architecture
- Lazy-loaded routes
- Reactive forms with validation
- Global HTTP error interceptor
- TypeScript throughout backend & frontend
- Secure backend validation (never trust frontend alone)

---

## 🛠 Tech Stack

### Frontend
- Angular 20 (Standalone Components)
- TypeScript
- Bootstrap 4
- Chart.js
- ngx-toastr
- RxJS

### Backend
- Node.js
- Express.js
- TypeScript
- MySQL
- RESTful APIs

---


---

## 🔗 API Endpoints

| Method | Endpoint | Description |
|------|---------|------------|
| POST | `/api/employee/create` | Create employee |
| GET | `/api/employee` | Get all employees |
| GET | `/api/employee/:id` | Get employee by ID |
| PUT | `/api/employee/:id` | Update employee |
| DELETE | `/api/employee/:id` | Delete employee |
| DELETE | `/api/employee` | Delete all employees |
| GET | `/api/employee?name=keyword` | Search by name |

---

## 🧪 Validation Strategy

### Frontend Validation
- Required fields
- Email format validation
- Name pattern (letters & spaces only)
- Minimum length checks

### Backend Validation
- Request body validation middleware
- Regex-based name validation
- Allowed department enforcement
- Salary numeric and positive check

> **Note:** Backend validation is mandatory even if frontend validation exists.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or v20 recommended)
- Angular CLI
- MySQL

---

### Backend Setup

```bash
cd backend
npm install
npm run dev

Backend
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=employee_db

