export interface FoodItem {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  popular?: boolean
  rating?: number
}

export const categories = [
  { id: 'all', name: 'All', icon: 'Grid3X3' },
  { id: 'burger', name: 'Burgers', icon: 'Beef' },
  { id: 'pizza', name: 'Pizza', icon: 'Pizza' },
  { id: 'drinks', name: 'Drinks', icon: 'Coffee' },
  { id: 'fries', name: 'Fries', icon: 'Cookie' },
  { id: 'combo', name: 'Combos', icon: 'Package' },
]

export const foodItems: FoodItem[] = [
  {
    id: '1',
    name: 'Classic Smash Burger',
    description: 'Juicy beef patty with melted cheese, fresh lettuce, tomato, and our signature sauce',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=500&fit=crop',
    category: 'burger',
    popular: true,
    rating: 4.8,
  },
  {
    id: '2',
    name: 'Double Bacon Deluxe',
    description: 'Two beef patties with crispy bacon, cheddar cheese, pickles, and BBQ sauce',
    price: 16.99,
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=500&h=500&fit=crop',
    category: 'burger',
    popular: true,
    rating: 4.9,
  },
  {
    id: '3',
    name: 'Mushroom Swiss Burger',
    description: 'Beef patty topped with sauteed mushrooms and melted Swiss cheese',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=500&h=500&fit=crop',
    category: 'burger',
    rating: 4.7,
  },
  {
    id: '4',
    name: 'Pepperoni Supreme Pizza',
    description: 'Loaded with pepperoni, mozzarella, and our secret tomato sauce',
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&h=500&fit=crop',
    category: 'pizza',
    popular: true,
    rating: 4.8,
  },
  {
    id: '5',
    name: 'BBQ Chicken Pizza',
    description: 'Grilled chicken, red onions, cilantro with tangy BBQ sauce',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&h=500&fit=crop',
    category: 'pizza',
    rating: 4.6,
  },
  {
    id: '6',
    name: 'Margherita Classic',
    description: 'Fresh basil, mozzarella, and tomatoes on thin crust',
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&h=500&fit=crop',
    category: 'pizza',
    rating: 4.7,
  },
  {
    id: '7',
    name: 'Loaded Cheese Fries',
    description: 'Crispy fries topped with cheddar, bacon bits, and green onions',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500&h=500&fit=crop',
    category: 'fries',
    popular: true,
    rating: 4.5,
  },
  {
    id: '8',
    name: 'Truffle Parmesan Fries',
    description: 'Seasoned fries with truffle oil and parmesan cheese',
    price: 10.99,
    image: 'https://images.unsplash.com/photo-1630384060421-cb20aed08bf5?w=500&h=500&fit=crop',
    category: 'fries',
    rating: 4.8,
  },
  {
    id: '9',
    name: 'Classic Crispy Fries',
    description: 'Golden crispy fries with sea salt',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1518013431117-eb1465fa5752?w=500&h=500&fit=crop',
    category: 'fries',
    rating: 4.4,
  },
  {
    id: '10',
    name: 'Iced Caramel Latte',
    description: 'Smooth espresso with caramel and cold milk over ice',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&h=500&fit=crop',
    category: 'drinks',
    rating: 4.6,
  },
  {
    id: '11',
    name: 'Fresh Strawberry Shake',
    description: 'Creamy milkshake with real strawberries and whipped cream',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=500&h=500&fit=crop',
    category: 'drinks',
    popular: true,
    rating: 4.9,
  },
  {
    id: '12',
    name: 'Coca Cola Classic',
    description: 'Ice cold refreshing cola',
    price: 2.99,
    image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=500&h=500&fit=crop',
    category: 'drinks',
    rating: 4.3,
  },
  {
    id: '13',
    name: 'Burger Combo Meal',
    description: 'Classic burger, medium fries, and a drink of your choice',
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=500&h=500&fit=crop',
    category: 'combo',
    popular: true,
    rating: 4.7,
  },
  {
    id: '14',
    name: 'Family Feast',
    description: '4 burgers, 2 large fries, 4 drinks, and onion rings',
    price: 45.99,
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&h=500&fit=crop',
    category: 'combo',
    rating: 4.8,
  },
  {
    id: '15',
    name: 'Pizza Party Pack',
    description: '2 large pizzas, garlic bread, and 2L soda',
    price: 35.99,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&h=500&fit=crop',
    category: 'combo',
    rating: 4.9,
  },
]

export const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    text: 'Best burgers in town! The delivery was super fast and the food was still hot. Definitely ordering again!',
    rating: 5,
  },
  {
    id: 2,
    name: 'Mike Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    text: 'The pizza is absolutely amazing. Perfect crust, fresh toppings, and great value for money.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Emily Davis',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    text: 'Love the combo meals! Great portions and the app makes ordering so easy. Highly recommend!',
    rating: 4,
  },
]
