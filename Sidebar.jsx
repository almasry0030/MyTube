
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, 
  TrendingUp, 
  Music, 
  Gamepad2, 
  Newspaper, 
  Trophy, 
  Lightbulb,
  Shirt,
  Podcast,
  Library,
  History,
  PlaySquare,
  Clock,
  ThumbsUp,
  Download,
  Settings,
  HelpCircle,
  Flag
} from 'lucide-react';
import { useVideo } from '@/contexts/VideoContext';
import { toast } from '@/components/ui/use-toast';

const Sidebar = () => {
  const { sidebarCollapsed } = useVideo();
  const location = useLocation();

  const handleFeatureClick = (featureName) => {
    toast({
      title: `📱 ${featureName}`,
      description: "🚧 هذه الميزة غير متاحة حالياً—لكن لا تقلق! يمكنك طلبها في رسالتك التالية! 🚀",
    });
  };

  const mainItems = [
    { icon: Home, label: 'الرئيسية', path: '/' },
    { icon: TrendingUp, label: 'الشائع', path: '/trending' },
    { icon: Library, label: 'المكتبة', path: '/library' }
  ];

  const exploreItems = [
    { icon: Music, label: 'الموسيقى' },
    { icon: Gamepad2, label: 'الألعاب' },
    { icon: Newspaper, label: 'الأخبار' },
    { icon: Trophy, label: 'الرياضة' },
    { icon: Lightbulb, label: 'التعلم' },
    { icon: Shirt, label: 'الموضة والجمال' },
    { icon: Podcast, label: 'البودكاست' }
  ];

  const libraryItems = [
    { icon: History, label: 'السجل' },
    { icon: PlaySquare, label: 'فيديوهاتك' },
    { icon: Clock, label: 'مشاهدة لاحقاً' },
    { icon: ThumbsUp, label: 'الفيديوهات المعجب بها' },
    { icon: Download, label: 'التنزيلات' }
  ];

  const settingsItems = [
    { icon: Settings, label: 'الإعدادات' },
    { icon: HelpCircle, label: 'المساعدة' },
    { icon: Flag, label: 'إرسال ملاحظات' }
  ];

  const SidebarItem = ({ icon: Icon, label, path, onClick }) => {
    const isActive = path && location.pathname === path;
    
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {path ? (
          <Link
            to={path}
            className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
              isActive 
                ? 'bg-gray-800 text-white' 
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            } ${sidebarCollapsed ? 'justify-center' : 'space-x-3 rtl:space-x-reverse'}`}
          >
            <Icon className="h-6 w-6 flex-shrink-0" />
            {!sidebarCollapsed && <span className="text-sm font-medium">{label}</span>}
          </Link>
        ) : (
          <button
            onClick={() => onClick ? onClick() : handleFeatureClick(label)}
            className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors text-gray-300 hover:bg-gray-800 hover:text-white ${
              sidebarCollapsed ? 'justify-center' : 'space-x-3 rtl:space-x-reverse'
            }`}
          >
            <Icon className="h-6 w-6 flex-shrink-0" />
            {!sidebarCollapsed && <span className="text-sm font-medium">{label}</span>}
          </button>
        )}
      </motion.div>
    );
  };

  const SidebarSection = ({ title, items, showDivider = true }) => (
    <div className="space-y-1">
      {!sidebarCollapsed && title && (
        <h3 className="px-3 py-2 text-sm font-semibold text-gray-400 uppercase tracking-wider">
          {title}
        </h3>
      )}
      {items.map((item, index) => (
        <SidebarItem key={index} {...item} />
      ))}
      {showDivider && !sidebarCollapsed && <hr className="my-4 border-gray-700" />}
    </div>
  );

  return (
    <motion.aside
      initial={{ x: -240 }}
      animate={{ x: 0 }}
      className={`fixed top-16 left-0 h-[calc(100vh-64px)] bg-[#0f0f0f] border-r border-gray-800 transition-all duration-300 z-40 ${
        sidebarCollapsed ? 'w-[72px]' : 'w-60'
      }`}
    >
      <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
        <div className="p-3 space-y-1">
          <SidebarSection items={mainItems} showDivider={!sidebarCollapsed} />
          
          {!sidebarCollapsed && (
            <>
              <SidebarSection title="استكشف" items={exploreItems} />
              <SidebarSection title="المكتبة" items={libraryItems} />
              <SidebarSection title="المزيد" items={settingsItems} showDivider={false} />
            </>
          )}
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
