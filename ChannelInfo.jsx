import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useVideo } from '@/contexts/VideoContext';
import { Bell, BellOff } from 'lucide-react';

const ChannelInfo = ({ video }) => {
  const { isSubscribed, subscribeToChannel, unsubscribeFromChannel } = useVideo();
  const [showDescription, setShowDescription] = useState(false);

  const handleSubscribe = () => {
    if (isSubscribed(video.channelId)) {
      unsubscribeFromChannel(video.channelId);
      toast({
        title: "🔔 إلغاء الاشتراك",
        description: `تم إلغاء الاشتراك في ${video.channel}`,
      });
    } else {
      subscribeToChannel(video.channelId);
      toast({
        title: "🔔 اشتراك جديد",
        description: `تم الاشتراك في ${video.channel}`,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="flex items-start justify-between p-4 bg-gray-900 rounded-lg"
    >
      <div className="flex items-start space-x-3 rtl:space-x-reverse">
        <Link to={`/channel/${video.channelId}`}>
          <img
            src={video.channelAvatar}
            alt={video.channel}
            className="w-12 h-12 rounded-full channel-avatar"
          />
        </Link>
        
        <div className="space-y-1">
          <Link 
            to={`/channel/${video.channelId}`}
            className="font-semibold text-white hover:text-gray-300"
          >
            {video.channel}
          </Link>
          <p className="text-sm text-gray-400">1.2M مشترك</p>
          
          {showDescription && (
            <p className="text-sm text-gray-300 mt-2 max-w-2xl">
              {video.description}
            </p>
          )}
          
          <button
            onClick={() => setShowDescription(!showDescription)}
            className="text-sm text-gray-400 hover:text-gray-300"
          >
            {showDescription ? 'إخفاء' : 'عرض المزيد'}
          </button>
        </div>
      </div>

      <div className="flex items-center space-x-2 rtl:space-x-reverse">
        <Button
          onClick={handleSubscribe}
          className={`${
            isSubscribed(video.channelId)
              ? 'subscribed-button'
              : 'subscribe-button'
          }`}
        >
          {isSubscribed(video.channelId) ? (
            <>
              <BellOff className="h-4 w-4 ml-2" />
              مشترك
            </>
          ) : (
            <>
              <Bell className="h-4 w-4 ml-2" />
              اشتراك
            </>
          )}
        </Button>
      </div>
    </motion.div>
  );
};

export default ChannelInfo;