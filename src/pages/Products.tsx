import React, { useState } from "react";
import { Product } from "../types/Product";
import ProductForm from "../components/ProductForm";
import { Button } from "@/components/ui/button";
import { nanoid } from "nanoid";

const sampleProducts: Product[] = [
  { id: nanoid(), name: "Wheat Seeds", category: "Seeds", unit: "kg", currentStock: 100, purchasePrice: 120 },
  { id: nanoid(), name: "Organic Fertilizer", category: "Fertilizer", unit: "bags", currentStock: 20, purchasePrice: 250 },
  { id: nanoid(), name: "Animal Feed", category: "Livestock Feed", unit: "tons", currentStock: 8, purchasePrice: 900 },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(sampleProducts);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  function handleSave(productData: Omit<Product, "id">, id?: string) {
    if (id) {
      setProducts(products => products.map(prod => prod.id === id ? { ...prod, ...productData } : prod));
      setEditingProduct(null);
    } else {
      setProducts(products => [{ id: nanoid(), ...productData }, ...products]);
    }
    setIsFormOpen(false);
  }

  function handleEdit(product: Product) {
    setEditingProduct(product);
    setIsFormOpen(true);
  }

  function handleDelete(id: string) {
    if (window.confirm("Delete this product?")) {
      setProducts(products => products.filter(p => p.id !== id));
    }
  }

  function handleAddClick() {
    setEditingProduct(null);
    setIsFormOpen(true);
  }

  return (
    <div className="max-w-4xl mx-auto py-4 px-2">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <Button onClick={handleAddClick}>Add Product</Button>
      </div>

      {isFormOpen && (
        <div className="mb-6">
          <ProductForm
            onSave={handleSave}
            initialData={editingProduct}
            onCancel={() => setIsFormOpen(false)}
          />
        </div>
      )}

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white">
          <thead className="bg-green-200">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Unit</th>
              <th className="px-4 py-2">Stock</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(prod => (
              <tr key={prod.id} className="border-t">
                <td className="px-4 py-2">{prod.name}</td>
                <td className="px-4 py-2">{prod.category}</td>
                <td className="px-4 py-2">{prod.unit}</td>
                <td className="px-4 py-2">{prod.currentStock}</td>
                <td className="px-4 py-2">₹{prod.purchasePrice.toFixed(2)}</td>
                <td className="px-4 py-2 flex gap-2">
                  <Button onClick={() => handleEdit(prod)} size="sm">Edit</Button>
                  <Button onClick={() => handleDelete(prod.id)} size="sm" variant="destructive">Delete</Button>
                </td>
              </tr>
            ))}
            {!products.length && (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-gray-500">No products found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
