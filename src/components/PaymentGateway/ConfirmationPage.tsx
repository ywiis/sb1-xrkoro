import React from 'react';
import { CheckCircle2, Download } from 'lucide-react';
import { usePayment } from './PaymentContext';

export default function ConfirmationPage() {
  const { state } = usePayment();
  const orderNumber = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();

  if (state.step !== 'confirmation') return null;

  return (
    <div className="bg-white rounded-xl shadow-sm p-8 text-center">
      <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
        <CheckCircle2 className="w-8 h-8 text-green-500" />
      </div>
      
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
      <p className="text-gray-600 mb-6">
        Thank you for your purchase. Your order has been confirmed.
      </p>

      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <p className="text-sm text-gray-600 mb-1">Order Number</p>
        <p className="text-lg font-semibold text-gray-900">{orderNumber}</p>
      </div>

      <div className="space-y-4">
        <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Download className="w-5 h-5" />
          Download Receipt
        </button>
        
        <button 
          onClick={() => window.location.reload()}
          className="w-full px-4 py-3 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
        >
          Make Another Payment
        </button>
      </div>
    </div>
  );
}