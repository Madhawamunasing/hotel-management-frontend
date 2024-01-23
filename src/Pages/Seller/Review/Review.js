import React, { useEffect, useState } from "react";
import Navbars from "../../../Components/Navbar/Navbar";
import Footer from "../../../Layouts/Footer/Footer";
import ReviewModel from "../../../Components/SellerReviewModel/ReviewModel";
// import HashLoader from "react-spinners/HashLoader";

import {
  getHotelByUserId,
  getReviewByHotelId,
} from "../../../Services/Api/Utilities/Index";

const Review = () => {
  const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);

  useEffect(() => {
    getHotelsDetails();
    // setLoading(true);
  }, []);

  const getHotelsDetails = async () => {
    const data = {
      id: localStorage.getItem("user"),
    };
    await getHotelByUserId(data)
      .then((response) => {
        const data = response.data;
        console.log(response.data);
        setItems(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <Navbars />
      <div className="container mt-5">
        <div className="row g-3">
          <div className="col-12 shadow-lg rounded-3 border border-secondary ml-2">
            <div className="pl-5 pr-5 pb-2 mt-5">
                <ReviewModel/>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Review;
