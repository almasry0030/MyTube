
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import Home from '@/pages/Home';
import Watch from '@/pages/Watch';
import Channel from '@/pages/Channel';
import Library from '@/pages/Library';
import Trending from '@/pages/Trending';
import { VideoProvider } from '@/contexts/VideoContext';

function App() {
  return (
    <VideoProvider>
      <Router>
        <div className="min-h-screen bg-[#0f0f0f] text-white">
          <Helmet>
            <title>يوتيوب - شاهد، شارك، واكتشف</title>
            <meta name="description" content="منصة مشاركة الفيديوهات الرائدة في العالم. شاهد مقاطع الفيديو المفضلة لديك، اشترك في القنوات، وشارك المحتوى مع الأصدقاء." />
          </Helmet>
          
          <Navbar />
          
          <div className="flex">
            <Sidebar />
            
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/watch/:id" element={<Watch />} />
                <Route path="/channel/:id" element={<Channel />} />
                <Route path="/library" element={<Library />} />
                <Route path="/trending" element={<Trending />} />
              </Routes>
            </main>
          </div>
          
          <Toaster />
        </div>
      </Router>
    </VideoProvider>
  );
}

export default App;
