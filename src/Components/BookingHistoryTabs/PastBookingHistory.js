import React, { Component, useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Tooltip, Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import BookingDetaill from "../../Layouts/BookingHistroy/BookingDetails.js";
import {
  getPastBookingByUserId,
  createReview,
} from "../../Services/Api/Utilities/Index.js";
import HashLoader from "react-spinners/HashLoader";
import "../../Assets/styles/css/Layouts/bookingHistoryTable.css";
const PastBookingHistory = () => {
  let limit = 5;
  let navigate = useNavigate();
  const [searchedParams, setSearchedparams] = useSearchParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageCount, setpageCount] = useState(0);
  const [bookings, setBookings] = useState(null);
  const [payStatus, setPayStatus] = useState(false);
  const [show, setShow] = useState(false);
  const [reviewHotel, setReviewHotel] = useState(null);
  const [ratings, setRatings] = useState(null);

  useEffect(() => {
    toast.configure();
    getBookings(0);
    setLoading(true);
  }, []);
  const handleRatingChange = (event) => {
    setRatings(event.target.value);
  };
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };
  const notifyError = (message) => {
    toast.error(message);
  };
  const notifySuccess = (message) => {
    toast.success(message);
  };
  const NewsCard = (props) => {
    return (
      <div style={{ padding: "20" }}>
        <a href={props.url}>
          {props.title} by {props.author}
        </a>
      </div>
    );
  };

  const getBookings = async (currentPage) => {
    const dataModel = {
      id: localStorage.getItem("user"), //user id
      page: currentPage,
    };
    await getPastBookingByUserId(dataModel)
      .then((res) => {
        if (res.status == 200) {
          setBookings(res.data.rows);
          setLoading(false);
          setpageCount(Math.ceil(res.data.count / limit));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const submitReview = async () => {
    let review = document.getElementsByName("description")[0].value;
    if (review != "") {
      const dataModel = {
        review: review,
        hotelId: reviewHotel,
        stars: ratings,
        customerId: localStorage.getItem("user"),
      };
      await createReview(dataModel)
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
            notifySuccess("You have submitted a feedback.Thank you");
          } else {
            notifyError("Some thing went wrong");
          }
          document.getElementsByName("description")[0].value = "";
          handleClose();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      notifyError("Please write your feedback before submit.");
    }
  };
  const handlePageClick = async (data) => {
    let currentPage = data.selected;
    getBookings(currentPage);
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Click here to view more details
    </Tooltip>
  );

  return (
    <div>
      <div>
        <div className="mt-2">
          <div className="table-web">
            <table class="table">
              <thead class="b-priamry t-light">
                <tr>
                  <th scope="col">Booking ID</th>
                  <th scope="col">Hotel Name</th>
                  <th scope="col">To be checking</th>
                  <th scope="col">Leave a review</th>
                  <th scope="col">Booking Info</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colspan="5">
                      <div className="booking-history-loader">
                        <HashLoader
                          loading={loading}
                          size={25}
                          margin={2}
                          color="#00AD5F"
                        />
                      </div>
                    </td>
                  </tr>
                ) : (
                  bookings.map((item, i) => {
                    return (
                      <tr>
                        <th scope="row">B-{item.bookingId}</th>
                        <td>{item.hotel.name}</td>
                        <td>
                          {item.checkInDate.split("T")[0]} to{" "}
                          {item.checkOutDate.split("T")[0]}{" "}
                        </td>
                        <td>
                          <i
                            class="fa fa-pencil-square"
                            style={{ fontSize: "1.5rem" }}
                            aria-hidden="true"
                            onClick={() => {
                              handleShow();
                              setReviewHotel(item.hotel.hotelId);
                            }}
                          ></i>
                        </td>

                        <td>
                          <Link
                            to={`/booking-history/details?booking=${item.bookingId}`}
                          >
                            <i
                              class="fa fa-info-circle"
                              style={{ fontSize: "1.5rem" }}
                              aria-hidden="true"
                            ></i>
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
          <div className="table-mob">
            <table class="table">
              <thead class="b-primary">
                <tr>
                  <th scope="col">Booking ID</th>
                  <th scope="col">Hotel Name</th>
                  <th scope="col">Leave a review</th>
                  <th scope="col">Info</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colspan="4">
                      <div className="booking-history-loader">
                        <HashLoader
                          loading={loading}
                          size={25}
                          margin={2}
                          color="#00AD5F"
                        />
                      </div>
                    </td>
                  </tr>
                ) : (
                  bookings.map((item) => {
                    return (
                      <tr>
                        <th scope="row">B-{item.bookingId}</th>
                        <td>{item.hotel.name}</td>
                        <td>
                          <i
                            class="fa fa-pencil-square"
                            style={{ fontSize: "1.5rem" }}
                            aria-hidden="true"
                            onClick={() => {
                              handleShow();
                              setReviewHotel(item.hotel.hotelId);
                            }}
                          ></i>
                        </td>
                        <td>
                          <Link to={"/booking-history/details"}>
                            <i
                              class="fa fa-info-circle"
                              style={{ fontSize: "1.5rem" }}
                              aria-hidden="true"
                            ></i>
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
        <Modal
          show={show}
          onHide={() => {
            handleClose();
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Submit your review</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div className="mb-4">
              <p>
                Well hey, thanks for the feedback. We love sharing that kind of
                stuff with potential customers so they can feel more confident
                about choosing us. If you're comfortable with it, it'd be
                awesome if you could share any of what you said to me in a
                booknow.lk .
              </p>
            </div>
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
                  How many ratings do you give out of 10
                </label>
              </div>
            </div>
            <div>
              <div className="row">
                <label for="floatingTextarea2">Description </label>
                <div class="form-floating">
                  <textarea
                    class="form-control"
                    placeholder="Leave a feedback here"
                    id="floatingTextarea2"
                    style={{ height: "100px" }}
                    name="description"
                  ></textarea>
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
                submitReview();
              }}
            >
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={1}
        pageRangeDisplayed={2}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default PastBookingHistory;
