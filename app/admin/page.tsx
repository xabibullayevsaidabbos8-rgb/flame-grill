"use client"

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  BarChart3,
  DollarSign,
  ShoppingBag,
  TrendingUp,
  Users,
  Pizza,
  Home,
  Settings,
  LogOut,
  Menu,
  X,
  Flame,
  ChevronDown,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

// Mock data
const revenueData = [
  { name: 'Mon', revenue: 2400 },
  { name: 'Tue', revenue: 1398 },
  { name: 'Wed', revenue: 9800 },
  { name: 'Thu', revenue: 3908 },
  { name: 'Fri', revenue: 4800 },
  { name: 'Sat', revenue: 7800 },
  { name: 'Sun', revenue: 4300 },
]

const ordersData = [
  { name: 'Mon', orders: 65 },
  { name: 'Tue', orders: 45 },
  { name: 'Wed', orders: 120 },
  { name: 'Thu', orders: 78 },
  { name: 'Fri', orders: 95 },
  { name: 'Sat', orders: 150 },
  { name: 'Sun', orders: 88 },
]

const categoryData = [
  { name: 'Burgers', value: 35, color: 'oklch(0.7 0.18 50)' },
  { name: 'Pizza', value: 28, color: 'oklch(0.65 0.15 150)' },
  { name: 'Drinks', value: 18, color: 'oklch(0.55 0.12 250)' },
  { name: 'Fries', value: 12, color: 'oklch(0.75 0.16 55)' },
  { name: 'Combos', value: 7, color: 'oklch(0.6 0.2 20)' },
]

const recentOrders = [
  { id: '#FG-001234', customer: 'John Doe', items: 3, total: 45.99, status: 'Delivered', time: '10 min ago' },
  { id: '#FG-001233', customer: 'Jane Smith', items: 2, total: 28.50, status: 'In Transit', time: '25 min ago' },
  { id: '#FG-001232', customer: 'Mike Johnson', items: 5, total: 72.00, status: 'Preparing', time: '35 min ago' },
  { id: '#FG-001231', customer: 'Emily Davis', items: 1, total: 15.99, status: 'Pending', time: '45 min ago' },
  { id: '#FG-001230', customer: 'Chris Wilson', items: 4, total: 58.25, status: 'Delivered', time: '1 hr ago' },
]

const popularFoods = [
  { name: 'Double Bacon Deluxe', orders: 342, revenue: 5809.58 },
  { name: 'Pepperoni Supreme Pizza', orders: 287, revenue: 5448.13 },
  { name: 'Classic Smash Burger', orders: 256, revenue: 3325.44 },
  { name: 'Fresh Strawberry Shake', orders: 198, revenue: 1384.02 },
  { name: 'Burger Combo Meal', orders: 175, revenue: 2798.25 },
]

const sidebarLinks = [
  { icon: Home, label: 'Dashboard', href: '/admin', active: true },
  { icon: ShoppingBag, label: 'Orders', href: '#' },
  { icon: Pizza, label: 'Menu Items', href: '#' },
  { icon: Users, label: 'Customers', href: '#' },
  { icon: BarChart3, label: 'Analytics', href: '#' },
  { icon: Settings, label: 'Settings', href: '#' },
]

