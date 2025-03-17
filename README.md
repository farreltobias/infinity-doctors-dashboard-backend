## **Infinity Doctors Dashboard - Documentation Guide**

### **1. Description**
The **Infinity Doctors Dashboard** is an information panel designed to help doctors access relevant data efficiently. Built using **Domain-Driven Design (DDD)** and **NestJS**, the project consists of multiple domains, including the **system domain**, which manages authentication and admin/owner retrieval. Additionally, the project generates multiple **Parquet** files from structured data to be used in **PowerBI**, enabling advanced data visualization and analytics.

---

### **2. How to Run the Project**

#### **Prerequisites**
Ensure you have the following installed:
- **Node.js** (Latest LTS version recommended)
- **Pnpm**
- **Docker & Docker Compose** (if using a containerized database)
- **MongoDB Compass or another mongo view**

#### **Installation Steps**
1. **Clone the repository**
   ```bash
   git clone https://github.com/your-repo/dashboard-backend.git
   cd dashboard-backend
   ```

2. **Install dependencies**
   ```bash
   pnpm i
   ```

3. **Set up environment variables**
   ```bash
   pnpm setup
   ```
   or
- Create a .env file in the root directory.
- Configure the necessary database credentials and application settings.

4. **Initialize the database**
   ```bash
   pnpm db:init
   ```

5. **Run the application**
   ```bash
   pnpm start:dev
   ```
   The server will start on `http://localhost:3333`, or with the seted port.

6. **Run with Docker (Optional)**  
   If you prefer running the project with Docker, use:
   ```bash
   pnpm docker:up
   ```

---

### **3. How Does It Work?**

#### **System Domain (Authentication & User Management)**
The **system domain** handles:
- **Admin/Owner login** (Authentication with JWT)
- **Fetching admin/owner details by ID**

Endpoints:
- `POST /sessions` → Logs in an admin/owner and returns a token.
- `GET /users/:id` → Fetches details of an admin or owner by their ID.

#### **Parquet File Generation**
- The system extracts and structures data, then generates **Parquet** files.
- These files are optimized for **PowerBI**, ensuring efficient large-scale data processing.
- A background process schedules and automates the generation of these files.

---

### **4. More Information**

- **Stack**: NestJS, Mongo, Docker
- **Architecture**: Domain-Driven Design (DDD)
- **Authentication**: JWT-based authentication
- **Data Handling**: Optimized for Parquet file generation

For further details, please refer to the internal documentation or contact the development team. 🚀