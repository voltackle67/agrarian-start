import React, { useState, useEffect } from "react";
import { Product, ProductCategory, ProductUnit } from "../types/Product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

type Props = {
  onSave: (product: Omit<Product, "id">, id?: string) => void;
  initialData?: Product | null;
  onCancel?: () => void;
};

const categories: ProductCategory[] = ["Seeds", "Fertilizer", "Equipment", "Livestock Feed", "Other"];
const units: ProductUnit[] = ["kg", "liters", "pieces", "bags", "tons"];

export default function ProductForm({ onSave, initialData, onCancel }: Props) {
  const [name, setName] = useState(initialData?.name ?? "");
  const [category, setCategory] = useState<ProductCategory>(initialData?.category ?? "Seeds");
  const [unit, setUnit] = useState<ProductUnit>(initialData?.unit ?? "kg");
  const [currentStock, setCurrentStock] = useState(initialData?.currentStock?.toString() ?? "0");
  const [purchasePrice, setPurchasePrice] = useState(initialData?.purchasePrice?.toString() ?? "0");
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setCategory(initialData.category);
      setUnit(initialData.unit);
      setCurrentStock(initialData.currentStock.toString());
      setPurchasePrice(initialData.purchasePrice.toString());
    }
  }, [initialData]);
  
  function validate() {
    if (!name.trim()) return "Product name is required";
    if (!currentStock || isNaN(Number(currentStock)) || Number(currentStock) < 0) return "Stock must be >= 0";
    if (!purchasePrice || isNaN(Number(purchasePrice)) || Number(purchasePrice) < 0) return "Price must be >= 0";
    return "";
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const err = validate();
    if (err) {
      setError(err);
      return;
    }
    setError("");
    onSave({
      name,
      category,
      unit,
      currentStock: Number(currentStock),
      purchasePrice: Number(purchasePrice)
    }, initialData?.id);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <label>
        Product Name
        <Input
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </label>
      <label>
        Category
        <Select value={category} onValueChange={value => setCategory(value as ProductCategory)}>
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </Select>
      </label>
      <label>
        Unit
        <Select value={unit} onValueChange={value => setUnit(value as ProductUnit)}>
          {units.map(u => <option key={u} value={u}>{u}</option>)}
        </Select>
      </label>
      <label>
        Current Stock
        <Input
          type="number"
          min="0"
          value={currentStock}
          onChange={e => setCurrentStock(e.target.value)}
          required
        />
      </label>
      <label>
        Purchase Price
        <Input
          type="number"
          step="0.01"
          min="0"
          value={purchasePrice}
          onChange={e => setPurchasePrice(e.target.value)}
          required
        />
      </label>
      {error && <div className="text-red-600">{error}</div>}
      <div className="flex gap-2">
        <Button type="submit">{initialData ? "Update Product" : "Add Product"}</Button>
        {onCancel && <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>}
      </div>
    </form>
  );
}
