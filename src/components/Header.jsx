import React from 'react';
import { useCart } from './CartContext';

export default function Header({ profile = {} }) {
  const { cartCount, setIsCartOpen } = useCart();

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-[100]">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">
            {profile.full_name || 'Karel Portfolio'}
          </h1>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-500">
            <a href="#projects" className="hover:text-blue-600">Portfolio</a>
            <a href="#services" className="hover:text-blue-600">Services</a>
            <a href="#testimonials" className="hover:text-blue-600">Reviews</a>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm font-bold text-gray-600 transition-all"
          >
            <span>📁 Selection</span>
            {cartCount > 0 && (
              <span className="bg-blue-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          
          <a 
            href={`mailto:${profile.contact_email}`}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-600/10"
          >
            Contact Me
          </a>
        </div>
      </div>
    </header>
  );
}
