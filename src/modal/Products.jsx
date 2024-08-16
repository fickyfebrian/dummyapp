import React from "react";

const ModalProducts = ({ product, isOpen, onClose }) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
      <div className="absolute inset-0 backdrop-blur-sm" />
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-2xl"
        >
          &times;
        </button>
        <img
          src={product.thumbnail}
          alt={product.name}
          className="w-full max-h-max object-cover mb-4 rounded"
        />
        <h2 className="text-xl font-bold mb-2">{product.title}</h2>
        <p className="text-gray-600 font-bold mb-2">${product.price}</p>
        <p className="text-gray-600 mb-4">{product.description}</p>
      </div>
    </div>
  );
};

export default ModalProducts;
