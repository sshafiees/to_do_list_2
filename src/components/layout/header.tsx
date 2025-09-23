import Image from 'next/image';
import React, { memo } from 'react';

const Header = memo(function Header() {
  return (
    <header role="banner" aria-label="هدر اصلی اپلیکیشن">
      <div className="shadow-md bg-white">
        <div className="container mx-auto py-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Image
                src="/logo.png"
                alt="لوگوی اپلیکیشن مدیریت وظایف"
                width={32}
                height={32}
                priority
                sizes="32px"
                className="object-contain"
              />
              <h1 className="text-lg font-semibold mr-4">مدیریت وظایف من</h1>
            </div>
            <div className="flex items-center" role="complementary" aria-label="اطلاعات کاربر">
              <Image
                src="/avatar.png"
                alt="آواتار کاربر"
                width={32}
                height={32}
                priority
                sizes="32px"
                className="object-contain rounded-full"
              />
              <span className="mr-2" aria-label="پیام خوشامدگویی">خوش آمدید!</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
});

export default Header;
