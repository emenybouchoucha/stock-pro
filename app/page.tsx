"use client"; 
import { supabase } from '../SRC/supabaseClient'; 
import React, { useState, useEffect } from 'react';
import { initialProducts, Product } from '../SRC/data';
import toast, { Toaster } from 'react-hot-toast';

interface ProductWithStock extends Omit<Product, 'stock'> {
  stock?: number; 
}

export default function Dashboard() {
  const [products, setProducts] = useState<ProductWithStock[]>(initialProducts);
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newStock, setNewStock] = useState(""); 
  const [searchTerm, setSearchTerm] = useState("");
  const [editingProduct, setEditingProduct] = useState<ProductWithStock | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data } = await supabase.from('products').select('*').order('id', { ascending: false });
    if (data) setProducts(data);
  };

  const addProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newPrice || !newStock) return toast.error("Champs vides");

    const { data, error } = await supabase
      .from('products')
      .insert([{ 
        name: newName, 
        price: Number(newPrice), 
        stock: Number(newStock) 
      }])
      .select();

    if (!error && data) {
      setProducts([data[0], ...products]);
      setNewName(""); setNewPrice(""); setNewStock("");
      toast.success("Enregistré f-el-Cloud!");
    } else {
      toast.error("Erreur d'enregistrement");
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    const { error } = await supabase
      .from('products')
      .update({ 
        name: editingProduct.name, 
        price: Number(editingProduct.price),
        stock: Number(editingProduct.stock) 
      })
      .eq('id', editingProduct.id);

    if (!error) {
      setProducts(products.map(p => p.id === editingProduct.id ? editingProduct : p));
      setEditingProduct(null);
      toast.success("Mis à jour!");
    }
  };

  // 🗑️ Rajja3na el-fonction mta3 el-fessakh
  const deleteProduct = async (id: number) => {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (!error) {
      setProducts(products.filter(p => p.id !== id));
      toast.success("Article supprimé!");
    } else {
      toast.error("Erreur de suppression");
    }
  };

  if (!isClient) return <div className="min-h-screen bg-[#F5F2ED]"></div>;

  return (
    <div className="min-h-screen bg-[#F5F2ED] text-[#2D1B19] font-sans">
      <Toaster position="top-right" />
      
      <nav className="bg-[#FAF9F6]/90 backdrop-blur-md sticky top-0 z-50 border-b border-[#E7E2DB] px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#2D1B19] rounded-xl flex items-center justify-center text-[#FAF9F6] shadow-lg"><span className="text-lg">📦</span></div>
          <h1 className="text-xl font-black tracking-tighter uppercase italic">STOCK<span className="text-[#8B735B] font-light">ATELIER</span></h1>
        </div>
        <input className="bg-[#F5F2ED] border border-[#E7E2DB] py-2 px-4 rounded-xl w-64 outline-none text-sm" placeholder="Rechercher..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </nav>

      <main className="max-w-7xl mx-auto p-8 lg:p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-[#FAF9F6] p-8 rounded-[2rem] border border-[#E7E2DB] shadow-sm text-center">
            <p className="text-[10px] font-black text-[#8B735B] uppercase mb-2">Valeur Inventaire</p>
            <h3 className="text-3xl font-black">
              {products.reduce((a, b) => a + (Number(b.price) * (b.stock || 0)), 0).toLocaleString()} <span className="text-sm opacity-40">TND</span>
            </h3>
          </div>
          <div className="bg-[#2D1B19] p-8 rounded-[2rem] text-[#FAF9F6] shadow-xl text-center">
            <p className="text-[10px] font-black opacity-50 uppercase mb-2">Total Articles</p>
            <h3 className="text-3xl font-black">{products.reduce((a, b) => a + (Number(b.stock) || 0), 0)} <span className="text-sm opacity-40">Pièces</span></h3>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <aside className="lg:col-span-4 bg-[#FAF9F6] p-8 rounded-[2.5rem] border border-[#E7E2DB]">
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-[#8B735B] mb-8 border-b pb-4">Nouveau Stock</h2>
            <form onSubmit={addProduct} className="space-y-6">
              <input className="w-full bg-[#F5F2ED] p-4 rounded-xl outline-none font-bold text-sm" placeholder="Nom..." value={newName} onChange={e => setNewName(e.target.value)} />
              <input className="w-full bg-[#F5F2ED] p-4 rounded-xl outline-none font-bold text-sm" type="number" placeholder="Prix" value={newPrice} onChange={e => setNewPrice(e.target.value)} />
              <input className="w-full bg-[#F5F2ED] p-4 rounded-xl outline-none font-bold text-sm" type="number" placeholder="Quantité en Stock" value={newStock} onChange={e => setNewStock(e.target.value)} />
              <button className="w-full bg-[#2D1B19] text-[#FAF9F6] font-black py-5 rounded-2xl shadow-xl uppercase text-[10px] tracking-widest mt-4 active:scale-95 transition-transform">Enregistrer</button>
            </form>
          </aside>

          <section className="lg:col-span-8 bg-[#FAF9F6] rounded-[2.5rem] border border-[#E7E2DB] overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="text-[9px] font-black text-[#8B735B] uppercase border-b border-[#E7E2DB]/50">
                  <th className="p-8 text-left">Désignation</th>
                  <th className="p-8 text-left">Stock</th>
                  <th className="p-8 text-left">Prix</th>
                  <th className="p-8 text-right pr-12">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E7E2DB]/40">
                {products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())).map(p => (
                  <tr key={p.id} className="group hover:bg-[#F5F2ED]/40 transition-colors">
                    <td className="p-8 font-black text-[#2D1B19]">{p.name}</td>
                    <td className="p-8">
                      <span className="bg-[#2D1B19] text-white px-3 py-1 rounded-full text-xs font-black italic">
                        {p.stock || 0}
                      </span>
                    </td>
                    <td className="p-8 font-black italic">{Number(p.price).toLocaleString()} TND</td>
                    <td className="p-8 text-right pr-12">
                      <div className="flex justify-end gap-3 opacity-30 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => setEditingProduct(p)} className="hover:scale-125 transition-transform">✏️</button>
                        <button onClick={() => deleteProduct(p.id)} className="hover:scale-125 transition-transform text-red-600">🗑️</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      </main>

      {editingProduct && (
        <div className="fixed inset-0 bg-[#2D1B19]/40 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <form onSubmit={handleUpdate} className="bg-[#FAF9F6] p-10 rounded-[3rem] shadow-2xl w-full max-w-sm border border-[#E7E2DB]">
            <h2 className="text-xl font-black mb-8 text-[#2D1B19] uppercase tracking-tighter italic">Modifier <span className="font-light opacity-50">Stock</span></h2>
            <div className="space-y-4 mb-8">
              <input className="w-full bg-[#F5F2ED] p-4 rounded-xl outline-none font-bold" value={editingProduct.name} onChange={e => setEditingProduct({...editingProduct, name: e.target.value})} />
              <input className="w-full bg-[#F5F2ED] p-4 rounded-xl outline-none font-bold" type="number" value={editingProduct.price} onChange={e => setEditingProduct({...editingProduct, price: Number(e.target.value)})} />
              <input className="w-full bg-[#F5F2ED] p-4 rounded-xl outline-none font-bold" type="number" value={editingProduct.stock || 0} onChange={e => setEditingProduct({...editingProduct, stock: Number(e.target.value)})} />
            </div>
            <button type="submit" className="w-full bg-[#2D1B19] text-[#FAF9F6] font-black py-4 rounded-xl uppercase text-[10px] tracking-widest">Sauvegarder</button>
            <button type="button" onClick={() => setEditingProduct(null)} className="w-full py-2 text-[#8B735B] font-bold text-[9px] uppercase mt-2">Annuler</button>
          </form>
        </div>
      )}
    </div>
  );
}