import React from 'react';
import { usePayment } from './PaymentContext';

export default function ProgressSteps() {
  const { state } = usePayment();
  
  const steps = [
    { id: 'method', name: 'Payment Method' },
    { id: 'details', name: 'Payment Details' },
    { id: '2fa', name: 'Verification' },
    { id: 'confirmation', name: 'Confirmation' },
  ];

  const currentStepIndex = steps.findIndex(step => step.id === state.step);

  return (
    <div className="hidden sm:block">
      <nav aria-label="Progress">
        <ol role="list" className="flex items-center justify-between">
          {steps.map((step, index) => (
            <li key={step.id} className="relative flex-1">
              {index !== 0 && (
                <div
                  className={`absolute left-0 right-0 top-4 h-0.5 -translate-y-1/2 ${
                    index <= currentStepIndex ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                  aria-hidden="true"
                />
              )}
              <div
                className={`relative flex items-center justify-center ${
                  index <= currentStepIndex ? 'text-blue-600' : 'text-gray-500'
                }`}
              >
                <span
                  className={`h-8 w-8 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
                    index <= currentStepIndex
                      ? 'border-blue-600 bg-blue-600 text-white'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  {index + 1}
                </span>
                <span className="absolute top-10 text-sm font-medium">
                  {step.name}
                </span>
              </div>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}