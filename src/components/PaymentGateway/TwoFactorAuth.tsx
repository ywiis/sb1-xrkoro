import React, { useState } from 'react';
import { Shield, CheckCircle2 } from 'lucide-react';
import { usePayment } from './PaymentContext';

export default function TwoFactorAuth() {
  const { state, dispatch } = usePayment();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const inputs = Array(6).fill(0);

  React.useEffect(() => {
    if (state.step === '2fa' && timer > 0) {
      const interval = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [state.step, timer]);

  const handleVerification = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      // Simulate API verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      dispatch({ type: 'SET_VERIFIED', payload: true });
      dispatch({ type: 'SET_STEP', payload: 'confirmation' });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Verification failed' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const handleChange = async (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }

    // Submit when all digits are entered
    if (newCode.every(digit => digit)) {
      await handleVerification();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  if (state.step !== '2fa') return null;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="text-center mb-6">
        <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
          <Shield className="w-6 h-6 text-blue-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Two-Factor Authentication</h2>
        <p className="mt-2 text-sm text-gray-600">
          Enter the verification code sent to your phone
        </p>
      </div>

      <div className="flex justify-center gap-2 mb-6">
        {inputs.map((_, index) => (
          <input
            key={index}
            id={`code-${index}`}
            type="text"
            maxLength={1}
            value={code[index]}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={state.loading}
          />
        ))}
      </div>

      {state.error && (
        <div className="text-center mb-4">
          <p className="text-sm text-red-600">{state.error}</p>
        </div>
      )}

      <div className="text-center">
        {timer > 0 ? (
          <p className="text-sm text-gray-600">
            Resend code in {timer} seconds
          </p>
        ) : (
          <button
            onClick={() => setTimer(30)}
            className="text-sm text-blue-600 hover:text-blue-700"
            disabled={state.loading}
          >
            Resend code
          </button>
        )}
      </div>

      {state.loading && (
        <div className="flex justify-center mt-4">
          <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}