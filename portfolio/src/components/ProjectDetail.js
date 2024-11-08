import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import projectData from '../projectData.json';

const ProjectDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const project = projectData.find((project) => project.id === parseInt(id, 10));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  if (!project) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center"
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Project not found</h2>
          <button
            onClick={() => navigate('/projects')}
            className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors duration-300"
          >
            Back
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial="hidden" 
      animate="visible" 
      variants={containerVariants} 
      className="container mx-auto px-4 py-12 max-w-7xl"
    >
      <motion.div  
        variants={itemVariants} 
        className="flex justify-between items-center mb-6"
      >
        <motion.h1 
          variants={itemVariants}
          className="text-4xl font-bold dark:text-white"
        >
          {project.title}
        </motion.h1>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/projects')}
          className="bg-gray-700 text-white px-8 py-3 rounded-md hover:bg-gray-500 transition-colors duration-300 inline-flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Projects
        </motion.button>
      </motion.div>

      {/* Main content grid with flex layout for equal heights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Section - Project Details */}
        <motion.div variants={itemVariants} className="flex flex-col h-full">
          <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-8 flex-grow">
            <motion.h2 variants={itemVariants} className="text-2xl font-semibold mb-4 dark:text-white">
              Project Overview
            </motion.h2>
            <motion.p variants={itemVariants} className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              {project.fullDescription}
            </motion.p>
            
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-xl font-semibold dark:text-white">Technical Details</h3>
              <div className="space-y-2">
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-medium">Category:</span> {project.category}
                </p>
                {project.technologies && (
                  <div>
                    <span className="font-medium text-gray-700 dark:text-gray-300">Technologies:</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.technologies.map((tech, index) => (
                        <motion.span
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Section - Video and Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col h-full">
          <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden flex-grow">
            <div className="h-full flex flex-col">
              <div className="aspect-w-16 aspect-h-9 flex-shrink-0">
                {project.liveDemo === 'no-demo' ? (
                  <img
                    src={require(`../assets/${project.image}`)}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <video
                    className="w-full h-full object-cover"
                    controls
                    poster={require(`../assets/${project.image}`)}
                  >
                    <source src={require(`../assets/${project.liveDemo}`)} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
              
              {/* Action Buttons - Moved inside the white container */}
              <div className="p-8 flex-grow flex flex-col justify-end">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={project.sourceCode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 text-white px-6 py-3 rounded-md hover:bg-gray-500 transition-colors duration-300 text-center cursor-pointer w-full"
                >
                  View Source Code
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProjectDetail;