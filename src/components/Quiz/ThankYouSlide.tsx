'use client';

import { ThankYouSlideProps } from '@/components/types';

export const ThankYouSlide: React.FC<ThankYouSlideProps> = ({ onRestart }) => {
  return (
    <div className="w-[376px] h-[183px] lg:w-[668px] lg:h-[327px] bg-white rounded-lg shadow-lg flex flex-col items-center justify-center">
      <h2 className="text-[24px] lg:text-4xl font-helvetica font-bold text-center mb-2 lg:mb-4">
        Спасибо за заполнение <br /> заявки
      </h2>
      <p className="text-[12px] lg:text-sm text-center text-gray-600">
        В ближайшее время с вами <br /> свяжется наш юрист
      </p>
    </div>
  );
};
