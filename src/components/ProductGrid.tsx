import { motion, AnimatePresence } from 'framer-motion';
import type { Product } from '../types/Product';
import { ProductCard } from './ProductCard';

interface Props {
  products: Product[];
  onSelect: (product: Product) => void;
}

export function ProductGrid({ products, onSelect }: Props) {
  return (
    <div className="product-grid">
      <AnimatePresence>
        {products.map((product, i) => (
          <motion.div
            key={product.id}
            layout
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, delay: i % 4 * 0.08 }}
          >
            <ProductCard product={product} onClick={() => onSelect(product)} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}