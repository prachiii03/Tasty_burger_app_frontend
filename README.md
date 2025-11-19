 🍔 Tasty Burger - Food Delivery Application

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) food delivery application with integrated PhonePe payment gateway, real-time order tracking, and comprehensive admin dashboard.

---

 

📋 Table of Contents

Features
Tech Stack
Prerequisites
Installation Guide
Running the Application
Project Structure
Environment Variables
Default Credentials
API Endpoints
Troubleshooting

---

 ✨ Features

 🛒 **Customer Features**
- User registration and authentication with JWT
- Browse menu with product categories
- Product detail page with image gallery and reviews
- Shopping cart with quantity management
- Add to wishlist functionality
- Secure checkout process
- Multiple payment options (PhonePe, Cash on Delivery)
- Real-time order tracking
- Order history in user dashboard
- Manage delivery addresses
- User profile management

👨‍💼 **Admin Features**
- Admin dashboard with statistics
- Product management (Create, Read, Update, Delete)
- Order management with status updates
- User management
- Real-time order status updates visible to customers
- Image upload for products

 💳 **Payment Integration**
- PhonePe payment gateway integration (Sandbox)
- Real-time payment verification
- Cash on Delivery option
- Payment status tracking

 🎨 **Additional Features**
- Responsive design (Mobile, Tablet, Desktop)
- Product search and filtering
- Star rating system
- Breadcrumb navigation
- Toast notifications
- Loading states and error handling
- Image galleries with thumbnails
- Related products section

---

 🛠️ Tech Stack

### **Frontend**
- **React.js** - UI library
- **React Router DOM** - Client-side routing
- **React Bootstrap** - UI components
- **Bootstrap 5** - CSS framework
- **React Icons** - Icon library
- **React Toastify** - Notifications
- **Axios** - HTTP client
- **Context API** - State management

 **Backend**
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Bcrypt.js** - Password hashing
- **Multer** - File uploads
- **CORS** - Cross-origin resource sharing
- **Crypto** - PhonePe checksum generation

 **Payment Gateway**
- **PhonePe Payment Gateway** (Sandbox mode)

---

 📦 Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js** (v14.0.0 or higher) - 
- **npm** (v6.0.0 or higher) - Comes with Node.js
- **MongoDB** (v4.0 or higher) - 
- **Git** 
- **Code Editor** (VS Code recommended)

 Verify Installation:
```bash
node --version
npm --version
mongo --version
git --version
```

---

 📥 Installation Guide

 **Step 1: Clone or Extract the Project**

If you have the ZIP file:
```bash
# Extract the ZIP file to your desired location
# Open terminal/command prompt in the extracted folder
cd tasty-burger-food-delivery
```

Or clone from repository:
```bash
git clone <repository-url>
cd tasty-burger-food-delivery
```

 **Step 2: Install Backend Dependencies**

```bash
# Navigate to backend folder
cd backend

# Install all dependencies
npm install

# This will install:
# - express
# - mongoose
# - bcryptjs
# - jsonwebtoken
# - cors
# - dotenv
# - multer
# - express-async-handler
# - axios
# - crypto
```

 **Step 3: Install Frontend Dependencies**

```bash
# Navigate to frontend folder (from root)
cd ../frontend

# Install all dependencies
npm install

# This will install:
# - react
# - react-dom
# - react-router-dom
# - react-bootstrap
# - bootstrap
# - react-icons
# - react-toastify
# - axios
```

 **Step 4: Setup MongoDB Database**

1. **Start MongoDB Service:**

   **Windows:**
   ```bash
   # MongoDB should start automatically
   # Or run as Administrator:
   net start MongoDB
   ```

   **macOS:**
   ```bash
   brew services start mongodb-community
   ```

   **Linux:**
   ```bash
   sudo systemctl start mongod
   sudo systemctl enable mongod
   ```

2. **Verify MongoDB is Running:**
   ```bash
   mongo --eval "db.version()"
   ```

3. **The application will automatically create the database on first run**

### **Step 5: Configure Environment Variables**

#### **Backend Configuration:**

Create a `.env` file in the `backend` folder:

```bash
cd backend
touch .env  # On Windows: type nul > .env
```

Add the following content to `backend/.env`:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/food-delivery

# JWT Secret (Change this to a random string)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Frontend URL
FRONTEND_URL=http://localhost:3000

# Backend URL
BACKEND_URL=http://localhost:5000

