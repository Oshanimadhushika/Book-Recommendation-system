import React from "react";
import "tailwindcss/tailwind.css";
import Book from "../../src/asset/book2.jpg";
import { Link, NavLink } from "react-router-dom";
import Header from "../components/Header";

const Main = () => {
  return (
    <div className=" bg-black h-full mb-0">
      <Header />
      <div
        className="container mx-auto  p-9 bg-gray-400 text-white bg-opacity-20 lg:w-4/5 mb-4  relative"
        style={{
          backgroundImage: `url(${Book})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-4xl font-bold mb-6">
          Welcome to the Book Recommendation System
        </h1>

        <p className="text-lg mb-6">
          Discover your next great read with our Book Recommendation System!
          Whether you're an avid reader looking for your next literary adventure
          or a casual reader searching for something new, our system is here to
          help you find the perfect book tailored to your taste.
        </p>

        <h2 className="text-2xl font-bold mb-4">How It Works:</h2>

        <ol className="list-decimal ml-6 mb-6">
          <li className="mb-2">
            <span className="font-bold">Pick Your Favorite Type of Book:</span>{" "}
            Choose the kind of books you like, such as stories, facts,
            mysteries, love stories, science fiction, and more.
          </li>

          <li>
            <span className="font-bold">See Suggested Books:</span> Our system
            uses fancy technology to recommend books based on what you like to
            read. Explore lists of books picked just for you.
          </li>

          <li className="mb-2">
            <span className="font-bold">Interactive User Experience:</span>{" "}
            Easily navigate through the recommendations, read brief
            descriptions, and view cover images to make informed choices. The
            interactive interface ensures a seamless and enjoyable user
            experience.
          </li>

          <li>
            <span className="font-bold">Get Started:</span>
            <ul className="list-disc ml-6">
              <li>Select your favorite book from the dropdown menu.</li>
              <li>
                Click "Show Recommendations" to receive a list of suggested
                books tailored just for you.
              </li>
            </ul>
          </li>
        </ol>

        <h2 className="text-2xl font-bold mb-4">
          Why Choose Our Book Recommendation System?
        </h2>

        <ul className="list-disc ml-6 mb-6">
          <li>
            <span className="font-bold">Personalized Recommendations:</span> Our
            system understands your reading preferences to deliver personalized
            book suggestions.
          </li>

          <li>
            <span className="font-bold">Diverse Genres:</span> Explore a wide
            variety of genres to find books that cater to different tastes and
            interests.
          </li>

          <li>
            <span className="font-bold">User-Friendly Interface:</span> Enjoy a
            user-friendly and intuitive interface designed to enhance your
            browsing experience.
          </li>

          <li>
            <span className="font-bold">Discover Hidden Gems:</span> Uncover
            hidden gems and lesser-known titles that might become your new
            favorites.
          </li>
        </ul>

        {/* <button className="flex justify-center items-center mx-auto p-3 bg-white text-black font-semibold mt-3" >hhhhhhhhh</button> */}
        <Link to="/recommender">
          <button className="flex justify-center items-center mx-auto p-3 bg-white text-black font-semibold mt-3">
            Click to Go
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Main;
