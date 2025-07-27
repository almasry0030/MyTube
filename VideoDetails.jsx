import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useVideo } from '@/contexts/VideoContext';
import { ThumbsUp, ThumbsDown, Share, Download, MoreHorizontal } from 'lucide-react';

const VideoDetails = ({ video }) => {
  const { isVideoLiked, likeVideo, unlikeVideo } = useVideo();

  const handleLike = () => {
    if (isVideoLiked(video.id)) {
      unlikeVideo(video.id);
      toast({
        title: "👍 إلغاء الإعجاب",
        description: "تم إلغاء الإعجاب بالفيديو",
      });
    } else {
      likeVideo(video.id);
      toast({
        title: "👍 إعجاب",
        description: "تم الإعجاب بالفيديو",
      });
    }
  };

  const handleShare = () => {
    toast({
      title: "📤 مشاركة",
      description: "🚧 هذه الميزة غير متاحة حالياً—لكن لا تقلق! يمكنك طلبها في رسالتك التالية! 🚀",
    });
  };

  const handleDownload = () => {
    toast({
      title: "📥 تحميل",
      description: "🚧 هذه الميزة غير متاحة حالياً—لكن لا تقلق! يمكنك طلبها في رسالتك التالية! 🚀",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="space-y-4"
    >
      <h1 className="text-xl font-bold text-white">{video.title}</h1>
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-2 rtl:space-x-reverse text-gray-400">
          <span>{video.views} مشاهدة</span>
          <span>•</span>
          <span>{video.uploadTime}</span>
        </div>

        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <Button
            variant="ghost"
            onClick={handleLike}
            className={`flex items-center space-x-2 rtl:space-x-reverse ${
              isVideoLiked(video.id) ? 'text-red-500' : 'text-gray-300'
            } hover:bg-gray-800`}
          >
            <ThumbsUp className="h-5 w-5" />
            <span>{video.likes.toLocaleString()}</span>
          </Button>

          <Button
            variant="ghost"
            className="flex items-center space-x-2 rtl:space-x-reverse text-gray-300 hover:bg-gray-800"
          >
            <ThumbsDown className="h-5 w-5" />
            <span>{video.dislikes.toLocaleString()}</span>
          </Button>

          <Button
            variant="ghost"
            onClick={handleShare}
            className="flex items-center space-x-2 rtl:space-x-reverse text-gray-300 hover:bg-gray-800"
          >
            <Share className="h-5 w-5" />
            <span>مشاركة</span>
          </Button>

          <Button
            variant="ghost"
            onClick={handleDownload}
            className="flex items-center space-x-2 rtl:space-x-reverse text-gray-300 hover:bg-gray-800"
          >
            <Download className="h-5 w-5" />
            <span>تحميل</span>
          </Button>

          <Button
            variant="ghost"
            className="text-gray-300 hover:bg-gray-800"
          >
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default VideoDetails;