# PhonePe Payment Gateway (Sandbox)
PHONEPE_MERCHANT_ID=PGTESTPAYUAT
PHONEPE_SALT=099eb0cd-02cf-4e2a-8aca-3e6c6aff0399
PHONEPE_KEY_INDEX=1
PHONEPE_BASE_URL=https://api-preprod.phonepe.com/apis/pg-sandbox
```

#### **Frontend Configuration:**

Create a `.env` file in the `frontend` folder:

```bash
cd ../frontend
touch .env  # On Windows: type nul > .env
```

Add the following content to `frontend/.env`:

```env
# Backend API URL
REACT_APP_API_URL=http://localhost:5000
```

 **Step 6: Create Uploads Folder**

The application needs an uploads folder for product images:

```bash
# In backend folder
cd backend
mkdir uploads

# On Windows:
# md uploads
```

 **Step 7: Seed Initial Data (Optional)**

For testing, you can create an admin account manually:

**Option A: Using MongoDB Compass**
1. Open MongoDB Compass
2. Connect to `mongodb://localhost:27017`
3. Create database: `food-delivery`
4. Create collection: `users`
5. Insert admin user:

```json
{
  "name": "Admin",
  "email": "admin@tastyburger.com",
  "password": "$2a$10$abc123...", 
  "role": "admin",
  "phone": "1234567890",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

**Option B: Register through UI**
1. Start the application
2. Register a new user
3. Go to MongoDB and change the user's role to "admin"

---

## 🚀 Running the Application

### **Step 1: Start MongoDB**

Make sure MongoDB is running:

```bash
# Check MongoDB status
mongo --eval "db.version()"

# If not running, start it:
# Windows: net start MongoDB
# macOS: brew services start mongodb-community
# Linux: sudo systemctl start mongod
```

### **Step 2: Start Backend Server**

Open a terminal in the `backend` folder:

```bash
cd backend
npm start
```

You should see:
```
🚀 Server running on port 5000
✅ MongoDB Connected: localhost
```

**Keep this terminal running!**

### **Step 3: Start Frontend Development Server**

Open a NEW terminal in the `frontend` folder:

```bash
cd frontend
npm start
```

You should see:
```
Compiled successfully!
Local:   http://localhost:3000
```

**Keep this terminal running too!**

### **Step 4: Access the Application**

Open your browser and navigate to:
```
http://localhost:3000
```

---



## 🔐 Default Credentials

### **Admin Account**
After starting the application, create an admin account:

1. Register a new user at: `http://localhost:3000/register`
2. Use MongoDB Compass to change the user's role to "admin":
   - Connect to `mongodb://localhost:27017`
   - Database: `food-delivery`
   - Collection: `users`
   - Find your user and edit: `role: "admin"`
3. Login with your credentials

**Or** create directly in MongoDB:
```json
{
  "name": "Admin User",
  "email": "admin@tastyburger.com",
  "password": "$2a$10$XQjZ5K1YQ3Y5X5X5X5X5Xe5X5X5X5X5X5X5X5X5X5X5X5X5",
  "role": "admin",
  "phone": "1234567890"
}
```
Password: `admin123` (You'll need to hash it properly)

### **Test User Account**
- Email: `user@test.com`
- Password: `password123`

---

## 🔗 API Endpoints

### **Authentication**
```
POST   /auth/register          - Register new user
POST   /auth/login            - Login user
GET    /auth/profile          - Get user profile
```

### **Products**
```
GET    /products              - Get all products
GET    /products/:id          - Get single product
POST   /products              - Create product (Admin)
PUT    /products/:id          - Update product (Admin)
DELETE /products/:id          - Delete product (Admin)
```

### **Cart**
```
GET    /cart                  - Get user cart
POST   /cart                  - Add to cart
POST   /cart/remove           - Remove from cart
POST   /cart/clear            - Clear cart
```

### **Orders**
```
GET    /orders                - Get user orders
GET    /orders/:id            - Get single order
POST   /orders                - Create new order
```

### **Admin**
```
GET    /admin/orders          - Get all orders
PUT    /admin/orders/:id      - Update order status
GET    /admin/users           - Get all users
```

### **User Dashboard**
```
GET    /user/dashboard/overview  - Dashboard stats
GET    /user/profile             - Get profile
PUT    /user/profile             - Update profile
GET    /user/orders              - Get orders (paginated)
GET    /user/wishlist            - Get wishlist
POST   /user/wishlist            - Add to wishlist
DELETE /user/wishlist/:id        - Remove from wishlist
GET    /user/addresses           - Get addresses
POST   /user/addresses           - Add address
PUT    /user/addresses/:id       - Update address
DELETE /user/addresses/:id       - Delete address
```

### **Payment**
```
POST   /phonepe/pay             - Initiate payment
POST   /phonepe/callback        - Payment callback
POST   /phonepe/check-status    - Check payment status
```

---

