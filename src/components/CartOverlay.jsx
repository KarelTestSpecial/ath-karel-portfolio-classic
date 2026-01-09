import React from 'react';
import { useCart } from './CartContext';

const CartOverlay = () => {
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, cartCount, clearCart } = useCart();

  if (!isCartOpen) return null;

  const handleSendInquiry = () => {
    const projectList = cart.map(item => `- ${item.name} (${item.quantity}x)`).join('\n');
    const body = encodeURIComponent(`Geachte Karel,\n\nIk ben geïnteresseerd in de volgende projecten uit uw portfolio:\n\n${projectList}\n\nGraag ontvang ik meer informatie of een vrijblijvende offerte.\n\nMet vriendelijke groet,`);
    window.location.href = `mailto:karel@athena-cms.nl?subject=Aanvraag via Portfolio (Classic)&body=${body}`;
    clearCart();
    setIsCartOpen(false);
  };

  return (
    <div className="fixed inset-0 z-[2000] flex justify-end">
      <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
      
      <div className="relative w-full max-w-md bg-white shadow-2xl flex flex-col h-full animate-slide-in">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Information Request</h3>
            <p className="text-xs text-gray-500">{cartCount} projects selected</p>
          </div>
          <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-gray-900 text-2xl">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
               <p className="mb-2">Your selection is empty.</p>
               <p className="text-sm">Add projects to request details.</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex gap-4 p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={item.image} className="w-full h-full object-cover" alt="" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 text-sm">{item.name}</h4>
                  <p className="text-xs text-gray-500">{item.category}</p>
                </div>
                <div className="flex items-center gap-2 border border-gray-200 rounded-lg p-1">
                  <button onClick={() => updateQuantity(item.id, -1)} className="px-2 text-gray-400 hover:text-gray-900">-</button>
                  <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} className="px-2 text-gray-400 hover:text-gray-900">+</button>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t border-gray-100 bg-gray-50">
            <button 
              className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
              onClick={handleSendInquiry}
            >
              Send Request &rarr;
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartOverlay;