import React from 'react';

const ProjectModal = ({ project, onClose, onInquire }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl animate-reveal">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-50 p-2 text-gray-400 hover:text-gray-900 transition-all"
        >
          <span className="text-3xl">✕</span>
        </button>

        <div className="p-8 md:p-12">
          <div className="mb-8">
            <span className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-2 block">
              {project.category}
            </span>
            <h2 className="text-4xl font-bold text-gray-900">{project.title || project.name}</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
               <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden mb-6">
                 <img 
                    src={project.image_url || `https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop`} 
                    alt={project.title || project.name}
                    className="w-full h-full object-cover"
                 />
               </div>
               <div className="flex flex-wrap gap-2">
                  {(project.tech_stack || project.type || "Web App").split(',').map((tech, i) => (
                    <span key={i} className="text-xs font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                      {tech.trim()}
                    </span>
                  ))}
               </div>
            </div>

            <div className="flex flex-col">
              <h4 className="font-bold text-gray-900 mb-4">Project Description</h4>
              <p className="text-gray-600 leading-relaxed mb-8">
                {project.description || project.summary || "No description available."}
              </p>

              <div className="mt-auto pt-8 border-t border-gray-100 space-y-4">
                <div className="flex flex-wrap gap-4">
                  {(project.repo_url || project.githubLink) && (
                    <a 
                      href={(project.repo_url || project.githubLink).startsWith('http') ? (project.repo_url || project.githubLink) : `https://${(project.repo_url || project.githubLink)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center py-3 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-800 transition-all"
                    >
                      GitHub Repo
                    </a>
                  )}
                  {(project.demo_url || project.liveLink) && (
                    <a 
                      href={(project.demo_url || project.liveLink).startsWith('http') ? (project.demo_url || project.liveLink) : `https://${(project.demo_url || project.liveLink)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center py-3 border border-gray-200 text-gray-900 font-bold rounded-lg hover:bg-gray-50 transition-all"
                    >
                      Live Demo
                    </a>
                  )}
                </div>
                
                <button 
                  className="w-full py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
                  onClick={() => onInquire(project)}
                >
                  Request Information / Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
