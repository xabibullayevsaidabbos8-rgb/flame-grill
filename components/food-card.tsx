"use client"

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Heart, Plus, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/lib/cart-context'
import { toast } from 'sonner'
import type { FoodItem } from '@/lib/food-data'
import { useState } from 'react'

interface FoodCardProps {
  item: FoodItem
}

export function FoodCard({ item }: FoodCardProps) {
  const { addItem } = useCart()
  const [isFavorite, setIsFavorite] = useState(false)
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = () => {
    setIsAdding(true)
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    })
    toast.success(`${item.name} added to cart!`)
    setTimeout(() => setIsAdding(false), 300)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group glass-card overflow-hidden rounded-2xl"
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        
        {/* Favorite Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm transition-colors hover:bg-background"
        >
          <Heart
            className={`h-5 w-5 transition-colors ${
              isFavorite ? 'fill-primary text-primary' : 'text-muted-foreground'
            }`}
          />
        </motion.button>

        {/* Popular Badge */}
        {item.popular && (
          <div className="absolute top-3 left-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
            Popular
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-foreground line-clamp-1">{item.name}</h3>
          {item.rating && (
            <div className="flex items-center gap-1 text-sm">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="text-muted-foreground">{item.rating}</span>
            </div>
          )}
        </div>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{item.description}</p>
        
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold text-primary">${item.price.toFixed(2)}</span>
          <motion.div whileTap={{ scale: 0.95 }}>
            <Button
              size="sm"
              onClick={handleAddToCart}
              className="gap-1 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <motion.span
                animate={isAdding ? { rotate: 360 } : { rotate: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Plus className="h-4 w-4" />
              </motion.span>
              Add
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
