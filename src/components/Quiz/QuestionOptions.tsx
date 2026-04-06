'use client';

import { QuestionOptionsProps } from '@/components/types';

export const QuestionOptions: React.FC<QuestionOptionsProps> = ({ options, selectedAnswer, onAnswer }) => {
  return (
    <div className="flex flex-col items-center w-full flex-grow">
      {options.map((opt, j) => (
        <button
          key={j}
          className={`block w-[300px]  h-[43px] lg:h-[55px] text-[12px] lg:w-[556px] lg:text-base font-helvetica p-3 border mt-2 rounded-3xl ${
            selectedAnswer === j ? 'bg-morange text-white' : 'bg-white'
          }`}
          onClick={() => onAnswer(j)}
        >
          {opt}
        </button>
      ))}
    </div>
  );
};
