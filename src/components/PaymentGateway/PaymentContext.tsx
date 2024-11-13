import React, { createContext, useContext, useReducer } from 'react';

type PaymentMethod = 'card' | 'wallet' | 'bank';
type PaymentStep = 'method' | 'details' | '2fa' | 'confirmation';
type CardType = 'visa' | 'mastercard' | 'amex' | 'discover' | undefined;

interface PaymentState {
  step: PaymentStep;
  method: PaymentMethod;
  cardType: CardType;
  loading: boolean;
  error: string | null;
  verified: boolean;
  savePaymentMethod: boolean;
}

const initialState: PaymentState = {
  step: 'method',
  method: 'card',
  cardType: undefined,
  loading: false,
  error: null,
  verified: false,
  savePaymentMethod: false,
};

type PaymentAction =
  | { type: 'SET_STEP'; payload: PaymentStep }
  | { type: 'SET_METHOD'; payload: PaymentMethod }
  | { type: 'SET_CARD_TYPE'; payload: CardType }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_VERIFIED'; payload: boolean }
  | { type: 'TOGGLE_SAVE_METHOD' }
  | { type: 'RESET' };

const PaymentContext = createContext<{
  state: PaymentState;
  dispatch: React.Dispatch<PaymentAction>;
} | undefined>(undefined);

function paymentReducer(state: PaymentState, action: PaymentAction): PaymentState {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, step: action.payload, error: null };
    case 'SET_METHOD':
      return { ...state, method: action.payload };
    case 'SET_CARD_TYPE':
      return { ...state, cardType: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_VERIFIED':
      return { ...state, verified: action.payload };
    case 'TOGGLE_SAVE_METHOD':
      return { ...state, savePaymentMethod: !state.savePaymentMethod };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export function PaymentProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(paymentReducer, initialState);

  return (
    <PaymentContext.Provider value={{ state, dispatch }}>
      {children}
    </PaymentContext.Provider>
  );
}

export function usePayment() {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error('usePayment must be used within a PaymentProvider');
  }
  return context;
}