import React, { useState, useEffect } from "react";
import axios from "axios";
import ModalProducts from "../modal/Products"; // Pastikan path ini benar
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products");
        setProducts(response.data.products);
        setFilteredProducts(response.data.products);
      } catch (err) {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://dummyjson.com/products/categories"
        );
        setCategories(response.data);
      } catch (err) {
        setError("Failed to fetch categories");
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      let url = "https://dummyjson.com/products";
      if (searchQuery) {
        url = `https://dummyjson.com/products/search?q=${searchQuery}`;
      } else if (selectedCategory) {
        url = `https://dummyjson.com/products/category/${selectedCategory}`;
      }
      try {
        const response = await axios.get(url);
        setFilteredProducts(response.data.products);
      } catch (err) {
        setError("Failed to filter products");
      }
    };

    fetchFilteredProducts();
  }, [searchQuery, selectedCategory]);

  const handleCardClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-t-4 border-blue-300 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Products Page</h1>

      <div className="mb-6 flex space-x-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search for products..."
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.slug} value={category.slug}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white p-4 rounded-lg shadow-md flex flex-col items-start cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleCardClick(product)}
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full max-h-max object-cover mb-4 rounded"
            />
            <h2 className="text-lg font-bold mb-2">{product.title}</h2>
            <p className="text-gray-600 font-semibold mb-2">${product.price}</p>
            <p className="text-black text-sm"><FontAwesomeIcon icon={faStar} size="l" className="text-yellow-500" /> {product.rating}</p>
          </div>
        ))}
      </div>

      <ModalProducts
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default Products;