const statCards = [
  { title: 'Total Revenue', value: '$34,890', change: '+12.5%', positive: true, icon: DollarSign },
  { title: 'Total Orders', value: '641', change: '+8.2%', positive: true, icon: ShoppingBag },
  { title: 'Active Customers', value: '2,451', change: '+15.3%', positive: true, icon: Users },
  { title: 'Avg. Order Value', value: '$54.43', change: '-2.1%', positive: false, icon: TrendingUp },
]

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 transform bg-sidebar border-r border-sidebar-border transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between px-6 border-b border-sidebar-border">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Flame className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-sidebar-foreground">FlameGrill</span>
            </Link>
            <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
              <X className="h-5 w-5 text-sidebar-foreground" />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 px-4 py-6">
            <ul className="space-y-2">
              {sidebarLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                      link.active
                        ? 'bg-sidebar-accent text-sidebar-primary'
                        : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                    }`}
                  >
                    <link.icon className="h-5 w-5" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Logout */}
          <div className="border-t border-sidebar-border p-4">
            <Link href="/">
              <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-accent/50">
                <LogOut className="h-5 w-5" />
                Back to Store
              </button>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/95 backdrop-blur px-4 lg:px-8">
          <div className="flex items-center gap-4">
            <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-6 w-6 text-foreground" />
            </button>
            <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="gap-2">
              <span className="hidden sm:inline">Today</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-4 lg:p-8">
          {/* Stats Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {statCards.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card rounded-2xl p-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      stat.positive ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
                <p className="mt-4 text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.title}</p>
              </motion.div>
            ))}
          </div>

          {/* Charts Row */}
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            {/* Revenue Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card rounded-2xl p-6"
            >
              <h2 className="text-lg font-semibold text-foreground">Revenue Overview</h2>
              <p className="text-sm text-muted-foreground">Weekly revenue trend</p>
              <div className="mt-6 h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.28 0.01 30)" />
                    <XAxis dataKey="name" stroke="oklch(0.65 0 0)" fontSize={12} />
                    <YAxis stroke="oklch(0.65 0 0)" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'oklch(0.18 0.01 30)',
                        border: '1px solid oklch(0.28 0.01 30)',
                        borderRadius: '12px',
                        color: 'oklch(0.98 0 0)',
                      }}
                    />
                    <Bar dataKey="revenue" fill="oklch(0.7 0.18 50)" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Orders Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-card rounded-2xl p-6"
            >
              <h2 className="text-lg font-semibold text-foreground">Orders Trend</h2>
              <p className="text-sm text-muted-foreground">Weekly orders count</p>
              <div className="mt-6 h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={ordersData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.28 0.01 30)" />
                    <XAxis dataKey="name" stroke="oklch(0.65 0 0)" fontSize={12} />
                    <YAxis stroke="oklch(0.65 0 0)" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'oklch(0.18 0.01 30)',
                        border: '1px solid oklch(0.28 0.01 30)',
                        borderRadius: '12px',
                        color: 'oklch(0.98 0 0)',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="orders"
                      stroke="oklch(0.7 0.18 50)"
                      strokeWidth={3}
                      dot={{ fill: 'oklch(0.7 0.18 50)', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          {/* Second Row */}
          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            {/* Category Breakdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="glass-card rounded-2xl p-6"
            >
              <h2 className="text-lg font-semibold text-foreground">Sales by Category</h2>
              <p className="text-sm text-muted-foreground">Distribution of orders</p>
              <div className="mt-6 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'oklch(0.18 0.01 30)',
                        border: '1px solid oklch(0.28 0.01 30)',
                        borderRadius: '12px',
                        color: 'oklch(0.98 0 0)',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {categoryData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-xs text-muted-foreground">{item.name}</span>
                    <span className="ml-auto text-xs font-medium text-foreground">{item.value}%</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Popular Foods */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="glass-card rounded-2xl p-6 lg:col-span-2"
            >
              <h2 className="text-lg font-semibold text-foreground">Popular Foods</h2>
              <p className="text-sm text-muted-foreground">Top selling items this week</p>
              <div className="mt-6 overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Item</th>
                      <th className="pb-3 text-right text-sm font-medium text-muted-foreground">Orders</th>
                      <th className="pb-3 text-right text-sm font-medium text-muted-foreground">Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {popularFoods.map((food, index) => (
                      <tr key={food.name} className="border-b border-border/50 last:border-0">
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 text-sm font-medium text-primary">
                              {index + 1}
                            </span>
                            <span className="font-medium text-foreground">{food.name}</span>
                          </div>
                        </td>
                        <td className="py-4 text-right text-sm text-muted-foreground">{food.orders}</td>
                        <td className="py-4 text-right text-sm font-medium text-foreground">
                          ${food.revenue.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>

          {/* Recent Orders */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-8 glass-card rounded-2xl p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-foreground">Recent Orders</h2>
                <p className="text-sm text-muted-foreground">Latest customer orders</p>
              </div>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Order ID</th>
                    <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Customer</th>
                    <th className="pb-3 text-center text-sm font-medium text-muted-foreground">Items</th>
                    <th className="pb-3 text-right text-sm font-medium text-muted-foreground">Total</th>
                    <th className="pb-3 text-center text-sm font-medium text-muted-foreground">Status</th>
                    <th className="pb-3 text-right text-sm font-medium text-muted-foreground">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-border/50 last:border-0">
                      <td className="py-4 font-mono text-sm text-foreground">{order.id}</td>
                      <td className="py-4 text-sm text-foreground">{order.customer}</td>
                      <td className="py-4 text-center text-sm text-muted-foreground">{order.items}</td>
                      <td className="py-4 text-right text-sm font-medium text-foreground">
                        ${order.total.toFixed(2)}
                      </td>
                      <td className="py-4 text-center">
                        <span
                          className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                            order.status === 'Delivered'
                              ? 'bg-green-500/20 text-green-500'
                              : order.status === 'In Transit'
                              ? 'bg-blue-500/20 text-blue-500'
                              : order.status === 'Preparing'
                              ? 'bg-yellow-500/20 text-yellow-500'
                              : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="py-4 text-right text-sm text-muted-foreground">{order.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}
