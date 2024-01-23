import React, { useEffect, useState } from "react";

import { getReviewByHotelId } from "../../Services/Api/Utilities/Index.js";

const ReviewModel = ({ hotelId, image, hotelName, location }) => {
  const [reviewData, setReviewData] = useState([]);

  const getReviewDetails = async () => {
    // console.log(hotelId);
    const data = {
      id: hotelId,
    };
    await getReviewByHotelId(data)
      .then((response) => {
        // console.log(response.data);
        setReviewData(response.data);
        console.log(reviewData);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getReviewDetails();
  }, []);

  return (
    <div className="rounded shadow border border-primary row g-1 align-middle mb-3 mt-3 p-1 ">
      <div className="row">
        <div className="col-lg-3 d-flex justify-content-center my-auto">
          <img src={image} width="170px" height="130px" className="rounded" />
        </div>
        <div className="col-lg-7 d-flex justify-content-left my-auto">
          <div className="row">
            <div className="mt-1 d-inline-flex">
              <h5 className="">
                Rating :{" "}
                {reviewData.map((review) => (
                  <>{review.stars}</>
                ))}
              </h5>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-star"
                viewBox="0 0 16 16"
              >
                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
              </svg>
            </div>
            <p className="mb-1 mt-1">Hotel Name: {hotelName}</p>
            <p className="mb-1">
              {reviewData.map((review) => (
                <>{review.review}</>
              ))}
            </p>
            <p className="mb-1">Location : {location} </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewModel;
