//Success ve Error durumuna göre uygulamanın istediğim sayfasında toast mesajı göstemek için oluşturduğum component
import React, { useState, useEffect } from 'react';
import { MdCheckCircle, MdError } from 'react-icons/md';

export default function Index({ message, type, onClose }) {

  const [visible, setVisible] = useState(true);

  // Toast mesajının görüntülenmesi ve 2 saniye sonra akrandan kaldırılmasını sağlayan işlemler
  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 2000);
    return () => clearTimeout(timer);
  }, [message, type]);

  if (!visible) return null;

  // Success ve error durumuna göre eklenecek olan class isimleri
  const toastStyles = {
    base: 'toast z-10 fixed top-4 left-1/2 transform -translate-x-1/2 w-80 mx-2 px-4 py-6 rounded-lg shadow-lg text-white flex items-center',
    error: 'bg-error',
    success: 'bg-success',
  };
  const icon = type === 'error' ? <MdError size={24} /> : <MdCheckCircle size={24} />;

  return (
    <div className={`${toastStyles.base} ${toastStyles[type]}`}>
      <div>{icon}</div>
      <span className="ms-2">{message}</span>
    </div>
  );
}
