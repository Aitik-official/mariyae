"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import NecklaceSection from "@/components/necklace-section"
import PendantSection from "@/components/pendant-section"
import InstagramCarousel from "@/components/instagram-carousel"
import JewelryLayout from "@/components/jewelry-layout"
import HandpickedSection from "@/components/handpicked-section"

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

// Helper function to render a banner slide
const renderBannerSlide = (banner: any, index: number): JSX.Element => {
  const isReversed = banner.layoutType === 'reversed'
  const gridCols = isReversed ? 'lg:grid-cols-[0.95fr_1.05fr]' : 'lg:grid-cols-[1.05fr_0.95fr]'
  const textOrder = isReversed ? 'order-1 lg:order-2' : ''
  const imageOrder = isReversed ? 'order-2 lg:order-1' : ''
  const gradientDirection = isReversed ? 'to left' : 'to right'
  const imagePosition = isReversed ? 'lg:justify-start' : 'lg:justify-end'
  const decorativePosition = isReversed ? 'left-8 lg:left-16' : 'right-8 lg:right-16'
  const gradientPosition = isReversed ? 'right-0 lg:right-[-80px]' : 'left-0 lg:left-[-80px]'
  const gradientCalc = isReversed ? 'lg:w-[calc(100%+80px)]' : 'lg:w-[calc(100%+80px)]'

  return (
    <div className="relative min-h-[500px] sm:min-h-[550px] md:min-h-[620px] w-full">
      {/* Background Layer */}
      <div className="absolute inset-0">
        {banner.backgroundImage ? (
          <Image
            src={banner.backgroundImage}
            alt={banner.headline || 'Banner'}
            fill
            className="h-full w-full object-cover"
            priority={index === 0}
            sizes="100vw"
          />
        ) : (
          <Image
            src="/2.jpg"
            alt={banner.headline || 'Banner'}
            fill
            className="h-full w-full object-cover"
            priority={index === 0}
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(103, 0, 153, 0.95), rgba(81, 12, 116, 0.85), rgba(36, 3, 52, 0.60))' }} />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 flex h-full w-full items-stretch">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid gap-6 sm:gap-8 lg:gap-12 ${gridCols}`}>
            {/* Text Content Column */}
            <div className={`flex flex-col justify-center items-center text-center py-6 sm:py-8 md:py-12 lg:py-16 pt-12 sm:pt-16 md:pt-20 lg:pt-24 ${textOrder}`}>
              {/* Decorative Lines */}
              <div className="mb-4 sm:mb-6 flex items-center justify-center gap-2">
                <span className="h-1 w-8 sm:w-12" style={{ background: 'linear-gradient(90deg, #670099, #510c74, #240334)' }} />
                <span className="h-1 w-3 sm:w-4" style={{ background: 'linear-gradient(90deg, #670099, #510c74, #240334)' }} />
                <span className="h-1 w-2" style={{ background: 'linear-gradient(90deg, #670099, #510c74, #240334)' }} />
              </div>

              {/* Eyebrow Text */}
              {banner.eyebrowText && (
                <span className="mb-2 sm:mb-4 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
                  {banner.eyebrowText}
                </span>
              )}

              {/* Main Headline */}
              {banner.headline && (
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-white leading-tight">
                  {banner.headline}
                </h1>
              )}

              {/* Description */}
              {banner.description && (
                <p className="mt-3 sm:mt-4 md:mt-6 max-w-2xl mx-auto text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed text-white/85">
                  {banner.description}
                </p>
              )}

              {/* CTA Buttons */}
              <div className="mt-4 sm:mt-6 md:mt-8 lg:mt-10 flex flex-row items-center justify-center gap-3 sm:gap-4">
                {banner.button1Text && (
                  <Link
                    href={banner.button1Link || '/products'}
                    className="inline-flex items-center justify-center rounded-md px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm md:text-base font-semibold uppercase tracking-wide shadow-md transition whitespace-nowrap"
                    style={{ background: 'linear-gradient(90deg, #670099, #510c74, #240334)', color: '#C9A34E' }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'linear-gradient(90deg, #510c74, #240334)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'linear-gradient(90deg, #670099, #510c74, #240334)'; }}
                  >
                    {banner.button1Text}
                  </Link>
                )}
                {banner.button2Text && (
                  <Link
                    href={banner.button2Link || '/products'}
                    className="inline-flex items-center justify-center rounded-md bg-[#3f3f3f] px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm md:text-base font-semibold uppercase tracking-wide shadow-md transition hover:bg-[#1f1f1f] whitespace-nowrap"
                    style={{ color: '#C9A34E' }}
                  >
                    {banner.button2Text}
                  </Link>
                )}
              </div>
            </div>

            {/* Decorative Graphics Column */}
            <div className={`relative min-h-[200px] sm:min-h-[250px] md:min-h-[300px] lg:min-h-[400px] items-center justify-center ${imagePosition} flex mt-4 lg:mt-0 ${imageOrder}`}>
              {/* Decorative Elements */}
              <div className={`absolute inset-y-16 ${decorativePosition} w-3 lg:w-4 rounded hidden lg:block`} style={{ backgroundColor: '#C9A34E', opacity: 0.8 }} />
              <div className={`absolute bottom-12 lg:bottom-20 ${decorativePosition} h-8 lg:h-12 w-3 lg:w-4 rounded hidden lg:block`} style={{ backgroundColor: '#C9A34E', opacity: 0.8 }} />
              <div className={`absolute top-8 lg:top-16 ${decorativePosition} h-16 w-16 lg:h-24 lg:w-24 hidden lg:block`} style={{ backgroundColor: '#C9A34E', opacity: 0.4 }} />
              <div className={`absolute ${gradientPosition} top-0 h-full w-full ${gradientCalc}`} style={{ background: `linear-gradient(${gradientDirection}, transparent, rgba(201, 163, 78, 0.15), transparent)` }} />

              {/* Image Container */}
              <div className="relative h-[85%] w-[85%] max-h-[350px] max-w-[450px] overflow-hidden rounded-lg lg:rounded-none mx-auto">
                {banner.decorativeImage ? (
                  <Image
                    src={banner.decorativeImage}
                    alt={banner.headline || 'Banner'}
                    fill
                    className="h-full w-full object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                  />
                ) : (
                  <Image
                    src="/2.jpg"
                    alt={banner.headline || 'Banner'}
                    fill
                    className="h-full w-full object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const { addItem } = useCart()
  const { products, loading, error } = useProducts()

  const [currentSlide, setCurrentSlide] = useState(0)
  const [currentGemsSlide, setCurrentGemsSlide] = useState(0)
  const [currentFeaturedSlide, setCurrentFeaturedSlide] = useState(0)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [categories, setCategories] = useState<Array<{ id: string, name: string, count: number, image: string }>>([])
  const [subCategories, setSubCategories] = useState<Array<{ id: string, name: string, count: number, image: string, mainCategory: string }>>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedMainCategoryId, setSelectedMainCategoryId] = useState<string | null>(null)
  const [isViewingSubCategories, setIsViewingSubCategories] = useState(false)
  const [activeCard, setActiveCard] = useState<string | null>(null)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  // Hero carousel state
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [banners, setBanners] = useState<Array<{
    _id: string
    order: number
    eyebrowText: string
    headline: string
    description: string
    button1Text: string
    button1Link: string
    button2Text: string
    button2Link: string
    layoutType: 'normal' | 'reversed'
    backgroundImage: string
    decorativeImage: string
    isActive: boolean
  }>>([])
  const [bannersLoading, setBannersLoading] = useState(true)

  // Get real products from database
  const featuredProducts = products.slice(0, 4)
  const newArrivals = products.slice(0, 12)
  const latestGems = products.slice(0, 8)

  // Fetch main categories from database
  useEffect(() => {
    const fetchMainCategories = async () => {
      try {
        const response = await fetch('/api/categories/main')
        const data = await response.json()

        if (data.success && data.categories) {
          // Count products per main category
          const categoriesWithCounts = data.categories.map((mainCat: any) => {
            // Count products that match this main category name
            const count = products.filter(p =>
              p.category === mainCat.name ||
              p.mainCategory === mainCat.name
            ).length

            return {
              id: mainCat._id,
              name: mainCat.name,
              count: count,
              image: mainCat.image || "/placeholder.svg"
            }
          })

          // Limit to 9 categories for 3x3 grid, or show all if less than 9
          setCategories(categoriesWithCounts.slice(0, 9))
        }
      } catch (error) {
        console.error('Error fetching main categories:', error)
        // Fallback to product-based categories if API fails
        if (products.length > 0) {
          const categoryMap = new Map<string, { count: number, image: string }>()

          products.forEach((product) => {
            if (product.category) {
              const categoryName = product.category
              if (!categoryMap.has(categoryName)) {
                const categoryProduct = products.find(p => p.category === categoryName)
                const categoryImage = categoryProduct?.images && categoryProduct.images.length > 0
                  ? categoryProduct.images[0].url
                  : "/placeholder.svg"

                categoryMap.set(categoryName, {
                  count: 1,
                  image: categoryImage
                })
              } else {
                const existing = categoryMap.get(categoryName)!
                categoryMap.set(categoryName, {
                  ...existing,
                  count: existing.count + 1
                })
              }
            }
          })

          const categoriesArray = Array.from(categoryMap.entries()).map(([name, data], index) => ({
            id: `category-${index}`,
            name,
            count: data.count,
            image: data.image
          }))

          setCategories(categoriesArray.slice(0, 9))
        }
      }
    }

    fetchMainCategories()
  }, [products])

  const handleCategoryClick = async (categoryName: string, categoryId: string) => {
    setActiveCard(categoryName)
    setSelectedCategory(categoryName)
    setSelectedMainCategoryId(categoryId)

    try {
      const response = await fetch(`/api/categories/sub?mainCategory=${encodeURIComponent(categoryName)}`)
      const data = await response.json()

      if (data.success && data.subCategories && data.subCategories.length > 0) {
        const subCategoriesWithCounts = data.subCategories.map((subCat: any) => {
          const count = products.filter(p =>
            p.subCategory === subCat.name ||
            p.category === subCat.name
          ).length

          return {
            id: subCat._id,
            name: subCat.name,
            count,
            image: subCat.image || "/placeholder.svg",
            mainCategory: subCat.mainCategory
          }
        })
        setSubCategories(subCategoriesWithCounts)
        setIsViewingSubCategories(true)
      } else {
        setSubCategories([])
        setIsViewingSubCategories(false)
      }
    } catch (error) {
      console.error('Error fetching subcategories:', error)
      setSubCategories([])
      setIsViewingSubCategories(false)
    }
  }

  const handleSubCategoryClick = (subCategoryName: string) => {
    setActiveCard(subCategoryName)
    setSelectedCategory(subCategoryName)
    setIsViewingSubCategories(false)
  }

  const handleBackToCategories = () => {
    setSelectedCategory(null)
    setSelectedMainCategoryId(null)
    setSubCategories([])
    setIsViewingSubCategories(false)
    setActiveCard(null)
    setHoveredCard(null)
  }

  const handleBackToSubCategories = () => {
    setIsViewingSubCategories(true)
    setSelectedCategory(null)
  }

  const getFilteredProducts = () => {
    if (!selectedCategory) return []

    return products.filter(product => {
      const productCategory = product.category?.toLowerCase() || ''
      const productSubCategory = product.subCategory?.toLowerCase() || ''
      const selected = selectedCategory.toLowerCase()

      return productCategory === selected ||
        productSubCategory === selected ||
        productCategory.includes(selected) ||
        productSubCategory.includes(selected) ||
        selected.includes(productCategory) ||
        selected.includes(productSubCategory)
    })
  }

  const filteredProducts = getFilteredProducts()

  // Fetch banners from database
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        setBannersLoading(true)
        const response = await fetch('/api/banners')
        const data = await response.json()

        if (data.success && data.banners) {
          // Filter only active banners and sort by order
          const activeBanners = data.banners
            .filter((banner: any) => banner.isActive !== false)
            .sort((a: any, b: any) => a.order - b.order)
          setBanners(activeBanners)
        }
      } catch (error) {
        console.error('Error fetching banners:', error)
        setBanners([])
      } finally {
        setBannersLoading(false)
      }
    }

    fetchBanners()
  }, [])

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

  // Hero carousel auto-play with seamless looping
  useEffect(() => {
    if (!api) {
      return
    }

    const interval = setInterval(() => {
      const selectedIndex = api.selectedScrollSnap()
      const slideCount = api.slideNodes().length

      // If we're at the last slide, jump to first slide without animation
      if (selectedIndex === slideCount - 1) {
        api.scrollTo(0, false) // false = no animation, instant jump
      } else {
        api.scrollNext()
      }
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


  return (
    <div className="min-h-screen bg-white">
      {/* Navbar - Always visible */}
      <Navbar />

      {/* Top Section - Increased height */}
      <section className="h-16 md:h-20" style={{ backgroundColor: '#0F4F3F' }}>
        <div className="h-full flex items-center justify-center px-4">
          <p className="text-[#F3EDE4] text-xs md:text-sm font-medium text-center">Welcome to Imitation Jewellery - Exquisite Jewelry Collection</p>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative w-full min-h-[500px] sm:min-h-[550px] md:min-h-[620px] overflow-hidden bg-white" style={{ zIndex: 1 }}>
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
            duration: 25,
            dragFree: false,
            startIndex: 0,
            watchDrag: true,
            skipSnaps: false,
          }}
          className="w-full"
        >
          <CarouselContent>
            {/* Dynamic Banners from Database */}
            {banners.map((banner, index) => (
              <CarouselItem key={banner._id}>
                {renderBannerSlide(banner, index)}
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation Arrows */}
          <CarouselPrevious
            className="left-2 md:left-4 lg:left-8 h-10 w-10 md:h-12 md:w-12 bg-white/80 backdrop-blur-sm border-white/50 hover:bg-white/90 hover:border-white z-30"
          />
          <CarouselNext
            className="right-2 md:right-4 lg:right-8 h-10 w-10 md:h-12 md:w-12 backdrop-blur-sm z-30"
            style={{ backgroundColor: '#fff4df', borderColor: '#510c74', color: '#240334' }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#510c74'; e.currentTarget.style.borderColor = '#fff4df'; e.currentTarget.style.color = '#fff4df'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#fff4df'; e.currentTarget.style.borderColor = '#510c74'; e.currentTarget.style.color = '#240334'; }}
          />
        </Carousel>

        {/* Slide Indicators */}
        <div className="absolute bottom-20 sm:bottom-24 lg:bottom-28 left-1/2 transform -translate-x-1/2 z-30 flex items-center space-x-2">
          {Array.from({ length: banners.length }).map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`transition-all duration-300 rounded-full ${current === index
                ? "w-8 h-2"
                : "w-2 h-2"
                }`}
              style={current === index ? { backgroundColor: '#510c74' } : { backgroundColor: '#510c74', opacity: 0.4 }}
              onMouseEnter={(e) => { if (current !== index) e.currentTarget.style.opacity = '0.6'; }}
              onMouseLeave={(e) => { if (current !== index) e.currentTarget.style.opacity = '0.4'; }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>



      {/* Latest Gems Section */}
      <section className="py-12 md:py-20" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#240334] mb-4">
              Latest Gems
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
              Discover our most precious and exclusive gemstone jewelry collection, featuring rare stones and premium craftsmanship.
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
                          className={`h-5 w-5 transition-colors duration-200 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'
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
              <Button size="lg" className="px-8 py-3 text-lg transition-all duration-300 hover:scale-105 rounded-full" style={{ backgroundColor: '#fff4df', color: '#510c74', border: '1px solid #510c74' }}>
                View All Latest Gems
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Handpicked Section */}
      <HandpickedSection />



      {/* Categories Section with subcategory flow */}
      <section className="py-20" style={{ backgroundColor: '#eae0cc', borderTop: 'none' }}>
        <div className="w-full mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#240334] mb-4">
              Shop by Category
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
              Explore our diverse collection of jewelry categories, each carefully curated to suit every style and occasion.
            </p>
          </div>

          {/* Main Categories */}
          {!selectedCategory && !isViewingSubCategories && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 w-full px-4 lg:px-8">
              {categories.map((category, index) => {
                const isHovered = hoveredCard === category.name
                const isActive = activeCard === category.name

                return (
                  <article
                    key={category.id}
                    className="group relative aspect-[4/3.5] overflow-hidden rounded-2xl bg-gray-50 shadow-lg transition-transform duration-500 hover:-translate-y-1 cursor-pointer animate-fade-in-up"
                    style={{ animationDelay: `${0.8 + index * 0.1}s` }}
                    onMouseEnter={() => setHoveredCard(category.name)}
                    onMouseLeave={() => setHoveredCard(null)}
                    onClick={() => handleCategoryClick(category.name, category.id)}
                  >
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

                    {/* Animated borders similar to shop */}
                    <div
                      className="absolute bottom-0 left-1/2 h-0.5"
                      style={{
                        backgroundColor: '#C9A34E',
                        transform: 'translateX(-50%)',
                        width: isActive || isHovered ? '100%' : '0%',
                        transition: isHovered
                          ? 'width 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s'
                          : 'width 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 1.6s'
                      }}
                    />
                    <div
                      className="absolute bottom-0 left-0 w-0.5"
                      style={{
                        backgroundColor: '#C9A34E',
                        height: isActive || isHovered ? '100%' : '0%',
                        transition: 'height 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.8s'
                      }}
                    />
                    <div
                      className="absolute bottom-0 right-0 w-0.5"
                      style={{
                        backgroundColor: '#C9A34E',
                        height: isActive || isHovered ? '100%' : '0%',
                        transition: 'height 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.8s'
                      }}
                    />
                    <div
                      className="absolute top-0 left-1/2 h-0.5"
                      style={{
                        backgroundColor: '#C9A34E',
                        transform: 'translateX(-50%)',
                        width: isActive ? '100%' : '0%',
                        transition: 'width 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s'
                      }}
                    />
                  </article>
                )
              })}
            </div>
          )}

          {/* Subcategories */}
          {isViewingSubCategories && subCategories.length > 0 && (
            <div className="w-full px-4 lg:px-8">
              <div className="mb-8 flex items-center gap-4">
                <Button
                  variant="outline"
                  onClick={handleBackToCategories}
                  className="flex items-center gap-2"
                  style={{ borderColor: '#C9A34E', color: '#C9A34E' }}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Categories
                </Button>
                <h3 className="text-2xl sm:text-3xl font-bold gradient-text">
                  {selectedCategory} - Subcategories
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                {subCategories.map((subCategory, index) => {
                  const isHovered = hoveredCard === subCategory.name
                  const isActive = activeCard === subCategory.name
                  return (
                    <article
                      key={subCategory.id}
                      className="group relative aspect-[4/3.5] overflow-hidden rounded-2xl bg-gray-50 shadow-lg transition-transform duration-500 hover:-translate-y-1 cursor-pointer"
                      style={{ animationDelay: `${0.8 + index * 0.1}s` }}
                      onMouseEnter={() => setHoveredCard(subCategory.name)}
                      onMouseLeave={() => setHoveredCard(null)}
                      onClick={() => handleSubCategoryClick(subCategory.name)}
                    >
                      <div className="relative h-full w-full">
                        <Image
                          src={subCategory.image || "/placeholder.svg"}
                          alt={subCategory.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          loading="lazy"
                        />
                      </div>
                      <div className="absolute inset-0 flex items-start p-4 sm:p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/30">
                        <div>
                          <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-white">
                            {subCategory.name}
                          </h3>
                          <span className="mt-2 block h-[3px] w-8 origin-left transition-[width] duration-500 ease-out group-hover:w-24" style={{ backgroundColor: '#C9A34E' }} />
                          <p className="mt-2 text-sm sm:text-base font-medium text-white opacity-90">
                            {subCategory.count} Products
                          </p>
                        </div>
                      </div>
                      <div
                        className="absolute bottom-0 left-1/2 h-0.5"
                        style={{
                          backgroundColor: '#C9A34E',
                          transform: 'translateX(-50%)',
                          width: isActive || isHovered ? '100%' : '0%',
                          transition: isHovered
                            ? 'width 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s'
                            : 'width 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 1.6s'
                        }}
                      />
                      <div
                        className="absolute bottom-0 left-0 w-0.5"
                        style={{
                          backgroundColor: '#C9A34E',
                          height: isActive || isHovered ? '100%' : '0%',
                          transition: 'height 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.8s'
                        }}
                      />
                      <div
                        className="absolute bottom-0 right-0 w-0.5"
                        style={{
                          backgroundColor: '#C9A34E',
                          height: isActive || isHovered ? '100%' : '0%',
                          transition: 'height 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.8s'
                        }}
                      />
                      <div
                        className="absolute top-0 left-1/2 h-0.5"
                        style={{
                          backgroundColor: '#C9A34E',
                          transform: 'translateX(-50%)',
                          width: isActive ? '100%' : '0%',
                          transition: 'width 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s'
                        }}
                      />
                    </article>
                  )
                })}
              </div>
            </div>
          )}

          {/* Products under selected category/subcategory */}
          {selectedCategory && !isViewingSubCategories && (
            <div className="w-full px-4 lg:px-8 mt-10">
              <div className="mb-6 flex items-center gap-4">
                <Button
                  variant="outline"
                  onClick={subCategories.length > 0 ? handleBackToSubCategories : handleBackToCategories}
                  className="flex items-center gap-2"
                  style={{ borderColor: '#C9A34E', color: '#C9A34E' }}
                >
                  <ArrowLeft className="w-4 h-4" />
                  {subCategories.length > 0 ? 'Back to Subcategories' : 'Back to Categories'}
                </Button>
                <h3 className="text-2xl sm:text-3xl font-bold gradient-text">
                  {selectedCategory} Products
                </h3>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-gray-600 text-lg mb-4">No products found in {selectedCategory}.</p>
                  <Button
                    onClick={handleBackToCategories}
                    style={{ backgroundColor: '#C9A34E', color: '#fff' }}
                  >
                    Back to Categories
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => {
                    const productImages = product.images && product.images.length > 0 ? product.images : []
                    const firstImage = productImages[0]?.url || "/placeholder.svg"
                    const secondImage = productImages[1]?.url || productImages[0]?.url || "/placeholder.svg"
                    return (
                      <Link
                        key={product._id}
                        href={`/view-details?id=${product._id}`}
                        className="group relative bg-white hover:bg-[#111111] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                      >
                        <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                          <Image
                            src={firstImage}
                            alt={product.name}
                            fill
                            className="object-cover opacity-100 group-hover:opacity-0 transition-opacity duration-500"
                            loading="lazy"
                          />
                          <Image
                            src={secondImage}
                            alt={product.name}
                            fill
                            className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            loading="lazy"
                          />
                        </div>
                        <div className="p-4 space-y-2">
                          {product.category && (
                            <p className="text-xs font-medium text-gray-600 group-hover:text-white/70 uppercase tracking-wide transition-colors duration-300">
                              {product.category}
                            </p>
                          )}
                          <h3 className="font-semibold text-gray-900 group-hover:text-white line-clamp-2 transition-colors duration-300">
                            {product.name}
                          </h3>
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
            </div>
          )}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#240334] mb-4">
              Featured Products
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
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
                          className={`h-5 w-5 transition-colors duration-200 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'
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
                size="lg"
                className="px-8 py-3 text-lg transition-all duration-300 hover:scale-105 rounded-full"
                style={{ backgroundColor: '#fff4df', color: '#510c74', border: '1px solid #510c74' }}
              >
                Explore All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>





      {/* About Section */}
      <section className="py-12 md:py-20" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4 lg:px-8">

          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#240334] mb-4">
              About Mariyae
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
              Crafting timeless jewelry pieces that celebrate life's most beautiful moments with elegance and grace.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 md:space-y-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div>
                <p className="text-base md:text-lg leading-relaxed mb-4 md:mb-6 animate-fade-in-up text-center lg:text-left" style={{ color: '#240334', opacity: 0.8, animationDelay: '0.6s' }}>
                  At Rose Jewels, we believe that jewelry is more than just an accessory—it's a reflection of your unique story,
                  your precious moments, and your personal style. For over two decades, we've been dedicated to creating
                  exquisite pieces that celebrate life's most beautiful moments.
                </p>
                <p className="text-sm md:text-base leading-relaxed mb-6 md:mb-8 animate-fade-in-up text-center lg:text-left" style={{ color: '#240334', opacity: 0.8, animationDelay: '0.8s' }}>
                  Our master craftsmen combine traditional techniques with modern innovation to create jewelry that stands
                  the test of time. Every piece is carefully designed and meticulously crafted using only the finest
                  materials, ensuring that your jewelry remains as beautiful as the day you first wore it.
                </p>
                <div className="text-center lg:text-left">
                  <Link href="/about">
                    <Button size="lg" className="px-6 md:px-8 py-3 text-base md:text-lg animate-fade-in-up transition-all duration-300 hover:scale-105 shadow-lg" style={{ backgroundColor: '#fff4df', color: '#510c74', border: '1px solid #510c74', animationDelay: '1s' }}>
                      Learn More About Us
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="relative animate-fade-in-up text-center lg:text-left" style={{ animationDelay: '0.3s' }}>
              <Image
                src="/Gemini_Gener__copy.jpg"
                alt="Mariyae Logo"
                width={800}
                height={700}
                className="rounded-2xl shadow-lg object-contain animate-fade-in-up transition-all duration-300 hover:scale-105 w-full max-w-md mx-auto lg:max-w-full"
                style={{ animationDelay: '0.5s' }}
              />
              <div className="absolute -bottom-3 -right-3 lg:-bottom-6 lg:-right-6 p-3 lg:p-6 rounded-xl lg:rounded-2xl shadow-lg animate-fade-in-up" style={{ backgroundColor: '#fff4df', border: '1px solid rgba(81, 12, 116, 0.1)', animationDelay: '0.7s' }}>
                <div className="flex items-center space-x-2 lg:space-x-4">
                  <div className="w-8 h-8 lg:w-12 lg:h-12 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(90deg, #510c74, #240334)' }}>
                    <Star className="w-4 h-4 lg:w-6 lg:h-6" style={{ color: '#fff4df' }} />
                  </div>
                  <div>
                    <p className="font-semibold text-xs lg:text-sm" style={{ color: '#240334' }}>Premium Quality</p>
                    <p className="text-xs lg:text-sm opacity-80" style={{ color: '#240334' }}>Certified & Authentic</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
