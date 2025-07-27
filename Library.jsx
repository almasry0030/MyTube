
import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { History, Clock, ThumbsUp, Download, PlaySquare } from 'lucide-react';
import VideoCard from '@/components/VideoCard';
import { useVideo } from '@/contexts/VideoContext';

const Library = () => {
  const { videos, watchHistory, likedVideos, sidebarCollapsed } = useVideo();

  const watchHistoryVideos = watchHistory
    .map(id => videos.find(v => v.id === id))
    .filter(Boolean)
    .slice(0, 10);

  const likedVideosData = likedVideos
    .map(id => videos.find(v => v.id === id))
    .filter(Boolean);

  const LibrarySection = ({ icon: Icon, title, videos, emptyMessage }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <div className="flex items-center space-x-3 rtl:space-x-reverse">
        <Icon className="h-6 w-6 text-red-600" />
        <h2 className="text-xl font-bold text-white">{title}</h2>
      </div>

      {videos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {videos.map((video, index) => (
            <VideoCard key={video.id} video={video} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-900 rounded-lg">
          <Icon className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">{emptyMessage}</h3>
          <p className="text-gray-400">ابدأ بمشاهدة الفيديوهات لتظهر هنا</p>
        </div>
      )}
    </motion.div>
  );

  return (
    <div className={`pt-16 transition-all duration-300 ${sidebarCollapsed ? 'ml-[72px]' : 'ml-60'}`}>
      <Helmet>
        <title>المكتبة - يوتيوب</title>
        <meta name="description" content="مكتبتك الشخصية تحتوي على سجل المشاهدة والفيديوهات المعجب بها وقوائم التشغيل المحفوظة." />
      </Helmet>

      <div className="p-6 space-y-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-white mb-2">مكتبتك</h1>
          <p className="text-gray-400">جميع فيديوهاتك المحفوظة والمفضلة في مكان واحد</p>
        </motion.div>

        {/* Quick access cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { icon: History, label: 'السجل', count: watchHistoryVideos.length },
            { icon: ThumbsUp, label: 'الإعجابات', count: likedVideosData.length },
            { icon: Clock, label: 'مشاهدة لاحقاً', count: 0 },
            { icon: Download, label: 'التنزيلات', count: 0 }
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-gray-900 rounded-lg p-4 hover:bg-gray-800 transition-colors cursor-pointer group"
            >
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <item.icon className="h-8 w-8 text-red-600 group-hover:text-red-500 transition-colors" />
                <div>
                  <h3 className="font-semibold text-white">{item.label}</h3>
                  <p className="text-gray-400 text-sm">{item.count} عنصر</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Watch History */}
        <LibrarySection
          icon={History}
          title="سجل المشاهدة"
          videos={watchHistoryVideos}
          emptyMessage="لا يوجد سجل مشاهدة"
        />

        {/* Liked Videos */}
        <LibrarySection
          icon={ThumbsUp}
          title="الفيديوهات المعجب بها"
          videos={likedVideosData}
          emptyMessage="لا توجد فيديوهات معجب بها"
        />

        {/* Watch Later - Empty for now */}
        <LibrarySection
          icon={Clock}
          title="مشاهدة لاحقاً"
          videos={[]}
          emptyMessage="لا توجد فيديوهات للمشاهدة لاحقاً"
        />

        {/* Downloads - Empty for now */}
        <LibrarySection
          icon={Download}
          title="التنزيلات"
          videos={[]}
          emptyMessage="لا توجد فيديوهات محملة"
        />

        {/* Your Videos - Empty for now */}
        <LibrarySection
          icon={PlaySquare}
          title="فيديوهاتك"
          videos={[]}
          emptyMessage="لم تقم برفع أي فيديوهات بعد"
        />
      </div>
    </div>
  );
};

export default Library;
