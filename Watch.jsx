import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import VideoPlayer from '@/components/VideoPlayer';
import { useVideo } from '@/contexts/VideoContext';
import VideoDetails from '@/pages/watch/VideoDetails';
import ChannelInfo from '@/pages/watch/ChannelInfo';
import CommentsSection from '@/pages/watch/CommentsSection';
import SuggestedVideos from '@/pages/watch/SuggestedVideos';

const Watch = () => {
  const { id } = useParams();
  const { 
    getVideoById, 
    addToWatchHistory,
    sidebarCollapsed 
  } = useVideo();
  
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const foundVideo = getVideoById(id);
    if (foundVideo) {
      setVideo(foundVideo);
      addToWatchHistory(id);
      
      setComments([
        {
          id: 1,
          author: 'أحمد محمد',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
          text: 'فيديو رائع! شكراً لك على المحتوى المفيد',
          time: 'منذ ساعتين',
          likes: 24
        },
        {
          id: 2,
          author: 'فاطمة علي',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
          text: 'هل يمكنك عمل فيديو عن نفس الموضوع ولكن للمبتدئين؟',
          time: 'منذ 4 ساعات',
          likes: 12
        },
        {
          id: 3,
          author: 'محمد السعيد',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
          text: 'معلومات قيمة جداً، استفدت كثيراً',
          time: 'منذ يوم',
          likes: 8
        }
      ]);
    }
  }, [id, getVideoById, addToWatchHistory]);

  if (!video) {
    return (
      <div className={`pt-16 transition-all duration-300 ${sidebarCollapsed ? 'ml-[72px]' : 'ml-60'}`}>
        <div className="p-6 text-center">
          <h2 className="text-2xl font-bold text-white">الفيديو غير موجود</h2>
        </div>
      </div>
    );
  }

  return (
    <div className={`pt-16 transition-all duration-300 ${sidebarCollapsed ? 'ml-[72px]' : 'ml-60'}`}>
      <Helmet>
        <title>{video.title} - يوتيوب</title>
        <meta name="description" content={video.description} />
      </Helmet>

      <div className="flex flex-col lg:flex-row gap-6 p-6">
        <div className="flex-1 space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <VideoPlayer video={video} />
          </motion.div>

          <VideoDetails video={video} />
          
          <ChannelInfo video={video} />

          <CommentsSection comments={comments} setComments={setComments} />
        </div>

        <SuggestedVideos currentVideoId={video.id} />
      </div>
    </div>
  );
};

export default Watch;