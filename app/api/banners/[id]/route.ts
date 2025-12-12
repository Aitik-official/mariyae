import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { COLLECTIONS } from '@/lib/collections'
import { uploadToCloudinary, getCloudinaryFolder, uploadImageFromUrl } from '@/lib/cloudinary'
import { ObjectId } from 'mongodb'

// PUT update banner
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    const db = (await import('mongoose')).connection.db
    const collection = db.collection(COLLECTIONS.BANNERS)
    
    const { id } = await params
    
    const formData = await request.formData()
    
    const order = parseInt(formData.get('order') as string) || 0
    const eyebrowText = formData.get('eyebrowText') as string || ''
    const headline = formData.get('headline') as string || ''
    const description = formData.get('description') as string || ''
    const button1Text = formData.get('button1Text') as string || ''
    const button1Link = formData.get('button1Link') as string || ''
    const button2Text = formData.get('button2Text') as string || ''
    const button2Link = formData.get('button2Link') as string || ''
    const layoutType = formData.get('layoutType') as string || 'normal'
    
    // Get existing banner
    const existingBanner = await collection.findOne({ _id: new ObjectId(id) })
    if (!existingBanner) {
      return NextResponse.json(
        { success: false, error: 'Banner not found' },
        { status: 404 }
      )
    }
    
    // Handle background image
    const backgroundImageFile = formData.get('backgroundImage') as File | null
    const backgroundImageUrl = formData.get('backgroundImageUrl') as string | null
    let backgroundImage = existingBanner.backgroundImage || ''
    
    if (backgroundImageFile && backgroundImageFile.size > 0) {
      const bytes = await backgroundImageFile.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const folder = getCloudinaryFolder('banners')
      const result = await uploadToCloudinary(buffer, folder, 'image')
      backgroundImage = result.url
    } else if (backgroundImageUrl && backgroundImageUrl.trim() !== '') {
      // Only update if URL is different
      if (backgroundImageUrl.trim() !== existingBanner.backgroundImage) {
        try {
          const folder = getCloudinaryFolder('banners')
          const result = await uploadImageFromUrl(backgroundImageUrl.trim(), folder)
          backgroundImage = result.url
        } catch (error) {
          console.error('Failed to upload background image from URL:', error)
          backgroundImage = backgroundImageUrl.trim()
        }
      }
    }
    
    // Handle decorative image
    const decorativeImageFile = formData.get('decorativeImage') as File | null
    const decorativeImageUrl = formData.get('decorativeImageUrl') as string | null
    let decorativeImage = existingBanner.decorativeImage || ''
    
    if (decorativeImageFile && decorativeImageFile.size > 0) {
      const bytes = await decorativeImageFile.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const folder = getCloudinaryFolder('banners')
      const result = await uploadToCloudinary(buffer, folder, 'image')
      decorativeImage = result.url
    } else if (decorativeImageUrl && decorativeImageUrl.trim() !== '') {
      // Only update if URL is different
      if (decorativeImageUrl.trim() !== existingBanner.decorativeImage) {
        try {
          const folder = getCloudinaryFolder('banners')
          const result = await uploadImageFromUrl(decorativeImageUrl.trim(), folder)
          decorativeImage = result.url
        } catch (error) {
          console.error('Failed to upload decorative image from URL:', error)
          decorativeImage = decorativeImageUrl.trim()
        }
      }
    }
    
    const updateData = {
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
      updatedAt: new Date()
    }
    
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    )
    
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Banner not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating banner:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update banner' },
      { status: 500 }
    )
  }
}

// DELETE banner
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    const db = (await import('mongoose')).connection.db
    const collection = db.collection(COLLECTIONS.BANNERS)
    
    const { id } = await params
    
    const result = await collection.deleteOne({ _id: new ObjectId(id) })
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Banner not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting banner:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete banner' },
      { status: 500 }
    )
  }
}



