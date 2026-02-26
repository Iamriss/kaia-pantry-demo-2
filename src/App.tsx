/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Menu from "./components/Menu";
import About from "./components/About";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import CheckoutPage from "./components/CheckoutPage";
import { CartProvider } from "./context/CartContext";

function AppContent() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [view, setView] = useState<"landing" | "checkout">("landing");

  const handleCheckout = () => {
    setIsCartOpen(false);
    setView("checkout");
    window.scrollTo(0, 0);
  };

  const handleHome = () => {
    setView("landing");
    window.scrollTo(0, 0);
  };

  if (view === "checkout") {
    return (
      <>
        <Navbar onCartClick={() => setIsCartOpen(true)} onHomeClick={handleHome} />
        <CheckoutPage onBack={handleHome} />
        <CartDrawer 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
          onCheckout={handleCheckout} 
        />
        <Footer />
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onCartClick={() => setIsCartOpen(true)} onHomeClick={handleHome} />
      <main className="flex-grow">
        <Hero />
        <Menu />
        <About />
      </main>
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        onCheckout={handleCheckout} 
      />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
