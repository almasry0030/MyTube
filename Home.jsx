
import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import VideoCard from '@/components/VideoCard';
import { useVideo } from '@/contexts/VideoContext';

const Home = () => {
  const { videos, sidebarCollapsed } = useVideo();

  return (
    <div className={`pt-16 transition-all duration-300 ${sidebarCollapsed ? 'ml-[72px]' : 'ml-60'}`}>
      <Helmet>
        <title>الرئيسية - يوتيوب</title>
        <meta name="description" content="اكتشف أحدث الفيديوهات والمحتوى المميز على يوتيوب. شاهد، تفاعل، واشترك في قنواتك المفضلة." />
      </Helmet>

      <div className="p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Categories filter */}
          <div className="mb-8 overflow-x-auto">
            <div className="flex space-x-3 rtl:space-x-reverse pb-2">
              {[
                'الكل', 'الموسيقى', 'الألعاب', 'الأخبار', 'الرياضة', 
                'التعلم', 'الطبخ', 'التقنية', 'السفر', 'الكوميديا'
              ].map((category, index) => (
                <motion.button
                  key={category}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    index === 0 
                      ? 'bg-white text-black' 
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Videos grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {videos.map((video, index) => (
              <VideoCard key={video.id} video={video} index={index} />
            ))}
          </div>

          {/* Load more section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center space-x-2 rtl:space-x-reverse text-gray-400">
              <div className="w-2 h-2 bg-gray-600 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-gray-600 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-gray-600 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              <span className="mr-3">تحميل المزيد من الفيديوهات...</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
