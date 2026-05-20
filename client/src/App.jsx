import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Decision from "./pages/Decision";
import Decisions from "./pages/Decisions";
import Redirect from "./pages/Redirect";
import Dashboard from "./pages/Dashboard";

import Blue from "./pages/Blue";
import Black from "./pages/Black";
import White from "./pages/White";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Checkout from "./pages/Checkout";

// Auth
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

// Admin
import AdminControlCenter from "./admin/AdminControlCenter";
import AdminLayout from "./admin/AdminLayout";
import PaymentRecords from "./admin/PaymentRecords";
import OrdersRecord from "./admin/OrdersRecord";
import AIRecords from "./admin/AIRecords";
import Services from "./admin/Services";
import Analytics from "./admin/Analytics";
import ContactMessages from "./admin/ContactMessages";
import Users from "./admin/Users";

// Protected Route
import ProtectedRoute from "./components/ProtectedRoute";

// Footer
import Footer from "./components/Footer";

import "./index.css";

function Layout() {
  const location = useLocation();

  // ❌ jin pages me footer nahi chahiye
  const hideFooterRoutes = ["/login", "/register"];

  const shouldHideFooter = hideFooterRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col">

      {/* ROUTES */}
      <div className="flex-1">
        <Routes>

          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Navigate to="/register" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/decision" element={<Decision />} />
          <Route path="/decisions" element={<Decisions />} />
          <Route path="/redirect" element={<Redirect />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/blue" element={<Blue />} />
          <Route path="/black" element={<Black />} />
          <Route path="/white" element={<White />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/checkout" element={<Checkout />} />

          {/* AUTH ROUTES */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />

          {/* ADMIN */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminControlCenter />} />
            <Route path="products" element={<AdminControlCenter />} />
            <Route path="payments" element={<PaymentRecords />} />
            <Route path="orders" element={<OrdersRecord />} />
            <Route path="ai-records" element={<AIRecords />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="services" element={<Services />} />
            <Route path="contacts" element={<ContactMessages />} />
            <Route path="users" element={<Users />} />
          </Route>

        </Routes>
      </div>

      {/* ✅ CONDITIONAL FOOTER */}
      {!shouldHideFooter && <Footer />}

    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
