import React, { useState } from 'react';
import { Lock } from 'lucide-react';
import { usePayment } from './PaymentContext';
import CreditCardVisual from './CreditCardVisual';

export default function PaymentForm() {
  const { state, dispatch } = usePayment();
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
  });

  const detectCardType = (number: string): void => {
    const cleanNumber = number.replace(/\s/g, '');
    let cardType: 'visa' | 'mastercard' | 'amex' | 'discover' | undefined;

    if (/^4/.test(cleanNumber)) cardType = 'visa';
    else if (/^5[1-5]/.test(cleanNumber)) cardType = 'mastercard';
    else if (/^3[47]/.test(cleanNumber)) cardType = 'amex';
    else if (/^6(?:011|5)/.test(cleanNumber)) cardType = 'discover';
    else cardType = undefined;

    dispatch({ type: 'SET_CARD_TYPE', payload: cardType });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cardNumber') {
      formattedValue = value
        .replace(/\s/g, '')
        .replace(/(\d{4})/g, '$1 ')
        .trim();
      detectCardType(formattedValue);
    } else if (name === 'expiry') {
      formattedValue = value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .slice(0, 5);
    }

    setFormData(prev => ({ ...prev, [name]: formattedValue }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      dispatch({ type: 'SET_STEP', payload: '2fa' });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Payment processing failed' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  if (state.step !== 'details') return null;

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6">
      <CreditCardVisual
        focusedField={focusedField}
        cardNumber={formData.cardNumber}
        cardName={formData.cardName}
        expiry={formData.expiry}
      />

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Card Number</label>
          <div className="mt-1 relative">
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleInputChange}
              onFocus={() => setFocusedField('cardNumber')}
              onBlur={() => setFocusedField(null)}
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="4242 4242 4242 4242"
              maxLength={19}
              required
            />
            {state.cardType && (
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                {state.cardType}
              </span>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Cardholder Name</label>
          <input
            type="text"
            name="cardName"
            value={formData.cardName}
            onChange={handleInputChange}
            onFocus={() => setFocusedField('cardName')}
            onBlur={() => setFocusedField(null)}
            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
            <input
              type="text"
              name="expiry"
              value={formData.expiry}
              onChange={handleInputChange}
              onFocus={() => setFocusedField('expiry')}
              onBlur={() => setFocusedField(null)}
              placeholder="MM/YY"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              maxLength={5}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">CVV</label>
            <input
              type="password"
              name="cvv"
              value={formData.cvv}
              onChange={handleInputChange}
              onFocus={() => setFocusedField('cvv')}
              onBlur={() => setFocusedField(null)}
              placeholder="•••"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              maxLength={4}
              required
            />
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="saveCard"
            checked={state.savePaymentMethod}
            onChange={() => dispatch({ type: 'TOGGLE_SAVE_METHOD' })}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="saveCard" className="ml-2 block text-sm text-gray-700">
            Save this card for future payments
          </label>
        </div>

        <button
          type="submit"
          disabled={state.loading}
          className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {state.loading ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <Lock className="w-5 h-5 mr-2" />
              Continue to Verification
            </>
          )}
        </button>
      </div>
    </form>
  );
}