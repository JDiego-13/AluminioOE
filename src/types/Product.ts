export type Category = 
    | 'puertas'
    | 'ventanas'
    | 'mosquiteros'
    | 'canceleria'
    | 'domos'
    | 'alacenas'
    | 'cocinas-integrales';

export type ColorAluminio = 'blanco' | 'negro' | 'madera' | 'gris-europa';

// Nivel de complejidad/elaboracion del trabajo, sirve como referencia
// visual de "gama" si dar precio exacto (Aluminio cambia de precio)
export type Gama = 'sencillo' | 'intermedio' | 'elaborado';

export interface MediaItem {
    type: 'image' | 'video';
    src: string;
    alt: string;
}

export interface Product {
    id: string;
    nombre: string;
    categoria: Category;
    colores: ColorAluminio[];
    gama: Gama;
    descripcion: string;
    media: MediaItem[]; //Fotos y/o videos del trabajo terminado.
}