"use client"

import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, Clock, Shield, Truck, CreditCard, Star, Heart, Gift, Crown } from "lucide-react"

export default function Footer() {

  return (
    <footer className="text-white" style={{background: 'linear-gradient(90deg, #670099, #510c74, #240334)'}}>


      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="bg-white rounded-full">
                <Image
                  src="/logoalan-removebg-preview.png"
                  alt="Alankarika Logo"
                  width={80}
                  height={80}
                  className="w-20 h-20"
                />
              </div>
              <span className="text-2xl font-bold">Iitaon Jewellery</span>
            </div>
            <p className="text-white leading-relaxed opacity-90">
              Crafting timeless jewelry pieces that celebrate life's most precious moments. Quality, elegance, and
              craftsmanship in every design at Iitaon Jewellery.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-white/20 border border-white/30 rounded-full flex items-center justify-center hover:bg-[#d1b2e0] hover:border-[#d1b2e0] transition-colors text-white hover:text-[#240334]"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/20 border border-white/30 rounded-full flex items-center justify-center hover:bg-[#d1b2e0] hover:border-[#d1b2e0] transition-colors text-white hover:text-[#240334]"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/20 border border-white/30 rounded-full flex items-center justify-center hover:bg-[#d1b2e0] hover:border-[#d1b2e0] transition-colors text-white hover:text-[#240334]"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/20 border border-white/30 rounded-full flex items-center justify-center hover:bg-[#d1b2e0] hover:border-[#d1b2e0] transition-colors text-white hover:text-[#240334]"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-white opacity-90 hover:text-[#d1b2e0] hover:opacity-100 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-400 hover:text-white transition-colors">
                  Our Products
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-[#F3EDE4] opacity-80 hover:text-[#C9A34E] hover:opacity-100 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white opacity-90 hover:text-[#d1b2e0] hover:opacity-100 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-white opacity-90 hover:text-[#d1b2e0] hover:opacity-100 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>



          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Get in Touch</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#d1b2e0] mt-1" />
                <div className="text-white opacity-90">
                  <p>123 Jewelry Street</p>
                  <p>Diamond District, NY 10001</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#d1b2e0]" />
                <span className="text-white opacity-90">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[#d1b2e0]" />
                <span className="text-white opacity-90">info@iitaonjewellery.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-[#d1b2e0]" />
                <span className="text-white opacity-90">Mon-Sat: 9AM-8PM</span>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Categories</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/necklaces" className="text-white opacity-90 hover:text-[#d1b2e0] hover:opacity-100 transition-colors">
                  Necklaces
                </Link>
              </li>
              <li>
                <Link href="/pendants" className="text-gray-400 hover:text-white transition-colors">
                  Pendants
                </Link>
              </li>
              <li>
                <Link href="/rings" className="text-white opacity-90 hover:text-[#d1b2e0] hover:opacity-100 transition-colors">
                  Rings
                </Link>
              </li>
              <li>
                <Link href="/earrings" className="text-white opacity-90 hover:text-[#d1b2e0] hover:opacity-100 transition-colors">
                  Earrings
                </Link>
              </li>
              <li>
                <Link href="/bracelets" className="text-white opacity-90 hover:text-[#d1b2e0] hover:opacity-100 transition-colors">
                  Bracelets
                </Link>
              </li>
              <li>
                <Link href="/wedding" className="text-white opacity-90 hover:text-[#d1b2e0] hover:opacity-100 transition-colors">
                  Wedding Collection
                </Link>
              </li>
            </ul>
          </div>

          {/* Special Offers */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Special Offers</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/new-arrivals" className="text-white opacity-90 hover:text-[#d1b2e0] hover:opacity-100 transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/sale" className="text-gray-400 hover:text-white transition-colors">
                  Sale Items
                </Link>
              </li>
              <li>
                <Link href="/limited-edition" className="text-white opacity-90 hover:text-[#d1b2e0] hover:opacity-100 transition-colors">
                  Limited Edition
                </Link>
              </li>
              <li>
                <Link href="/personalized" className="text-white opacity-90 hover:text-[#d1b2e0] hover:opacity-100 transition-colors">
                  Personalized Jewelry
                </Link>
              </li>
              <li>
                <Link href="/luxury-collection" className="text-white opacity-90 hover:text-[#d1b2e0] hover:opacity-100 transition-colors">
                  Luxury Collection
                </Link>
              </li>
              <li>
                <Link href="/bridal-sets" className="text-white opacity-90 hover:text-[#d1b2e0] hover:opacity-100 transition-colors">
                  Bridal Sets
                </Link>
              </li>
            </ul>
          </div>
        </div>



        {/* Bottom bar */}
        <div className="border-t border-white/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <p className="text-white opacity-90 text-sm">© 2024 Iitaon Jewellery. All rights reserved.</p>
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-[#d1b2e0]" />
              <span className="text-white opacity-90 text-sm">Premium Quality Since 1998</span>
            </div>
          </div>
          <div className="flex space-x-6">
            <Link href="/privacy" className="text-white opacity-90 hover:text-[#d1b2e0] hover:opacity-100 text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-white opacity-90 hover:text-[#d1b2e0] hover:opacity-100 text-sm transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-white opacity-90 hover:text-[#d1b2e0] hover:opacity-100 text-sm transition-colors">
              Cookie Policy
            </Link>
            <Link href="/sitemap" className="text-white opacity-90 hover:text-[#d1b2e0] hover:opacity-100 text-sm transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
