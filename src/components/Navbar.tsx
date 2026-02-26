import { motion, useScroll, useSpring } from "motion/react";
import { useState, useEffect } from "react";
import { ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";

interface NavbarProps {
  onCartClick: () => void;
  onHomeClick: () => void;
}

export default function Navbar({ onCartClick, onHomeClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalItems } = useCart();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4 ${
          isScrolled ? "bg-white/90 backdrop-blur-md shadow-md py-3" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <button onClick={onHomeClick} className="text-4xl font-display text-kaia-charcoal tracking-tighter">
            kaia<span className="text-kaia-red">pantry</span>
          </button>
          
          <div className="hidden md:flex gap-10 items-center">
            {["Menu", "About", "Visit"].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`} 
                className="text-sm uppercase tracking-widest font-bold text-kaia-charcoal hover:text-kaia-red transition-colors"
              >
                {item}
              </a>
            ))}
            
            <button 
              onClick={onCartClick}
              className="relative p-2 text-kaia-charcoal hover:text-kaia-red transition-colors group"
            >
              <ShoppingBag size={24} strokeWidth={1.5} />
              {totalItems > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-kaia-red text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white"
                >
                  {totalItems}
                </motion.span>
              )}
            </button>

            <button className="bg-kaia-red text-white px-8 py-2 rounded-xl text-xs uppercase tracking-widest font-bold hover:bg-kaia-charcoal transition-all shadow-lg">
              Order Online
            </button>
          </div>
          
          <div className="flex items-center gap-4 md:hidden">
            <button 
              onClick={onCartClick}
              className="relative p-2 text-stone-800"
            >
              <ShoppingBag size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-bakery-crust text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                  {totalItems}
                </span>
              )}
            </button>
            <button className="text-bakery-olive">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            </button>
          </div>
        </div>
      </motion.nav>
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-bakery-crust z-[60] origin-left" 
        style={{ scaleX }} 
      />
    </>
  );
}
