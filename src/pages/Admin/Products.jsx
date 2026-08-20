import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../lib/store';
import {
  Package,
  Plus,
  Search,
  SlidersHorizontal,
  Edit2,
  Trash2,
  Copy,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  RefreshCw,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { formatPKR } from '../../lib/formatters';

export const AdminProducts = () => {
  const navigate = useNavigate();
  const products = useStore((state) => state.products);
  const categories = useStore((state) => state.categories);
  const deleteProduct = useStore((state) => state.deleteProduct);
  const updateStock = useStore((state) => state.updateStock);
  const addProduct = useStore((state) => state.addProduct);
  const syncMarkazCatalog = useStore((state) => state.syncMarkazCatalog);
  const addToast = useStore((state) => state.addToast);

  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');
  const [editingStockId, setEditingStockId] = useState(null);
  const [tempStockValue, setTempStockValue] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;

  const filteredProducts = useMemo(() => {
    let list = products;
    if (selectedCat !== 'all') {
      list = list.filter((p) => p.categorySlug === selectedCat);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.sku?.toLowerCase().includes(q)
      );
    }
    return list;
  }, [products, selectedCat, search]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const handleDuplicate = (prod) => {
    const duplicated = {
      ...prod,
      id: `prod-${Date.now()}`,
      title: `${prod.title} (Copy)`,
      sku: `${prod.sku}-COPY`,
      slug: `${prod.slug}-copy-${Date.now()}`
    };
    addProduct(duplicated);
    addToast({
      title: 'Product Duplicated',
      message: `${prod.title} was cloned successfully.`,
      type: 'success'
    });
  };

  const handleStockSave = (prodId) => {
    updateStock(prodId, tempStockValue);
    setEditingStockId(null);
    addToast({
      title: 'Stock Updated',
      message: `Inventory stock adjusted to ${tempStockValue} units.`,
      type: 'success'
    });
  };

  const handleSyncMarkaz = () => {
    const count = syncMarkazCatalog();
    addToast({
      title: 'Markaz Catalog Synced',
      message: `Successfully loaded ${count} products across all categories!`,
      type: 'success'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <span>Product Inventory</span>
            <span className="text-sm font-bold bg-sky-500/20 text-sky-400 px-3 py-0.5 rounded-full border border-sky-500/30">
              {products.length} Products
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage Pakistani dropshipping catalog, Markaz wholesale inventory, margins &amp; stock
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleSyncMarkaz}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-emerald-600/30 flex items-center gap-1.5 active:scale-95"
            title="Reload 500 Markaz items"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Sync 500 Markaz Catalog
          </button>
          <Link
            to="/admin/products/import"
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition-colors"
          >
            Bulk Import CSV
          </Link>
          <Link
            to="/admin/products/new"
            className="px-4 py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-sky-600/30 flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Add Product
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by title, SKU, brand..."
            className="w-full text-xs pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-sky-500"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={selectedCat}
            onChange={(e) => {
              setSelectedCat(e.target.value);
              setCurrentPage(1);
            }}
            className="text-xs font-bold bg-slate-800 border border-slate-700 text-slate-200 rounded-xl px-3 py-2.5 focus:outline-none cursor-pointer w-full sm:w-auto"
          >
            <option value="all">All Categories ({products.length})</option>
            {categories.map((c) => (
              <option key={c.id} value={c.slug}>{c.name}</option>
            ))}
          </select>

          <span className="text-xs text-slate-400 whitespace-nowrap hidden sm:inline">
            Showing {(currentPage - 1) * itemsPerPage + 1}–{Math.min(currentPage * itemsPerPage, filteredProducts.length)} of {filteredProducts.length}
          </span>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="text-slate-400 border-b border-slate-800 text-[10px] uppercase bg-slate-950/50">
                <th className="py-3 px-4">Product Info</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Selling (PKR)</th>
                <th className="py-3 px-4">Supplier Cost</th>
                <th className="py-3 px-4">Margin %</th>
                <th className="py-3 px-4">Stock</th>
                <th className="py-3 px-4">Orders</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {paginatedProducts.map((p) => {
                const cost = p.costPrice || p.supplierCost || p.price * 0.5;
                const marginAmount = p.price - cost;
                const marginPercent = Math.round((marginAmount / p.price) * 100);

                return (
                  <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                    {/* Title and Thumbnail */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.images?.[0] || 'https://placehold.co/80'}
                          alt={p.title}
                          className="w-12 h-12 rounded-xl object-cover border border-slate-700 bg-slate-800 flex-shrink-0"
                        />
                        <div className="min-w-0 max-w-xs">
                          <Link
                            to={`/p/${p.slug}`}
                            target="_blank"
                            className="font-bold text-white hover:text-sky-400 line-clamp-1 flex items-center gap-1"
                          >
                            {p.title} <ExternalLink className="w-3 h-3 text-slate-500 opacity-60" />
                          </Link>
                          <span className="text-[10px] text-slate-400 font-mono">SKU: {p.sku}</span>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-4 text-slate-300 capitalize">
                      {p.categorySlug?.replace('-', ' ')}
                    </td>

                    {/* Selling Price */}
                    <td className="py-3 px-4 font-black text-white">
                      {formatPKR(p.price)}
                    </td>

                    {/* Supplier Cost */}
                    <td className="py-3 px-4 text-slate-400 font-mono">
                      {formatPKR(cost)}
                    </td>

                    {/* Margin */}
                    <td className="py-3 px-4">
                      <span className="text-[11px] font-black text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        +{marginPercent}% ({formatPKR(marginAmount)})
                      </span>
                    </td>

                    {/* Stock with Inline Modifier */}
                    <td className="py-3 px-4">
                      {editingStockId === p.id ? (
                        <div className="flex items-center gap-1">
                          <input
                            type="number"
                            value={tempStockValue}
                            onChange={(e) => setTempStockValue(Number(e.target.value))}
                            className="w-16 text-xs p-1 bg-slate-800 border border-sky-500 rounded text-white"
                          />
                          <button
                            onClick={() => handleStockSave(p.id)}
                            className="text-[10px] font-bold text-sky-400 hover:text-sky-300 px-1"
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            setEditingStockId(p.id);
                            setTempStockValue(p.stock);
                          }}
                          className={`font-bold hover:underline cursor-pointer flex items-center gap-1 ${
                            p.stock <= (p.lowStockThreshold || 15) ? 'text-red-400' : 'text-slate-300'
                          }`}
                          title="Click to edit stock inline"
                        >
                          <span>{p.stock} units</span>
                          <Edit2 className="w-3 h-3 opacity-40 hover:opacity-100" />
                        </button>
                      )}
                    </td>

                    {/* Orders */}
                    <td className="py-3 px-4 font-semibold text-slate-300">
                      {p.ordersCount || 0}
                    </td>

                    {/* Action buttons */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          to={`/admin/products/${p.id}/edit`}
                          className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-sky-400 rounded-lg transition-colors"
                          title="Edit Product"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDuplicate(p)}
                          className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-emerald-400 rounded-lg transition-colors"
                          title="Duplicate"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete product "${p.title}"?`)) {
                              deleteProduct(p.id);
                            }
                          }}
                          className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-red-400 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 border-t border-slate-800 flex items-center justify-between bg-slate-950/40">
          <span className="text-xs text-slate-400">
            Page <b className="text-white">{currentPage}</b> of <b className="text-white">{totalPages}</b> ({filteredProducts.length} total items)
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-bold text-white flex items-center gap-1 transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" /> Prev
            </button>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage >= totalPages}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-bold text-white flex items-center gap-1 transition-colors"
            >
              Next <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
