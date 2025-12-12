import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { COLLECTIONS } from '@/lib/collections'
import { uploadToCloudinary, getCloudinaryFolder, uploadImageFromUrl } from '@/lib/cloudinary'
import { ObjectId } from 'mongodb'

// GET all banners
export async function GET(request: NextRequest) {
  try {
    await connectDB()
    const db = (await import('mongoose')).connection.db
    const collection = db.collection(COLLECTIONS.BANNERS)
    
    const banners = await collection.find({}).sort({ order: 1 }).toArray()
    
    return NextResponse.json({
      success: true,
      banners: banners.map(banner => ({
        _id: banner._id.toString(),
        ...banner
      }))
    })
  } catch (error) {
    console.error('Error fetching banners:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch banners' },
      { status: 500 }
    )
  }
}

// POST create new banner
export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const db = (await import('mongoose')).connection.db
    const collection = db.collection(COLLECTIONS.BANNERS)
    
    const formData = await request.formData()
    
    const order = parseInt(formData.get('order') as string) || 0
    const eyebrowText = formData.get('eyebrowText') as string || ''
    const headline = formData.get('headline') as string || ''
    const description = formData.get('description') as string || ''
    const button1Text = formData.get('button1Text') as string || ''
    const button1Link = formData.get('button1Link') as string || ''
    const button2Text = formData.get('button2Text') as string || ''
    const button2Link = formData.get('button2Link') as string || ''
    const layoutType = formData.get('layoutType') as string || 'normal' // 'normal' or 'reversed'
    
    // Handle background image
    const backgroundImageFile = formData.get('backgroundImage') as File | null
    const backgroundImageUrl = formData.get('backgroundImageUrl') as string | null
    let backgroundImage = ''
    
    if (backgroundImageFile && backgroundImageFile.size > 0) {
      const bytes = await backgroundImageFile.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const folder = getCloudinaryFolder('banners')
      const result = await uploadToCloudinary(buffer, folder, 'image')
      backgroundImage = result.url
    } else if (backgroundImageUrl && backgroundImageUrl.trim() !== '') {
      try {
        const folder = getCloudinaryFolder('banners')
        const result = await uploadImageFromUrl(backgroundImageUrl.trim(), folder)
        backgroundImage = result.url
      } catch (error) {
        console.error('Failed to upload background image from URL:', error)
        backgroundImage = backgroundImageUrl.trim()
      }
    }
    
    // Handle decorative image
    const decorativeImageFile = formData.get('decorativeImage') as File | null
    const decorativeImageUrl = formData.get('decorativeImageUrl') as string | null
    let decorativeImage = ''
    
    if (decorativeImageFile && decorativeImageFile.size > 0) {
      const bytes = await decorativeImageFile.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const folder = getCloudinaryFolder('banners')
      const result = await uploadToCloudinary(buffer, folder, 'image')
      decorativeImage = result.url
    } else if (decorativeImageUrl && decorativeImageUrl.trim() !== '') {
      try {
        const folder = getCloudinaryFolder('banners')
        const result = await uploadImageFromUrl(decorativeImageUrl.trim(), folder)
        decorativeImage = result.url
      } catch (error) {
        console.error('Failed to upload decorative image from URL:', error)
        decorativeImage = decorativeImageUrl.trim()
      }
    }
    
    const newBanner = {
      order,
      eyebrowText,
      headline,
      description,
      button1Text,
      button1Link,
      button2Text,
      button2Link,
      layoutType,
      backgroundImage,
      decorativeImage,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    const result = await collection.insertOne(newBanner)
    
    return NextResponse.json({
      success: true,
      banner: {
        _id: result.insertedId.toString(),
        ...newBanner
      }
    })
  } catch (error) {
    console.error('Error creating banner:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create banner' },
      { status: 500 }
    )
  }
}



