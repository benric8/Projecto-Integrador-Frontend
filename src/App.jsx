import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { InstrumentProvider } from "./context/InstrumentContext";
import ProductDetail from "./pages/ProductDetail";
import Header from "./components/common/Header"; // Nuevo Header
import Home from "./pages/Home"; // Nueva página Home
import Footer from "./components/common/Footer"; // Nuevo Footer
import { AdminPanel } from "./pages/admin/AdminPanel";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// import "./styles/custom.css";
import "./styles/Button.css";
import "./App.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const App = () => {
  return (
    <Router>
      <InstrumentProvider>
        <Header /> {/* El Header se muestra en todas las rutas */}
        <Routes>
          <Route path="/" element={<Home />} />{" "}
          {/* Ruta principal para la Home */}
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/admin" element={<AdminPanel />} />{" "}
          {/* Nueva ruta de Admin */}
        </Routes>
        <Footer /> {/* El Footer se muestra en todas las rutas */}
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </InstrumentProvider>
    </Router>
  );
};
