import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HandpickedSection() {
    return (
        <section className="py-12 md:py-20 bg-white">
            <div className="w-full px-4 lg:px-8">
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#240334] mb-4">
                        Mariyae's Signature Collection
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
                        An exclusive selection of our finest jewelry, handpicked to define elegance and grace.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-auto lg:h-[650px]">
                    {/* Left Large Card - Statement Necklace Sets */}
                    <div className="relative group overflow-hidden rounded-2xl h-[400px] lg:h-full">
                        <Image
                            src="/placeholder.svg?height=800&width=600&text=Necklace+Set"
                            alt="Statement Necklace Sets"
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {/* Overlay Gradient - Greenish tint as per image */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" style={{ backgroundColor: 'rgba(30, 50, 20, 0.4)' }} />

                        {/* Centered Overlay Content */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative w-64 h-64 border border-[#fff4df]/60 rounded-xl flex flex-col items-center justify-end pb-4">
                                <span className="absolute top-1/2 right-[-20px] transform -translate-y-1/2 font-script text-4xl md:text-5xl text-white z-10" style={{ fontFamily: 'var(--font-allura)' }}>Statement</span>
                                <h3 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-wide z-10 translate-y-6">
                                    NECKLACE SETS
                                </h3>
                            </div>
                        </div>

                        <Link href="/products?category=Necklaces" className="absolute inset-0 ring-0 focus:ring-0">
                            <span className="sr-only">View Necklace Sets</span>
                        </Link>
                    </div>

                    <div className="grid grid-rows-2 gap-4 h-full">
                        {/* Right Top Card - Lightweight Jewellery */}
                        <div className="relative group overflow-hidden rounded-2xl h-[300px] lg:h-full">
                            {/* Split background effect simulation with image */}
                            <div className="absolute inset-0 flex">
                                <div className="w-1/2 bg-[#2a1b1b]"></div> {/* Dark brown/red side */}
                                <div className="w-1/2 bg-[#004d4d]"></div> {/* Teal/Dark Blue side */}
                            </div>

                            <Image
                                src="/placeholder.svg?height=400&width=600&text=Lightweight+Jewellery"
                                alt="Lightweight Jewellery"
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />

                            {/* Centered Overlay Content */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="relative w-48 h-48 border border-[#fff4df]/60 rounded-xl flex flex-col items-center justify-end pb-4">
                                    <span className="absolute top-1/4 right-[-10px] font-script text-3xl md:text-4xl text-white z-10" style={{ fontFamily: 'var(--font-allura)' }}>Lightweight</span>
                                    <h3 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-wide z-10 translate-y-5">
                                        JEWELLERY
                                    </h3>
                                </div>
                            </div>

                            <Link href="/products?collection=lightweight" className="absolute inset-0 ring-0 focus:ring-0">
                                <span className="sr-only">View Lightweight Jewellery</span>
                            </Link>
                        </div>

                        {/* Right Bottom Card - Stylist Earrings */}
                        <div className="relative group overflow-hidden rounded-2xl h-[300px] lg:h-full">
                            <Image
                                src="/placeholder.svg?height=400&width=600&text=Stylist+Earrings"
                                alt="Stylist Earrings"
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            {/* Purple tint overlay */}
                            <div className="absolute inset-0 bg-[#510c74]/20 mix-blend-multiply" />

                            {/* Centered Overlay Content */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="relative w-48 h-48 border border-[#fff4df]/60 rounded-xl flex flex-col items-center justify-end pb-4">
                                    <span className="absolute top-1/2 right-[-10px] transform -translate-y-1/2 font-script text-3xl md:text-4xl text-white z-10" style={{ fontFamily: 'var(--font-allura)' }}>Stylist</span>
                                    <h3 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-wide z-10 translate-y-5">
                                        EARRINGS
                                    </h3>
                                </div>
                            </div>

                            <Link href="/products?category=Earrings" className="absolute inset-0 ring-0 focus:ring-0">
                                <span className="sr-only">View Stylist Earrings</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
