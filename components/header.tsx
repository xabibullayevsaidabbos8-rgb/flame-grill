"use client"

import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Menu, X, Flame } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/lib/cart-context'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { totalItems } = useCart()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <motion.div
              whileHover={{ rotate: 15 }}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary"
            >
              <Flame className="h-6 w-6 text-primary-foreground" />
            </motion.div>
            <span className="text-xl font-bold text-foreground">FlameGrill</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </Button>
            </Link>
            <Link href="/menu" className="hidden sm:block">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Order Now
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-lg md:hidden"
          >
            <div className="flex h-16 items-center justify-between px-4">
              <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                  <Flame className="h-6 w-6 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">FlameGrill</span>
              </Link>
              <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <nav className="flex flex-col items-center gap-6 pt-12">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="text-2xl font-medium text-foreground transition-colors hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
              >
                <Link href="/menu" onClick={() => setMobileMenuOpen(false)}>
                  <Button size="lg" className="mt-4 bg-primary text-primary-foreground">
                    Order Now
                  </Button>
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
