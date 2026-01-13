import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Banner from '@/lib/models/Banner'
import { uploadToCloudinary, getCloudinaryFolder, uploadImageFromUrl } from '@/lib/cloudinary'

// PUT update banner
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    const { id } = await params

    const formData = await request.formData()

    const order = parseInt(formData.get('order') as string)
    const eyebrowText = formData.get('eyebrowText') as string
    const headline = formData.get('headline') as string
    const description = formData.get('description') as string
    const button1Text = formData.get('button1Text') as string
    const button1Link = formData.get('button1Link') as string
    const button2Text = formData.get('button2Text') as string
    const button2Link = formData.get('button2Link') as string
    const layoutType = formData.get('layoutType') as string
    const isActive = formData.get('isActive') === 'true'

    // Get existing banner
    const existingBanner = await Banner.findById(id)
    if (!existingBanner) {
      return NextResponse.json(
        { success: false, error: 'Banner not found' },
        { status: 404 }
      )
    }

    // Handle background image
    const backgroundImageFile = formData.get('backgroundImage') as File | null
    const backgroundImageUrl = formData.get('backgroundImageUrl') as string | null
    let backgroundImage = existingBanner.backgroundImage

    if (backgroundImageFile && backgroundImageFile.size > 0) {
      const bytes = await backgroundImageFile.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const folder = getCloudinaryFolder('banners')
      const result = await uploadToCloudinary(buffer, folder, 'image')
      backgroundImage = result.url
    } else if (backgroundImageUrl && backgroundImageUrl.trim() !== '') {
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
    let decorativeImage = existingBanner.decorativeImage

    if (decorativeImageFile && decorativeImageFile.size > 0) {
      const bytes = await decorativeImageFile.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const folder = getCloudinaryFolder('banners')
      const result = await uploadToCloudinary(buffer, folder, 'image')
      decorativeImage = result.url
    } else if (decorativeImageUrl && decorativeImageUrl.trim() !== '') {
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

    const updateData: any = {
      backgroundImage,
      decorativeImage,
      isActive
    }

    if (order !== undefined && !isNaN(order)) updateData.order = order
    if (eyebrowText !== undefined) updateData.eyebrowText = eyebrowText
    if (headline !== undefined) updateData.headline = headline
    if (description !== undefined) updateData.description = description
    if (button1Text !== undefined) updateData.button1Text = button1Text
    if (button1Link !== undefined) updateData.button1Link = button1Link
    if (button2Text !== undefined) updateData.button2Text = button2Text
    if (button2Link !== undefined) updateData.button2Link = button2Link
    if (layoutType !== undefined) updateData.layoutType = layoutType

    await Banner.findByIdAndUpdate(id, { $set: updateData })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error updating banner:', error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to update banner',
        details: error.errors ? Object.keys(error.errors).map(key => ({
          field: key,
          message: error.errors[key].message
        })) : null
      },
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
    const { id } = await params

    const result = await Banner.findByIdAndDelete(id)

    if (!result) {
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
