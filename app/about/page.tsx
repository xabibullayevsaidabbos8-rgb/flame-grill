"use client"

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChefHat, Heart, Award, Users } from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'

const stats = [
  { value: '10+', label: 'Years of Excellence' },
  { value: '50K+', label: 'Happy Customers' },
  { value: '100+', label: 'Menu Items' },
  { value: '25+', label: 'Locations' },
]

const values = [
  {
    icon: Heart,
    title: 'Passion for Food',
    description: 'We pour our hearts into every dish we create, ensuring each bite is a memorable experience.',
  },
  {
    icon: ChefHat,
    title: 'Expert Chefs',
    description: 'Our team of skilled chefs brings years of culinary expertise to your plate.',
  },
  {
    icon: Award,
    title: 'Quality First',
    description: 'We source only the freshest ingredients to maintain our high standards of quality.',
  },
  {
    icon: Users,
    title: 'Community Focus',
    description: 'Building relationships with our customers and local community is at our core.',
  },
]

const team = [
  {
    name: 'Marcus Chen',
    role: 'Head Chef',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop',
    bio: '15 years of culinary experience',
  },
  {
    name: 'Sarah Williams',
    role: 'Executive Chef',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
    bio: 'Michelin-trained pastry expert',
  },
  {
    name: 'David Rodriguez',
    role: 'Grill Master',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    bio: 'Burger artisan extraordinaire',
  },
  {
    name: 'Emily Thompson',
    role: 'Operations Manager',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
    bio: 'Ensuring seamless service',
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-24 pb-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&h=1080&fit=crop"
              alt="Restaurant interior"
              fill
              className="object-cover opacity-20"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto max-w-3xl text-center"
            >
              <span className="inline-block rounded-full bg-primary/20 px-4 py-2 text-sm font-medium text-primary">
                Our Story
              </span>
              <h1 className="mt-4 text-4xl font-bold text-foreground sm:text-5xl md:text-6xl text-balance">
                Crafting Delicious Moments Since 2014
              </h1>
              <p className="mt-6 text-lg text-muted-foreground text-pretty">
                From a small food truck to a beloved restaurant chain, FlameGrill has been serving 
                mouthwatering burgers and creating unforgettable dining experiences for over a decade.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <p className="text-4xl font-bold text-primary">{stat.value}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 bg-card/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
                  From Humble Beginnings to Culinary Excellence
                </h2>
                <p className="mt-6 text-muted-foreground leading-relaxed">
                  FlameGrill started as a dream shared by two friends with a passion for great food. 
                  What began as a small food truck in downtown has grown into a chain of restaurants 
                  known for quality, consistency, and exceptional taste.
                </p>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Our commitment to using only the freshest ingredients and our unique flame-grilling 
                  technique sets us apart. Every burger, pizza, and meal we serve carries the same 
                  love and dedication that started in that original food truck.
                </p>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Today, we continue to innovate while staying true to our roots. Our menu has expanded, 
                  our team has grown, but our mission remains the same: to deliver delicious food that 
                  brings people together.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                  <Image
                    src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=800&h=600&fit=crop"
                    alt="Our kitchen"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 w-48 h-48 rounded-2xl overflow-hidden glass-card p-4">
                  <Image
                    src="https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=200&h=200&fit=crop"
                    alt="Original food truck"
                    fill
                    className="object-cover rounded-xl"
                    sizes="200px"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Our Values</h2>
              <p className="mt-4 text-muted-foreground">What drives us every single day</p>
            </motion.div>

            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card rounded-2xl p-6 text-center"
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-primary/20">
                    <value.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-foreground">{value.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-card/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Meet Our Team</h2>
              <p className="mt-4 text-muted-foreground">The talented people behind every delicious meal</p>
            </motion.div>

            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card overflow-hidden rounded-2xl"
                >
                  <div className="relative aspect-square">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-semibold text-foreground">{member.name}</h3>
                    <p className="text-sm text-primary">{member.role}</p>
                    <p className="mt-2 text-xs text-muted-foreground">{member.bio}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="glass-card rounded-3xl p-8 text-center md:p-12"
            >
              <h2 className="text-3xl font-bold text-foreground md:text-4xl text-balance">
                Ready to Experience FlameGrill?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                Join thousands of satisfied customers and discover why FlameGrill is the go-to 
                destination for premium fast food.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/menu">
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    View Our Menu
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
