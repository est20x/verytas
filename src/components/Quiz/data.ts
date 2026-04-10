import { FormDataType } from "@/components/types";

export const sections = [
  {
    title: "Секція 1",
    questions: [
      { question: "Какая сумма была Вами переведена?", 
        options: ["Менее 1.000€", "1.000€ - 5.000€", "5.000€ - 25.000€", "25.000€ - 100.000€", "Более 100.000€"] },
    ]
  },
  {
    title: "Секція 2",
    questions: [
      { question: "Какой основной вид деятельности обманувшей вас компании?", 
        options: ["Брокерская компания", "Финансовая пирамида", "Криптовалютная биржа", "Инвестиционный фонд", "Азартные игры", "Халяль Инвестиции / Сека", "Другое"] },
    ]
  },
  {
    title: "Секція 3",
    questions: [
      { question: "Пробовали ли Вы вернуть свои деньги?", 
        options: ["Не пытался(-ась) никак", "Обращались в юридические компании", "Обращались в правоохранительные органы", "Обращались в органы регуляции", "Другое"] },
    ]
  },
  {
    title: "Секція 4",
    questions: [
      { question: "Каким образом вы переводили деньги?", 
        options: ["Банковская карта", "Наличные деньги", "Банковский перевод", "Криптовалюты", "Электронные деньги", "Другое"] },
    ]
  }
];

export const formFields: { label: string; name: keyof FormDataType; type: string; placeholder: string; required?: boolean }[] = [
  { label: "Ваше имя:", name: "name", type: "text", placeholder: "Введите свое имя", required: true },
 { label: "Ваш email:", name: "email", type: "email", placeholder: "Введите свой email", required: true },
  { label: "Ваш номер телефона для связи:", name: "phone", type: "tel", placeholder: "Введите свой номер телефона", required: false },
];
