
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MoreVertical, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const VideoCard = ({ video, index }) => {
  const handleMoreOptions = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toast({
      title: "⚙️ خيارات إضافية",
      description: "🚧 هذه الميزة غير متاحة حالياً—لكن لا تقلق! يمكنك طلبها في رسالتك التالية! 🚀",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Link to={`/watch/${video.id}`} className="block">
        <div className="space-y-3">
          {/* Thumbnail */}
          <div className="relative aspect-video bg-gray-800 rounded-xl overflow-hidden video-thumbnail">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            
            {/* Duration badge */}
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>{video.duration}</span>
            </div>
            
            {/* More options button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleMoreOptions}
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-50 hover:bg-opacity-70 text-white"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>

          {/* Video info */}
          <div className="flex space-x-3 rtl:space-x-reverse">
            {/* Channel avatar */}
            <div className="flex-shrink-0">
              <img
                src={video.channelAvatar}
                alt={video.channel}
                className="w-9 h-9 rounded-full channel-avatar"
              />
            </div>

            {/* Video details */}
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-medium text-sm line-clamp-2 group-hover:text-gray-200 transition-colors">
                {video.title}
              </h3>
              
              <div className="mt-1 space-y-1">
                <p className="text-gray-400 text-sm hover:text-gray-300 transition-colors">
                  {video.channel}
                </p>
                
                <div className="flex items-center space-x-2 rtl:space-x-reverse text-gray-400 text-sm">
                  <span>{video.views} مشاهدة</span>
                  <span>•</span>
                  <span>{video.uploadTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default VideoCard;
