import React, { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("https://dummyjson.com/comments");
        setComments(response.data.comments);
      } catch (error) {
        console.error("Failed to fetch comments:", error);
        setError("Failed to load comments. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-t-4 border-blue-300 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Comments Page</h1>
      {comments.length > 0 ? (
        <div className="w-full max-w-4xl text-center">
          <Swiper
            spaceBetween={20}
            slidesPerView={2.4}
            className="mySwiper"
            loop="true"
          >
            {comments.map((comment) => (
              <SwiperSlide key={comment.id}>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h2 className="text-xl font-semibold mb-2 text-gray-900">
                    {comment.user?.username || "Anonymous"}
                  </h2>
                  <p className="text-gray-700 mb-4">{comment.body}</p>
                  <p className="text-gray-500 text-sm">Post ID: {comment.postId}</p>
                  <p className="text-gray-500 text-sm mt-2">❤️{comment.likes}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <p className="text-gray-600">No comments available.</p>
      )}
    </div>
  );
};

export default Comments;
