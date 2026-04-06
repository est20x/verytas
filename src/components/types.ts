export type FormDataType = {
  name: string;
  // email: string;
  phone: string;
};

export interface QuestionOptionsProps {
  options: string[];
  selectedAnswer: number;
  onAnswer: (optionIndex: number) => void;
}

export interface ThankYouSlideProps {
  onRestart: () => void;
}

export interface FormProps {
  onSubmit: (data: FormDataType) => void;
  onBack: () => void;
}
