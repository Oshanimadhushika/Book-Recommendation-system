import React from "react";
import Book from "../../src/asset/book5.png";
import { useEffect, useState } from "react";

const Recommender = () => {
  const [bookNames, setBookNames] = useState([]);
  const [selectedBook, setSelectedBook] = useState("");
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [posterUrls, setPosterUrls] = useState([]);

  // useEffect(() => {
  //   console.log("in useeffecttttt")
  //   const fetchData = async () => {
  //     console.log("in fetchdata")

     
  //     const response = await fetch('/api/get_book_names', {
  //       headers: {
  //         'Cache-Control': 'no-cache'
  //       }
  //     });
  //     console.log("after response", response);

  //       if (!response.ok) {
  //         console.error('Error fetching book names. Status:', response.status);
  //       } else {
  //         console.log("in elseee")
  //         try {
  //           const data = await response.json();
  //           console.log("data", data);
  //           setBookNames(data.book_names);
  //           console.log('Received book names:', data.book_names);
  //         } catch (error) {
  //           console.error('Error parsing JSON:', error);
  //         }
  //       }
  //   };
  
  //   fetchData();
  // }, []);
  
  useEffect(() => {
    const fetchData = async () => {
        console.log("use effecttt");
        try {
            const response = await fetch('http://127.0.0.1:5000/get_book_names');
            console.log("response", response);
            // const text = await response.text();
            // console.log("response text", text);

            if (!response.ok) {
              console.log("in if close");
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log("dataa", data);
            setBookNames(data.book_names);
            console.log('Received book names:', data.book_names);
        } catch (error) {
            console.error('Error fetching book names:', error);
        }
    };

    fetchData();
}, []);






  
const handleShowRecommendation = async () => {
  console.log("In handleShow");

  try {
    const response = await fetch("http://127.0.0.1:5000/recommend_book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ selected_book: selectedBook }),
        })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    console.log("Data:", data);

    setRecommendedBooks(data.recommended_books);
    console.log("book recommnd:", data.recommended_books);

    setRatings(data.ratings);
    console.log("ratingss:", data.ratings);

    setPosterUrls(data.poster_urls);
    console.log("urllll:", data.poster_urls);

  } catch (error) {
    console.error("Error fetching recommendations:", error);
  }
};


// const handleShowRecommendation = () => {
//   fetch(" http://127.0.0.1:5000/recommend_books", { 
//       method: "POST",
//       headers: {
//           "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ selected_book: selectedBook }),
//   })
//       .then(response => response.json())
//       .then(data => {
//           setRecommendedBooks(data.recommended_books);
//           setRatings(data.ratings);
//           setPosterUrls(data.poster_urls);
//       })
//       .catch(error => console.error("Error fetching recommendations:", error));
// };


  return (
    <div className="bg-black h-full mb-0">
      <h1 className="text-4xl font-bold text-red-500 p-5">
        Let's Explore The Books
      </h1>

      <select
        className="w-2/3 h-10 mt-5 ml-4"
        value={selectedBook}
        onChange={(e) => setSelectedBook(e.target.value)}
        
      >
        
       <option value="" disabled>Select  a book</option>
        {bookNames.map((book) => (
          <option key={book} value={book} >
            {book}
          </option>
        ))}
      </select>

      <button
        className="border-2 border-white text-white font-semibold ml-5 h-10 p-3 pb-3 "
        onClick={handleShowRecommendation}
      >
        Show Recommendation
      </button>

      <div>
        {recommendedBooks.map((book, index) => (
          <div
            key={index}
            className="flex justify-end items-end  rounded-md mt-4 left-1"
          >
            <p>{book}</p>
            <img
              style={{ height: "550px" }}
              src={posterUrls[index]}
              alt="Book Image"
              className="object-cover w-2/5 mb-6 "
            />
            <p>{`Rating: ${ratings[index]}`}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-end items-end  rounded-md mt-4 left-1 ">
        <img
          style={{ height: "550px" }}
          src={Book}
          alt="Book Image"
          className="object-cover w-2/5 mb-6 flex justify-end "
        />
      </div>
    </div>
  );
};
export default Recommender;
