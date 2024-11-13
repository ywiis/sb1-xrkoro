import React from 'react';
import PaymentMethods from './PaymentMethods';
import PaymentForm from './PaymentForm';
import OrderSummary from './OrderSummary';
import ProgressSteps from './ProgressSteps';
import TwoFactorAuth from './TwoFactorAuth';
import { PaymentProvider } from './PaymentContext';
import ConfirmationPage from './ConfirmationPage';

export default function PaymentGateway() {
  return (
    <PaymentProvider>
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Secure Checkout</h1>
          <ProgressSteps />
          
          <div className="mt-8 flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <PaymentMethods />
              <PaymentForm />
              <TwoFactorAuth />
              <ConfirmationPage />
            </div>
            <div className="lg:w-96">
              <OrderSummary />
            </div>
          </div>
        </div>
      </div>
    </PaymentProvider>
  );
}