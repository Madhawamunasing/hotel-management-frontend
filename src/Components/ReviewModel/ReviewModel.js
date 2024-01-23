import React, { useEffect, useState } from "react";
// import { BrowserRouter as Router, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";

import {
  deleteReviewByReviewId,
  getHotelById,
  updateReviewById,
} from "../../Services/Api/Utilities/Index.js";

const ReviewModel = ({ id, description, rating, hotelId, onFresh }) => {
  const [hotelData, setHotelData] = useState({});
  const [show, setShow] = useState(false);
  const [dshow, setDShow] = useState(false);
  const [updateReviewId, setupdateReviewId] = useState(null);
  const [ratings, setRatings] = useState(null);
  const [review, setReview] = useState(null);

  const notifyError = (message) => {
    toast.error(message);
  };
  const notifySuccess = (message) => {
    toast.success(message);
  };

  const handleRatingChange = (event) => {
    setRatings(event.target.value);
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  const handleDClose = () => {
    setDShow(false);
  };
  const handleDShow = () => {
    setDShow(true);
  };

  const getHotelDetails = async () => {
    const data = {
      id: hotelId,
    };
    await getHotelById(data)
      .then((response) => {
        setHotelData(response.data[0]);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteReview = async () => {
    await deleteReviewByReviewId(id)
      .then((response) => {
        if (response.data === "Success") {
          notifySuccess("Sucessfully Deleted..");
          onFresh();
        } else {
          notifyError("An Error Occoured..");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateReview = async () => {
    if (!validate()) {
      const data = {
        review: review,
        stars: ratings,
      };
      if (review !== "") {
        await updateReviewById(updateReviewId, data)
          .then((response) => {
            if (response.status === 200) {
              notifySuccess("Sucessfully Updated..");
              handleClose();
              onFresh();
            } else {
              notifyError('An Error Occoured..')
            }
          })
          .catch((e) => {
            console.log(e)
          })
      } else {
        notifyError('Please enter a review...')
      }
    } else {
      notifyError('Please enter a number between 0-5 in rating input field...')
    }
  };

  useEffect(() => {
    toast.configure();
    getHotelDetails();
  }, []);

  const validate = () => {
    let isError = false;
    let number = /^[0-5]+$/;
    if (ratings == "" || !ratings.match(number)) {
      isError = true;
    }
    return isError;
  };

  return (
    <div className="rounded shadow border border-primary row g-1 align-middle mb-3 mt-3 p-1 ">
      <div className="row">
        <div className="col-lg-3 d-flex justify-content-center my-auto">
          <img
            src={hotelData.image}
            width="170px"
            height="130px"
            className="rounded"
          />
        </div>
        <div className="col-lg-7 d-flex justify-content-left my-auto">
          <div className="row">
            <div className="mt-1 d-inline-flex">
              <h5 className="">Rating : {rating} </h5>
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
            <p className="mb-1 mt-1">Hotel Name: {hotelData.name}</p>
            <p className="mb-1">{description}</p>
            <p className="mb-1">Location : {hotelData.town} </p>
          </div>
        </div>
        <div className="col-lg-2 center-block my-auto mx-auto">
          <button
            type="button"
            className="btn btn-outline-info rounded-pill btn-block mt-1 mb-3"
            onClick={() => {
              handleShow();
              setupdateReviewId(id);
            }}
          >
            Update
          </button>
          <button
            type="button"
            className="btn btn-outline-danger rounded-pill btn-block mb-2"
            onClick={handleDShow}
          >
            Remove
          </button>
        </div>
      </div>

      <Modal
        show={show}
        onHide={() => {
          handleClose();
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update your review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <label for="floatingTextarea2">Enter your ratings here:</label>
            <div class="form-floating mb-3">
              <input
                type="number"
                class="form-control"
                id="ratings"
                placeholder="ratings.."
                onChange={handleRatingChange}
              />
              <label for="floatingInput">
                How many ratings do you give out of 5
              </label>
            </div>
          </div>
          <div>
            <div className="row mt-1">
              <label for="floatingTextarea2">Description:</label>
              <div class="form-floating">
                <textarea
                  class="form-control"
                  placeholder="Update your feedback here"
                  id="review"
                  style={{ height: "100px" }}
                  onChange={handleReviewChange}
                ></textarea>
                <label for="floatingTextarea2">Comments...</label>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              handleClose();
            }}
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              updateReview();
            }}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={dshow}
        onHide={() => {
          handleDClose();
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              handleDClose();
            }}
          >
            No
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              deleteReview();
              handleDClose();
            }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ReviewModel;
