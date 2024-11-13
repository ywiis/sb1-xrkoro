import React from 'react';
import { usePayment } from './PaymentContext';

export default function OrderSummary() {
  const { state } = usePayment();

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
      
      <div className="space-y-4 mb-6">
        <div className="flex items-center gap-4">
          <img
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
            alt="Product"
            className="w-16 h-16 object-cover rounded-lg"
          />
          <div className="flex-1">
            <h4 className="font-medium text-gray-900">Premium Sneakers</h4>
            <p className="text-sm text-gray-500">Size: US 10</p>
          </div>
          <span className="font-medium text-gray-900">$89.99</span>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Subtotal</span>
          <span className="font-medium text-gray-900">$89.99</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Shipping</span>
          <span className="font-medium text-gray-900">$10.00</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Tax</span>
          <span className="font-medium text-gray-900">$8.00</span>
        </div>
        <div className="flex justify-between text-base font-medium pt-4 border-t border-gray-200">
          <span className="text-gray-900">Total</span>
          <span className="text-gray-900">$107.99</span>
        </div>
      </div>

      {state.step === 'confirmation' && (
        <div className="mt-6 p-4 bg-green-50 rounded-lg">
          <p className="text-sm text-green-700 text-center">
            Payment successful! Your order has been confirmed.
          </p>
        </div>
      )}
    </div>
  );
}