import React, { useState, useEffect } from "react";
import axios from "axios";
import ModalUsers from "../modal/Users";
import Swal from "sweetalert2";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/users");
        setUsers(response.data.users);
        setFilteredUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
        Swal.fire("Error", "Failed to fetch users", "error");
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter(user =>
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchQuery, users]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-2xl font-bold mb-4">Users Page</h1>
      <div className="flex items-center mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search users..."
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleOpenModal}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add User
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center"
          >
            <img
              src={user.image}
              alt={`${user.firstName} ${user.lastName}`}
              className="w-24 h-24 rounded-full mb-4 object-cover"
            />
            <h2 className="text-lg font-semibold mb-2 text-gray-800">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-gray-600 mb-1">{user.email}</p>
            <p className="text-gray-600 mb-1">{user.phone}</p>
            <p className="text-gray-600">
              {user.address?.address}, {user.address?.city}, {user.address?.state}
            </p>
            <p className="text-gray-600 mb-1">{user.username}</p>
            <p className="text-gray-600 mb-1">{user.password}</p>
          </div>
        ))}
      </div>
      {isModalOpen && <ModalUsers isOpen={isModalOpen} onClose={handleCloseModal} />}
    </div>
  );
};

export default Users;