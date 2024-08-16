import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRandom, faShuffle } from "@fortawesome/free-solid-svg-icons";

function Home() {
  const [user, setUser] = useState(null);
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingCard, setLoadingCard] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          setLoading(true);
          const response = await axios.get("https://dummyjson.com/auth/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data);
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUser();
  }, []);

  const fetchRandomQuote = async () => {
    setLoadingCard(true); // Set loading for card only
    try {
      const response = await axios.get("https://dummyjson.com/quotes/random");
      setQuote(response.data.quote);
      setAuthor(response.data.author);
    } catch (error) {
      console.error("Failed to fetch quote:", error);
    } finally {
      setLoadingCard(false); // Set loading for card only
    }
  };

  useEffect(() => {
    fetchRandomQuote();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-t-4 border-blue-300 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading ...</p>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="aurora-background"></div>
      <div className="min-h-[100px] min-w-[100px] relative z-10 px-4 py-4">
        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
        >
          <h1 className="text-3xl font-bold mb-4 text-white">
            Welcome to the Homepage!
          </h1>
          <p className="mb-4 text-white">
            Hello, {user.firstName} {user.lastName}!
          </p>
          <div className={`min-h-[100px] bg-white p-6 rounded-lg shadow-lg  max-w-md card-loading`}>
            {loadingCard && (
              <div className="loading-overlay">
                <div className="spinner"></div>
              </div>
            )}
            <p className="mb-4 text-center ">"{quote}"</p>
            <p className="mb-4 text-center font-semibold">-{author}-</p>
            <button
              onClick={fetchRandomQuote}
              className="px-4 py-2 text-white bg-blue-400 rounded hover:bg-blue-600 "
            >
              <FontAwesomeIcon icon={faRandom} size="xl" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Home;
