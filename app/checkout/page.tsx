"use client"

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, MapPin, Clock, CreditCard, Check } from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { useCart } from '@/lib/cart-context'
import { toast } from 'sonner'

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart()
  const [step, setStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    deliveryNotes: '',
    paymentMethod: 'card',
  })

  const subtotal = totalPrice
  const deliveryFee = subtotal > 25 ? 0 : 4.99
  const tax = subtotal * 0.08
  const total = subtotal + deliveryFee + tax

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 3) {
      setStep(step + 1)
      return
    }

    setIsProcessing(true)
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsProcessing(false)
    setStep(4)
    clearCart()
    toast.success('Order placed successfully!')
  }

  if (items.length === 0 && step !== 4) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-24 pb-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-20 text-center"
            >
              <h2 className="text-2xl font-semibold text-foreground">No items in cart</h2>
              <p className="mt-2 text-muted-foreground">Add some items to proceed with checkout.</p>
              <Link href="/menu" className="mt-8 inline-block">
                <Button size="lg" className="bg-primary text-primary-foreground">
                  Browse Menu
                </Button>
              </Link>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-24 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {step < 4 && (
              <Link
                href="/cart"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Cart
              </Link>
            )}
            <h1 className="mt-4 text-4xl font-bold text-foreground">
              {step === 4 ? 'Order Confirmed!' : 'Checkout'}
            </h1>
          </motion.div>

          {/* Progress Steps */}
          {step < 4 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-8"
            >
              <div className="flex items-center justify-center gap-4">
                {[
                  { num: 1, label: 'Delivery', icon: MapPin },
                  { num: 2, label: 'Payment', icon: CreditCard },
                  { num: 3, label: 'Confirm', icon: Check },
                ].map((s, index) => (
                  <div key={s.num} className="flex items-center">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
                        step >= s.num
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary text-secondary-foreground'
                      }`}
                    >
                      {step > s.num ? <Check className="h-5 w-5" /> : <s.icon className="h-5 w-5" />}
                    </div>
                    <span
                      className={`ml-2 hidden text-sm font-medium sm:block ${
                        step >= s.num ? 'text-foreground' : 'text-muted-foreground'
                      }`}
                    >
                      {s.label}
                    </span>
                    {index < 2 && (
                      <div
                        className={`mx-4 h-0.5 w-12 transition-colors ${
                          step > s.num ? 'bg-primary' : 'bg-border'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Order Success */}
          {step === 4 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-12 text-center"
            >
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-primary/20">
                <Check className="h-12 w-12 text-primary" />
              </div>
              <h2 className="mt-6 text-2xl font-semibold text-foreground">Thank you for your order!</h2>
              <p className="mt-2 text-muted-foreground">
                Your order has been placed and will be delivered soon.
              </p>
              <div className="glass-card mx-auto mt-8 max-w-md rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Order Number</span>
                  <span className="font-mono text-foreground">#FG-{Date.now().toString().slice(-6)}</span>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Estimated Delivery</span>
                  <span className="text-foreground">25-35 minutes</span>
                </div>
              </div>
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Link href="/menu">
                  <Button size="lg" variant="outline">
                    Order More
                  </Button>
                </Link>
                <Link href="/">
                  <Button size="lg" className="bg-primary text-primary-foreground">
                    Back to Home
                  </Button>
                </Link>
              </div>
            </motion.div>
          ) : (
            <div className="mt-8 grid gap-8 lg:grid-cols-3">
              {/* Form Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="lg:col-span-2"
              >
                <form onSubmit={handleSubmit}>
                  {/* Step 1: Delivery Information */}
                  {step === 1 && (
                    <div className="glass-card rounded-2xl p-6">
                      <h2 className="text-lg font-semibold text-foreground">Delivery Information</h2>
                      <div className="mt-6 grid gap-4 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                          <label className="text-sm font-medium text-foreground">Full Name</label>
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            required
                            className="mt-2 w-full rounded-xl bg-input px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="John Doe"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-foreground">Phone Number</label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            className="mt-2 w-full rounded-xl bg-input px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-foreground">Email</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="mt-2 w-full rounded-xl bg-input px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="john@example.com"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="text-sm font-medium text-foreground">Street Address</label>
                          <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            required
                            className="mt-2 w-full rounded-xl bg-input px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="123 Main St, Apt 4B"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-foreground">City</label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            required
                            className="mt-2 w-full rounded-xl bg-input px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="New York"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-foreground">ZIP Code</label>
                          <input
                            type="text"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleInputChange}
                            required
                            className="mt-2 w-full rounded-xl bg-input px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="10001"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="text-sm font-medium text-foreground">Delivery Notes (Optional)</label>
                          <textarea
                            name="deliveryNotes"
                            value={formData.deliveryNotes}
                            onChange={handleInputChange}
                            rows={3}
                            className="mt-2 w-full rounded-xl bg-input px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                            placeholder="Ring doorbell, leave at door, etc."
                          />
                        </div>
                      </div>

                      {/* Map Placeholder */}
                      <div className="mt-6 rounded-xl bg-muted/50 p-8 text-center">
                        <MapPin className="mx-auto h-10 w-10 text-muted-foreground" />
                        <p className="mt-2 text-sm text-muted-foreground">
                          Map integration placeholder - Delivery location preview
                        </p>
                      </div>

                      {/* Estimated Delivery */}
                      <div className="mt-6 flex items-center gap-3 rounded-xl bg-primary/10 p-4">
                        <Clock className="h-6 w-6 text-primary" />
                        <div>
                          <p className="font-medium text-foreground">Estimated Delivery Time</p>
                          <p className="text-sm text-muted-foreground">25-35 minutes</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Payment */}
                  {step === 2 && (
                    <div className="glass-card rounded-2xl p-6">
                      <h2 className="text-lg font-semibold text-foreground">Payment Method</h2>
                      <div className="mt-6 space-y-4">
                        {[
                          { id: 'card', label: 'Credit / Debit Card', icon: '💳' },
                          { id: 'cash', label: 'Cash on Delivery', icon: '💵' },
                          { id: 'paypal', label: 'PayPal', icon: '🅿️' },
                        ].map((method) => (
                          <label
                            key={method.id}
                            className={`flex cursor-pointer items-center gap-4 rounded-xl p-4 transition-colors ${
                              formData.paymentMethod === method.id
                                ? 'bg-primary/10 ring-2 ring-primary'
                                : 'bg-secondary hover:bg-secondary/80'
                            }`}
                          >
                            <input
                              type="radio"
                              name="paymentMethod"
                              value={method.id}
                              checked={formData.paymentMethod === method.id}
                              onChange={handleInputChange}
                              className="sr-only"
                            />
                            <span className="text-2xl">{method.icon}</span>
                            <span className="font-medium text-foreground">{method.label}</span>
                            {formData.paymentMethod === method.id && (
                              <Check className="ml-auto h-5 w-5 text-primary" />
                            )}
                          </label>
                        ))}
                      </div>

                      {formData.paymentMethod === 'card' && (
                        <div className="mt-6 space-y-4">
                          <div>
                            <label className="text-sm font-medium text-foreground">Card Number</label>
                            <input
                              type="text"
                              placeholder="4242 4242 4242 4242"
                              className="mt-2 w-full rounded-xl bg-input px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium text-foreground">Expiry Date</label>
                              <input
                                type="text"
                                placeholder="MM/YY"
                                className="mt-2 w-full rounded-xl bg-input px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium text-foreground">CVV</label>
                              <input
                                type="text"
                                placeholder="123"
                                className="mt-2 w-full rounded-xl bg-input px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Step 3: Confirm Order */}
                  {step === 3 && (
                    <div className="glass-card rounded-2xl p-6">
                      <h2 className="text-lg font-semibold text-foreground">Confirm Your Order</h2>

                      {/* Delivery Info Summary */}
                      <div className="mt-6 rounded-xl bg-secondary p-4">
                        <div className="flex items-start gap-3">
                          <MapPin className="mt-0.5 h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium text-foreground">{formData.fullName}</p>
                            <p className="text-sm text-muted-foreground">{formData.address}</p>
                            <p className="text-sm text-muted-foreground">
                              {formData.city}, {formData.zipCode}
                            </p>
                            <p className="text-sm text-muted-foreground">{formData.phone}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="ml-auto text-sm text-primary hover:underline"
                          >
                            Edit
                          </button>
                        </div>
                      </div>

                      {/* Payment Summary */}
                      <div className="mt-4 rounded-xl bg-secondary p-4">
                        <div className="flex items-center gap-3">
                          <CreditCard className="h-5 w-5 text-primary" />
                          <span className="font-medium text-foreground">
                            {formData.paymentMethod === 'card' && 'Credit / Debit Card'}
                            {formData.paymentMethod === 'cash' && 'Cash on Delivery'}
                            {formData.paymentMethod === 'paypal' && 'PayPal'}
                          </span>
                          <button
                            type="button"
                            onClick={() => setStep(2)}
                            className="ml-auto text-sm text-primary hover:underline"
                          >
                            Edit
                          </button>
                        </div>
                      </div>

                      {/* Order Items */}
                      <div className="mt-6">
                        <h3 className="font-medium text-foreground">Order Items</h3>
                        <div className="mt-4 space-y-3">
                          {items.map((item) => (
                            <div key={item.id} className="flex items-center gap-3">
                              <div className="relative h-12 w-12 overflow-hidden rounded-lg">
                                <Image src={item.image} alt={item.name} fill className="object-cover" sizes="48px" />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-medium text-foreground">{item.name}</p>
                                <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                              </div>
                              <span className="font-medium text-foreground">
                                ${(item.price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Form Actions */}
                  <div className="mt-6 flex gap-4">
                    {step > 1 && (
                      <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>
                        Back
                      </Button>
                    )}
                    <Button
                      type="submit"
                      className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        'Processing...'
                      ) : step === 3 ? (
                        `Place Order - $${total.toFixed(2)}`
                      ) : (
                        'Continue'
                      )}
                    </Button>
                  </div>
                </form>
              </motion.div>

              {/* Order Summary Sidebar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="glass-card rounded-2xl p-6 sticky top-24">
                  <h2 className="text-lg font-semibold text-foreground">Order Summary</h2>

                  <div className="mt-6 max-h-48 space-y-3 overflow-y-auto">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg">
                          <Image src={item.image} alt={item.name} fill className="object-cover" sizes="48px" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                          <p className="text-xs text-muted-foreground">x{item.quantity}</p>
                        </div>
                        <span className="text-sm font-medium text-foreground">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 space-y-3 border-t border-border pt-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="text-foreground">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Delivery</span>
                      <span className="text-foreground">
                        {deliveryFee === 0 ? <span className="text-primary">Free</span> : `$${deliveryFee.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Tax</span>
                      <span className="text-foreground">${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between border-t border-border pt-3">
                      <span className="font-semibold text-foreground">Total</span>
                      <span className="text-xl font-bold text-primary">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
