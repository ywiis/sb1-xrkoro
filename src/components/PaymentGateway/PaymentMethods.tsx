import React from 'react';
import { CreditCard, Smartphone, Building } from 'lucide-react';
import { usePayment } from './PaymentContext';

export default function PaymentMethods() {
  const { state, dispatch } = usePayment();

  const methods = [
    {
      id: 'card',
      name: 'Credit Card',
      icon: CreditCard,
      description: 'Pay securely with your credit or debit card',
    },
    {
      id: 'wallet',
      name: 'Digital Wallet',
      icon: Smartphone,
      description: 'Apple Pay, Google Pay, or other digital wallets',
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      icon: Building,
      description: 'Direct transfer from your bank account',
    },
  ];

  const handleMethodSelect = (methodId: string) => {
    dispatch({ type: 'SET_METHOD', payload: methodId as any });
    dispatch({ type: 'SET_STEP', payload: 'details' });
  };

  if (state.step !== 'method') return null;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Method</h2>
      <div className="space-y-3">
        {methods.map((method) => (
          <button
            key={method.id}
            onClick={() => handleMethodSelect(method.id)}
            className={`w-full flex items-center p-4 border-2 rounded-lg transition-all ${
              state.method === method.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <method.icon
              className={`w-6 h-6 ${
                state.method === method.id ? 'text-blue-500' : 'text-gray-400'
              }`}
            />
            <div className="ml-4 text-left">
              <p className="font-medium text-gray-900">{method.name}</p>
              <p className="text-sm text-gray-500">{method.description}</p>
            </div>
            <div
              className={`ml-auto w-5 h-5 rounded-full border-2 ${
                state.method === method.id
                  ? 'border-blue-500 bg-blue-500'
                  : 'border-gray-300'
              }`}
            >
              {state.method === method.id && (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}