import { useState, useMemo } from "react";
import { products } from "./data/products";
import { ProductGrid } from "./components/ProductGrid";
import { CategoryFilter } from "./components/CategoryFilter";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Footer } from "./components/Footer";
import { ProductModal } from "./components/ProductModal";
import type { Category, Product } from "./types/Product";
import "./App.css";

function App() {
  const [categoria, setCategoria] = useState<Category | "todos">("todos");
  const [seleccionado, setSeleccionado] = useState<Product | null>(null);

  const filtrados = useMemo(() => {
    if (categoria === "todos") return products;
    return products.filter((p) => p.categoria === categoria);
  }, [categoria]);

  return (
    <>
      <Navbar />
      <Hero />
      <main className="app">
        <CategoryFilter activa={categoria} onChange={setCategoria} />
        <ProductGrid products={filtrados} onSelect={setSeleccionado} />
      </main>
      <Footer />
      <ProductModal
        key={seleccionado?.id ?? "none"}
        product={seleccionado}
        onClose={() => setSeleccionado(null)}
      />
    </>
  );
}

export default App;
