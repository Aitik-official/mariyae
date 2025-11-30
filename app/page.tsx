"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import NecklaceSection from "@/components/necklace-section"
import PendantSection from "@/components/pendant-section"
import InstagramCarousel from "@/components/instagram-carousel"
import JewelryLayout from "@/components/jewelry-layout"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Star, Heart, Eye, ShoppingCart, ChevronLeft, ChevronRight, ChevronLeft as ArrowLeft } from "lucide-react"
import { useState, useEffect } from "react"
import { useCart } from "@/contexts/cart-context"
import { useProducts } from "@/hooks/useProducts"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"

export default function Home() {
  const { addItem } = useCart()
  const { products, loading, error } = useProducts()

  const [currentSlide, setCurrentSlide] = useState(0)
  const [currentGemsSlide, setCurrentGemsSlide] = useState(0)
  const [currentFeaturedSlide, setCurrentFeaturedSlide] = useState(0)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  
  // Hero carousel state
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  
  // Get real products from database
  const featuredProducts = products.slice(0, 4)
  const newArrivals = products.slice(0, 12)
  const latestGems = products.slice(0, 8)

  // Toggle favorite function
  const toggleFavorite = (productId: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setFavorites(prev => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId)
      } else {
        newFavorites.add(productId)
      }
      return newFavorites
    })
  }
  
  // Hero carousel slide tracking
  useEffect(() => {
    if (!api) {
      return
    }

    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])
  
  // Hero carousel auto-play
  useEffect(() => {
    if (!api) {
      return
    }

    const interval = setInterval(() => {
      api.scrollNext()
    }, 5500)

    return () => clearInterval(interval)
  }, [api])
  
  // Show loading state if products are still loading
  if (loading && products.length === 0) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#eae0cc' }}>
        <Header />
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 mx-auto" style={{ borderColor: '#510c74' }}></div>
            <p className="mt-4" style={{ color: '#240334' }}>Loading products...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  // Show error state if there's an error
  if (error && products.length === 0) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#eae0cc' }}>
        <Header />
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-lg" style={{ color: '#510c74' }}>Error loading products: {error}</p>
            <Button 
              onClick={() => window.location.reload()} 
              className="mt-4"
              style={{ background: 'linear-gradient(90deg, #670099, #510c74)', color: '#ffffff' }}
            >
              Try Again
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
  
  const handlePrevSlide = () => {
    setCurrentSlide((prev: number) => prev === 0 ? newArrivals.length - 1 : prev - 1)
  }
  
  const handleNextSlide = () => {
    setCurrentSlide((prev: number) => prev === newArrivals.length - 1 ? 0 : prev + 1)
  }
  
  const handlePrevGemsSlide = () => {
    setCurrentGemsSlide((prev: number) => prev === 0 ? latestGems.length - 1 : prev - 1)
  }
  
  const handleNextGemsSlide = () => {
    setCurrentGemsSlide((prev: number) => prev === latestGems.length - 1 ? 0 : prev + 1)
  }
  
  const handlePrevFeaturedSlide = () => {
    setCurrentFeaturedSlide((prev: number) => prev === 0 ? featuredProducts.length - 1 : prev - 1)
  }
  
  const handleNextFeaturedSlide = () => {
    setCurrentFeaturedSlide((prev: number) => prev === featuredProducts.length - 1 ? 0 : prev + 1)
  }

  const categories = [
    {
      id: 1,
      name: "Rings",
      count: products.filter(p => p.category === "Rings").length,
      image: "https://res.cloudinary.com/djjj41z17/image/upload/v1754041278/7K0A0299_jboywk.jpg",
      href: "/categories/rings",
    },
    {
      id: 2,
      name: "Necklaces",
      count: products.filter(p => p.category === "Necklaces").length,
      image: "https://res.cloudinary.com/djjj41z17/image/upload/v1754041775/RNK-387_mhmryo.jpg",
      href: "/categories/necklaces",
    },
    {
      id: 3,
      name: "Pendants",
      count: products.filter(p => p.category === "Pendants").length,
      image: "https://res.cloudinary.com/djjj41z17/image/upload/v1754042374/RP_2237_thzcn1.jpg",
      href: "/categories/earrings",
    },
    {
      id: 4,
      name: "Mangalsutra",
      count: products.filter(p => p.category === "Mangalsutra").length,
      image: "https://res.cloudinary.com/djjj41z17/image/upload/v1754040744/1J8A0224_kecmbm.jpg",
      href: "/categories/bracelets",
    },
  ]

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #240334 0%, #510c74 50%, #670099 100%)' }}>
      {/* Navbar - Always visible */}
      <Navbar />
      
      {/* Top Section - Increased height */}
      <section className="h-16 md:h-20" style={{backgroundColor: '#0F4F3F'}}>
        <div className="h-full flex items-center justify-center px-4">
          <p className="text-[#F3EDE4] text-xs md:text-sm font-medium text-center">Welcome to Imitation Jewellery - Exquisite Jewelry Collection</p>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative w-full min-h-[500px] sm:min-h-[550px] md:min-h-[620px] overflow-hidden" style={{ background: 'linear-gradient(180deg, #240334 0%, #510c74 50%, #670099 100%)' }}>
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
            duration: 25,
            dragFree: false,
            startIndex: 0,
            watchDrag: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {/* Slide 1 */}
            <CarouselItem>
              <div className="relative min-h-[500px] sm:min-h-[550px] md:min-h-[620px] w-full">
                {/* Background Layer */}
                <div className="absolute inset-0">
          <Image
            src="/2.jpg"
                    alt="Exquisite Jewelry Collection"
            fill
                    className="h-full w-full object-cover"
            priority
                    sizes="100vw"
          />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(103, 0, 153, 0.95), rgba(81, 12, 116, 0.85), rgba(36, 3, 52, 0.60))' }} />
        </div>

                {/* Content Layer */}
                <div className="relative z-10 flex h-full w-full items-stretch">
                  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-6 sm:gap-8 lg:gap-12 lg:grid-cols-[1.05fr_0.95fr]">
                      {/* Left Column: Text Content */}
                      <div className="flex flex-col justify-center items-center text-center py-6 sm:py-8 md:py-12 lg:py-16">
                        {/* Decorative Red Lines */}
                        <div className="mb-4 sm:mb-6 flex items-center justify-center gap-2">
                          <span className="h-1 w-8 sm:w-12" style={{ background: 'linear-gradient(90deg, #670099, #510c74, #240334)' }} />
                          <span className="h-1 w-3 sm:w-4" style={{ background: 'linear-gradient(90deg, #670099, #510c74, #240334)' }} />
                          <span className="h-1 w-2" style={{ background: 'linear-gradient(90deg, #670099, #510c74, #240334)' }} />
                        </div>
                        
                        {/* Eyebrow Text */}
                        <span className="mb-2 sm:mb-4 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
                          Exquisite Jewelry Collection
                        </span>
                        
                        {/* Main Headline */}
                        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-white leading-tight">
                          Premium Imitation Jewellery for Every Occasion
                        </h1>
                        
                        {/* Description */}
                        <p className="mt-3 sm:mt-4 md:mt-6 max-w-2xl mx-auto text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed text-white/85">
                          Discover our stunning collection of high-quality imitation jewelry. From elegant necklaces to exquisite rings, we offer timeless pieces that celebrate life's most precious moments. Crafted with precision and designed to make you shine.
                        </p>
                        
                        {/* CTA Buttons */}
                        <div className="mt-4 sm:mt-6 md:mt-8 lg:mt-10 flex flex-row items-center justify-center gap-3 sm:gap-4">
                          <Link 
                            href="/contact" 
                            className="inline-flex items-center justify-center rounded-md px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm md:text-base font-semibold uppercase tracking-wide shadow-md transition whitespace-nowrap"
                            style={{ background: 'linear-gradient(90deg, #670099, #510c74, #240334)', color: '#C9A34E' }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = 'linear-gradient(90deg, #510c74, #240334)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = 'linear-gradient(90deg, #670099, #510c74, #240334)'; }}
                          >
                            Speak to an Expert
                          </Link>
                          <Link 
                            href="/products" 
                            className="inline-flex items-center justify-center rounded-md bg-[#3f3f3f] px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm md:text-base font-semibold uppercase tracking-wide shadow-md transition hover:bg-[#1f1f1f] whitespace-nowrap"
                            style={{ color: '#C9A34E' }}
                          >
                            View Our Products
                          </Link>
                        </div>
                      </div>

                      {/* Right Column: Decorative Graphics - Now visible on mobile */}
                      <div className="relative min-h-[200px] sm:min-h-[250px] md:min-h-[300px] lg:min-h-[400px] items-center justify-center lg:justify-end flex mt-4 lg:mt-0">
                        {/* Decorative Element 1: Vertical Bar (Top) - Hidden on mobile */}
                        <div className="absolute inset-y-16 right-8 lg:right-16 w-3 lg:w-4 rounded hidden lg:block" style={{ backgroundColor: '#C9A34E', opacity: 0.8 }} />
                        
                        {/* Decorative Element 2: Vertical Bar (Bottom) - Hidden on mobile */}
                        <div className="absolute bottom-12 lg:bottom-20 right-8 lg:right-16 h-8 lg:h-12 w-3 lg:w-4 rounded hidden lg:block" style={{ backgroundColor: '#C9A34E', opacity: 0.8 }} />
                        
                        {/* Decorative Element 3: Large Square - Hidden on mobile */}
                        <div className="absolute top-8 lg:top-16 right-8 lg:right-16 h-16 w-16 lg:h-24 lg:w-24 hidden lg:block" style={{ backgroundColor: '#C9A34E', opacity: 0.4 }} />
                        
                        {/* Decorative Element 4: Gradient Overlay */}
                        <div className="absolute left-0 lg:left-[-80px] top-0 h-full w-full lg:w-[calc(100%+80px)]" style={{ background: 'linear-gradient(to right, transparent, rgba(201, 163, 78, 0.15), transparent)' }} />
                        
                        {/* Image Container - Visible on all screens */}
                        <div className="relative h-full w-full overflow-hidden rounded-lg lg:rounded-none">
                          <Image
                            src="/2.jpg"
                            alt="Jewelry Collection"
                            fill
                            className="h-full w-full object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
            
            {/* Slide 2 - Reversed Layout */}
            <CarouselItem>
              <div className="relative min-h-[500px] sm:min-h-[550px] md:min-h-[620px] w-full">
                {/* Background Layer */}
                <div className="absolute inset-0">
                  <Image
                    src="/2.jpg"
                    alt="Premium Gold Collection"
                    fill
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(103, 0, 153, 0.95), rgba(81, 12, 116, 0.85), rgba(36, 3, 52, 0.60))' }} />
                </div>

                {/* Content Layer */}
                <div className="relative z-10 flex h-full w-full items-stretch">
                  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-8 sm:gap-12 lg:grid-cols-[0.95fr_1.05fr]">
                      {/* Left Column: Decorative Graphics (Reversed) - Now visible on mobile */}
                      <div className="relative min-h-[200px] sm:min-h-[250px] md:min-h-[300px] lg:min-h-[400px] items-center justify-center lg:justify-start flex order-2 lg:order-1 mt-4 lg:mt-0">
                        {/* Decorative Element 1: Vertical Bar (Top) - Hidden on mobile */}
                        <div className="absolute inset-y-16 left-8 lg:left-16 w-3 lg:w-4 rounded hidden lg:block" style={{ backgroundColor: '#C9A34E', opacity: 0.8 }} />
                        
                        {/* Decorative Element 2: Vertical Bar (Bottom) - Hidden on mobile */}
                        <div className="absolute bottom-12 lg:bottom-20 left-8 lg:left-16 h-8 lg:h-12 w-3 lg:w-4 rounded hidden lg:block" style={{ backgroundColor: '#C9A34E', opacity: 0.8 }} />
                        
                        {/* Decorative Element 3: Large Square - Hidden on mobile */}
                        <div className="absolute top-8 lg:top-16 left-8 lg:left-16 h-16 w-16 lg:h-24 lg:w-24 hidden lg:block" style={{ backgroundColor: '#C9A34E', opacity: 0.4 }} />
                        
                        {/* Decorative Element 4: Gradient Overlay */}
                        <div className="absolute right-0 lg:right-[-80px] top-0 h-full w-full lg:w-[calc(100%+80px)]" style={{ background: 'linear-gradient(to left, transparent, rgba(201, 163, 78, 0.15), transparent)' }} />
                        
                        {/* Image Container - Visible on all screens */}
                        <div className="relative h-full w-full overflow-hidden rounded-lg lg:rounded-none">
                          <Image
                            src="/2.jpg"
                            alt="Gold Collection"
                            fill
                            className="h-full w-full object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                          />
                        </div>
                      </div>

                      {/* Right Column: Text Content (Reversed) */}
                      <div className="flex flex-col justify-center items-center text-center py-6 sm:py-8 md:py-12 lg:py-16 order-1 lg:order-2">
                        {/* Decorative Red Lines */}
                        <div className="mb-4 sm:mb-6 flex items-center justify-center gap-2">
                          <span className="h-1 w-8 sm:w-12" style={{ background: 'linear-gradient(90deg, #670099, #510c74, #240334)' }} />
                          <span className="h-1 w-3 sm:w-4" style={{ background: 'linear-gradient(90deg, #670099, #510c74, #240334)' }} />
                          <span className="h-1 w-2" style={{ background: 'linear-gradient(90deg, #670099, #510c74, #240334)' }} />
                        </div>
                        
                        {/* Eyebrow Text */}
                        <span className="mb-2 sm:mb-4 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
                          Premium Gold Collection
                        </span>
                        
                        {/* Main Headline */}
                        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-white leading-tight">
                          Timeless Elegance in Every Piece
                        </h1>
                        
                        {/* Description */}
                        <p className="mt-3 sm:mt-4 md:mt-6 max-w-2xl mx-auto text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed text-white/85">
                          Experience the luxury of our premium gold collection. Each piece is meticulously crafted to perfection, combining traditional artistry with modern design. Elevate your style with jewelry that speaks to your unique personality.
                        </p>
                        
                        {/* CTA Buttons */}
                        <div className="mt-4 sm:mt-6 md:mt-8 lg:mt-10 flex flex-row items-center justify-center gap-3 sm:gap-4">
                          <Link 
                            href="/contact" 
                            className="inline-flex items-center justify-center rounded-md px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm md:text-base font-semibold uppercase tracking-wide shadow-md transition whitespace-nowrap"
                            style={{ background: 'linear-gradient(90deg, #670099, #510c74, #240334)', color: '#C9A34E' }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = 'linear-gradient(90deg, #510c74, #240334)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = 'linear-gradient(90deg, #670099, #510c74, #240334)'; }}
                          >
                            Speak to an Expert
                          </Link>
                          <Link 
                            href="/products" 
                            className="inline-flex items-center justify-center rounded-md bg-[#3f3f3f] px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm md:text-base font-semibold uppercase tracking-wide shadow-md transition hover:bg-[#1f1f1f] whitespace-nowrap"
                            style={{ color: '#C9A34E' }}
                          >
                            View Our Products
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
            
            {/* Slide 3 */}
            <CarouselItem>
              <div className="relative min-h-[500px] sm:min-h-[550px] md:min-h-[620px] w-full">
                {/* Background Layer */}
                <div className="absolute inset-0">
                  <Image
                    src="/2.jpg"
                    alt="Diamond & Gemstone Collection"
                    fill
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(103, 0, 153, 0.95), rgba(81, 12, 116, 0.85), rgba(36, 3, 52, 0.60))' }} />
                </div>

                {/* Content Layer */}
                <div className="relative z-10 flex h-full w-full items-stretch">
                  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-6 sm:gap-8 lg:gap-12 lg:grid-cols-[1.05fr_0.95fr]">
                      {/* Left Column: Text Content */}
                      <div className="flex flex-col justify-center items-center text-center py-6 sm:py-8 md:py-12 lg:py-16">
                        {/* Decorative Red Lines */}
                        <div className="mb-4 sm:mb-6 flex items-center justify-center gap-2">
                          <span className="h-1 w-8 sm:w-12" style={{ background: 'linear-gradient(90deg, #670099, #510c74, #240334)' }} />
                          <span className="h-1 w-3 sm:w-4" style={{ background: 'linear-gradient(90deg, #670099, #510c74, #240334)' }} />
                          <span className="h-1 w-2" style={{ background: 'linear-gradient(90deg, #670099, #510c74, #240334)' }} />
                        </div>
                        
                        {/* Eyebrow Text */}
                        <span className="mb-2 sm:mb-4 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
                          Diamond & Gemstone Collection
                        </span>
                        
                        {/* Main Headline */}
                        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-white leading-tight">
                          Sparkle with Our Exquisite Gemstones
                        </h1>
                        
                        {/* Description */}
                        <p className="mt-3 sm:mt-4 md:mt-6 max-w-2xl mx-auto text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed text-white/85">
                          Indulge in the brilliance of our diamond and gemstone collection. From classic diamonds to vibrant colored stones, each piece is designed to capture and reflect your inner radiance. Make every moment unforgettable.
                        </p>
                        
                        {/* CTA Buttons */}
                        <div className="mt-4 sm:mt-6 md:mt-8 lg:mt-10 flex flex-row items-center justify-center gap-3 sm:gap-4">
                          <Link 
                            href="/contact" 
                            className="inline-flex items-center justify-center rounded-md px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm md:text-base font-semibold uppercase tracking-wide shadow-md transition whitespace-nowrap"
                            style={{ background: 'linear-gradient(90deg, #670099, #510c74, #240334)', color: '#C9A34E' }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = 'linear-gradient(90deg, #510c74, #240334)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = 'linear-gradient(90deg, #670099, #510c74, #240334)'; }}
                          >
                            Speak to an Expert
                          </Link>
                          <Link 
                            href="/products" 
                            className="inline-flex items-center justify-center rounded-md bg-[#3f3f3f] px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm md:text-base font-semibold uppercase tracking-wide shadow-md transition hover:bg-[#1f1f1f] whitespace-nowrap"
                            style={{ color: '#C9A34E' }}
                          >
                            View Our Products
                          </Link>
                        </div>
                      </div>

                      {/* Right Column: Decorative Graphics - Now visible on mobile */}
                      <div className="relative min-h-[200px] sm:min-h-[250px] md:min-h-[300px] lg:min-h-[400px] items-center justify-center lg:justify-end flex mt-4 lg:mt-0">
                        {/* Decorative Element 1: Vertical Bar (Top) - Hidden on mobile */}
                        <div className="absolute inset-y-16 right-8 lg:right-16 w-3 lg:w-4 rounded hidden lg:block" style={{ backgroundColor: '#C9A34E', opacity: 0.8 }} />
                        
                        {/* Decorative Element 2: Vertical Bar (Bottom) - Hidden on mobile */}
                        <div className="absolute bottom-12 lg:bottom-20 right-8 lg:right-16 h-8 lg:h-12 w-3 lg:w-4 rounded hidden lg:block" style={{ backgroundColor: '#C9A34E', opacity: 0.8 }} />
                        
                        {/* Decorative Element 3: Large Square - Hidden on mobile */}
                        <div className="absolute top-8 lg:top-16 right-8 lg:right-16 h-16 w-16 lg:h-24 lg:w-24 hidden lg:block" style={{ backgroundColor: '#C9A34E', opacity: 0.4 }} />
                        
                        {/* Decorative Element 4: Gradient Overlay */}
                        <div className="absolute left-0 lg:left-[-80px] top-0 h-full w-full lg:w-[calc(100%+80px)]" style={{ background: 'linear-gradient(to right, transparent, rgba(201, 163, 78, 0.15), transparent)' }} />
                        
                        {/* Image Container - Visible on all screens */}
                        <div className="relative h-full w-full overflow-hidden rounded-lg lg:rounded-none">
                          <Image
                            src="/2.jpg"
                            alt="Gemstone Collection"
                            fill
                            className="h-full w-full object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
            
            {/* Slide 4 - Reversed Layout */}
            <CarouselItem>
              <div className="relative min-h-[500px] sm:min-h-[550px] md:min-h-[620px] w-full">
                {/* Background Layer */}
                <div className="absolute inset-0">
                  <Image
                    src="/2.jpg"
                    alt="Elegant Silver Collection"
                    fill
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(103, 0, 153, 0.95), rgba(81, 12, 116, 0.85), rgba(36, 3, 52, 0.60))' }} />
                </div>

                {/* Content Layer */}
                <div className="relative z-10 flex h-full w-full items-stretch">
                  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-8 sm:gap-12 lg:grid-cols-[0.95fr_1.05fr]">
                      {/* Left Column: Decorative Graphics (Reversed) - Now visible on mobile */}
                      <div className="relative min-h-[200px] sm:min-h-[250px] md:min-h-[300px] lg:min-h-[400px] items-center justify-center lg:justify-start flex order-2 lg:order-1 mt-4 lg:mt-0">
                        {/* Decorative Element 1: Vertical Bar (Top) - Hidden on mobile */}
                        <div className="absolute inset-y-16 left-8 lg:left-16 w-3 lg:w-4 rounded hidden lg:block" style={{ backgroundColor: '#C9A34E', opacity: 0.8 }} />
                        
                        {/* Decorative Element 2: Vertical Bar (Bottom) - Hidden on mobile */}
                        <div className="absolute bottom-12 lg:bottom-20 left-8 lg:left-16 h-8 lg:h-12 w-3 lg:w-4 rounded hidden lg:block" style={{ backgroundColor: '#C9A34E', opacity: 0.8 }} />
                        
                        {/* Decorative Element 3: Large Square - Hidden on mobile */}
                        <div className="absolute top-8 lg:top-16 left-8 lg:left-16 h-16 w-16 lg:h-24 lg:w-24 hidden lg:block" style={{ backgroundColor: '#C9A34E', opacity: 0.4 }} />
                        
                        {/* Decorative Element 4: Gradient Overlay */}
                        <div className="absolute right-0 lg:right-[-80px] top-0 h-full w-full lg:w-[calc(100%+80px)]" style={{ background: 'linear-gradient(to left, transparent, rgba(201, 163, 78, 0.15), transparent)' }} />
                        
                        {/* Image Container - Visible on all screens */}
                        <div className="relative h-full w-full overflow-hidden rounded-lg lg:rounded-none">
                          <Image
                            src="/2.jpg"
                            alt="Silver Collection"
                            fill
                            className="h-full w-full object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                          />
                        </div>
                      </div>

                      {/* Right Column: Text Content (Reversed) */}
                      <div className="flex flex-col justify-center items-center text-center py-6 sm:py-8 md:py-12 lg:py-16 order-1 lg:order-2">
                        {/* Decorative Red Lines */}
                        <div className="mb-4 sm:mb-6 flex items-center justify-center gap-2">
                          <span className="h-1 w-8 sm:w-12" style={{ background: 'linear-gradient(90deg, #670099, #510c74, #240334)' }} />
                          <span className="h-1 w-3 sm:w-4" style={{ background: 'linear-gradient(90deg, #670099, #510c74, #240334)' }} />
                          <span className="h-1 w-2" style={{ background: 'linear-gradient(90deg, #670099, #510c74, #240334)' }} />
                        </div>
                        
                        {/* Eyebrow Text */}
                        <span className="mb-2 sm:mb-4 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
                          Elegant Silver Collection
                        </span>
                        
                        {/* Main Headline */}
                        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-white leading-tight">
                          Sophisticated Designs for Modern Times
                        </h1>
                        
                        {/* Description */}
                        <p className="mt-3 sm:mt-4 md:mt-6 max-w-2xl mx-auto text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed text-white/85">
                          Discover the refined beauty of our silver collection. Combining contemporary elegance with timeless appeal, our silver jewelry pieces are perfect for both everyday wear and special occasions. Quality craftsmanship meets modern design.
                        </p>
                        
                        {/* CTA Buttons */}
                        <div className="mt-4 sm:mt-6 md:mt-8 lg:mt-10 flex flex-row items-center justify-center gap-3 sm:gap-4">
                          <Link 
                            href="/contact" 
                            className="inline-flex items-center justify-center rounded-md px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm md:text-base font-semibold uppercase tracking-wide shadow-md transition whitespace-nowrap"
                            style={{ background: 'linear-gradient(90deg, #670099, #510c74, #240334)', color: '#C9A34E' }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = 'linear-gradient(90deg, #510c74, #240334)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = 'linear-gradient(90deg, #670099, #510c74, #240334)'; }}
                          >
                            Speak to an Expert
                          </Link>
                          <Link 
                            href="/products" 
                            className="inline-flex items-center justify-center rounded-md bg-[#3f3f3f] px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm md:text-base font-semibold uppercase tracking-wide shadow-md transition hover:bg-[#1f1f1f] whitespace-nowrap"
                            style={{ color: '#C9A34E' }}
                          >
                            View Our Products
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>
          
          {/* Navigation Arrows */}
          <CarouselPrevious 
            className="left-2 md:left-4 lg:left-8 h-10 w-10 md:h-12 md:w-12 bg-white/80 backdrop-blur-sm border-white/50 hover:bg-white/90 hover:border-white z-30"
          />
          <CarouselNext 
            className="right-2 md:right-4 lg:right-8 h-10 w-10 md:h-12 md:w-12 backdrop-blur-sm z-30"
            style={{ backgroundColor: '#d1b2e0', borderColor: '#510c74', color: '#240334' }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#510c74'; e.currentTarget.style.borderColor = '#d1b2e0'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#d1b2e0'; e.currentTarget.style.borderColor = '#510c74'; }}
          />
        </Carousel>
        
        {/* Slide Indicators */}
        <div className="absolute bottom-20 sm:bottom-24 lg:bottom-28 left-1/2 transform -translate-x-1/2 z-30 flex items-center space-x-2">
          {[0, 1, 2, 3].map((index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`transition-all duration-300 rounded-full ${
                current === index
                  ? "w-8 h-2"
                  : "w-2 h-2"
              }`}
              style={current === index ? { backgroundColor: '#d1b2e0' } : { backgroundColor: '#d1b2e0', opacity: 0.4 }}
              onMouseEnter={(e) => { if (current !== index) e.currentTarget.style.opacity = '0.6'; }}
              onMouseLeave={(e) => { if (current !== index) e.currentTarget.style.opacity = '0.4'; }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

        {/* About Section */}
        <section className="py-12 md:py-20" style={{ backgroundColor: '#eae0cc' }}>
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 md:space-y-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div>
                <h2 className="font-light-300 text-3xl md:text-4xl lg:text-5xl mb-4 md:mb-6 animate-fade-in-up text-center lg:text-left gradient-text" style={{ animationDelay: '0.4s' }}>About Iitaon Jewellery</h2>
                <p className="text-base md:text-lg leading-relaxed mb-4 md:mb-6 animate-fade-in-up" style={{ color: '#240334', opacity: 0.8, animationDelay: '0.6s' }}>
                  At Rose Jewels, we believe that jewelry is more than just an accessory—it's a reflection of your unique story,
                  your precious moments, and your personal style. For over two decades, we've been dedicated to creating
                  exquisite pieces that celebrate life's most beautiful moments.
                </p>
                <p className="text-sm md:text-base leading-relaxed mb-6 md:mb-8 animate-fade-in-up" style={{ color: '#240334', opacity: 0.8, animationDelay: '0.8s' }}>
                  Our master craftsmen combine traditional techniques with modern innovation to create jewelry that stands
                  the test of time. Every piece is carefully designed and meticulously crafted using only the finest
                  materials, ensuring that your jewelry remains as beautiful as the day you first wore it.
                </p>
                <div className="text-center lg:text-left">
                  <Link href="/about">
                    <Button size="lg" className="px-6 md:px-8 py-3 text-base md:text-lg animate-fade-in-up transition-all duration-300 hover:scale-105 shadow-lg" style={{ background: 'linear-gradient(90deg, #670099, #510c74)', color: '#C9A34E', animationDelay: '1s' }}>
                      Learn More About Us
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="relative animate-fade-in-up text-center lg:text-left" style={{ animationDelay: '0.3s' }}>
              <Image
                src="/logoalan-removebg-preview.png"
                alt="Iitaon Jewellery Logo"
                width={800}
                height={700}
                className="rounded-2xl shadow-lg object-contain animate-fade-in-up transition-all duration-300 hover:scale-105 w-full max-w-md mx-auto lg:max-w-full"
                style={{ animationDelay: '0.5s' }}
              />
              <div className="absolute -bottom-3 -left-3 lg:-bottom-6 lg:-left-6 p-3 lg:p-6 rounded-xl lg:rounded-2xl shadow-lg animate-fade-in-up" style={{ backgroundColor: '#d1b2e0', animationDelay: '0.7s' }}>
                <div className="flex items-center space-x-2 lg:space-x-4">
                  <div className="w-8 h-8 lg:w-12 lg:h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 lg:w-6 lg:h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#240334] text-xs lg:text-sm">Premium Quality</p>
                    <p className="text-xs lg:text-sm text-[#240334] opacity-80">Certified & Authentic</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

       {/* New Arrivals Section */}
       <section className="py-12 md:py-20" style={{ backgroundColor: '#eae0cc' }}>
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between mb-8 md:mb-16 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="text-center flex-1">
              <h2 className="font-light-300 text-3xl md:text-4xl lg:text-5xl mb-3 md:mb-4 animate-fade-in-up gradient-text" style={{ animationDelay: '0.4s' }}>New Arrivals</h2>
              <p className="max-w-2xl mx-auto text-sm md:text-base lg:text-lg animate-fade-in-up px-4" style={{ color: '#240334', opacity: 0.8, animationDelay: '0.6s' }}>
                Discover our latest collection of exquisite jewelry pieces, crafted with precision and designed to make you shine.
              </p>
            </div>
           
          </div>

          {/* Products Grid */}
              {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={`loading-${index}`} className="bg-white rounded-lg overflow-hidden shadow-md animate-pulse">
                  <div className="aspect-[3/4] bg-gray-200"></div>
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-6 bg-gray-200 rounded"></div>
                    <div className="h-5 bg-gray-200 rounded"></div>
                    </div>
                      </div>
              ))}
                    </div>
              ) : newArrivals.length === 0 ? (
                <div className="text-center py-16">
              <p style={{ color: '#240334', opacity: 0.7 }}>No products available</p>
                </div>
              ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {newArrivals.map((product) => {
                const isFavorite = favorites.has(product._id)
                const productImages = product.images && product.images.length > 0 ? product.images : []
                const firstImage = productImages[0]?.url || "/placeholder.svg"
                const secondImage = productImages[1]?.url || productImages[0]?.url || "/placeholder.svg"
                
                return (
                  <Link 
                    key={product._id} 
                    href={`/view-details?id=${product._id}`}
                    className="group relative bg-white hover:bg-[#111111] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Product Image */}
                    <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                      {/* First Image - Always visible */}
                         <Image
                        src={firstImage}
                           alt={product.name}
                        fill
                        className="object-cover opacity-100 group-hover:opacity-0 transition-opacity duration-500"
                        loading="lazy"
                      />
                      
                      {/* Second Image - Fades in on hover */}
                      <Image
                        src={secondImage}
                        alt={product.name}
                        fill
                        className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        loading="lazy"
                      />
                      
                      {/* Heart Icon - Top Right */}
                      <button
                        onClick={(e) => toggleFavorite(product._id, e)}
                        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-colors duration-200"
                        aria-label="Add to favorites"
                      >
                        <Heart 
                          className={`h-5 w-5 transition-colors duration-200 ${
                            isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'
                          }`}
                        />
                      </button>

                      {/* Sale Badge */}
                      {product.isOnSale && (
                        <div className="absolute top-3 left-3">
                          <div className="px-3 py-1 rounded-full text-xs font-semibold text-white" style={{ backgroundColor: '#CD7F32' }}>
                            {product.offerPercentage}% OFF
                             </div>
                           </div>
                         )}

                      {/* New Badge */}
                      {product.isNew && (
                        <div className="absolute top-3 left-3" style={{ top: product.isOnSale ? '3.5rem' : '0.75rem' }}>
                          <div className="bg-white px-3 py-1 rounded-full text-xs font-semibold text-gray-900">
                            New
                             </div>
                           </div>
                         )}
                       </div>

                    {/* Product Info */}
                    <div className="p-4 space-y-2">
                      {/* Category/Brand */}
                      {product.category && (
                        <p className="text-xs font-medium text-gray-600 group-hover:text-white/70 uppercase tracking-wide transition-colors duration-300">
                          {product.category}
                        </p>
                      )}

                      {/* Product Name */}
                      <h3 className="font-semibold text-gray-900 group-hover:text-white line-clamp-2 transition-colors duration-300">
                        {product.name}
                      </h3>

                      {/* Price */}
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-[#510c74] group-hover:text-[#C9A34E] transition-colors duration-300">
                          ₹{product.price.toFixed(2)}
                        </span>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <span className="text-sm text-gray-500 group-hover:text-white/60 line-through transition-colors duration-300">
                            ₹{product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                        </Link>
                )
              })}
                      </div>
          )}
          
          {/* View All Button */}
          <div className="text-center mt-8 md:mt-12 animate-fade-in-up" style={{ animationDelay: '1s' }}>
            <Link href="/products">
              <Button size="lg" className="px-6 md:px-8 py-3 text-base md:text-lg transition-all duration-300 hover:scale-105 rounded-full" style={{ background: 'linear-gradient(90deg, #670099, #510c74)', color: '#C9A34E', border: '1px solid rgba(103, 0, 153, 0.3)' }}>
                View All New Arrivals
              </Button>
            </Link>
          </div>
        </div>
      </section>

       {/* Latest Gems Section */}
       <section className="py-12 md:py-20" style={{ backgroundColor: '#eae0cc' }}>
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between mb-8 md:mb-16 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="text-center flex-1">
              <h2 className="font-light-300 text-3xl md:text-4xl lg:text-5xl mb-3 md:mb-4 animate-fade-in-up gradient-text" style={{ animationDelay: '0.4s' }}>Latest Gems</h2>
              <p className="max-w-2xl mx-auto text-sm md:text-base lg:text-lg animate-fade-in-up px-4" style={{ color: '#240334', opacity: 0.8, animationDelay: '0.6s' }}>
                Discover our most precious and exclusive gemstone jewelry collection, featuring rare stones and premium craftsmanship.
              </p>
            </div>
          </div>

          {/* Products Grid */}
              {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={`loading-${index}`} className="bg-white rounded-2xl overflow-hidden shadow-md animate-pulse">
                  <div className="aspect-[3/4] bg-gray-200"></div>
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-6 bg-gray-200 rounded"></div>
                    <div className="h-5 bg-gray-200 rounded"></div>
                    </div>
                      </div>
              ))}
                    </div>
              ) : latestGems.length === 0 ? (
                <div className="text-center py-16">
              <p style={{ color: '#240334', opacity: 0.7 }}>No products available</p>
                </div>
              ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {latestGems.map((product) => {
                const isFavorite = favorites.has(product._id)
                const productImages = product.images && product.images.length > 0 ? product.images : []
                const firstImage = productImages[0]?.url || "/placeholder.svg"
                const secondImage = productImages[1]?.url || productImages[0]?.url || "/placeholder.svg"
                
                return (
                  <Link 
                    key={product._id} 
                    href={`/view-details?id=${product._id}`}
                    className="group relative bg-white hover:bg-[#111111] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Product Image */}
                    <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                      {/* First Image - Always visible */}
                        <Image
                        src={firstImage}
                          alt={product.name}
                        fill
                        className="object-cover opacity-100 group-hover:opacity-0 transition-opacity duration-500"
                        loading="lazy"
                      />
                      
                      {/* Second Image - Fades in on hover */}
                      <Image
                        src={secondImage}
                        alt={product.name}
                        fill
                        className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        loading="lazy"
                      />
                      
                      {/* Heart Icon - Top Right */}
                      <button
                        onClick={(e) => toggleFavorite(product._id, e)}
                        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-colors duration-200"
                        aria-label="Add to favorites"
                      >
                        <Heart 
                          className={`h-5 w-5 transition-colors duration-200 ${
                            isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'
                          }`}
                        />
                      </button>

                      {/* Sale Badge */}
                        {product.isOnSale && (
                        <div className="absolute top-3 left-3">
                          <div className="px-3 py-1 rounded-full text-xs font-semibold text-white" style={{ backgroundColor: '#CD7F32' }}>
                              {product.offerPercentage}% OFF
                            </div>
                          </div>
                        )}

                      {/* New Badge */}
                      {product.isNew && (
                        <div className="absolute top-3 left-3" style={{ top: product.isOnSale ? '3.5rem' : '0.75rem' }}>
                          <div className="bg-white px-3 py-1 rounded-full text-xs font-semibold text-gray-900">
                            New
                      </div>
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="p-4 space-y-2">
                      {/* Category/Brand */}
                      {product.category && (
                        <p className="text-xs font-medium text-gray-600 group-hover:text-white/70 uppercase tracking-wide transition-colors duration-300">
                          {product.category}
                        </p>
                      )}

                      {/* Product Name */}
                      <h3 className="font-semibold text-gray-900 group-hover:text-white line-clamp-2 transition-colors duration-300">
                        {product.name}
                      </h3>

                      {/* Price */}
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-[#510c74] group-hover:text-[#C9A34E] transition-colors duration-300">
                          ₹{product.price.toFixed(2)}
                        </span>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <span className="text-sm text-gray-500 group-hover:text-white/60 line-through transition-colors duration-300">
                            ₹{product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                        </Link>
                )
              })}
                      </div>
          )}
          
          {/* View All Button */}
          <div className="text-center mt-12 animate-fade-in-up" style={{ animationDelay: '1s' }}>
            <Link href="/products">
              <Button size="lg" className="px-8 py-3 text-lg transition-all duration-300 hover:scale-105 rounded-full" style={{ background: 'linear-gradient(90deg, #670099, #510c74)', color: '#C9A34E', border: '1px solid rgba(103, 0, 153, 0.3)' }}>
                View All Latest Gems
              </Button>
            </Link>
          </div>
        </div>
      </section>

       {/* Categories Section */}
       <section className="py-20 mt-16" style={{ backgroundColor: '#eae0cc' }}>
        <div className="w-full mx-auto px-4 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h2 className="font-light-300 text-5xl mb-4 animate-fade-in-up gradient-text" style={{ animationDelay: '0.4s' }}>Shop by Category</h2>
            <p className="max-w-2xl mx-auto text-lg animate-fade-in-up" style={{ color: '#240334', opacity: 0.8, animationDelay: '0.6s' }}>
              Explore our diverse collection of jewelry categories, each carefully curated to suit every style and occasion.
            </p>
          </div>

          {/* 4-column grid - automatically continues with more rows if categories exceed 4 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 w-full px-4 lg:px-8">
            {categories.map((category, index) => (
              <article 
                key={category.id}
                className="group relative aspect-[4/3.5] overflow-hidden rounded-2xl bg-gray-50 shadow-lg transition-transform duration-500 hover:-translate-y-1 cursor-pointer animate-fade-in-up"
                style={{ animationDelay: `${0.8 + index * 0.1}s` }}
              >
                <Link href={`/products?category=${encodeURIComponent(category.name)}`} className="block h-full w-full">
                  {/* Image Container - Fills entire card */}
                  <div className="relative h-full w-full">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  
                  {/* Hover Overlay with Text */}
                  <div className="absolute inset-0 flex items-start p-4 sm:p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/30">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-white">
                        {category.name}
                      </h3>
                      <span className="mt-2 block h-[3px] w-8 origin-left transition-[width] duration-500 ease-out group-hover:w-24" style={{ backgroundColor: '#C9A34E' }} />
                      <p className="mt-2 text-sm sm:text-base font-medium text-white opacity-90">
                        {category.count} Products
                      </p>
                  </div>
                </div>
              </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20" style={{ backgroundColor: '#eae0cc' }}>
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h2 className="font-light-300 text-5xl mb-4 animate-fade-in-up gradient-text" style={{ animationDelay: '0.4s' }}>Featured Products</h2>
            <p className="max-w-2xl mx-auto text-lg animate-fade-in-up" style={{ color: '#240334', opacity: 0.8, animationDelay: '0.6s' }}>
              Discover our handpicked selection of the finest jewelry pieces, crafted with precision and designed to make you shine.
            </p>
          </div>

          {/* Products Grid */}
              {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={`loading-${index}`} className="bg-white rounded-2xl overflow-hidden shadow-md animate-pulse">
                  <div className="aspect-[3/4] bg-gray-200"></div>
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-6 bg-gray-200 rounded"></div>
                    <div className="h-5 bg-gray-200 rounded"></div>
                    </div>
                      </div>
              ))}
                    </div>
              ) : featuredProducts.length === 0 ? (
                <div className="text-center py-16">
              <p style={{ color: '#240334', opacity: 0.7 }}>No products available</p>
                </div>
              ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => {
                const isFavorite = favorites.has(product._id)
                const productImages = product.images && product.images.length > 0 ? product.images : []
                const firstImage = productImages[0]?.url || "/placeholder.svg"
                const secondImage = productImages[1]?.url || productImages[0]?.url || "/placeholder.svg"
                
                return (
                  <Link 
                    key={product._id} 
                    href={`/view-details?id=${product._id}`}
                    className="group relative bg-white hover:bg-[#111111] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Product Image */}
                    <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                      {/* First Image - Always visible */}
                          <Image
                        src={firstImage}
                            alt={product.name}
                        fill
                        className="object-cover opacity-100 group-hover:opacity-0 transition-opacity duration-500"
                        loading="lazy"
                      />
                      
                      {/* Second Image - Fades in on hover */}
                      <Image
                        src={secondImage}
                        alt={product.name}
                        fill
                        className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        loading="lazy"
                      />
                      
                      {/* Heart Icon - Top Right */}
                      <button
                        onClick={(e) => toggleFavorite(product._id, e)}
                        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-colors duration-200"
                        aria-label="Add to favorites"
                      >
                        <Heart 
                          className={`h-5 w-5 transition-colors duration-200 ${
                            isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'
                          }`}
                        />
                      </button>

                      {/* Sale Badge */}
                            {product.isOnSale && (
                        <div className="absolute top-3 left-3">
                          <div className="px-3 py-1 rounded-full text-xs font-semibold text-white" style={{ backgroundColor: '#CD7F32' }}>
                            {product.offerPercentage}% OFF
                          </div>
                        </div>
                      )}

                      {/* New Badge */}
                      {product.isNew && (
                        <div className="absolute top-3 left-3" style={{ top: product.isOnSale ? '3.5rem' : '0.75rem' }}>
                          <div className="bg-white px-3 py-1 rounded-full text-xs font-semibold text-gray-900">
                            New
                          </div>
                        </div>
                      )}

                      {/* Featured Badge */}
                      <div className="absolute top-3 left-3" style={{ top: (product.isOnSale && product.isNew) ? '5.5rem' : (product.isOnSale || product.isNew) ? '3.5rem' : '0.75rem' }}>
                        <div className="px-3 py-1 rounded-full text-xs font-semibold text-white" style={{ background: 'linear-gradient(90deg, #670099, #510c74)' }}>
                          FEATURED
                          </div>
                      </div>
                        </div>

                    {/* Product Info */}
                    <div className="p-4 space-y-2">
                      {/* Category/Brand */}
                      {product.category && (
                        <p className="text-xs font-medium text-gray-600 group-hover:text-white/70 uppercase tracking-wide transition-colors duration-300">
                          {product.category}
                        </p>
                      )}

                      {/* Product Name */}
                      <h3 className="font-semibold text-gray-900 group-hover:text-white line-clamp-2 transition-colors duration-300">
                          {product.name}
                        </h3>

                      {/* Price */}
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-[#510c74] group-hover:text-[#C9A34E] transition-colors duration-300">
                          ₹{product.price.toFixed(2)}
                        </span>
                            {product.originalPrice && product.originalPrice > product.price && (
                          <span className="text-sm text-gray-500 group-hover:text-white/60 line-through transition-colors duration-300">
                            ₹{product.originalPrice.toFixed(2)}
                              </span>
                            )}
                          </div>
                        </div>
                          </Link>
                )
              })}
                        </div>
          )}

          <div className="text-center mt-12 animate-fade-in-up" style={{ animationDelay: '1s' }}>
            <Link href="/products">
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-3 text-lg transition-all duration-300 hover:scale-105 rounded-full"
                style={{ background: 'linear-gradient(90deg, #670099, #510c74)', color: '#C9A34E', border: '1px solid rgba(103, 0, 153, 0.3)' }}
              >
                Explore All Products
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>



     

      <Footer />
    </div>
  )
}
