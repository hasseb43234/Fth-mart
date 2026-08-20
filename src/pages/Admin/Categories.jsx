import React, { useState } from 'react';
import { useStore } from '../../lib/store';
import { FolderTree, Plus, Edit2, Trash2, ChevronRight, Layers, Sparkles } from 'lucide-react';
import { Modal } from '../../components/ui/Modal';

export const AdminCategories = () => {
  const categories = useStore((state) => state.categories);
  const addCategory = useStore((state) => state.addCategory);
  const updateCategory = useStore((state) => state.updateCategory);
  const deleteCategory = useStore((state) => state.deleteCategory);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [name, setName] = useState('');
  const [urduName, setUrduName] = useState('');
  const [slug, setSlug] = useState('');
  const [image, setImage] = useState('');

  const handleOpenNew = () => {
    setEditingCategory(null);
    setName('');
    setUrduName('');
    setSlug('');
    setImage('https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cat) => {
    setEditingCategory(cat);
    setName(cat.name);
    setUrduName(cat.urduName || '');
    setSlug(cat.slug);
    setImage(cat.image);
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const payload = {
      name,
      urduName,
      slug: slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      image: image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'
    };

    if (editingCategory) {
      updateCategory(editingCategory.id, payload);
    } else {
      addCategory(payload);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Category Hierarchy ({categories.length})</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Organize dropshipping mega-menu, subcategories, and Urdu titles
          </p>
        </div>

        <button
          onClick={handleOpenNew}
          className="px-4 py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-sky-600/30 flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-xs hover:border-slate-700 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-full h-32 rounded-2xl overflow-hidden bg-slate-800 border border-slate-700">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
              </div>

              <div>
                <h3 className="font-bold text-sm text-white">{cat.name}</h3>
                {cat.urduName && (
                  <p className="text-xs text-emerald-400 font-urdu mt-0.5">{cat.urduName}</p>
                )}
                <span className="text-[11px] text-slate-400 font-mono">slug: /c/{cat.slug}</span>
              </div>

              {cat.subcategories?.length > 0 && (
                <div className="space-y-1 pt-2 border-t border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-500">Subcategories</span>
                  <div className="flex flex-wrap gap-1">
                    {cat.subcategories.map((s) => (
                      <span key={s.id} className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
              <button
                onClick={() => handleOpenEdit(cat)}
                className="p-1.5 text-slate-400 hover:text-sky-400 rounded-lg"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  if (confirm(`Delete category "${cat.name}"?`)) {
                    deleteCategory(cat.id);
                  }
                }}
                className="p-1.5 text-slate-400 hover:text-red-400 rounded-lg"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCategory ? 'Edit Category' : 'Create Category'}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Category Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (!editingCategory) setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
              }}
              placeholder="e.g. Smart Electronics"
              className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Urdu Name</label>
            <input
              type="text"
              value={urduName}
              onChange={(e) => setUrduName(e.target.value)}
              placeholder="e.g. اسمارٹ الیکٹرانکس"
              className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:outline-none font-urdu"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Slug *</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:outline-none font-mono"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Image URL</label>
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold"
            >
              Save Category
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
