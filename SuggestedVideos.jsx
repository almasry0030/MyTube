import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useVideo } from '@/contexts/VideoContext';

const SuggestedVideos = ({ currentVideoId }) => {
  const { videos } = useVideo();
  const suggestedVideos = videos.filter(v => v.id !== currentVideoId).slice(0, 10);

  return (
    <div className="lg:w-96 space-y-4">
      <h3 className="text-lg font-semibold text-white">فيديوهات مقترحة</h3>
      
      <div className="space-y-4">
        {suggestedVideos.map((suggestedVideo, index) => (
          <motion.div
            key={suggestedVideo.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Link to={`/watch/${suggestedVideo.id}`} className="block">
              <div className="flex space-x-3 rtl:space-x-reverse group">
                <div className="relative w-40 aspect-video bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={suggestedVideo.thumbnail}
                    alt={suggestedVideo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-1 py-0.5 rounded">
                    {suggestedVideo.duration}
                  </div>
                </div>
                
                <div className="flex-1 space-y-1">
                  <h4 className="text-white text-sm font-medium line-clamp-2 group-hover:text-gray-300">
                    {suggestedVideo.title}
                  </h4>
                  <p className="text-gray-400 text-xs">{suggestedVideo.channel}</p>
                  <div className="flex items-center space-x-1 rtl:space-x-reverse text-gray-400 text-xs">
                    <span>{suggestedVideo.views} مشاهدة</span>
                    <span>•</span>
                    <span>{suggestedVideo.uploadTime}</span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SuggestedVideos;