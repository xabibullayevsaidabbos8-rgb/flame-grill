"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Send, Instagram, Twitter, Facebook } from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

const contactInfo = [
  {
    icon: MapPin,
    title: 'Visit Us',
    details: ['123 Flame Street', 'New York, NY 10001'],
  },
  {
    icon: Phone,
    title: 'Call Us',
    details: ['+1 (555) 123-4567', '+1 (555) 987-6543'],
  },
  {
    icon: Mail,
    title: 'Email Us',
    details: ['hello@flamegrill.com', 'support@flamegrill.com'],
  },
  {
    icon: Clock,
    title: 'Hours',
    details: ['Mon-Sat: 10AM - 11PM', 'Sunday: 11AM - 10PM'],
  },
]

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Facebook, href: '#', label: 'Facebook' },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    toast.success('Message sent successfully! We\'ll get back to you soon.')
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-24 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="inline-block rounded-full bg-primary/20 px-4 py-2 text-sm font-medium text-primary">
              Get In Touch
            </span>
            <h1 className="mt-4 text-4xl font-bold text-foreground sm:text-5xl text-balance">
              We&apos;d Love to Hear From You
            </h1>
            <p className="mt-4 text-muted-foreground">
              Have questions, feedback, or just want to say hello? Drop us a message and we&apos;ll 
              get back to you as soon as possible.
            </p>
          </motion.div>

          {/* Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card rounded-2xl p-6 text-center"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20">
                  <info.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 font-semibold text-foreground">{info.title}</h3>
                {info.details.map((detail) => (
                  <p key={detail} className="mt-1 text-sm text-muted-foreground">
                    {detail}
                  </p>
                ))}
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Form and Map */}
          <div className="mt-16 grid gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="glass-card rounded-2xl p-6 lg:p-8">
                <h2 className="text-2xl font-bold text-foreground">Send Us a Message</h2>
                <p className="mt-2 text-muted-foreground">
                  Fill out the form below and we&apos;ll respond within 24 hours.
                </p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label className="text-sm font-medium text-foreground">Your Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="mt-2 w-full rounded-xl bg-input px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="mt-2 w-full rounded-xl bg-input px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label className="text-sm font-medium text-foreground">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="mt-2 w-full rounded-xl bg-input px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">Subject</label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="mt-2 w-full rounded-xl bg-input px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="feedback">Feedback</option>
                        <option value="complaint">Complaint</option>
                        <option value="partnership">Partnership</option>
                        <option value="catering">Catering</option>
                        <option value="careers">Careers</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground">Your Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="mt-2 w-full rounded-xl bg-input px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      placeholder="Tell us what's on your mind..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    {isSubmitting ? (
                      'Sending...'
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* Map and Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Map Placeholder */}
              <div className="glass-card overflow-hidden rounded-2xl">
                <div className="relative aspect-[4/3] bg-muted/30">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="mx-auto h-12 w-12 text-primary" />
                      <p className="mt-4 font-medium text-foreground">Interactive Map</p>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Map integration placeholder
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="glass-card rounded-2xl p-6">
                <h3 className="font-semibold text-foreground">Follow Us</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Stay connected with us on social media for updates, promotions, and behind-the-scenes content.
                </p>
                <div className="mt-4 flex gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-secondary-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                      aria-label={social.label}
                    >
                      <social.icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>

              {/* FAQ Link */}
              <div className="glass-card rounded-2xl p-6">
                <h3 className="font-semibold text-foreground">Need Quick Answers?</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Check out our frequently asked questions for instant answers to common inquiries.
                </p>
                <Button variant="outline" className="mt-4">
                  View FAQs
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Locations Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20"
          >
            <div className="text-center">
              <h2 className="text-3xl font-bold text-foreground">Our Locations</h2>
              <p className="mt-4 text-muted-foreground">Visit any of our convenient locations</p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {[
                { name: 'Downtown', address: '123 Flame Street, NY 10001', hours: '10AM - 11PM' },
                { name: 'Midtown', address: '456 Burger Ave, NY 10016', hours: '10AM - 12AM' },
                { name: 'Brooklyn', address: '789 Grill Blvd, NY 11201', hours: '11AM - 11PM' },
              ].map((location, index) => (
                <motion.div
                  key={location.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card rounded-2xl p-6"
                >
                  <h3 className="font-semibold text-foreground">{location.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{location.address}</p>
                  <div className="mt-4 flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">{location.hours}</span>
                  </div>
                  <Button variant="outline" size="sm" className="mt-4">
                    Get Directions
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
