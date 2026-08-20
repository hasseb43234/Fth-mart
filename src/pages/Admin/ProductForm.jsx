import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useStore } from '../../lib/store';
import {
  ArrowLeft,
  Plus,
  Trash2,
  Image as ImageIcon,
  DollarSign,
  TrendingUp,
  Layers,
  Save,
  Check,
  ExternalLink
} from 'lucide-react';
import { formatPKR } from '../../lib/formatters';

export const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const products = useStore((state) => state.products);
  const categories = useStore((state) => state.categories);
  const addProduct = useStore((state) => state.addProduct);
  const updateProduct = useStore((state) => state.updateProduct);

  const existing = isEditing ? products.find((p) => p.id === id) : null;

  // Form State
  const [title, setTitle] = useState(existing?.title || '');
  const [slug, setSlug] = useState(existing?.slug || '');
  const [brand, setBrand] = useState(existing?.brand || '');
  const [categorySlug, setCategorySlug] = useState(existing?.categorySlug || categories[0]?.slug || 'electronics');
  const [price, setPrice] = useState(existing?.price || 2499);
  const [compareAtPrice, setCompareAtPrice] = useState(existing?.compareAtPrice || 4999);
  const [costPrice, setCostPrice] = useState(existing?.costPrice || 1150);
  const [sku, setSku] = useState(existing?.sku || 'FTH-PROD-001');
  const [stock, setStock] = useState(existing?.stock || 50);
  const [lowStockThreshold, setLowStockThreshold] = useState(existing?.lowStockThreshold || 10);
  const [freeShipping, setFreeShipping] = useState(existing?.freeShipping || false);
  const [isFlashDeal, setIsFlashDeal] = useState(existing?.isFlashDeal || false);
  const [badge, setBadge] = useState(existing?.badge || 'AliExpress Choice');

  // Supplier & Dropship
  const [supplierName, setSupplierName] = useState(existing?.supplierName || 'Shenzhen Dropship Direct');
  const [supplierUrl, setSupplierUrl] = useState(existing?.supplierUrl || 'https://aliexpress.com/item/100500.html');
  const [supplierCost, setSupplierCost] = useState(existing?.supplierCost || 1150);

  // Images
  const [images, setImages] = useState(
    existing?.images || [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80'
    ]
  );
  const [newImageUrl, setNewImageUrl] = useState('');

  // Variants
  const [variants, setVariants] = useState(
    existing?.variants || [
      { id: 'v-1', title: 'Midnight Black', price: 2499, costPrice: 1150, stock: 30, sku: 'FTH-BLK-01' },
      { id: 'v-2', title: 'Pearl White', price: 2499, costPrice: 1150, stock: 20, sku: 'FTH-WHT-01' }
    ]
  );

  const [description, setDescription] = useState(existing?.description || 'High quality dropshipping product for Pakistani market.');

  // Auto generate slug from title
  const handleTitleChange = (val) => {
    setTitle(val);
    if (!isEditing) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '')
      );
    }
  };

  const marginAmount = Number(price) - Number(costPrice);
  const marginPercent = Number(price) > 0 ? Math.round((marginAmount / Number(price)) * 100) : 0;

  const handleAddImage = (e) => {
    e.preventDefault();
    if (newImageUrl.trim()) {
      setImages([...images, newImageUrl.trim()]);
      setNewImageUrl('');
    }
  };

  const handleRemoveImage = (idx) => {
    setImages(images.filter((_, i) => i !== idx));
  };

  const handleAddVariant = () => {
    const newV = {
      id: `v-${Date.now()}`,
      title: 'New Variant / Color',
      price: Number(price),
      costPrice: Number(costPrice),
      stock: 15,
      sku: `${sku}-${variants.length + 1}`
    };
    setVariants([...variants, newV]);
  };

  const handleRemoveVariant = (vId) => {
    setVariants(variants.filter((v) => v.id !== vId));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const payload = {
      title,
      slug: slug || `fth-prod-${Date.now()}`,
      brand: brand || 'FTH Brand',
      categorySlug,
      price: Number(price),
      compareAtPrice: Number(compareAtPrice),
      costPrice: Number(costPrice),
      sku,
      stock: Number(stock),
      lowStockThreshold: Number(lowStockThreshold),
      freeShipping,
      isFlashDeal,
      badge,
      supplierName,
      supplierUrl,
      supplierCost: Number(supplierCost),
      images: images.length > 0 ? images : ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800'],
      variants,
      description
    };

    if (isEditing) {
      updateProduct(id, payload);
    } else {
      addProduct(payload);
    }

    navigate('/admin/products');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-16">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/products"
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-white">
              {isEditing ? `Edit Product: ${existing?.title}` : 'Add New Dropship Product'}
            </h1>
            <p className="text-xs text-slate-400">
              Configure product details, variants, images and dropship supplier costs
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className="px-6 py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-sky-600/30 flex items-center gap-1.5"
        >
          <Save className="w-4 h-4" />
          <span>Save Product</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: General Details & Variants */}
        <div className="lg:col-span-8 space-y-6">
          {/* General Information */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <h3 className="font-bold text-sm text-white border-b border-slate-800 pb-3">
              General Information
            </h3>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Product Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. FTH Pro ANC Wireless Earbuds with LED Display"
                className="w-full text-xs p-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-sky-500"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Slug (URL)</label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full text-xs p-3 bg-slate-800 border border-slate-700 rounded-xl text-white font-mono"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Brand Name</label>
                <input
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder="e.g. SoundPulse PK"
                  className="w-full text-xs p-3 bg-slate-800 border border-slate-700 rounded-xl text-white"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Category *</label>
              <select
                value={categorySlug}
                onChange={(e) => setCategorySlug(e.target.value)}
                className="w-full text-xs p-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none cursor-pointer"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.slug}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Rich Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                className="w-full text-xs p-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none"
              />
            </div>
          </div>

          {/* Pricing & Supplier Cost Margin Auto-Calculation */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-white">
                Pricing & Dropship Cost Margin (PKR)
              </h3>
              <span className="text-xs font-black text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                Gross Margin: +{marginPercent}% ({formatPKR(marginAmount)})
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Selling Price (PKR) *</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full text-xs p-3 bg-slate-800 border border-slate-700 rounded-xl text-white font-black"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Compare-At Strike Price</label>
                <input
                  type="number"
                  value={compareAtPrice}
                  onChange={(e) => setCompareAtPrice(Number(e.target.value))}
                  className="w-full text-xs p-3 bg-slate-800 border border-slate-700 rounded-xl text-slate-400"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Supplier Cost (PKR) *</label>
                <input
                  type="number"
                  value={costPrice}
                  onChange={(e) => {
                    setCostPrice(Number(e.target.value));
                    setSupplierCost(Number(e.target.value));
                  }}
                  className="w-full text-xs p-3 bg-slate-800 border border-slate-700 rounded-xl text-amber-400 font-black"
                  required
                />
              </div>
            </div>

            {/* Dropship Supplier Information */}
            <div className="pt-3 border-t border-slate-800 space-y-3">
              <h4 className="text-xs font-bold uppercase text-slate-400">Dropship Sourcing Info</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={supplierName}
                  onChange={(e) => setSupplierName(e.target.value)}
                  placeholder="Supplier Name (e.g. Shenzhen Audio Direct)"
                  className="text-xs p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white"
                />
                <input
                  type="url"
                  value={supplierUrl}
                  onChange={(e) => setSupplierUrl(e.target.value)}
                  placeholder="Supplier AliExpress/CJ URL"
                  className="text-xs p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white font-mono text-[11px]"
                />
              </div>
            </div>
          </div>

          {/* Variant Matrix */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-white">Variant Matrix (Options / Colors)</h3>
              <button
                type="button"
                onClick={handleAddVariant}
                className="text-xs font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Variant
              </button>
            </div>

            <div className="space-y-3">
              {variants.map((v, i) => (
                <div
                  key={v.id}
                  className="p-3 bg-slate-800/80 rounded-2xl border border-slate-700 flex flex-col sm:flex-row items-center gap-3"
                >
                  <input
                    type="text"
                    value={v.title}
                    onChange={(e) => {
                      const updated = [...variants];
                      updated[i].title = e.target.value;
                      setVariants(updated);
                    }}
                    placeholder="Variant Title"
                    className="text-xs p-2 bg-slate-900 border border-slate-700 rounded-lg text-white flex-1"
                  />
                  <input
                    type="number"
                    value={v.price}
                    onChange={(e) => {
                      const updated = [...variants];
                      updated[i].price = Number(e.target.value);
                      setVariants(updated);
                    }}
                    placeholder="Price (PKR)"
                    className="text-xs p-2 bg-slate-900 border border-slate-700 rounded-lg text-white w-24"
                  />
                  <input
                    type="number"
                    value={v.stock}
                    onChange={(e) => {
                      const updated = [...variants];
                      updated[i].stock = Number(e.target.value);
                      setVariants(updated);
                    }}
                    placeholder="Stock"
                    className="text-xs p-2 bg-slate-900 border border-slate-700 rounded-lg text-white w-20"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveVariant(v.id)}
                    className="p-1.5 text-slate-400 hover:text-red-400 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Multi-Images & Flags */}
        <div className="lg:col-span-4 space-y-6">
          {/* Images Manager */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <h3 className="font-bold text-sm text-white border-b border-slate-800 pb-3 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-sky-400" /> Product Images ({images.length})
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {images.map((imgUrl, idx) => (
                <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden border border-slate-700 group bg-slate-800">
                  <img src={imgUrl} alt="Product" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    className="absolute top-1.5 right-1.5 p-1 bg-red-600/90 hover:bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  {idx === 0 && (
                    <span className="absolute bottom-1.5 left-1.5 bg-sky-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded">
                      Primary
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Add Image URL Input */}
            <div className="space-y-2 pt-2">
              <input
                type="url"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="Paste Image URL (Unsplash / CDN)..."
                className="w-full text-xs p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddImage}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition-colors"
              >
                + Add Image URL
              </button>
            </div>
          </div>

          {/* Inventory Flags */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <h3 className="font-bold text-sm text-white border-b border-slate-800 pb-3">
              Stock & Badges
            </h3>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Total Stock Quantity</label>
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
                className="w-full text-xs p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">SKU Barcode</label>
              <input
                type="text"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                className="w-full text-xs p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Marketing Badge</label>
              <select
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                className="w-full text-xs p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white cursor-pointer"
              >
                <option value="AliExpress Choice">AliExpress Choice</option>
                <option value="Top 1 Best Seller">Top 1 Best Seller</option>
                <option value="SuperDeal">SuperDeal</option>
                <option value="Hot Trend">Hot Trend</option>
                <option value="Viral Aesthetic">Viral Aesthetic</option>
              </select>
            </div>

            <div className="space-y-3 pt-2">
              <label className="flex items-center gap-2.5 text-xs text-slate-300 font-bold cursor-pointer">
                <input
                  type="checkbox"
                  checked={freeShipping}
                  onChange={(e) => setFreeShipping(e.target.checked)}
                  className="w-4 h-4 rounded text-sky-600"
                />
                <span>Free Delivery in Pakistan</span>
              </label>

              <label className="flex items-center gap-2.5 text-xs text-slate-300 font-bold cursor-pointer">
                <input
                  type="checkbox"
                  checked={isFlashDeal}
                  onChange={(e) => setIsFlashDeal(e.target.checked)}
                  className="w-4 h-4 rounded text-red-600"
                />
                <span>Feature in Flash Deals section</span>
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
