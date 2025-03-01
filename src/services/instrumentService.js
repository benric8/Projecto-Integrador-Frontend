import axios from "axios";
//const API_LOCAL = import.meta.env.VITE_API_URL_LOCAL;
const API_URL = import.meta.env.VITE_API_URL;

const instrumentService = {
  async getCategories() {
    try {
      const response = await axios.get(`${API_URL}/categories`);
      return response.data;
    } catch (error) {
      console.error(
        "Error al obtener categorías:",
        error.response?.data || error.message
      );
      throw error;
    }
  },

  async createInstrument(instrumentData) {
    try {
      const response = await axios.post(`${API_URL}/products`, instrumentData, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      console.error(
        "Error al crear el instrumento:",
        error.response?.data || error.message
      );
      throw error;
    }
  },
  async getInstrumenAll(page = 0, pageSize = 10) {
    try {
      // La API usa paginación base 0 (como es común en Spring Boot)
      const response = await axios.get(`${API_URL}/products`, {
        params: {
          page, // Enviamos directamente el valor (que ya debe estar en base 0)
          pageSize,
        },
      });
      
      console.log("Respuesta completa del backend:", response.data);
      
      // Asegurándonos de acceder correctamente a la estructura de la respuesta
      const data = response.data?.response || {};
      
      return {
        products: data.content || [],
        totalPages: data.totalPages || 1,
        currentPageIndex: data.number || 0, // Página actual en base 0
      };
    } catch (error) {
      console.error(
        "Error al listar los productos:",
        error.response?.data || error.message
      );
      return { products: [], totalPages: 1, currentPageIndex: 0 };
    }
  },

// Método actualizado para solo actualizar la categoría

async updateInstrument(instrumentData) {
  try {
    // Obtenemos el ID del instrumento y la categoría
    const idproducto = instrumentData.id || instrumentData.idProduct;
    const idCategory = instrumentData.idCategory;
    
    if (!idproducto) {
      throw new Error("ID del instrumento no proporcionado para actualización");
    }
    
    if (!idCategory) {
      throw new Error("ID de categoría no proporcionado para actualización");
    }
    
    // Realizamos la petición PUT al endpoint correcto
    const response = await axios.put(
      `${API_URL}/products/${idproducto}/category/${idCategory}`,
      {}, // No necesitamos enviar un cuerpo si el ID de categoría ya está en la URL
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    
    console.log("Respuesta de actualización de categoría:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error al actualizar la categoría del instrumento:",
      error.response?.data || error.message
    );
    throw error;
  }
},

  async deleteInstrument(id) {
    try {
      await axios.put(`${API_URL}/products/${id}`);
      // return { success: true, message: 'Instrumento eliminado correctamente' };
    } catch (error) {
      console.error(
        "Error al eliminar el instrumentossss:",
        error.response?.data || error.message
      );
      throw error;
    }
  },
};

export default instrumentService;
