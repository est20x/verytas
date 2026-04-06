'use client';

import { useState } from 'react';
import { sections } from '@/components/Quiz/data';
import { Form } from '@/components/Quiz/Form';
import { ProgressDots } from '@/components/Quiz/ProgressDots';
import { QuestionOptions } from '@/components/Quiz/QuestionOptions';
import { ThankYouSlide } from '@/components/Quiz/ThankYouSlide';
import { FormDataType } from '@/components/types';
import { motion, AnimatePresence } from 'framer-motion';

export const Quiz = () => {
  const [answers, setAnswers] = useState<number[][]>(sections.map((sec) => Array(sec.questions.length).fill(-1)));
  const [sectionIndex, setSectionIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleAnswer = (optionIndex: number) => {
    setAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[sectionIndex][questionIndex] = optionIndex;
      return newAnswers;
    });
  };

  const handleNext = () => {
    if (questionIndex < sections[sectionIndex].questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else if (sectionIndex < sections.length - 1) {
      setSectionIndex(sectionIndex + 1);
      setQuestionIndex(0);
    } else {
      setIsFormVisible(true);
    }
  };

  const handleBack = () => {
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
    } else if (sectionIndex > 0) {
      setSectionIndex(sectionIndex - 1);
      setQuestionIndex(sections[sectionIndex - 1].questions.length - 1);
    }
  };

  const handleFormSubmit = async (formData: FormDataType) => {
    const userAnswers = sections
      .map((section, i) => {
        return section.questions.map((question, j) => {
          return {
            question: question.question,
            option: question.options[answers[i][j]],
          };
        });
      })
      .flat();

    try {
      const response = await fetch('/api/sendForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          answers: userAnswers,
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        console.error('Не вдалося надіслати форму');
      }
    } catch (error) {
      console.error('Помилка при відправці:', error);
    }
  };

  const handleRestart = () => {
    setIsSuccess(false);
    setSectionIndex(0);
    setQuestionIndex(0);
    setAnswers(sections.map((sec) => Array(sec.questions.length).fill(-1)));
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative isolate">
    <div className="absolute top-[-20px] left-2 lg:top-4 lg:left-6 z-[50]">
  <div className="flex items-center space-x-2 lg:space-x-4 ">
    <img
      src="/log.png"
      alt="Логотип"
className="w-[85px] h-auto sm:w-[85px] lg:w-44 "
    />
    {/* <p className="text-sm lg:text-lg font-medium text-black">Europravo</p> */}
  </div>
</div>

      {isSuccess ? (
        <ThankYouSlide onRestart={handleRestart} />
      ) : isFormVisible ? (
        <Form onSubmit={handleFormSubmit} onBack={() => setIsFormVisible(false)} />
      ) : (
        <div className="bg-white rounded-[50px] z-0 shadow-lg relative flex flex-col w-[320px] h-[600px] sm:w-[375px] sm:h-[648px] lg:w-[668px] lg:h-[780px] mt-[35px] sm:mt-[20px] lg:mt-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${sectionIndex}-${questionIndex}`} 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center px-4"
          >
            <h1 className="text-center mb-2 text-xl sm:text-xl lg:text-4xl font-bold mt-6 sm:mt-6 lg:mt-8">
              {sections[sectionIndex].questions[questionIndex].question}
            </h1>

            <div className="text-center leading-[12px] text-xs sm:text-sm text-gray-500 mb-2">
              {`${(sectionIndex + 1).toString().padStart(2, '0')} / ${sections.length.toString().padStart(2, '0')}`}
            </div>

            <QuestionOptions
              options={sections[sectionIndex].questions[questionIndex].options}
              selectedAnswer={answers[sectionIndex][questionIndex]}
              onAnswer={handleAnswer}
            />

          
          </motion.div>
          <ProgressDots sectionIndex={sectionIndex} />
        </AnimatePresence>

          {sectionIndex > 0 && (
            <button
              onClick={handleBack}
              className="absolute bottom-6 left-4 sm:bottom-8 sm:left-6 lg:bottom-[36px] lg:left-[55px] border border-morange text-borderBlue px-4 py-2 sm:px-6 sm:py-3 rounded-full w-24 h-10 sm:w-32 sm:h-12 lg:w-[226px] lg:h-[74px] flex items-center justify-center text-xs sm:text-sm lg:text-base"
            >
              Назад
            </button>
          )}

          <button
            onClick={handleNext}
            className="absolute bottom-6 right-4 sm:bottom-8 sm:right-6 lg:bottom-[36px] lg:right-[55px] bg-morange text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full w-24 h-10 sm:w-32 sm:h-12 lg:w-[226px] lg:h-[74px] flex items-center justify-center text-xs sm:text-sm lg:text-base"
            disabled={answers[sectionIndex][questionIndex] === -1}
          >
            Дальше
          </button>
        </div>
      )}
    </div>
  );
};
