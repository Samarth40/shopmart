# ShopMart - React Shopping Website

![ShopMart Banner](https://i.imgur.com/QpK5ECF.png)

A modern, responsive e-commerce website built with React and Fake Store API as part of the Frontend Development Internship Assignment for Grey Scientific Labs on Internshala.

## 🌟 Live Demo

[View Live Demo](#) - *Add your deployed link here*

## ✨ Features

- **User Authentication**
  - Secure login using JWT
  - Protected routes for authenticated users

- **Product Management**
  - Browse all products with category filtering
  - Search functionality
  - Detailed product pages with image zoom
  - Related products recommendations

- **Shopping Cart**
  - Add/remove products
  - Update quantities
  - Persistent cart data

- **Responsive Design**
  - Mobile-first approach
  - Optimized for all screen sizes

- **Modern UI/UX**
  - Clean, intuitive interface
  - Interactive elements and animations
  - Custom 404 page

## 🛠️ Technologies Used

- **Frontend**
  - React.js
  - React Router v6
  - React Hooks
  - Context API for state management

- **Styling**
  - TailwindCSS

- **API**
  - [Fake Store API](https://fakestoreapi.com)

- **Other Tools**
  - Vite (Build tool)
  - React Icons
  - LocalStorage for data persistence

## 📋 Installation and Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Samarth40/shopmart.git
   cd shopmart
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🧭 Project Structure

```
src/
├── components/       # Reusable UI components
├── context/          # React Context for state management
├── pages/            # Page components
├── App.jsx           # Main application component
└── main.jsx          # Entry point
```

## 📱 Screenshots

### Home Page
![Home Page](https://i.imgur.com/placeholder.jpg)

### Product Detail
![Product Detail](https://i.imgur.com/placeholder.jpg)

### Shopping Cart
![Shopping Cart](https://i.imgur.com/placeholder.jpg)

## 📘 API Reference

This project uses the [Fake Store API](https://fakestoreapi.com/docs) for product data and authentication:

- `GET /products` - Get all products
- `GET /products/categories` - Get all categories
- `GET /products/category/:categoryName` - Get products by category
- `GET /products/:id` - Get single product
- `POST /auth/login` - User authentication

## 🔐 Login Credentials

For testing purposes, you can use:
- Username: `mor_2314`
- Password: `83r5^_`

## 🚀 Future Enhancements

- User registration
- Wishlist functionality 
- Product reviews and ratings
- Order history
- Payment integration

## 👨‍💻 Author

**Samarth Shinde**  
- Website: [samarthshinde.tech](https://samarthshinde.tech)
- Email: samarthshinde4033@gmail.com
- Location: Pune, Maharashtra

## 📄 License

This project is created as an assignment for Grey Scientific Labs Internship and is for educational purposes only.

---

*Note: This project uses the Fake Store API for demonstration purposes. In a real-world scenario, you would integrate with an actual e-commerce backend.*
