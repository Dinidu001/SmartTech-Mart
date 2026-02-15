# SmartTech Mart - Premium E-Commerce Website

A modern, responsive e-commerce application designed for the Sri Lankan market. Built with performance and aesthetics in mind.

## 🚀 Quick Start
1. **Open** the `index.html` file in any modern web browser (Chrome, Edge, Firefox).
2. **Shop**: Browse products, add to cart, and place orders via WhatsApp.
3. **Admin Panel**: Login to manage products.

## 🔑 Admin Credentials (Demo)
- **Email**: `admin@smarttech.lk`
- **Password**: `admin123`
- **Access**: Click "Login" in the navbar.

## 🛠 Features
- **Responsive Design**: Looks great on Mobile and Desktop (Daraz-style).
- **Product Management**: Admin dashboard to view, add, and delete products (Mock).
- **Cart System**: Persistent cart using LocalStorage.
- **WhatsApp Checkout**: Auto-generates a formatted order message sent to your number.
- **Search & Filter**: Filter products by category.

## ⚙️ Configuration
### 1. Change WhatsApp Number
Open `app.js` and find the `handleCheckout` function (approx line 582).
Change the `waNumber` variable to your business phone number:
```javascript
const waNumber = "9477xxxxxxx"; // Format: 94771234567 (No '+' sign)
```

### 2. Connect to Firebase (Database)
Currently, the app uses **Mock Data** for demonstration. To connect a real backend:
1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com).
2. Enable **Firestore Database** and **Authentication**.
3. updating `firebase-config.js` with your credentials (create this file).
4. Update `app.js` to fetch `products` from Firestore instead of the hardcoded array.

## 📁 Project Structure
- `index.html`: Main HTML file (Single Page Application structure).
- `style.css`: All styles, variables, and responsive design rules.
- `app.js`: Application logic, data, routing, and interactions.

## 🎨 Customization
- **Colors**: Edit `:root` variables in `style.css` (lines 2-10).
- **Fonts**: Pre-loaded with Google Fonts (Poppins, Roboto, Montserrat).

---
*Created by SmartTech Dev Team*
