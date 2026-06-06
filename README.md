# 🚆 Book-My-Rail: Full-Stack Rail Ticket Booking System

![Node.js CI](https://github.com/prashaanth2003/Book-My-Rail/actions/workflows/node.js.yml/badge.svg)

Book-My-Rail is a robust, full-stack railway ticketing application built using **React** for a responsive user interface, **Node.js & Express** for the backend APIs, and **MySQL** for relational database storage and transactional integrity.

---

## 📂 Repository Directory Structure

```text
├── db/                   # Database scripts and initialization
│   └── create.sql        # Full database schema and seed data for MySQL
├── node/                 # Backend Node.js / Express Server
│   ├── db_connect.js     # MySQL connection configuration
│   └── server.js         # API server, controllers, and routing
├── rail-app/             # Frontend React Client
│   ├── public/           # Static assets and index.html
│   ├── src/              # React components, styles, and hooks
│   ├── package.json      # React dependencies and scripts
│   └── README.md         # React-specific user guide
├── package.json          # Root-level Node backend configuration
└── README.md             # Master documentation guide
```

---

## 🛠️ Technology Stack

- **Frontend**: React (with FontAwesome icons and responsive CSS layout)
- **Backend**: Node.js, Express.js (supporting CORS, JSON parsing, routing)
- **Database**: MySQL (relational database using the `mysql2` client driver)
- **Server Utility**: `nodemon` for auto-reloading during backend development

---

## 🚀 Step-by-Step Setup Guide

### 1. Database Setup (MySQL)
Ensure you have a running MySQL instance. 
Create your database schema using the provided SQL script:

```bash
# Connect to your local MySQL instance
mysql -u your_username -p

# Inside MySQL prompt or client tool, create a new database
CREATE DATABASE book_my_rail;
USE book_my_rail;

# Import the schema and seed data
SOURCE db/create.sql;
```

### 2. Backend Server Configuration
1. Navigate to the root directory where the backend `package.json` is located:
   ```bash
   npm install
   ```
2. Configure your MySQL credentials in `node/db_connect.js`:
   - Host (e.g., `localhost`)
   - Username (e.g., `root`)
   - Password (your mysql password)
   - Database (`book_my_rail`)
3. Launch the Express API server:
   ```bash
   # Using development hot-reload
   npm run dev
   
   # Or starting normally
   npm start
   ```
   *The server runs by default on port `5000` or the port configured in `server.js`.*

### 3. Frontend React App Configuration
1. Navigate to the `rail-app` directory:
   ```bash
   cd rail-app
   ```
2. Install the React frontend dependencies:
   ```bash
   npm install
   ```
3. Launch the React development web client:
   ```bash
   npm start
   ```
   *The client runs on `http://localhost:3000`.*

---

## ✨ Features

- **🚂 Interactive Train Search**: Query available trains based on source, destination, and booking dates.
- **💳 Real-time Ticket Booking**: Reserve berths and seats with unique transaction reference generation.
- **📄 Relational Integrity**: Secure transactional processing for passenger bookings, ticket cancellations, and inventory checking.
- **🖥️ Gorgeous Responsive UI**: Built with modern CSS grids, flexboxes, and FontAwesome interactive elements.

---

## 📄 License
This project is licensed under the **ISC License**. Feel free to use, modify, and distribute as needed.


## 🛠️ Maintenance & Refactoring Log

- **Date**: June 6, 2026
- **Updates**: Configured an automated GitHub Actions CI/CD pipeline (`node.js.yml`) to run dependency installations, builds, and automated tests across multiple Node.js LTS versions (v18, v20, and v22) on push or pull requests to improve overall codebase stability.


- **Date**: May 31, 2026
- **Updates**: Performed routine maintenance, verified compatibility with Python 3.12, cleaned up whitespace, and updated dependency guidelines.
