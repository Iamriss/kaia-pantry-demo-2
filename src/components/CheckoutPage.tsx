import { motion } from "motion/react";
import { ArrowLeft, CreditCard, Truck, ShieldCheck, CheckCircle2 } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useState, FormEvent } from "react";

interface CheckoutPageProps {
  onBack: () => void;
}

export default function CheckoutPage({ onBack }: CheckoutPageProps) {
  const { cart, totalPrice, clearCart } = useCart();
  const [isSuccess, setIsSuccess] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price).replace("Rp", "Rp ");
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      clearCart();
      onBack();
    }, 3000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-kaia-cream flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-12 rounded-[3rem] shadow-xl text-center max-w-md w-full border-8 border-kaia-tan/20"
        >
          <div className="w-24 h-24 bg-kaia-sage/20 text-kaia-sage rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={48} />
          </div>
          <h2 className="text-5xl font-display mb-4 text-kaia-charcoal">Order Successful!</h2>
          <p className="text-kaia-taupe font-light mb-8">
            Thank you for your purchase. We've sent a confirmation email to your inbox.
          </p>
          <div className="w-full bg-kaia-cream h-2 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 3 }}
              className="h-full bg-kaia-red"
            />
          </div>
          <p className="text-[10px] text-kaia-taupe uppercase tracking-widest mt-4 font-bold">Redirecting you back...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-kaia-cream pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-kaia-taupe hover:text-kaia-red transition-colors mb-12 group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs uppercase tracking-widest font-bold">Back to Pantry</span>
        </button>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-kaia-tan/30">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-kaia-cream rounded-full flex items-center justify-center text-kaia-red">
                  <Truck size={24} />
                </div>
                <h2 className="text-4xl font-display text-kaia-charcoal">Shipping Information</h2>
              </div>
              
              <form id="checkout-form" onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-kaia-taupe">Full Name</label>
                  <input required type="text" className="w-full bg-kaia-cream/30 border border-kaia-tan/50 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-kaia-red/20 transition-all" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-kaia-taupe">Email Address</label>
                  <input required type="email" className="w-full bg-kaia-cream/30 border border-kaia-tan/50 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-kaia-red/20 transition-all" placeholder="john@example.com" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-kaia-taupe">Shipping Address</label>
                  <input required type="text" className="w-full bg-kaia-cream/30 border border-kaia-tan/50 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-kaia-red/20 transition-all" placeholder="123 Bakery St, Flour District" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-kaia-taupe">City</label>
                  <input required type="text" className="w-full bg-kaia-cream/30 border border-kaia-tan/50 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-kaia-red/20 transition-all" placeholder="Paris" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-kaia-taupe">Postal Code</label>
                  <input required type="text" className="w-full bg-kaia-cream/30 border border-kaia-tan/50 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-kaia-red/20 transition-all" placeholder="75004" />
                </div>
              </form>
            </section>

            <section className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-kaia-tan/30">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-kaia-cream rounded-full flex items-center justify-center text-kaia-red">
                  <CreditCard size={24} />
                </div>
                <h2 className="text-4xl font-display text-kaia-charcoal">Payment Method</h2>
              </div>
              
              <div className="grid grid-cols-2 gap-6 mb-10">
                <button className="border-2 border-kaia-red bg-kaia-red/5 rounded-[1.5rem] p-6 flex flex-col items-center gap-3 transition-all">
                  <CreditCard className="text-kaia-red" size={28} />
                  <span className="text-xs font-bold uppercase tracking-widest text-kaia-charcoal">Credit Card</span>
                </button>
                <button className="border-2 border-kaia-tan/30 rounded-[1.5rem] p-6 flex flex-col items-center gap-3 hover:border-kaia-tan transition-all">
                  <div className="w-8 h-8 rounded-full border-2 border-kaia-tan/50" />
                  <span className="text-xs font-bold uppercase tracking-widest text-kaia-taupe">Other Methods</span>
                </button>
              </div>

              <div className="space-y-8">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-kaia-taupe">Card Number</label>
                  <input required type="text" className="w-full bg-kaia-cream/30 border border-kaia-tan/50 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-kaia-red/20 transition-all" placeholder="**** **** **** ****" />
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-kaia-taupe">Expiry Date</label>
                    <input required type="text" className="w-full bg-kaia-cream/30 border border-kaia-tan/50 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-kaia-red/20 transition-all" placeholder="MM/YY" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-kaia-taupe">CVV</label>
                    <input required type="text" className="w-full bg-kaia-cream/30 border border-kaia-tan/50 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-kaia-red/20 transition-all" placeholder="***" />
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="space-y-8">
            <section className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-kaia-tan/30 sticky top-32">
              <h2 className="text-3xl font-display mb-10 text-kaia-charcoal">Order Summary</h2>
              
              <div className="space-y-6 mb-10 max-h-80 overflow-y-auto pr-4 custom-scrollbar">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-kaia-cream rounded-xl overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-kaia-charcoal">{item.name}</p>
                        <p className="text-[10px] text-kaia-taupe uppercase tracking-widest">{item.quantity}x {formatPrice(item.price)}</p>
                      </div>
                    </div>
                    <span className="font-display text-xl text-kaia-charcoal">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-8 border-t border-kaia-tan/30">
                <div className="flex justify-between text-sm text-kaia-taupe font-medium">
                  <span>Subtotal</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm text-kaia-taupe font-medium">
                  <span>Shipping</span>
                  <span className="text-kaia-sage font-bold">FREE</span>
                </div>
                <div className="flex justify-between text-4xl font-display pt-4 text-kaia-red">
                  <span>Total</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
              </div>

              <button 
                form="checkout-form"
                type="submit"
                className="w-full bg-kaia-red text-white py-5 rounded-2xl font-bold mt-10 hover:bg-kaia-charcoal transition-all shadow-xl flex items-center justify-center gap-3 group"
              >
                Place Order
                <ShieldCheck size={20} className="group-hover:scale-110 transition-transform" />
              </button>
              
              <div className="flex items-center justify-center gap-2 mt-8 text-kaia-taupe">
                <ShieldCheck size={14} />
                <p className="text-[10px] text-kaia-taupe uppercase tracking-widest font-bold">
                  Secure Encrypted Checkout
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
