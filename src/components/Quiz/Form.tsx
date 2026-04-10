'use client';

import { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import { formFields } from '@/components/Quiz/data';
import { FormDataType, FormProps } from '@/components/types';
import { motion } from 'framer-motion';
import { ThankYouSlide } from './ThankYouSlide';

export const Form: React.FC<FormProps> = ({ onSubmit, onBack }) => {
  const [formData, setFormData] = useState<FormDataType>({ name: '', email: '', phone: '' });
  const [countryCode, setCountryCode] = useState('ua');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; phone?: string }>({});
  const [justSubmitted, setJustSubmitted] = useState(false);

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then((res) => res.json())
      .then((data) => {
        if (data.country_code) {
          setCountryCode(data.country_code.toLowerCase());
        }
      })
      .catch(() => console.error('Не удалось определить страну'));
  }, []);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name as keyof FormDataType;
    setFormData((prev) => ({ ...prev, [fieldName]: e.target.value }));
  };

  const handlePhoneChange = (value: string) => {
    setFormData((prev) => ({ ...prev, phone: value }));
  };

  const validateForm = () => {
    let valid = true;
    let newErrors: { email?: string; phone?: string } = {};

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Некоректний email';
      valid = false;
    }

    if (!/^\d{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Некоректний номер телефону';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = () => {
    if (isSubmitting) return;
    if (!validateForm()) return;

    setIsSubmitting(true);

    if (window.fbq) {
      window.fbq('track', 'Lead');
    }

    onSubmit(formData);
    setJustSubmitted(true);
    setIsSubmitting(false);
  };

  if (justSubmitted) {
    return <ThankYouSlide onRestart={() => setJustSubmitted(false)} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="w-full lg:max-w-[668px] max-w-[320px] h-[600px] sm:h-[648px] lg:h-[780px] bg-white rounded-[50px] shadow-lg flex flex-col items-center px-6 lg:px-10 py-8 mt-5"
    >
      <h2 className="text-[27px] lg:text-4xl font-helvetica font-bold text-center mb-4">
        Собираем информацию для связи с Вами
      </h2>
      <p className="text-gray-500 text-center mb-6 font-helvetica text-sm lg:text-lg">
        Заполните форму ниже
      </p>

      {formFields.map((field) => (
        <div key={field.name} className="w-full mb-4">
          <label className="block text-sm lg:text-lg font-helvetica font-semibold mb-2">{field.label}</label>
          {field.name === 'phone' ? (
            <>
              <PhoneInput
                country={countryCode}
                value={formData.phone}
                onChange={handlePhoneChange}
                inputClass="lg:max-w-[578px] !w-full border border-gray-300 p-3 lg:p-4 !rounded-3xl lg:!text-base !text-xs pl-12 !lg:w-[778px] !w-[378px] lg:!h-[65px] !h-[50px]"
                buttonClass="bg-white border border-gray-300"
                containerClass="w-full"
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </>
          ) : (
            <>
              <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                value={formData[field.name]}
                onChange={handleFormChange}
                className="w-full border focus:border-morange focus:outline-none border-gray-300 p-3 lg:p-4 rounded-3xl text-xs lg:text-base"
                required
              />
              {field.name === 'email' && errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </>
          )}
        </div>
      ))}

      <div className="flex flex-row lg:flex-col gap-4 lg:mt-6 mt-[1px] w-full justify-center items-center">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-1/2 lg:w-[346px] h-[50px] lg:h-[86px] bg-morange text-white text-xs lg:text-lg font-helvetica p-4 rounded-full flex items-center justify-center transition"
        >
          {isSubmitting ? 'Отправка...' : 'Связаться с юристом'}
        </button>
        <button
          onClick={onBack}
          className="w-1/2 lg:w-[226px] h-[50px] lg:h-[60px] border border-morange text-black text-sm lg:text-lg font-helvetica p-4 rounded-full flex items-center justify-center transition"
        >
          Назад
        </button>
      </div>
    </motion.div>
  );
};
