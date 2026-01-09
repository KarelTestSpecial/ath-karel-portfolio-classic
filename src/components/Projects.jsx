import React, { useState } from 'react';
import ProjectModal from './ProjectModal';
import { useCart } from './CartContext';

export default function Projects({ projects }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState('All');
  const { addToCart } = useCart();

  if (!projects || projects.length === 0) return null;

  // Ondersteun zowel 'category' als 'type' velden
  const categories = ['All', ...new Set(projects.map(p => p.category || p.type || 'Development'))];
  
  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => (p.category || p.type || 'Development') === filter);

  const handleInquire = (project) => {
    const item = {
      id: project.id || (project.title || project.name).toLowerCase().replace(/\s+/g, '-'),
      name: project.title || project.name,
      price: 0,
      image: project.image_url,
      category: project.category || project.type || 'Development',
      ...project
    };
    addToCart(item);
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Portfolio Work</h2>
            <p className="text-gray-500">Explore my technical solutions and creative builds.</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  filter === cat 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {filteredProjects.map((project, index) => (
            <article 
              key={index} 
              className="group relative bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-blue-200 hover:shadow-xl transition-all cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <div className="aspect-video bg-gray-200 w-full overflow-hidden relative">
                 <img 
                    src={project.image_url || `https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop`} 
                    alt={project.title || project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                 />
                 <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-sm">
                   {project.category || project.type || 'Development'}
                 </div>
                 <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-colors" />
              </div>

              <div className="p-8">
                <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors text-gray-900">
                  {project.title || project.name}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed line-clamp-2">
                  {project.description || project.summary || "No description available."}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {(project.tech_stack || project.type || "Web App").split(',').slice(0, 4).map((tech, i) => (
                    <span key={i} className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded uppercase tracking-wider">
                      {tech.trim()}
                    </span>
                  ))}
                </div>

                <div className="flex items-center text-blue-600 font-bold text-sm">
                  View Details & Inquire <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
        onInquire={handleInquire}
      />
    </section>
  );
}
