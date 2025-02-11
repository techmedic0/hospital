import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Slider from '@radix-ui/react-slider';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface Question {
  id: number;
  type: 'multiple' | 'boolean' | 'slider';
  question: string;
  options?: string[];
  min?: number;
  max?: number;
}

const questions: Question[] = [
  {
    id: 1,
    type: 'multiple',
    question: 'How would you rate your overall health?',
    options: ['Excellent', 'Good', 'Fair', 'Poor'],
  },
  {
    id: 2,
    type: 'boolean',
    question: 'Do you exercise regularly (at least 3 times a week)?',
  },
  {
    id: 3,
    type: 'slider',
    question: 'How many hours of sleep do you get on average?',
    min: 4,
    max: 12,
  },
];

const HealthQuiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (answer: any) => {
    setAnswers({ ...answers, [questions[currentQuestion].id]: answer });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const renderQuestion = () => {
    const question = questions[currentQuestion];
    const answer = answers[question.id];

    switch (question.type) {
      case 'multiple':
        return (
          <div className="space-y-4">
            {question.options?.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                className={`w-full p-4 rounded-lg border transition-all duration-300 ${
                  answer === option
                    ? 'border-primary-teal bg-background-mint text-primary-teal'
                    : 'border-gray-200 hover:border-primary-teal'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        );

      case 'boolean':
        return (
          <div className="flex gap-4">
            <button
              onClick={() => handleAnswer(true)}
              className={`flex-1 p-4 rounded-lg border transition-all duration-300 ${
                answer === true
                  ? 'border-primary-teal bg-background-mint text-primary-teal'
                  : 'border-gray-200 hover:border-primary-teal'
              }`}
            >
              Yes
            </button>
            <button
              onClick={() => handleAnswer(false)}
              className={`flex-1 p-4 rounded-lg border transition-all duration-300 ${
                answer === false
                  ? 'border-primary-teal bg-background-mint text-primary-teal'
                  : 'border-gray-200 hover:border-primary-teal'
              }`}
            >
              No
            </button>
          </div>
        );

      case 'slider':
        return (
          <div className="px-4">
            <Slider.Root
              className="relative flex items-center select-none touch-none w-full h-5"
              value={[answer ?? question.min ?? 0]}
              max={question.max}
              min={question.min}
              step={1}
              onValueChange={(value) => handleAnswer(value[0])}
            >
              <Slider.Track className="bg-background-mint relative grow rounded-full h-2">
                <Slider.Range className="absolute bg-primary-teal rounded-full h-full" />
              </Slider.Track>
              <Slider.Thumb
                className="block w-5 h-5 bg-white border-2 border-primary-teal rounded-full hover:bg-background-mint focus:outline-none"
                aria-label="Volume"
              />
            </Slider.Root>
            <div className="mt-2 text-center font-medium">{answer ?? question.min} hours</div>
          </div>
        );
    }
  };

  const renderResults = () => {
    // Simple health tips based on answers
    const tips = [];
    
    if (answers[1] === 'Poor' || answers[1] === 'Fair') {
      tips.push('Consider scheduling a check-up with your primary care physician.');
    }
    
    if (answers[2] === false) {
      tips.push('Try to incorporate regular exercise into your routine, starting with 30 minutes of walking.');
    }
    
    if (answers[3] < 7) {
      tips.push('Aim for 7-9 hours of sleep per night for optimal health.');
    }

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <h3 className="text-xl font-semibold mb-4">Your Health Recommendations</h3>
        <div className="space-y-4">
          {tips.map((tip, index) => (
            <div
              key={index}
              className="p-4 bg-background-mint rounded-lg border border-primary-teal/20"
            >
              {tip}
            </div>
          ))}
        </div>
        <button
          onClick={() => {
            setCurrentQuestion(0);
            setAnswers({});
            setShowResults(false);
          }}
          className="btn-primary w-full"
        >
          Take Quiz Again
        </button>
      </motion.div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <AnimatePresence mode="wait">
        {!showResults ? (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Health Assessment Quiz</h2>
              <div className="text-sm font-medium">
                Question {currentQuestion + 1} of {questions.length}
              </div>
            </div>

            <div className="h-2 bg-background-mint rounded-full">
              <motion.div
                className="h-full bg-primary-teal rounded-full"
                initial={{ width: 0 }}
                animate={{
                  width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-medium">{questions[currentQuestion].question}</h3>
              {renderQuestion()}
            </div>

            <div className="flex justify-between gap-4">
              <button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                  currentQuestion === 0
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-background-mint'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
                Previous
              </button>
              <button
                onClick={handleNext}
                disabled={!answers[questions[currentQuestion].id]}
                className={`btn-primary flex items-center gap-2 ${
                  !answers[questions[currentQuestion].id] && 'opacity-50 cursor-not-allowed'
                }`}
              >
                {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            {renderResults()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HealthQuiz;