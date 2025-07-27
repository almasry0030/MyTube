
import React, { createContext, useContext, useState, useEffect } from 'react';

const VideoContext = createContext();

export const useVideo = () => {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error('useVideo must be used within a VideoProvider');
  }
  return context;
};

export const VideoProvider = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [videos, setVideos] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [likedVideos, setLikedVideos] = useState([]);
  const [watchHistory, setWatchHistory] = useState([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedSubscriptions = localStorage.getItem('youtube_subscriptions');
    const savedLikedVideos = localStorage.getItem('youtube_liked_videos');
    const savedWatchHistory = localStorage.getItem('youtube_watch_history');

    if (savedSubscriptions) {
      setSubscriptions(JSON.parse(savedSubscriptions));
    }
    if (savedLikedVideos) {
      setLikedVideos(JSON.parse(savedLikedVideos));
    }
    if (savedWatchHistory) {
      setWatchHistory(JSON.parse(savedWatchHistory));
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('youtube_subscriptions', JSON.stringify(subscriptions));
  }, [subscriptions]);

  useEffect(() => {
    localStorage.setItem('youtube_liked_videos', JSON.stringify(likedVideos));
  }, [likedVideos]);

  useEffect(() => {
    localStorage.setItem('youtube_watch_history', JSON.stringify(watchHistory));
  }, [watchHistory]);

  // Mock video data
  useEffect(() => {
    const mockVideos = [
      {
        id: '1',
        title: 'أفضل 10 نصائح للبرمجة للمبتدئين',
        channel: 'قناة البرمجة العربية',
        channelId: 'programming-arabic',
        views: '1.2M',
        uploadTime: 'منذ يومين',
        duration: '15:30',
        thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=225&fit=crop',
        channelAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
        description: 'في هذا الفيديو سنتعلم أهم النصائح للمبتدئين في البرمجة',
        likes: 45000,
        dislikes: 1200,
        comments: []
      },
      {
        id: '2',
        title: 'رحلة إلى أجمل الأماكن في العالم',
        channel: 'عالم السفر',
        channelId: 'travel-world',
        views: '850K',
        uploadTime: 'منذ 3 أيام',
        duration: '22:15',
        thumbnail: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=225&fit=crop',
        channelAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
        description: 'استكشف معنا أجمل الوجهات السياحية حول العالم',
        likes: 32000,
        dislikes: 800,
        comments: []
      },
      {
        id: '3',
        title: 'طبخ أشهى الأكلات العربية',
        channel: 'مطبخ أم أحمد',
        channelId: 'um-ahmed-kitchen',
        views: '2.1M',
        uploadTime: 'منذ أسبوع',
        duration: '18:45',
        thumbnail: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=225&fit=crop',
        channelAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
        description: 'تعلمي معنا طريقة تحضير أشهى الأطباق العربية التقليدية',
        likes: 78000,
        dislikes: 2100,
        comments: []
      },
      {
        id: '4',
        title: 'تعلم الذكاء الاصطناعي من الصفر',
        channel: 'تقنية المستقبل',
        channelId: 'future-tech',
        views: '950K',
        uploadTime: 'منذ 4 أيام',
        duration: '35:20',
        thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=225&fit=crop',
        channelAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
        description: 'دورة شاملة لتعلم أساسيات الذكاء الاصطناعي والتعلم الآلي',
        likes: 52000,
        dislikes: 1500,
        comments: []
      },
      {
        id: '5',
        title: 'أسرار النجاح في ريادة الأعمال',
        channel: 'رواد الأعمال العرب',
        channelId: 'arab-entrepreneurs',
        views: '1.8M',
        uploadTime: 'منذ 5 أيام',
        duration: '28:10',
        thumbnail: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=225&fit=crop',
        channelAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=40&h=40&fit=crop&crop=face',
        description: 'نصائح وخبرات من رواد الأعمال الناجحين في الوطن العربي',
        likes: 89000,
        dislikes: 3200,
        comments: []
      },
      {
        id: '6',
        title: 'أحدث ألعاب 2024 - مراجعة شاملة',
        channel: 'عالم الألعاب',
        channelId: 'gaming-world',
        views: '3.2M',
        uploadTime: 'منذ يوم',
        duration: '42:30',
        thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=225&fit=crop',
        channelAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face',
        description: 'مراجعة مفصلة لأحدث وأفضل الألعاب المتوفرة في 2024',
        likes: 125000,
        dislikes: 4500,
        comments: []
      }
    ];
    setVideos(mockVideos);
  }, []);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const subscribeToChannel = (channelId) => {
    if (!subscriptions.includes(channelId)) {
      setSubscriptions([...subscriptions, channelId]);
    }
  };

  const unsubscribeFromChannel = (channelId) => {
    setSubscriptions(subscriptions.filter(id => id !== channelId));
  };

  const isSubscribed = (channelId) => {
    return subscriptions.includes(channelId);
  };

  const likeVideo = (videoId) => {
    if (!likedVideos.includes(videoId)) {
      setLikedVideos([...likedVideos, videoId]);
    }
  };

  const unlikeVideo = (videoId) => {
    setLikedVideos(likedVideos.filter(id => id !== videoId));
  };

  const isVideoLiked = (videoId) => {
    return likedVideos.includes(videoId);
  };

  const addToWatchHistory = (videoId) => {
    const updatedHistory = [videoId, ...watchHistory.filter(id => id !== videoId)];
    setWatchHistory(updatedHistory.slice(0, 50)); // Keep only last 50 videos
  };

  const getVideoById = (id) => {
    return videos.find(video => video.id === id);
  };

  const value = {
    sidebarCollapsed,
    toggleSidebar,
    videos,
    subscriptions,
    subscribeToChannel,
    unsubscribeFromChannel,
    isSubscribed,
    likedVideos,
    likeVideo,
    unlikeVideo,
    isVideoLiked,
    watchHistory,
    addToWatchHistory,
    getVideoById
  };

  return (
    <VideoContext.Provider value={value}>
      {children}
    </VideoContext.Provider>
  );
};
