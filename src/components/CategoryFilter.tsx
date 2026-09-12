import type { Category } from "../types/Product";

const categorias: { value: Category | 'todos'; label: string }[] = [
    { value: 'todos', label: 'Todos'},
    { value: 'puertas', label: 'Puertas'},
    { value: 'ventanas', label: 'Ventanas'},
    { value: 'canceleria', label: 'Cancelería'},
    { value: 'domos', label: 'Dómos'},
    { value: 'alacenas', label: 'Alacenas'},
    { value: 'cocinas-integrales', label: 'Cocinas Integrales'},
];

interface Props {
    activa: Category | 'todos';
    onChange: (categoria: Category | 'todos') => void;
}

export function CategoryFilter({ activa, onChange }: Props) {
    return (
        <div className="category-filter">
            {categorias.map((cat) => (
                <button
                    key={cat.value}
                    className={`category-filter__btn ${activa === cat.value ? 'active' : ''}`}
                    onClick={() => onChange(cat.value)}
                >
                    {cat.label}
                </button>
            ))}
        </div>    
    )
}