
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, Search, Mic, VideoOff as VideoPlus, Bell, User, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useVideo } from '@/contexts/VideoContext';
import { toast } from '@/components/ui/use-toast';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { toggleSidebar } = useVideo();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast({
        title: "🔍 البحث",
        description: `البحث عن: ${searchQuery}`,
      });
      // In a real app, this would navigate to search results
    }
  };

  const handleVoiceSearch = () => {
    toast({
      title: "🎤 البحث الصوتي",
      description: "🚧 هذه الميزة غير متاحة حالياً—لكن لا تقلق! يمكنك طلبها في رسالتك التالية! 🚀",
    });
  };

  const handleCreateVideo = () => {
    toast({
      title: "📹 إنشاء فيديو",
      description: "🚧 هذه الميزة غير متاحة حالياً—لكن لا تقلق! يمكنك طلبها في رسالتك التالية! 🚀",
    });
  };

  const handleNotifications = () => {
    toast({
      title: "🔔 الإشعارات",
      description: "🚧 هذه الميزة غير متاحة حالياً—لكن لا تقلق! يمكنك طلبها في رسالتك التالية! 🚀",
    });
  };

  const handleProfile = () => {
    toast({
      title: "👤 الملف الشخصي",
      description: "🚧 هذه الميزة غير متاحة حالياً—لكن لا تقلق! يمكنك طلبها في رسالتك التالية! 🚀",
    });
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#0f0f0f] border-b border-gray-800 px-4 py-2"
    >
      <div className="flex items-center justify-between">
        {/* Left section */}
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="text-white hover:bg-gray-800"
          >
            <Menu className="h-6 w-6" />
          </Button>
          
          <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse">
            <Youtube className="h-8 w-8 text-red-600" />
            <span className="text-xl font-bold text-white hidden sm:block">يوتيوب</span>
          </Link>
        </div>

        {/* Center section - Search */}
        <div className="flex-1 max-w-2xl mx-4">
          <form onSubmit={handleSearch} className="flex items-center">
            <div className="flex-1 flex">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="بحث"
                className="w-full px-4 py-2 bg-[#121212] border border-gray-600 rounded-r-full text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                dir="rtl"
              />
              <Button
                type="submit"
                className="px-6 py-2 bg-gray-800 border border-gray-600 border-r-0 rounded-l-full hover:bg-gray-700"
              >
                <Search className="h-5 w-5 text-gray-300" />
              </Button>
            </div>
            
            <Button
              type="button"
              onClick={handleVoiceSearch}
              size="icon"
              className="ml-2 bg-gray-800 hover:bg-gray-700 rounded-full"
            >
              <Mic className="h-5 w-5 text-gray-300" />
            </Button>
          </form>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCreateVideo}
            className="text-white hover:bg-gray-800"
          >
            <VideoPlus className="h-6 w-6" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNotifications}
            className="text-white hover:bg-gray-800 relative"
          >
            <Bell className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              3
            </span>
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handleProfile}
            className="text-white hover:bg-gray-800"
          >
            <User className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
