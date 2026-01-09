import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import CartOverlay from './components/CartOverlay';

const App = ({ data }) => {
  if (!data) return <div className="p-20 text-center">Loading...</div>;

  const profile = data['Profile']?.[0] || data['Basisgegevens']?.[0] || {};
  const projects = data['Projects'] || data['Portfolio'] || [];
  const services = data['Services'] || [];
  const testimonials = data['Testimonials'] || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header profile={profile} />
      <CartOverlay />
      
      <main>
        <Hero profile={profile} />
        <Projects projects={projects} />
        <Services services={services} />
        <Testimonials testimonials={testimonials} />
      </main>

      <Footer profile={profile} />
    </div>
  );
};

export default App;
