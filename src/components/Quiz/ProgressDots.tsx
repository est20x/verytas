'use client';

import { sections } from '@/components/Quiz/data';

export const ProgressDots = ({ sectionIndex }: { sectionIndex: number }) => {
  return (
    <div className="absolute bottom-[16px] lg:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
      {sections.map((_, i) => (
        <div
          key={i}
          className={`h-[6px] w-[6px] lg:h-[9px] lg:w-[9px] rounded-full ${
            i <= sectionIndex ? 'bg-morange' : 'bg-gray-300'
          }`}
        ></div>
      ))}
    </div>
  );
};
