import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

const CommentsSection = ({ comments, setComments }) => {
  const [newComment, setNewComment] = useState('');

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        author: 'أنت',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face',
        text: newComment,
        time: 'الآن',
        likes: 0
      };
      setComments([comment, ...comments]);
      setNewComment('');
      toast({
        title: "💬 تعليق جديد",
        description: "تم إضافة تعليقك بنجاح",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="space-y-6"
    >
      <h3 className="text-lg font-semibold text-white">
        {comments.length} تعليق
      </h3>

      <form onSubmit={handleAddComment} className="space-y-3">
        <div className="flex items-start space-x-3 rtl:space-x-reverse">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face"
            alt="أنت"
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-1">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="إضافة تعليق..."
              className="comment-input"
              dir="rtl"
            />
          </div>
        </div>
        
        {newComment && (
          <div className="flex justify-end space-x-2 rtl:space-x-reverse">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setNewComment('')}
              className="text-gray-400 hover:text-white"
            >
              إلغاء
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              تعليق
            </Button>
          </div>
        )}
      </form>

      <div className="space-y-4">
        {comments.map((comment) => (
          <motion.div
            key={comment.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-start space-x-3 rtl:space-x-reverse"
          >
            <img
              src={comment.avatar}
              alt={comment.author}
              className="w-10 h-10 rounded-full"
            />
            
            <div className="flex-1 space-y-1">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <span className="font-medium text-white text-sm">
                  {comment.author}
                </span>
                <span className="text-gray-400 text-xs">
                  {comment.time}
                </span>
              </div>
              
              <p className="text-gray-300 text-sm">{comment.text}</p>
              
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white p-0 h-auto"
                >
                  <ThumbsUp className="h-4 w-4 ml-1" />
                  {comment.likes}
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white p-0 h-auto"
                >
                  <ThumbsDown className="h-4 w-4" />
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white p-0 h-auto text-xs"
                >
                  رد
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default CommentsSection;