
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { TrendingUp, Music, Gamepad2, Newspaper, Trophy } from 'lucide-react';
import VideoCard from '@/components/VideoCard';
import { useVideo } from '@/contexts/VideoContext';

const Trending = () => {
  const { videos, sidebarCollapsed } = useVideo();
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'الكل', icon: TrendingUp },
    { id: 'music', label: 'الموسيقى', icon: Music },
    { id: 'gaming', label: 'الألعاب', icon: Gamepad2 },
    { id: 'news', label: 'الأخبار', icon: Newspaper },
    { id: 'sports', label: 'الرياضة', icon: Trophy }
  ];

  // Sort videos by views for trending
  const trendingVideos = [...videos].sort((a, b) => {
    const aViews = parseFloat(a.views.replace(/[^\d.]/g, ''));
    const bViews = parseFloat(b.views.replace(/[^\d.]/g, ''));
    return bViews - aViews;
  });

  return (
    <div className={`pt-16 transition-all duration-300 ${sidebarCollapsed ? 'ml-[72px]' : 'ml-60'}`}>
      <Helmet>
        <title>الشائع - يوتيوب</title>
        <meta name="description" content="اكتشف أحدث الفيديوهات الشائعة والمتداولة على يوتيوب في جميع الفئات." />
      </Helmet>

      <div className="p-6 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <TrendingUp className="h-8 w-8 text-red-600" />
            <h1 className="text-3xl font-bold text-white">الشائع</h1>
          </div>
          <p className="text-gray-400">
            اكتشف أحدث الفيديوهات الشائعة والمتداولة
          </p>
        </motion.div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap gap-3"
        >
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 rounded-lg font-medium transition-all ${
                  activeCategory === category.id
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/25'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{category.label}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Trending stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: 'إجمالي المشاهدات', value: '50M+', color: 'text-red-500' },
            { label: 'فيديوهات شائعة', value: trendingVideos.length, color: 'text-blue-500' },
            { label: 'قنوات نشطة', value: '25+', color: 'text-green-500' },
            { label: 'تحديث كل', value: '1 ساعة', color: 'text-purple-500' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
              className="bg-gray-900 rounded-lg p-4 text-center glassmorphism"
            >
              <div className={`text-2xl font-bold ${stat.color} mb-1`}>
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trending videos grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">
              {activeCategory === 'all' ? 'جميع الفيديوهات الشائعة' : `شائع في ${categories.find(c => c.id === activeCategory)?.label}`}
            </h2>
            <div className="text-sm text-gray-400">
              آخر تحديث: منذ 30 دقيقة
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {trendingVideos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <VideoCard video={video} index={index} />
                
                {/* Trending badge */}
                <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full flex items-center space-x-1 rtl:space-x-reverse">
                  <TrendingUp className="h-3 w-3" />
                  <span>#{index + 1}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Load more section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center pt-8"
        >
          <div className="inline-flex items-center space-x-2 rtl:space-x-reverse text-gray-400">
            <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            <span className="mr-3">تحديث الفيديوهات الشائعة...</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Trending;
