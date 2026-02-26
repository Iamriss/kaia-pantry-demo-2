import { motion, AnimatePresence } from "motion/react";
import { X, ShoppingBag } from "lucide-react";
import { MenuItem, useCart } from "../context/CartContext";

interface ProductDetailModalProps {
  product: MenuItem | null;
  onClose: () => void;
}

export default function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
  const { addToCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price).replace("Rp", "Rp ");
  };

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-kaia-charcoal/60 backdrop-blur-sm z-[150]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-4xl bg-white z-[151] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full text-kaia-charcoal hover:bg-kaia-red hover:text-white transition-all z-10"
            >
              <X size={20} />
            </button>

            <div className="w-full md:w-1/2 h-64 md:h-auto bg-kaia-tan/30 p-8 flex items-center justify-center">
              <img 
                src={product.image} 
                alt={product.name} 
                className="max-w-full max-h-full object-contain drop-shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col">
              <div className="mb-auto">
                <span className="text-kaia-red font-display text-2xl tracking-widest uppercase mb-2 block">
                  {product.category}
                </span>
                <h2 className="text-5xl md:text-6xl font-display text-kaia-charcoal mb-4">
                  {product.name}
                </h2>
                <p className="text-3xl font-display text-kaia-taupe mb-6">
                  {formatPrice(product.price)}
                </p>
                <div className="space-y-4 text-kaia-charcoal/80 font-light leading-relaxed">
                  <p className="text-lg font-medium italic text-kaia-sage">
                    "{product.desc}"
                  </p>
                  <p>
                    {product.longDesc || "Handcrafted with the finest ingredients, our " + product.name + " is a testament to our passion for artisanal baking. Perfect for celebrations or a simple moment of indulgence."}
                  </p>
                </div>
                
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="bg-kaia-cream/50 p-3 rounded-xl border border-kaia-tan/50">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-kaia-taupe block mb-1">Ingredients</span>
                    <span className="text-xs">Premium Flour, Organic Eggs, Pure Butter</span>
                  </div>
                  <div className="bg-kaia-cream/50 p-3 rounded-xl border border-kaia-tan/50">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-kaia-taupe block mb-1">Serving</span>
                    <span className="text-xs">Best served at room temperature</span>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex gap-4">
                <button 
                  onClick={() => {
                    addToCart(product);
                    onClose();
                  }}
                  className="flex-grow bg-kaia-red text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-kaia-charcoal transition-colors shadow-lg"
                >
                  <ShoppingBag size={20} />
                  Add to Cart
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
