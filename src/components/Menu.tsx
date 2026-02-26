import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { useCart, MenuItem } from "../context/CartContext";
import ProductDetailModal from "./ProductDetailModal";
import { Info, Search } from "lucide-react";

const MENU_ITEMS: MenuItem[] = [
  {
    id: "vanila-cake",
    name: "Vanila Cake",
    price: 200000,
    category: "Cakes",
    desc: "Perpaduan Vanila dengan buah - buahan",
    longDesc: "A timeless classic. Our Vanilla Cake features three layers of moist, Madagascar vanilla bean sponge, filled with fresh seasonal fruits and enveloped in a light, whipped cream frosting.",
    image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "chocolate-cake",
    name: "Chocolate Cake",
    price: 150000,
    category: "Cakes",
    desc: "Perpaduan Coklat dengan buah - buahan",
    longDesc: "Indulge in pure decadence. Rich 70% dark chocolate ganache layered between moist cocoa sponge, topped with a medley of fresh berries for a perfect balance of sweetness and tartness.",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "cupcake",
    name: "Cupcake",
    price: 110000,
    category: "Pastries",
    desc: "Cupcake Coklat dan chococips",
    longDesc: "Bite-sized perfection. Our signature chocolate cupcakes are studded with Belgian chocolate chips and topped with a silky smooth chocolate buttercream swirl.",
    image: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "sourdough-loaf",
    name: "Artisan Sourdough",
    price: 85000,
    category: "Breads",
    desc: "48-hour fermented rustic loaf",
    longDesc: "Our pride and joy. A crusty, rustic loaf with a soft, airy crumb and that signature sourdough tang. Made with just flour, water, salt, and 30 years of tradition.",
    image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "croissant-box",
    name: "Butter Croissants",
    price: 120000,
    category: "Pastries",
    desc: "Box of 4 flaky French croissants",
    longDesc: "Golden, flaky, and buttery. These traditional French croissants are made with high-quality Isigny Ste Mère butter and feature 27 delicate layers of pastry perfection.",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "matcha-cake",
    name: "Matcha Cake",
    price: 165000,
    category: "Cakes",
    desc: "Teh hijau Jepang premium",
    longDesc: "A zen experience. Premium grade Uji matcha infused into a delicate sponge, layered with lightly sweetened red bean paste and matcha-infused white chocolate cream.",
    image: "https://images.unsplash.com/photo-1515037893149-de7f840978e2?auto=format&fit=crop&q=80&w=800"
  }
];

const CATEGORIES = ["All", "Cakes", "Pastries", "Breads"];

export default function Menu() {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<MenuItem | null>(null);

  const filteredItems = MENU_ITEMS.filter(item => {
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price).replace("Rp", "Rp ");
  };

  return (
    <section id="menu" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="font-script text-3xl text-kaia-red mb-2 block">Freshly Baked</span>
          <h2 className="text-6xl md:text-7xl font-display text-kaia-charcoal mb-4">Our Pantry Selection</h2>
          <div className="w-24 h-1 bg-kaia-sage mx-auto mb-8"></div>
          
          <div className="max-w-md mx-auto mb-10 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-kaia-taupe" size={20} />
            <input 
              type="text"
              placeholder="Search our pantry..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-kaia-cream/30 border border-kaia-tan/50 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-kaia-red/20 transition-all text-kaia-charcoal"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-8 py-2 rounded-full text-sm font-bold uppercase tracking-widest transition-all ${
                  activeCategory === cat 
                    ? "bg-kaia-red text-white shadow-lg" 
                    : "bg-kaia-cream text-kaia-taupe hover:bg-kaia-tan"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <motion.div 
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-[2rem] p-8 shadow-sm border border-kaia-tan/30 flex flex-col hover:shadow-xl transition-all duration-500 group relative overflow-hidden"
              >
                <div className="flex justify-between items-center mb-6">
                  <span className="font-display text-2xl text-kaia-red font-bold">{formatPrice(item.price)}</span>
                  <button 
                    onClick={() => setSelectedProduct(item)}
                    className="p-2 text-kaia-taupe hover:text-kaia-red transition-colors"
                    title="View Details"
                  >
                    <Info size={20} />
                  </button>
                </div>
                
                <div className="flex-grow flex items-center justify-center mb-8 h-56 relative">
                  <div className="absolute inset-0 bg-kaia-cream rounded-full scale-0 group-hover:scale-100 transition-transform duration-700 opacity-50"></div>
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="max-h-full w-full object-cover rounded-2xl shadow-lg group-hover:scale-105 transition-transform duration-500 relative z-10"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                <div className="mb-8 text-center">
                  <h3 className="text-4xl font-display text-kaia-charcoal mb-2">{item.name}</h3>
                  <p className="text-kaia-taupe text-sm font-light italic">"{item.desc}"</p>
                </div>
                
                <button 
                  onClick={() => addToCart(item)}
                  className="w-full bg-kaia-red text-white py-4 rounded-2xl font-bold hover:bg-kaia-charcoal transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
                >
                  Add to Cart
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <p className="text-kaia-taupe font-script text-3xl">No items found matching your search...</p>
          </div>
        )}
      </div>

      <ProductDetailModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />
    </section>
  );
}
