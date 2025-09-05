export type ProductCategory = "Seeds" | "Fertilizer" | "Equipment" | "Livestock Feed" | "Other";
export type ProductUnit = "kg" | "liters" | "pieces" | "bags" | "tons";

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  unit: ProductUnit;
  currentStock: number;
  purchasePrice: number;
}
