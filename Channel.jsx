
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Bell, BellOff, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import VideoCard from '@/components/VideoCard';
import { useVideo } from '@/contexts/VideoContext';
import { toast } from '@/components/ui/use-toast';

const Channel = () => {
  const { id } = useParams();
  const { 
    videos, 
    isSubscribed, 
    subscribeToChannel, 
    unsubscribeFromChannel,
    sidebarCollapsed 
  } = useVideo();
  
  const [channel, setChannel] = useState(null);
  const [channelVideos, setChannelVideos] = useState([]);

  useEffect(() => {
    // Find channel info from videos
    const channelVideo = videos.find(v => v.channelId === id);
    if (channelVideo) {
      setChannel({
        id: channelVideo.channelId,
        name: channelVideo.channel,
        avatar: channelVideo.channelAvatar,
        subscribers: '1.2M',
        description: 'قناة متخصصة في تقديم محتوى تعليمي وترفيهي عالي الجودة. نهدف إلى إثراء المحتوى العربي وتقديم قيمة حقيقية لمتابعينا.',
        banner: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=300&fit=crop',
        joinDate: 'انضم في يناير 2020',
        totalViews: '50M'
      });
      
      // Filter videos for this channel
      const filteredVideos = videos.filter(v => v.channelId === id);
      setChannelVideos(filteredVideos);
    }
  }, [id, videos]);

  if (!channel) {
    return (
      <div className={`pt-16 transition-all duration-300 ${sidebarCollapsed ? 'ml-[72px]' : 'ml-60'}`}>
        <div className="p-6 text-center">
          <h2 className="text-2xl font-bold text-white">القناة غير موجودة</h2>
        </div>
      </div>
    );
  }

  const handleSubscribe = () => {
    if (isSubscribed(channel.id)) {
      unsubscribeFromChannel(channel.id);
      toast({
        title: "🔔 إلغاء الاشتراك",
        description: `تم إلغاء الاشتراك في ${channel.name}`,
      });
    } else {
      subscribeToChannel(channel.id);
      toast({
        title: "🔔 اشتراك جديد",
        description: `تم الاشتراك في ${channel.name}`,
      });
    }
  };

  return (
    <div className={`pt-16 transition-all duration-300 ${sidebarCollapsed ? 'ml-[72px]' : 'ml-60'}`}>
      <Helmet>
        <title>{channel.name} - يوتيوب</title>
        <meta name="description" content={channel.description} />
      </Helmet>

      <div className="space-y-6">
        {/* Channel banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative h-48 md:h-64 bg-gradient-to-r from-purple-900 to-blue-900 overflow-hidden"
        >
          <img
            src={channel.banner}
            alt={channel.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        </motion.div>

        {/* Channel info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="px-6"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-start space-x-4 rtl:space-x-reverse">
              <img
                src={channel.avatar}
                alt={channel.name}
                className="w-20 h-20 md:w-24 md:h-24 rounded-full channel-avatar"
              />
              
              <div className="space-y-2">
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                  {channel.name}
                </h1>
                
                <div className="flex flex-col md:flex-row md:items-center md:space-x-4 rtl:md:space-x-reverse text-gray-400 text-sm">
                  <span>{channel.subscribers} مشترك</span>
                  <span className="hidden md:block">•</span>
                  <span>{channelVideos.length} فيديو</span>
                  <span className="hidden md:block">•</span>
                  <span>{channel.totalViews} مشاهدة إجمالية</span>
                </div>
                
                <p className="text-gray-300 text-sm max-w-2xl">
                  {channel.description}
                </p>
                
                <p className="text-gray-400 text-xs">
                  {channel.joinDate}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <Button
                onClick={handleSubscribe}
                className={`${
                  isSubscribed(channel.id)
                    ? 'subscribed-button'
                    : 'subscribe-button'
                }`}
              >
                {isSubscribed(channel.id) ? (
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
          </div>
        </motion.div>

        {/* Channel content tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="px-6"
        >
          <Tabs defaultValue="videos" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-gray-900">
              <TabsTrigger value="videos" className="text-white data-[state=active]:bg-gray-700">
                الفيديوهات
              </TabsTrigger>
              <TabsTrigger value="playlists" className="text-white data-[state=active]:bg-gray-700">
                قوائم التشغيل
              </TabsTrigger>
              <TabsTrigger value="community" className="text-white data-[state=active]:bg-gray-700">
                المجتمع
              </TabsTrigger>
              <TabsTrigger value="about" className="text-white data-[state=active]:bg-gray-700">
                حول
              </TabsTrigger>
            </TabsList>

            <TabsContent value="videos" className="mt-6">
              {channelVideos.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {channelVideos.map((video, index) => (
                    <VideoCard key={video.id} video={video} index={index} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Play className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">
                    لا توجد فيديوهات
                  </h3>
                  <p className="text-gray-400">
                    لم تقم هذه القناة بنشر أي فيديوهات بعد
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="playlists" className="mt-6">
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-800 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <Play className="h-8 w-8 text-gray-600" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  لا توجد قوائم تشغيل
                </h3>
                <p className="text-gray-400">
                  لم تقم هذه القناة بإنشاء أي قوائم تشغيل بعد
                </p>
              </div>
            </TabsContent>

            <TabsContent value="community" className="mt-6">
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-800 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">💬</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  لا توجد منشورات
                </h3>
                <p className="text-gray-400">
                  لم تقم هذه القناة بنشر أي منشورات في المجتمع بعد
                </p>
              </div>
            </TabsContent>

            <TabsContent value="about" className="mt-6">
              <div className="max-w-4xl space-y-6">
                <div className="bg-gray-900 rounded-lg p-6 space-y-4">
                  <h3 className="text-lg font-semibold text-white">الوصف</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {channel.description}
                  </p>
                </div>

                <div className="bg-gray-900 rounded-lg p-6 space-y-4">
                  <h3 className="text-lg font-semibold text-white">الإحصائيات</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">
                        {channel.subscribers}
                      </div>
                      <div className="text-gray-400 text-sm">مشترك</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">
                        {channelVideos.length}
                      </div>
                      <div className="text-gray-400 text-sm">فيديو</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">
                        {channel.totalViews}
                      </div>
                      <div className="text-gray-400 text-sm">مشاهدة</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900 rounded-lg p-6 space-y-4">
                  <h3 className="text-lg font-semibold text-white">تفاصيل</h3>
                  <div className="space-y-2 text-gray-300">
                    <p><span className="text-gray-400">تاريخ الانضمام:</span> {channel.joinDate}</p>
                    <p><span className="text-gray-400">الموقع:</span> المملكة العربية السعودية</p>
                    <p><span className="text-gray-400">اللغة:</span> العربية</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default Channel;
