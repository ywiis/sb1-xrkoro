import React from 'react';
import { usePayment } from './PaymentContext';

interface Props {
  focusedField: string | null;
  cardNumber: string;
  cardName: string;
  expiry: string;
}

export default function CreditCardVisual({ focusedField, cardNumber, cardName, expiry }: Props) {
  const { state } = usePayment();
  
  const formatCardNumber = (number: string) => {
    return number.padEnd(16, '•').match(/.{1,4}/g)?.join(' ') || '';
  };

  return (
    <div className="perspective-1000 relative h-48 w-[340px] transition-transform duration-700 mx-auto mb-8">
      <div className="relative h-full w-full rounded-2xl bg-gradient-to-br from-blue-600 to-blue-400 p-6 text-white shadow-xl">
        <div className="absolute right-6 top-4">
          {state.cardType === 'mastercard' && (
            <div className="flex">
              <div className="h-8 w-8 rounded-full bg-red-500 opacity-80"></div>
              <div className="h-8 w-8 -ml-4 rounded-full bg-yellow-400 opacity-80"></div>
            </div>
          )}
        </div>

        <div className="mt-8">
          <div className={`mb-4 transition-all ${focusedField === 'cardNumber' ? 'scale-105 brightness-110' : ''}`}>
            <p className="text-xs text-blue-100 mb-1">Card Number</p>
            <p className="font-mono text-xl tracking-wider">
              {formatCardNumber(cardNumber)}
            </p>
          </div>

          <div className="flex justify-between">
            <div className={`transition-all ${focusedField === 'cardName' ? 'scale-105 brightness-110' : ''}`}>
              <p className="text-xs text-blue-100 mb-1">Card Holder</p>
              <p className="font-medium tracking-wide">
                {cardName || 'YOUR NAME'}
              </p>
            </div>

            <div className={`transition-all ${focusedField === 'expiry' ? 'scale-105 brightness-110' : ''}`}>
              <p className="text-xs text-blue-100 mb-1">Expires</p>
              <p className="font-medium">{expiry || 'MM/YY'}</p>
            </div>
          </div>
        </div>

        {focusedField === 'cvv' && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80 rounded-2xl backdrop-blur-sm">
            <div className="text-center">
              <p className="text-sm mb-2">CVV is on the back of your card</p>
              <div className="w-16 h-8 bg-white/20 rounded flex items-center justify-center mx-auto">
                <p className="font-mono">•••</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}