import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, CheckCircle2, Store, Truck, ShieldCheck } from 'lucide-react';
import { CartItem, ProductItem } from '../types';
import { BUSINESS_INFO } from '../data/mockData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [deliveryMethod, setDeliveryMethod] = useState<'pickup' | 'delivery'>('pickup');
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [orderRef, setOrderRef] = useState('');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const deliveryFee = deliveryMethod === 'delivery' ? 4.99 : 0.0;
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const newRef = `DF-ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderRef(newRef);
    setCheckoutStep('success');
    onClearCart();
  };

  const handleClose = () => {
    setCheckoutStep('cart');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0E131F] border-l border-slate-800 shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-blue-400" />
              <h3 className="font-display font-bold text-lg text-white">
                {checkoutStep === 'cart' && 'Your Shopping Basket'}
                {checkoutStep === 'checkout' && 'Direct Checkout'}
                {checkoutStep === 'success' && 'Order Confirmed'}
              </h3>
            </div>
            <button
              onClick={handleClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800/80"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-5">
            {checkoutStep === 'cart' && (
              <>
                {cartItems.length === 0 ? (
                  <div className="text-center py-16">
                    <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                    <p className="text-base font-semibold text-slate-300">Your basket is empty</p>
                    <p className="text-xs text-slate-400 mt-1 mb-6">
                      Explore our certified pre-owned iPhones, ThinkPads, and accessories.
                    </p>
                    <button
                      onClick={handleClose}
                      className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors"
                    >
                      Browse Products
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div
                        key={item.product.id}
                        className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-3.5"
                      >
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          className="w-16 h-16 object-contain bg-slate-950 rounded-xl p-1 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-white truncate">
                            {item.product.name}
                          </h4>
                          <p className="text-xs text-slate-400 truncate">
                            {item.product.subtitle}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-sm font-bold text-red-400">
                              £{(item.product.price * item.quantity).toFixed(2)}
                            </span>
                            <div className="flex items-center gap-2 bg-slate-800 rounded-lg p-1">
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, -1)}
                                className="p-1 text-slate-300 hover:text-white"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-xs font-bold text-white w-4 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, 1)}
                                className="p-1 text-slate-300 hover:text-white"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="p-1.5 text-slate-500 hover:text-red-400 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}

                    {/* Delivery Option Selector */}
                    <div className="pt-4 border-t border-slate-800">
                      <label className="block text-xs font-semibold text-slate-300 mb-2">
                        Fulfillment Option
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setDeliveryMethod('pickup')}
                          className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all ${
                            deliveryMethod === 'pickup'
                              ? 'bg-blue-600/20 border-blue-500 text-white'
                              : 'bg-slate-900 border-slate-800 text-slate-400'
                          }`}
                        >
                          <Store className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="block text-xs font-bold">Free Store Pickup</span>
                            <span className="text-[10px] text-slate-400">Eccles, Manchester</span>
                          </div>
                        </button>

                        <button
                          type="button"
                          onClick={() => setDeliveryMethod('delivery')}
                          className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all ${
                            deliveryMethod === 'delivery'
                              ? 'bg-blue-600/20 border-blue-500 text-white'
                              : 'bg-slate-900 border-slate-800 text-slate-400'
                          }`}
                        >
                          <Truck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="block text-xs font-bold">UK Courier (£4.99)</span>
                            <span className="text-[10px] text-slate-400">Tracked Next-Day</span>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {checkoutStep === 'checkout' && (
              <form id="direct-checkout-form" onSubmit={handlePlaceOrder} className="space-y-4">
                <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-800/40 text-xs text-blue-300">
                  <span className="font-bold block">Fast Direct Order</span>
                  Pay upon collection at our Eccles store or via secure payment link.
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sandra Gunn"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    UK Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="07xxx xxx xxx"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.co.uk"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                {deliveryMethod === 'delivery' && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Delivery Address & Postcode
                    </label>
                    <textarea
                      required
                      rows={2}
                      placeholder="Street address, City, Postcode"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500 resize-none"
                    />
                  </div>
                )}

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 space-y-1">
                  <div className="flex justify-between">
                    <span>Items Subtotal:</span>
                    <span>£{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fulfillment:</span>
                    <span>{deliveryMethod === 'pickup' ? 'FREE Eccles Pickup' : '£4.99 Tracked'}</span>
                  </div>
                  <div className="flex justify-between font-bold text-white pt-1 border-t border-slate-800">
                    <span>Total to Pay:</span>
                    <span className="text-red-400">£{total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setCheckoutStep('cart')}
                    className="flex-1 py-3 px-4 rounded-xl text-xs font-bold text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors"
                  >
                    Back to Cart
                  </button>
                  <button
                    type="submit"
                    className="flex-2 py-3 px-4 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-500 transition-colors shadow-lg shadow-red-600/30"
                  >
                    Place Direct Order (£{total.toFixed(2)})
                  </button>
                </div>
              </form>
            )}

            {checkoutStep === 'success' && (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-display font-bold text-xl text-white">
                  Order Received!
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed max-w-xs mx-auto">
                  Thank you for ordering with Dialfix. We have reserved your items in our Eccles inventory.
                </p>

                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-left text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Order Ref:</span>
                    <span className="font-mono font-bold text-blue-400">{orderRef}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Customer:</span>
                    <span className="font-semibold text-white">{customerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Status:</span>
                    <span className="font-semibold text-emerald-400">Ready for pickup / dispatch</span>
                  </div>
                </div>

                <a
                  href={`https://wa.me/447365206098?text=Hello%20Dialfix,%20I%20have%20placed%20order%20ref%20${orderRef}%20for%20pickup`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors"
                >
                  <span>Confirm Details via WhatsApp</span>
                </a>

                <button
                  onClick={handleClose}
                  className="w-full py-2.5 text-xs text-slate-400 hover:text-white"
                >
                  Close
                </button>
              </div>
            )}
          </div>

          {/* Footer Subtotal & Action in Cart view */}
          {checkoutStep === 'cart' && cartItems.length > 0 && (
            <div className="p-5 border-t border-slate-800 bg-slate-950/80">
              <div className="space-y-1.5 mb-4 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span className="text-white">£{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Fulfillment</span>
                  <span className="text-emerald-400">
                    {deliveryMethod === 'pickup' ? 'Free Store Pickup' : '£4.99'}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-slate-800">
                  <span>Total</span>
                  <span className="text-red-400">£{total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => setCheckoutStep('checkout')}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-red-600 hover:bg-red-500 shadow-xl shadow-red-600/30 transition-all active:scale-98"
              >
                <span>Proceed to Order</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 mt-3 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>12-Month Guarantee on all devices</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
