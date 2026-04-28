"use client"

import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { useCart } from '@/lib/cart-context'

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice, clearCart } = useCart()

  const subtotal = totalPrice
  const deliveryFee = subtotal > 25 ? 0 : 4.99
  const tax = subtotal * 0.08
  const total = subtotal + deliveryFee + tax

  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-24 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Continue Shopping
            </Link>
            <h1 className="mt-4 text-4xl font-bold text-foreground">Your Cart</h1>
            <p className="mt-2 text-muted-foreground">
              {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
            </p>
          </motion.div>

          {items.length > 0 ? (
            <div className="mt-8 grid gap-8 lg:grid-cols-3">
              {/* Cart Items */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="lg:col-span-2"
              >
                <div className="glass-card rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-foreground">Cart Items</h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearCart}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      Clear All
                    </Button>
                  </div>

                  <div className="divide-y divide-border">
                    <AnimatePresence mode="popLayout">
                      {items.map((item) => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20, height: 0 }}
                          className="py-6 first:pt-0 last:pb-0"
                        >
                          <div className="flex gap-4">
                            {/* Item Image */}
                            <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover"
                                sizes="96px"
                              />
                            </div>

                            {/* Item Details */}
                            <div className="flex flex-1 flex-col">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h3 className="font-medium text-foreground">{item.name}</h3>
                                  <p className="mt-1 text-sm text-muted-foreground">
                                    ${item.price.toFixed(2)} each
                                  </p>
                                </div>
                                <button
                                  onClick={() => removeItem(item.id)}
                                  className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                                  aria-label="Remove item"
                                >
                                  <Trash2 className="h-5 w-5" />
                                </button>
                              </div>

                              {/* Quantity and Price */}
                              <div className="mt-auto flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-secondary-foreground transition-colors hover:bg-secondary/80"
                                    aria-label="Decrease quantity"
                                  >
                                    <Minus className="h-4 w-4" />
                                  </button>
                                  <span className="w-8 text-center font-medium text-foreground">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-secondary-foreground transition-colors hover:bg-secondary/80"
                                    aria-label="Increase quantity"
                                  >
                                    <Plus className="h-4 w-4" />
                                  </button>
                                </div>
                                <span className="text-lg font-semibold text-primary">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>

              {/* Order Summary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="glass-card rounded-2xl p-6 sticky top-24">
                  <h2 className="text-lg font-semibold text-foreground">Order Summary</h2>

                  <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="text-foreground">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Delivery Fee</span>
                      <span className="text-foreground">
                        {deliveryFee === 0 ? (
                          <span className="text-primary">Free</span>
                        ) : (
                          `$${deliveryFee.toFixed(2)}`
                        )}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Tax (8%)</span>
                      <span className="text-foreground">${tax.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-border pt-4">
                      <div className="flex items-center justify-between">
                        <span className="text-base font-semibold text-foreground">Total</span>
                        <span className="text-xl font-bold text-primary">${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {subtotal < 25 && (
                    <p className="mt-4 text-sm text-muted-foreground">
                      Add ${(25 - subtotal).toFixed(2)} more for free delivery
                    </p>
                  )}

                  {/* Promo Code */}
                  <div className="mt-6">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Promo code"
                        className="flex-1 rounded-xl bg-input px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <Button variant="outline" size="sm">
                        Apply
                      </Button>
                    </div>
                  </div>

                  <Link href="/checkout" className="mt-6 block">
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                      Proceed to Checkout
                    </Button>
                  </Link>

                  <p className="mt-4 text-center text-xs text-muted-foreground">
                    Secure checkout powered by Stripe
                  </p>
                </div>
              </motion.div>
            </div>
          ) : (
            /* Empty Cart */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-20 text-center"
            >
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-muted">
                <ShoppingBag className="h-12 w-12 text-muted-foreground" />
              </div>
              <h2 className="mt-6 text-2xl font-semibold text-foreground">Your cart is empty</h2>
              <p className="mt-2 text-muted-foreground">
                Looks like you haven&apos;t added any items to your cart yet.
              </p>
              <Link href="/menu" className="mt-8 inline-block">
                <Button size="lg" className="gap-2 bg-primary text-primary-foreground">
                  Browse Menu
                </Button>
              </Link>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
