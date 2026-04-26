# Donor Report Dashboard: Prototype

A full-stack web application designed for the **Greater Kansas City Community Foundation**. This tool allows staff to manage donor records, search through donor data instantly, and maintain data integrity using a professional-grade tech stack.

## 🚀 Features
* **Full CRUD Functionality:** Create, Read, and Delete donor records.
* **Real-time Search:** Instant filtering of donor data by name or email.
* **Data Integrity:** Frontend email validation and Backend PostgreSQL unique constraints.
* **Containerized Architecture:** Fully Dockerized for consistent deployment across environments.

## 🛠 Tech Stack
* **Frontend:** React (Vite), Axios, CSS3
* **Backend:** Python, Flask, SQLAlchemy
* **Database:** PostgreSQL
* **Infrastructure:** Docker, Docker Compose

## 📦 Local Setup

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd donor-report-dashboard
2. **Start the Backend & Database (Docker):**
   docker-compose up --build
3. **Start the Frontend:**
   # In a new terminal
    cd frontend
    npm install
    npm run dev
4. **Access the App:**
    Open http://localhost:5173 in your browser.

by Keerthana 