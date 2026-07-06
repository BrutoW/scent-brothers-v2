import React from 'react';
import { Drama as Instagram, MessageCircle } from 'lucide-react';

export const SocialLinks: React.FC = () => {
  return (
    <div className="flex gap-4">
      <a
        href="https://www.instagram.com/scent.brothersmx"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-700 hover:text-gray-900 transition-colors"
      >
        <Instagram size={24} />
      </a>
      <a
        href="https://wa.me/3348279597"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-700 hover:text-gray-900 transition-colors"
      >
        <MessageCircle size={24} />
      </a>
    </div>
  );
};
