
import React, { useEffect, useState } from 'react';

interface NotificationProps {
  message: string;
}

const Notification: React.FC<NotificationProps> = ({ message }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 2700); // A bit shorter than the App's timeout to allow fade out
      return () => clearTimeout(timer);
    } else {
      setVisible(false);
    }
  }, [message]);

  return (
    <div
      className={`fixed bottom-5 right-5 bg-gray-900 text-white py-3 px-6 rounded-lg shadow-xl transform transition-all duration-300 ease-in-out
        ${visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
      style={{ pointerEvents: 'none' }}
    >
      {message}
    </div>
  );
};

export default Notification;
