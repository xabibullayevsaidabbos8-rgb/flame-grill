"use client"

import { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { FoodCard } from '@/components/food-card'
import { Button } from '@/components/ui/button'
import { foodItems, categories } from '@/lib/food-data'
import { Skeleton } from '@/components/ui/skeleton'

export default function MenuPage() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get('category') || 'all'
  
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'default' | 'price-low' | 'price-high' | 'rating'>('default')
  const [showFilters, setShowFilters] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const filteredItems = useMemo(() => {
    let items = [...foodItems]

    // Filter by category
    if (selectedCategory !== 'all') {
      items = items.filter((item) => item.category === selectedCategory)
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query)
      )
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        items.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        items.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        items.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        break
    }

    return items
  }, [selectedCategory, searchQuery, sortBy])

  const handleCategoryChange = (categoryId: string) => {
    setIsLoading(true)
    setSelectedCategory(categoryId)
    setTimeout(() => setIsLoading(false), 300)
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
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-foreground sm:text-5xl">Our Menu</h1>
            <p className="mt-4 text-muted-foreground">
              Explore our delicious selection of food and drinks
            </p>
          </motion.div>

          {/* Search and Filter Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-8"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              {/* Search Input */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search for food..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl bg-input py-3 pl-12 pr-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>

              {/* Filter Toggle */}
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="gap-2"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </Button>
            </div>

            {/* Expanded Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 overflow-hidden"
                >
                  <div className="glass-card rounded-xl p-4">
                    <div className="flex flex-wrap items-center gap-4">
                      <span className="text-sm font-medium text-foreground">Sort by:</span>
                      {[
                        { value: 'default', label: 'Default' },
                        { value: 'price-low', label: 'Price: Low to High' },
                        { value: 'price-high', label: 'Price: High to Low' },
                        { value: 'rating', label: 'Top Rated' },
                      ].map((option) => (
                        <button
                          key={option.value}
                          onClick={() => setSortBy(option.value as typeof sortBy)}
                          className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
                            sortBy === option.value
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8"
          >
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  <span>
                    {category.id === 'all' && '🍽️'}
                    {category.id === 'burger' && '🍔'}
                    {category.id === 'pizza' && '🍕'}
                    {category.id === 'drinks' && '🥤'}
                    {category.id === 'fries' && '🍟'}
                    {category.id === 'combo' && '🍱'}
                  </span>
                  {category.name}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Results Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8"
          >
            <p className="text-sm text-muted-foreground">
              Showing {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
              {selectedCategory !== 'all' && ` in ${categories.find(c => c.id === selectedCategory)?.name}`}
              {searchQuery && ` for "${searchQuery}"`}
            </p>
          </motion.div>

          {/* Food Grid */}
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {isLoading ? (
              // Loading Skeletons
              Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="glass-card overflow-hidden rounded-2xl">
                  <Skeleton className="aspect-square w-full" />
                  <div className="p-4">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="mt-2 h-4 w-full" />
                    <Skeleton className="mt-1 h-4 w-2/3" />
                    <div className="mt-4 flex items-center justify-between">
                      <Skeleton className="h-6 w-16" />
                      <Skeleton className="h-9 w-20" />
                    </div>
                  </div>
                </div>
              ))
            ) : filteredItems.length > 0 ? (
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FoodCard item={item} />
                  </motion.div>
                ))}
              </AnimatePresence>
            ) : (
              // No Results
              <div className="col-span-full py-20 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                  <Search className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="mt-6 text-lg font-semibold text-foreground">No items found</h3>
                <p className="mt-2 text-muted-foreground">
                  Try adjusting your search or filter to find what you&apos;re looking for.
                </p>
                <Button
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedCategory('all')
                    setSortBy('default')
                  }}
                  className="mt-6 bg-primary text-primary-foreground"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
