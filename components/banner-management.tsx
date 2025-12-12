"use client"

import { useState, useEffect } from "react"
import { Plus, Edit, Trash2, X, Image as ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Banner {
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
}

export default function BannerManagement() {
  const [banners, setBanners] = useState<Banner[]>([])
  const [loading, setLoading] = useState(false)
  const [showDialog, setShowDialog] = useState(false)
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null)
  const [formData, setFormData] = useState({
    order: 0,
    eyebrowText: '',
    headline: '',
    description: '',
    button1Text: '',
    button1Link: '',
    button2Text: '',
    button2Link: '',
    layoutType: 'normal' as 'normal' | 'reversed',
    backgroundImage: '',
    backgroundImageUrl: '',
    decorativeImage: '',
    decorativeImageUrl: ''
  })
  const [backgroundImageFile, setBackgroundImageFile] = useState<File | null>(null)
  const [decorativeImageFile, setDecorativeImageFile] = useState<File | null>(null)

  useEffect(() => {
    fetchBanners()
  }, [])

  const fetchBanners = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/banners')
      const data = await response.json()
      if (data.success) {
        setBanners(data.banners || [])
      }
    } catch (error) {
      console.error('Error fetching banners:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleOpenDialog = (banner?: Banner) => {
    if (banner) {
      setEditingBanner(banner)
      setFormData({
        order: banner.order,
        eyebrowText: banner.eyebrowText,
        headline: banner.headline,
        description: banner.description,
        button1Text: banner.button1Text,
        button1Link: banner.button1Link,
        button2Text: banner.button2Text,
        button2Link: banner.button2Link,
        layoutType: banner.layoutType,
        backgroundImage: banner.backgroundImage,
        backgroundImageUrl: '',
        decorativeImage: banner.decorativeImage,
        decorativeImageUrl: ''
      })
    } else {
      setEditingBanner(null)
      setFormData({
        order: banners.length,
        eyebrowText: '',
        headline: '',
        description: '',
        button1Text: '',
        button1Link: '',
        button2Text: '',
        button2Link: '',
        layoutType: 'normal',
        backgroundImage: '',
        backgroundImageUrl: '',
        decorativeImage: '',
        decorativeImageUrl: ''
      })
    }
    setBackgroundImageFile(null)
    setDecorativeImageFile(null)
    setShowDialog(true)
  }

  const handleCloseDialog = () => {
    setShowDialog(false)
    setEditingBanner(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      setLoading(true)
      const submitFormData = new FormData()
      
      submitFormData.append('order', formData.order.toString())
      submitFormData.append('eyebrowText', formData.eyebrowText)
      submitFormData.append('headline', formData.headline)
      submitFormData.append('description', formData.description)
      submitFormData.append('button1Text', formData.button1Text)
      submitFormData.append('button1Link', formData.button1Link)
      submitFormData.append('button2Text', formData.button2Text)
      submitFormData.append('button2Link', formData.button2Link)
      submitFormData.append('layoutType', formData.layoutType)
      
      if (backgroundImageFile) {
        submitFormData.append('backgroundImage', backgroundImageFile)
      } else if (formData.backgroundImageUrl) {
        submitFormData.append('backgroundImageUrl', formData.backgroundImageUrl)
      }
      
      if (decorativeImageFile) {
        submitFormData.append('decorativeImage', decorativeImageFile)
      } else if (formData.decorativeImageUrl) {
        submitFormData.append('decorativeImageUrl', formData.decorativeImageUrl)
      }
      
      const url = editingBanner ? `/api/banners/${editingBanner._id}` : '/api/banners'
      const method = editingBanner ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        body: submitFormData
      })
      
      const data = await response.json()
      
      if (data.success) {
        alert(editingBanner ? 'Banner updated successfully!' : 'Banner created successfully!')
        fetchBanners()
        handleCloseDialog()
      } else {
        alert(data.error || 'Failed to save banner')
      }
    } catch (error) {
      console.error('Error saving banner:', error)
      alert('Failed to save banner')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this banner?')) {
      return
    }
    
    try {
      setLoading(true)
      const response = await fetch(`/api/banners/${id}`, {
        method: 'DELETE'
      })
      
      const data = await response.json()
      
      if (data.success) {
        alert('Banner deleted successfully!')
        fetchBanners()
      } else {
        alert(data.error || 'Failed to delete banner')
      }
    } catch (error) {
      console.error('Error deleting banner:', error)
      alert('Failed to delete banner')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold gradient-text">Banner Management</h2>
        <Button
          onClick={() => handleOpenDialog()}
          className="text-white rounded-lg"
          style={{ background: 'linear-gradient(90deg, #670099, #510c74, #240334)', color: '#C9A34E' }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Banner
        </Button>
      </div>

      {loading && banners.length === 0 ? (
        <div className="text-center py-12">
          <p style={{ color: '#240334' }}>Loading banners...</p>
        </div>
      ) : banners.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg p-6" style={{ borderColor: '#d1b2e0', borderWidth: '1px' }}>
          <p style={{ color: '#240334' }}>No banners found. Create your first banner!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {banners.map((banner) => (
            <div
              key={banner._id}
              className="bg-white rounded-lg p-6 shadow-md"
              style={{ borderColor: '#d1b2e0', borderWidth: '1px' }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: '#d1b2e0', color: '#240334' }}>
                      Order: {banner.order}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: banner.layoutType === 'reversed' ? '#C9A34E' : '#d1b2e0', color: '#240334' }}>
                      {banner.layoutType === 'reversed' ? 'Reversed Layout' : 'Normal Layout'}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold mb-2" style={{ color: '#240334' }}>
                    {banner.headline || 'Untitled Banner'}
                  </h3>
                  
                  <p className="text-sm mb-2" style={{ color: '#240334', opacity: 0.7 }}>
                    {banner.eyebrowText}
                  </p>
                  
                  <p className="text-sm mb-4" style={{ color: '#240334', opacity: 0.8 }}>
                    {banner.description.substring(0, 100)}...
                  </p>
                  
                  <div className="flex gap-4 text-xs" style={{ color: '#240334', opacity: 0.6 }}>
                    <span>Button 1: {banner.button1Text}</span>
                    <span>Button 2: {banner.button2Text}</span>
                  </div>
                </div>
                
                <div className="flex gap-2 ml-4">
                  <Button
                    onClick={() => handleOpenDialog(banner)}
                    variant="outline"
                    size="sm"
                    className="rounded-lg"
                    style={{ borderColor: '#d1b2e0', color: '#240334' }}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => handleDelete(banner._id)}
                    variant="outline"
                    size="sm"
                    className="rounded-lg"
                    style={{ borderColor: '#d1b2e0', color: '#240334' }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Dialog */}
      {showDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl" style={{ borderColor: '#d1b2e0', borderWidth: '1px', backgroundColor: '#eae0cc' }}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold gradient-text">
                {editingBanner ? 'Edit Banner' : 'Add New Banner'}
              </h2>
              <button
                onClick={handleCloseDialog}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: '#240334' }}>
                    Order *
                  </label>
                  <Input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                    className="rounded-lg"
                    style={{ borderColor: '#d1b2e0', backgroundColor: '#ffffff' }}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: '#240334' }}>
                    Layout Type *
                  </label>
                  <select
                    value={formData.layoutType}
                    onChange={(e) => setFormData({ ...formData, layoutType: e.target.value as 'normal' | 'reversed' })}
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2"
                    style={{ borderColor: '#d1b2e0', backgroundColor: '#ffffff', color: '#240334' }}
                  >
                    <option value="normal">Normal</option>
                    <option value="reversed">Reversed</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#240334' }}>
                  Eyebrow Text
                </label>
                <Input
                  type="text"
                  value={formData.eyebrowText}
                  onChange={(e) => setFormData({ ...formData, eyebrowText: e.target.value })}
                  placeholder="e.g., Exquisite Jewelry Collection"
                  className="rounded-lg"
                  style={{ borderColor: '#d1b2e0', backgroundColor: '#ffffff' }}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#240334' }}>
                  Headline *
                </label>
                <Input
                  type="text"
                  value={formData.headline}
                  onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                  placeholder="e.g., Premium Imitation Jewellery for Every Occasion"
                  className="rounded-lg"
                  style={{ borderColor: '#d1b2e0', backgroundColor: '#ffffff' }}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#240334' }}>
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2"
                  style={{ borderColor: '#d1b2e0', backgroundColor: '#ffffff', color: '#240334' }}
                  placeholder="Enter banner description"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: '#240334' }}>
                    Button 1 Text
                  </label>
                  <Input
                    type="text"
                    value={formData.button1Text}
                    onChange={(e) => setFormData({ ...formData, button1Text: e.target.value })}
                    placeholder="e.g., Buy Now"
                    className="rounded-lg"
                    style={{ borderColor: '#d1b2e0', backgroundColor: '#ffffff' }}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: '#240334' }}>
                    Button 1 Link
                  </label>
                  <Input
                    type="text"
                    value={formData.button1Link}
                    onChange={(e) => setFormData({ ...formData, button1Link: e.target.value })}
                    placeholder="e.g., /products"
                    className="rounded-lg"
                    style={{ borderColor: '#d1b2e0', backgroundColor: '#ffffff' }}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: '#240334' }}>
                    Button 2 Text
                  </label>
                  <Input
                    type="text"
                    value={formData.button2Text}
                    onChange={(e) => setFormData({ ...formData, button2Text: e.target.value })}
                    placeholder="e.g., View Other Products"
                    className="rounded-lg"
                    style={{ borderColor: '#d1b2e0', backgroundColor: '#ffffff' }}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: '#240334' }}>
                    Button 2 Link
                  </label>
                  <Input
                    type="text"
                    value={formData.button2Link}
                    onChange={(e) => setFormData({ ...formData, button2Link: e.target.value })}
                    placeholder="e.g., /products"
                    className="rounded-lg"
                    style={{ borderColor: '#d1b2e0', backgroundColor: '#ffffff' }}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#240334' }}>
                  Background Image
                </label>
                <div className="space-y-2">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setBackgroundImageFile(e.target.files?.[0] || null)}
                    className="rounded-lg"
                    style={{ borderColor: '#d1b2e0', backgroundColor: '#ffffff' }}
                  />
                  <p className="text-xs" style={{ color: '#240334', opacity: 0.6 }}>OR</p>
                  <Input
                    type="url"
                    value={formData.backgroundImageUrl}
                    onChange={(e) => setFormData({ ...formData, backgroundImageUrl: e.target.value })}
                    placeholder="Enter image URL"
                    className="rounded-lg"
                    style={{ borderColor: '#d1b2e0', backgroundColor: '#ffffff' }}
                  />
                  {formData.backgroundImage && !backgroundImageFile && (
                    <p className="text-xs" style={{ color: '#240334', opacity: 0.6 }}>
                      Current: {formData.backgroundImage.substring(0, 50)}...
                    </p>
                  )}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#240334' }}>
                  Decorative Image
                </label>
                <div className="space-y-2">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setDecorativeImageFile(e.target.files?.[0] || null)}
                    className="rounded-lg"
                    style={{ borderColor: '#d1b2e0', backgroundColor: '#ffffff' }}
                  />
                  <p className="text-xs" style={{ color: '#240334', opacity: 0.6 }}>OR</p>
                  <Input
                    type="url"
                    value={formData.decorativeImageUrl}
                    onChange={(e) => setFormData({ ...formData, decorativeImageUrl: e.target.value })}
                    placeholder="Enter image URL"
                    className="rounded-lg"
                    style={{ borderColor: '#d1b2e0', backgroundColor: '#ffffff' }}
                  />
                  {formData.decorativeImage && !decorativeImageFile && (
                    <p className="text-xs" style={{ color: '#240334', opacity: 0.6 }}>
                      Current: {formData.decorativeImage.substring(0, 50)}...
                    </p>
                  )}
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCloseDialog}
                  className="rounded-lg"
                  style={{ borderColor: '#d1b2e0', color: '#240334', backgroundColor: 'transparent' }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="text-white rounded-lg"
                  style={{ background: 'linear-gradient(90deg, #670099, #510c74, #240334)', color: '#C9A34E' }}
                >
                  {loading ? 'Saving...' : editingBanner ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}



