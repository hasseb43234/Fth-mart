import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStore } from '../../lib/store';
import {
  Upload,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  Download,
  ArrowRight,
  Package,
  Layers
} from 'lucide-react';
import { formatPKR } from '../../lib/formatters';

export const AdminBulkImport = () => {
  const navigate = useNavigate();
  const addProduct = useStore((state) => state.addProduct);
  const [isProcessing, setIsProcessing] = useState(false);
  const [importPreview, setImportPreview] = useState([
    {
      title: 'Smart LED Magnetic Wireless Desk Lamp with QI Fast Charger',
      categorySlug: 'home-kitchen',
      price: 3499,
      compareAtPrice: 6500,
      costPrice: 1500,
      sku: 'FTH-IMP-LAMP-01',
      stock: 45,
      supplierName: 'Shenzhen Lighting Factory',
      valid: true
    },
    {
      title: 'Waterproof Motorcycle Handlebar Phone Mount with Vibration Dampener',
      categorySlug: 'automotive-accessories',
      price: 1650,
      compareAtPrice: 3200,
      costPrice: 700,
      sku: 'FTH-IMP-MNT-02',
      stock: 60,
      supplierName: 'Guangzhou Moto Direct',
      valid: true
    },
    {
      title: 'Portable Electric Neck Massager with Heat Pulse for Cervical Spine',
      categorySlug: 'beauty-personal-care',
      price: 2250,
      compareAtPrice: 4500,
      costPrice: 950,
      sku: 'FTH-IMP-MASS-03',
      stock: 35,
      supplierName: 'Yiwu Health Care Goods',
      valid: true
    }
  ]);

  const handleDownloadSample = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,title,categorySlug,price,compareAtPrice,costPrice,sku,stock,supplierName\n' +
      'Smart LED Magnetic Desk Lamp,home-kitchen,3499,6500,1500,FTH-IMP-01,45,Shenzhen Lighting\n' +
      'Waterproof Phone Mount,automotive-accessories,1650,3200,700,FTH-IMP-02,60,Guangzhou Moto';
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'fth_mart_import_template.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCommitImport = () => {
    setIsProcessing(true);
    setTimeout(() => {
      importPreview.forEach((item) => {
        addProduct({
          title: item.title,
          slug: item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          brand: 'Dropship Import',
          categorySlug: item.categorySlug,
          price: item.price,
          compareAtPrice: item.compareAtPrice,
          costPrice: item.costPrice,
          sku: item.sku,
          stock: item.stock,
          supplierName: item.supplierName,
          images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800']
        });
      });
      setIsProcessing(false);
      alert(`Successfully imported ${importPreview.length} products to FTH Mart inventory!`);
      navigate('/admin/products');
    }, 800);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">Bulk Dropship CSV Importer</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Import hundreds of AliExpress or CJ Dropshipping items in seconds with automated PKR margin markup
          </p>
        </div>

        <button
          onClick={handleDownloadSample}
          className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
        >
          <Download className="w-4 h-4" /> Download Sample CSV
        </button>
      </div>

      {/* Drag and Drop Zone */}
      <div className="bg-slate-900 border-2 border-dashed border-slate-700 hover:border-sky-500 rounded-3xl p-8 text-center space-y-3 cursor-pointer transition-colors">
        <div className="w-14 h-14 rounded-2xl bg-sky-500/10 text-sky-400 flex items-center justify-center mx-auto">
          <Upload className="w-7 h-7" />
        </div>
        <div>
          <h3 className="font-bold text-sm text-white">Drag & drop your CSV / Excel product catalog</h3>
          <p className="text-xs text-slate-400 mt-1">Supports standard CSV, XLSX format with column headers</p>
        </div>
        <button className="px-5 py-2 bg-slate-800 text-slate-200 text-xs font-bold rounded-xl hover:bg-slate-700">
          Browse File
        </button>
      </div>

      {/* Validation Dry-Run Preview Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h3 className="font-bold text-sm text-white">Import Dry-Run Preview ({importPreview.length} items ready)</h3>
            <p className="text-xs text-slate-400">All fields validated: Title, PKR Price, Supplier Cost, SKU</p>
          </div>
          <button
            onClick={handleCommitImport}
            disabled={isProcessing}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-emerald-600/20"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isProcessing ? 'Importing Products...' : 'Commit Import to Inventory'}</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="text-slate-400 border-b border-slate-800 text-[10px] uppercase">
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Title</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Selling Price</th>
                <th className="py-2.5 px-3">Supplier Cost</th>
                <th className="py-2.5 px-3">Margin Profit</th>
                <th className="py-2.5 px-3">Stock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {importPreview.map((item, i) => {
                const margin = item.price - item.costPrice;
                const marginPct = Math.round((margin / item.price) * 100);
                return (
                  <tr key={i} className="hover:bg-slate-800/40">
                    <td className="py-3 px-3">
                      <span className="text-[10px] font-black text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        VALID
                      </span>
                    </td>
                    <td className="py-3 px-3 font-bold text-white max-w-xs truncate">{item.title}</td>
                    <td className="py-3 px-3 text-slate-400">{item.categorySlug}</td>
                    <td className="py-3 px-3 font-bold text-sky-400">{formatPKR(item.price)}</td>
                    <td className="py-3 px-3 text-slate-400 font-mono">{formatPKR(item.costPrice)}</td>
                    <td className="py-3 px-3 text-emerald-400 font-bold">
                      +{marginPct}% ({formatPKR(margin)})
                    </td>
                    <td className="py-3 px-3 text-slate-300 font-bold">{item.stock}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
