import type { Product } from "../types/Product";

const base = import.meta.env.BASE_URL; // resuelve a '/catalogo-aluminio/' en build y dev

export const products: Product[] = [
  {
    id: "puerta-corrediza-01",
    nombre: "Puerta Corrediza Linea Moderna",
    categoria: "puertas",
    colores: ["blanco", "negro", "gris-europa"],
    gama: "intermedio",
    descripcion:
      "Perfil grueso, deslizamiento suave, ideal para accesos amplios a jardín o terraza.",
    media: [
      {
        type: "image",
        src: `${base}images/puerta-corrediza-01-1.jpg`,
        alt: "Puerta corrediza vista frontal",
      },
      {
        type: "image",
        src: `${base}images/puerta-corrediza-01-2.jpg`,
        alt: "Puerta corrediza detalle riel",
      },
    ],
  },
  {
    id: "cancel-bano-templado-01",
    nombre: "Cancelería de Baño Templada",
    categoria: "canceleria",
    colores: ["blanco", "negro"],
    gama: "intermedio",
    descripcion:
      "Cancel de baño corredizo con vidrio templado.",
    media: [
      {
        type: "image",
        src: `${base}images/cancel-bano-templado-01.jpeg`,
        alt: "Cancelería de baño templada",
      },
    ],
  },
  {
    id: "cancel-blanco-sencillo-01.jpeg",
    nombre: "Cancelería de Baño Blanca con Acrilico",
    categoria: "canceleria",
    colores: ["negro", "gris-europa", "blanco"],
    gama: "sencillo",
    descripcion:
      "Cancel para baño con hoja acrilica, diseño a la medida.",
    media: [
      {
        type: "image",
        src: `${base}images/cancel-blanco-sencillo-01.jpeg`,
        alt: "Cancelería de baño blanca con acrílico",
      },
    ],
  },
  {
    id: "domo-01",
    nombre: "Domo Estructural",
    categoria: "domos",
    colores: ["blanco"],
    gama: "elaborado",
    descripcion:
      "Estructura reforzada para grandes claros, ideal para patios centrales.",
    media: [
      {
        type: "image",
        src: `${base}images/domo-01-1.jpg`,
        alt: "Domo estructural instalado",
      },
      {
        type: "video",
        src: `${base}videos/domo-01-2.mp4`,
        alt: "Domo estructural en funcionamiento"
      }
    ],
  },
  {
    id: "doble-puerta-negra-01",
    nombre: "Puerta doble",
    categoria: "puertas",
    colores: ["negro", "blanco", "gris-europa", "madera"],
    gama: "intermedio",
    descripcion:
      "Puerta doble con diseño moderno, ideal para acceso principal.",
    media: [
      {
        type: "image",
        src: `${base}images/doble-puerta-negra-01.jpeg`,
        alt: "Puerta doble vista frontal",
      }
    ]  
  },
  {
    id: "puerta-bano-01",
    nombre: "Puerta de baño blanca",
    categoria: "puertas",
    colores: ["blanco", "gris-europa", "madera", "negro"],
    gama: "sencillo",
    descripcion: 
      "Pruerta de baño de color blanca sencilla a la medida del marco",
      media: [
        {
          type: "image",
          src: `${base}images/puerta-bano-01.jpeg`,
          alt: "Puerta de bano blanca"
        }
      ]
  },
  {
    id: "puerta-blanca-01",
    nombre: "puerta blanca diseño moderno",
    categoria: "puertas",
    colores: ["blanco", "gris-europa", "madera", "negro"],
    gama: "intermedio",
    descripcion:
      "Puerta blanca con diseño moderno media luna",
    media: [
      {
        type: "image",
        src: `${base}images/puerta-blanca-01.jpeg`,
        alt: "Puerta media luna"
      }
    ]
  },
  {
    id: "puerta-blanca-cuadros-01",
    nombre: "puerta blanca a cuadros",
    categoria: "puertas",
    colores: ["blanco", "gris-europa", "madera", "negro"],
    gama: "intermedio",
    descripcion:
      "Puerta blanca con cuadros diseño a la medida",
    media: [
      {
        type: "image",
        src: `${base}images/puerta-blanca-cuadros-01.jpeg`,
        alt: "Puerta media luna"
      }
    ]
  },
  {
    id: "puerta-blanca-sencilla-01",
    nombre: "puerta blanca con diseño sencillo",
    categoria: "puertas",
    colores: ["blanco", "gris-europa", "madera", "negro"],
    gama: "sencillo",
    descripcion:
      "Puerta blanca sencilla",
    media: [
      {
        type: "image",
        src: `${base}images/puerta-blanca-sencilla-01.jpeg`,
        alt: "Puerta media luna"
      }
    ]
  },
  {
    id: "puerta-fija-blanca-01",
    nombre: "puerta fija",
    categoria: "puertas",
    colores: ["blanco", "gris-europa", "madera", "negro"],
    gama: "sencillo",
    descripcion:
      "Puerta blanca con fijo color blanca",
    media: [
      {
        type: "image",
        src: `${base}images/puerta-fija-blanca-01.jpeg`,
        alt: "Puerta media luna"
      }
    ]
  },
  {
    id: "puerta-madera-ancha-01",
    nombre: "puerta ancha estilo de madera",
    categoria: "puertas",
    colores: ["blanco", "gris-europa", "madera", "negro"],
    gama: "elaborado",
    descripcion:
      "Puerta de color madera ancha, con pequeños vidros a cuadros/rectangulos",
    media: [
      {
        type: "image",
        src: `${base}images/puerta-madera-ancha-01.jpeg`,
        alt: "Puerta madera ancha"
      }
    ]
  },
  {
    id: "puerta-negra-aluminio-01",
    nombre: "puerta negra moderna",
    categoria: "puertas",
    colores: ["blanco", "gris-europa", "madera", "negro"],
    gama: "elaborado",
    descripcion:
      "Puerta negra con color gris moderna",
    media: [
      {
        type: "image",
        src: `${base}images/puerta-negra-aluminio-01.jpeg`,
        alt: "Puerta madera ancha"
      }
    ]
  },
  {
    id: "puerta-negra-bano-01",
    nombre: "puerta negra con ventana arriba",
    categoria: "puertas",
    colores: ["blanco", "gris-europa", "madera", "negro"],
    gama: "intermedio",
    descripcion:
      "Puerta de color negra con ventana para abrir arriba",
    media: [
      {
        type: "image",
        src: `${base}images/puerta-negra-bano-01.jpeg`,
        alt: "Puerta madera ancha"
      }
    ]
  },
  {
    id: "puerta-negra-principal-01",
    nombre: "puerta ancha estilo moderno con vidrio",
    categoria: "puertas",
    colores: ["blanco", "gris-europa", "madera", "negro"],
    gama: "elaborado",
    descripcion:
      "Puerta ancha color negra con vidrios a los lados, hecha a la medida de forma moderna",
    media: [
      {
        type: "image",
        src: `${base}images/puerta-negra-principal-01.jpeg`,
        alt: "Puerta ancha negra"
      }
    ]
  },
  {
    id: "ventana-blanca-pequena-01",
    nombre: "ventana blanca para baño",
    categoria: "ventanas",
    colores: ["blanco", "gris-europa", "madera", "negro"],
    gama: "sencillo",
    descripcion:
      "ventana sencilla de color blanca pequeña para baño",
    media: [
      {
        type: "image",
        src: `${base}images/ventana-blanca-pequena-01.jpeg`,
        alt: "Puerta madera ancha"
      }
    ]
  },
  {
    id: "ventana-negra-cuadros-01",
    nombre: "ventana negra a cuadros",
    categoria: "ventanas",
    colores: ["blanco", "gris-europa", "madera", "negro"],
    gama: "intermedio",
    descripcion:
      "ventana alta color negra hacia exterior",
    media: [
      {
        type: "image",
        src: `${base}images/ventana-negra-alta-01.jpeg`,
        alt: "ventana alta"
      }
    ]
  },
  {
    id: "puerta-negra-delgada-01",
    nombre: "ventana blanca para baño",
    categoria: "puertas",
    colores: ["blanco", "gris-europa", "madera", "negro"],
    gama: "intermedio",
    descripcion:
      "puerta delgada color negra con vidrios entre la puerta",
    media: [
      {
        type: "image",
        src: `${base}images/puerta-negra-delgada-01.jpeg`,
        alt: "Puerta delgada negra"
      }
    ]
  }
];
