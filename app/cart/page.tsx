"use client"

import { useCart } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, Heart, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function CartPage() {
  const { state, removeItem, updateQuantity, clearCart } = useCart()
  const [isUpdating, setIsUpdating] = useState<string | null>(null)

  const handleQuantityUpdate = (id: string, newQuantity: number) => {
    setIsUpdating(id)
    updateQuantity(id, newQuantity)
    setTimeout(() => setIsUpdating(null), 500)
  }

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen">
        <Navbar />
        {/* Top spacing to prevent navbar overlap */}
        <div className="h-20"></div>
        <div className="min-h-[calc(100vh-120px)] flex items-center justify-center" style={{ backgroundColor: '#eae0cc' }}>
          <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center animate-fade-in-up">
            <div className="mb-8">
              <div className="w-32 h-32 mx-auto rounded-full flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(90deg, #670099, #510c74, #240334)' }}>
                <ShoppingBag className="w-16 h-16" style={{ color: '#C9A34E' }} />
              </div>
            </div>
            <h1 className="font-allura text-6xl font-light mb-4 animate-fade-in-up gradient-text" style={{ animationDelay: '0.2s' }}>
              Your Cart is Empty
            </h1>
            <p className="text-lg mb-8 max-w-md mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s', color: '#240334' }}>
              Looks like you haven't added any beautiful jewelry pieces to your cart yet. Let's find something special for you!
            </p>
            <div className="space-x-4 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <Link href="/products">
                <Button size="lg" className="px-8 py-3 text-lg transition-all duration-300 hover:scale-105 text-white" style={{ background: 'linear-gradient(90deg, #670099, #510c74, #240334)', color: '#C9A34E' }}>
                  Continue Shopping
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" size="lg" className="px-8 py-3 text-lg transition-all duration-300 hover:scale-105" style={{ borderColor: '#d1b2e0', color: '#240334', backgroundColor: 'transparent' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#d1b2e0' }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}>
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      {/* Top spacing to prevent navbar overlap */}
      <div className="h-20"></div>
      <div className="min-h-[calc(100vh-120px)] py-12" style={{ backgroundColor: '#eae0cc' }}>
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          {/* Header */}
          <div className="mb-12 animate-fade-in-up">
            <Link href="/" className="inline-flex items-center mb-6 transition-colors duration-300" style={{ color: '#240334' }} onMouseEnter={(e) => { e.currentTarget.style.color = '#670099' }} onMouseLeave={(e) => { e.currentTarget.style.color = '#240334' }}>
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span className="font-medium">Continue Shopping</span>
            </Link>
            <div className="text-center">
              <h1 className="font-allura text-6xl font-light mb-4 animate-fade-in-up gradient-text" style={{ animationDelay: '0.2s' }}>
                Shopping Cart
              </h1>
              <p className="text-lg animate-fade-in-up" style={{ animationDelay: '0.4s', color: '#240334' }}>
                {state.itemCount} beautiful item{state.itemCount !== 1 ? 's' : ''} in your cart
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.6s', borderColor: '#d1b2e0', borderWidth: '1px' }}>
                <div className="p-6" style={{ borderBottom: '1px solid #d1b2e0', background: 'linear-gradient(90deg, rgba(103, 0, 153, 0.05), rgba(81, 12, 116, 0.05), rgba(36, 3, 52, 0.05))' }}>
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-semibold flex items-center gradient-text">
                      <Star className="w-6 h-6 mr-2" style={{ color: '#C9A34E' }} />
                      Your Selected Items
                    </h2>
                    <button
                      onClick={clearCart}
                      className="text-sm font-medium px-3 py-1 rounded-lg transition-all duration-300" style={{ color: '#240334' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#d1b2e0' }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}
                    >
                      Clear Cart
                    </button>
                  </div>
                </div>

                <div style={{ borderTop: '1px solid #d1b2e0' }}>
                  {state.items.map((item, index) => (
                    <div key={item.id} className="p-6 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: `${0.8 + index * 0.1}s`, borderTop: index > 0 ? '1px solid #d1b2e0' : 'none' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#d1b2e0' }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}>
                      <div className="flex items-center space-x-6">
                        <div className="flex-shrink-0 relative group">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={100}
                            height={100}
                            className="w-24 h-24 object-cover rounded-xl shadow-md group-hover:shadow-lg transition-all duration-300"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 rounded-xl transition-all duration-300"></div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl font-semibold mb-2 transition-colors" style={{ color: '#240334' }}>
                            {item.name}
                          </h3>
                          <p className="text-sm font-medium mb-1" style={{ color: '#C9A34E' }}>{item.brand}</p>
                          <p className="text-sm capitalize" style={{ color: '#240334', opacity: 0.7 }}>{item.category}</p>
                        </div>

                        <div className="flex items-center space-x-4">
                          <div className="flex items-center rounded-xl overflow-hidden" style={{ border: '2px solid #d1b2e0' }}>
                            <button
                              onClick={() => handleQuantityUpdate(item.id, item.quantity - 1)}
                              disabled={isUpdating === item.id}
                              className="px-4 py-2 disabled:opacity-50 transition-all duration-300" style={{ color: '#240334' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#d1b2e0' }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-4 py-2 min-w-[3rem] text-center font-semibold" style={{ color: '#240334', backgroundColor: '#d1b2e0' }}>
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleQuantityUpdate(item.id, item.quantity + 1)}
                              disabled={isUpdating === item.id}
                              className="px-4 py-2 disabled:opacity-50 transition-all duration-300" style={{ color: '#240334' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#d1b2e0' }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-2xl font-bold mb-1" style={{ color: '#C9A34E' }}>
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </p>
                          {item.originalPrice && (
                            <p className="text-sm line-through" style={{ color: '#240334', opacity: 0.5 }}>
                              ₹{(item.originalPrice * item.quantity).toFixed(2)}
                            </p>
                          )}
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-3 rounded-xl transition-all duration-300" style={{ color: '#240334' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#d1b2e0' }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-8 animate-fade-in-up" style={{ animationDelay: '0.8s', borderColor: '#d1b2e0', borderWidth: '1px' }}>
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-semibold mb-2 flex items-center justify-center gradient-text">
                    <Star className="w-6 h-6 mr-2" style={{ color: '#C9A34E' }} />
                    Order Summary
                  </h2>
                  <div className="w-16 h-1 mx-auto rounded-full" style={{ background: 'linear-gradient(90deg, #670099, #510c74, #240334)' }}></div>
                </div>
                
                <div className="space-y-6 mb-8">
                  <div className="flex justify-between items-center py-3" style={{ borderBottom: '1px solid #d1b2e0' }}>
                    <span className="font-medium" style={{ color: '#240334' }}>Subtotal ({state.itemCount} items)</span>
                    <span className="font-semibold text-lg" style={{ color: '#240334' }}>₹{state.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center py-3" style={{ borderBottom: '1px solid #d1b2e0' }}>
                    <span className="font-medium" style={{ color: '#240334' }}>Shipping</span>
                    <span className="font-semibold flex items-center" style={{ color: '#C9A34E' }}>
                      <Heart className="w-4 h-4 mr-1" />
                      Free
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3" style={{ borderBottom: '1px solid #d1b2e0' }}>
                    <span className="font-medium" style={{ color: '#240334' }}>Tax (18%)</span>
                    <span className="font-semibold" style={{ color: '#240334' }}>₹{(state.total * 0.18).toFixed(2)}</span>
                  </div>
                  <div className="p-6 rounded-xl" style={{ background: 'linear-gradient(90deg, rgba(103, 0, 153, 0.1), rgba(81, 12, 116, 0.1), rgba(36, 3, 52, 0.1))' }}>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold" style={{ color: '#240334' }}>Total</span>
                      <span className="text-2xl font-bold" style={{ color: '#C9A34E' }}>₹{(state.total + (state.total * 0.18)).toFixed(2)}</span>
                    </div>
                    <p className="text-sm mt-2 text-center" style={{ color: '#240334', opacity: 0.7 }}>Including all taxes & free shipping</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <Link href="/checkout" className="w-full">
                    <Button className="w-full text-white text-lg py-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg" style={{ background: 'linear-gradient(90deg, #670099, #510c74, #240334)', color: '#C9A34E' }}>
                      <Star className="w-5 h-5 mr-2" />
                      Proceed to Checkout
                    </Button>
                  </Link>
                  
                  <Link href="/products" className="w-full">
                    <Button variant="outline" className="w-full py-3 rounded-xl transition-all duration-300 hover:scale-105" style={{ borderColor: '#d1b2e0', borderWidth: '2px', color: '#240334', backgroundColor: 'transparent' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#d1b2e0' }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}>
                      Continue Shopping
                    </Button>
                  </Link>
                </div>

                <div className="mt-8 p-6 rounded-xl" style={{ background: 'linear-gradient(90deg, rgba(103, 0, 153, 0.1), rgba(81, 12, 116, 0.1), rgba(36, 3, 52, 0.1))', borderColor: '#d1b2e0', borderWidth: '1px' }}>
                  <div className="flex items-center mb-3">
                    <Heart className="w-5 h-5 mr-2" style={{ color: '#C9A34E' }} />
                    <h3 className="font-semibold" style={{ color: '#C9A34E' }}>Free Shipping</h3>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: '#240334', opacity: 0.8 }}>
                    Free standard shipping on all orders. Estimated delivery: 3-5 business days. 
                    <span className="font-medium" style={{ color: '#C9A34E' }}> Express delivery available!</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
