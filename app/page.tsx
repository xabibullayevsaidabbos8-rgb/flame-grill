"use client"

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Clock, MapPin, Star, Truck, Utensils } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { FoodCard } from '@/components/food-card'
import { foodItems, categories, testimonials } from '@/lib/food-data'

const features = [
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Get your food delivered in under 30 minutes',
  },
  {
    icon: Utensils,
    title: 'Fresh Ingredients',
    description: 'We use only the freshest ingredients daily',
  },
  {
    icon: Clock,
    title: 'Open 24/7',
    description: 'Order anytime, we never close',
  },
]

export default function HomePage() {
  const popularItems = foodItems.filter((item) => item.popular).slice(0, 4)

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen pt-16 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&h=1080&fit=crop"
            alt="Delicious food background"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-20 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <span className="mb-4 inline-block rounded-full bg-primary/20 px-4 py-2 text-sm font-medium text-primary">
                Free delivery on orders over $25
              </span>
              <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl text-balance">
                Delicious Food,{' '}
                <span className="text-primary">Delivered Fast</span>
              </h1>
              <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground text-pretty">
                Experience the best burgers, pizzas, and more delivered straight to your door. 
                Fresh ingredients, bold flavors, and lightning-fast delivery.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/menu">
                  <Button size="lg" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                    Order Now
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/menu">
                  <Button size="lg" variant="outline" className="gap-2">
                    View Menu
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="mt-12 flex flex-wrap items-center justify-center gap-8 sm:gap-12">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">500+</p>
                  <p className="text-sm text-muted-foreground">Happy Customers</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">4.9</p>
                  <p className="text-sm text-muted-foreground">Rating</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">15 min</p>
                  <p className="text-sm text-muted-foreground">Avg. Delivery</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card rounded-2xl p-6 text-center"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-primary/20">
                  <feature.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Browse Categories</h2>
            <p className="mt-4 text-muted-foreground">Find your favorite food by category</p>
          </motion.div>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            {categories.slice(1).map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={`/menu?category=${category.id}`}
                  className="glass-card flex flex-col items-center gap-3 rounded-2xl px-8 py-6 transition-all hover:bg-primary/10 hover:border-primary/30"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
                    <span className="text-2xl">
                      {category.id === 'burger' && '🍔'}
                      {category.id === 'pizza' && '🍕'}
                      {category.id === 'drinks' && '🥤'}
                      {category.id === 'fries' && '🍟'}
                      {category.id === 'combo' && '🍱'}
                    </span>
                  </div>
                  <span className="font-medium text-foreground">{category.name}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Foods Section */}
      <section className="py-20 bg-card/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-between gap-4 sm:flex-row"
          >
            <div>
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Popular Items</h2>
              <p className="mt-2 text-muted-foreground">Our most loved dishes by customers</p>
            </div>
            <Link href="/menu">
              <Button variant="outline" className="gap-2">
                View All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {popularItems.map((item) => (
              <FoodCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary/20 to-accent/20 p-8 md:p-12"
          >
            <div className="relative z-10 max-w-xl">
              <span className="inline-block rounded-full bg-primary px-4 py-1 text-sm font-semibold text-primary-foreground">
                Limited Time Offer
              </span>
              <h3 className="mt-4 text-3xl font-bold text-foreground md:text-4xl text-balance">
                Get 20% Off Your First Order
              </h3>
              <p className="mt-4 text-muted-foreground">
                Use code <span className="font-semibold text-primary">WELCOME20</span> at checkout. 
                Valid for new customers only.
              </p>
              <Link href="/menu" className="mt-6 inline-block">
                <Button size="lg" className="gap-2 bg-primary text-primary-foreground">
                  Claim Offer
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
            <div className="absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-card/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">What Our Customers Say</h2>
            <p className="mt-4 text-muted-foreground">Real reviews from real food lovers</p>
          </motion.div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card rounded-2xl p-6"
              >
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < testimonial.rating
                          ? 'fill-primary text-primary'
                          : 'fill-muted text-muted'
                      }`}
                    />
                  ))}
                </div>
                <p className="mt-4 text-muted-foreground">&quot;{testimonial.text}&quot;</p>
                <div className="mt-6 flex items-center gap-3">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <span className="font-medium text-foreground">{testimonial.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-8 text-center md:p-12"
          >
            <MapPin className="mx-auto h-12 w-12 text-primary" />
            <h3 className="mt-4 text-2xl font-bold text-foreground md:text-3xl">
              We Deliver To Your Location
            </h3>
            <p className="mx-auto mt-4 max-w-md text-muted-foreground">
              Enter your address to check if we deliver to your area. Fast, reliable delivery guaranteed.
            </p>
            <div className="mx-auto mt-8 flex max-w-md flex-col gap-4 sm:flex-row">
              <input
                type="text"
                placeholder="Enter your address..."
                className="flex-1 rounded-xl bg-input px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Check Delivery
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
