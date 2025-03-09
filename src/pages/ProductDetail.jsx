/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProductDetail.css";
import ProductFeatures from "../components/ProductFeatures/ProductFeatures";
const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Función para obtener características de fallback según el nombre del producto
  const getFallbackFeatures = (product) => {
    const name = product.name?.toLowerCase() || "";
    if (name.includes("timbal") && name.includes("cencerro")) {
      return [
        "Marca: LP Aspire",
        "Tipo: timbal",
        "Tamaño: estándar",
        "Material: Aluminio y parches PET",
        "Mecanismo: percusión",
        "Producto: instrumento musical",
      ];
    } else if (name.includes("platillos")) {
      return [
        "Marca: Sabian",
        "Tipo: platillos",
        "Tamaño: estándar",
        "Material: cobre",
        "Mecanismo: percusión",
        "Producto: instrumento musical",
      ];
    } else if (name.includes("batería eléctrica")) {
      return [
        "Marca: Mapex",
        "Tipo: Batería",
        "Tamaño: Grande",
        "Material: Aluminio y parches PET",
        "Mecanismo: percusión",
        "Producto: instrumento musical",
      ];
    } else if (name.includes("sintetizador")) {
      return [
        "Marca: Kross",
        "Tipo: Sintetizador",
        "Tamaño: compacto",
        "Material: Vinilo, ABS y aluminio",
        "Mecanismo: Digital",
        "Producto: instrumento musical",
      ];
    } else if (name.includes("teclado")) {
      return [
        "Marca: Yamaha",
        "Tipo: teclado",
        "Tamaño: estándar",
        "Material: aluminio",
        "Mecanismo: cuerda",
        "Producto: instrumento musical",
      ];
    } else if (name.includes("marimba")) {
      return [
        "Marca: Tonson",
        "Tipo: diatónica",
        "Tamaño: compacto",
        "Material: pino",
        "Mecanismo: percusión",
        "Producto: instrumento musical",
      ];
    } else if (name.includes("maracas")) {
      return [
        "Marca: Yamaha",
        "Tipo: sonajeros",
        "Tamaño: pequeño",
        "Material: plástico ABS y madera",
        "Mecanismo: percusión",
        "Producto: instrumento musical",
      ];
    } else if (name.includes("guitarra eléctrica stratocaster")) {
      return [
        "Marca: Stratocaster",
        "Tipo: eléctrica",
        "Tamaño: estándar",
        "Material: fibra de carbono y madera",
        "Mecanismo: cuerda",
        "Producto: instrumento musical",
      ];
    } else if (name.includes("guitarra eléctrica")) {
      return [
        "Marca: Gibson",
        "Tipo: eléctrica",
        "Tamaño: estándar",
        "Material: caoba y aluminio",
        "Mecanismo: cuerda",
        "Producto: instrumento musical",
      ];
    } else if (name.includes("guitarra acústica")) {
      return [
        "Marca: Vibra",
        "Tipo: acústica",
        "Tamaño: estándar",
        "Material: caoba",
        "Mecanismo: cuerda",
        "Producto: instrumento musical",
      ];
    } else if (name.includes("viola")) {
      return [
        "Marca: stentor",
        "Tipo: acústico",
        "Tamaño: pequeña",
        "Material: pino",
        "Mecanismo: cuerda",
        "Producto: instrumento musical",
      ];
    } else if (name.includes("trompeta")) {
      return [
        "Marca: Eastrock",
        "Tipo: piccolo",
        "Tamaño: estándar",
        "Material: aluminio",
        "Mecanismo: viento",
        "Producto: instrumento musical",
      ];
    } else if (name.includes("acordeon")) {
      return [
        "Marca: Yingwu",
        "Tipo: acordeon",
        "Tamaño: estándar",
        "Material: Aluminio",
        "Mecanismo: Cuerda y viento",
        "Producto: instrumento musical",
      ];
    } else {
      return ["Característica genérica", "Producto: instrumento musical"];
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://clavecompas-production.up.railway.app/clavecompas/products/${id}`
        );
        const apiProduct = response.data.response;
        setProduct({
          ...apiProduct,
          features: apiProduct.features || getFallbackFeatures(apiProduct),
        });
      } catch (error) {
        console.error("Error al obtener el detalle del producto:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#730f06]"></div>
        <p className="text-2xl">Cargando...</p>
      </div>
    );
  }

  if (!product) return <div>Loading...</div>;

  const productImages = product.imageUrls;
  const previewImages = productImages.slice(1, 5);

  // Función para abrir la galería en la imagen seleccionada
  const openGallery = (index = 0) => {
    setCurrentImageIndex(index);
    setIsGalleryOpen(true);
  };

  // Función para cerrar la galería
  const closeGallery = () => {
    setIsGalleryOpen(false);
  };

  // Función para cambiar de imagen
  const changeImage = (direction) => {
    setCurrentImageIndex((prevIndex) => {
      const newIndex = prevIndex + direction;
      if (newIndex < 0) return productImages.length - 1;
      if (newIndex >= productImages.length) return 0;
      return newIndex;
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 min-h-screen pt-28 relative">
      <div className="flex justify-between items-center">
        {/* Nombre del producto */}
        <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

        {/* Botón para volver */}
        <button
          onClick={() => navigate(-1)}
          className="text-3xl hover:text-gray-700"
        >
          <img
            src="../public/img/back-button.png"
            alt="Volver"
            className="w-8 h-8"
          />
        </button>
      </header>
      <div className="product-detail-body">
        <p className="product-description">{product.description}</p>

        {/* Aquí se integra la galería de imágenes */}
        <ImageGalleryPreview
          productId={product.idProduct}
          imagenPrincipal={product.imageUrls[0]}
          galeria={product.imageUrls}
        />
        <p>{product.price}</p>
        <p>{product.stock}</p>
      </div>
    </div>
  );
};

export default ProductDetail;
