import Pendingrequest from "../../Components/PendingRequest/PendingRequest";
import Rejectedrequest from "../../Components/RejectedRequest/RejectedRequest";
import Acceptedrequest from "../../Components/AcceptedRequest/AcceptedRequest";
import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import { Collapse } from "react-bootstrap";
import { useEffect, useState } from "react";

import { getHotelByStatus } from "../../Services/Api/Utilities/Index";

function Requestmanagemodel() {
  const [items0, setItems0] = useState([]);
  const [items1, setItems1] = useState([]);
  const [items2, setItems2] = useState([]);
  const [itemOffset1, setItemOffset1] = useState(0);
  const [itemOffset2, setItemOffset2] = useState(0);
  const [itemOffset3, setItemOffset3] = useState(0);

  useEffect(() => {
    getrejectedDetails(itemOffset3);
    getacceptedDetails(itemOffset2);
    getpendingDetails(itemOffset1);
  }, []);

  async function getrejectedDetails(page) {
    var pages;
    if (page == null) {
      pages = itemOffset3;
    } else {
      pages = page;
    }
    const data = {
      status: "rejected",
      page: pages,
    };
    await getHotelByStatus(data)
      .then((res) => {
        const data = res.data;
        setItems0(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function getacceptedDetails(page) {
    var pages;
    if (page == null) {
      pages = itemOffset2;
    } else {
      pages = page;
    }
    const data = {
      status: "accepted",
      page: pages,
    };
    await getHotelByStatus(data)
      .then((res) => {
        const data = res.data;
        setItems1(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function getpendingDetails(page) {
    var pages;
    if (page == null) {
      pages = itemOffset1;
    } else {
      pages = page;
    }
    const data = {
      status: "pending",
      page: pages,
    };
    await getHotelByStatus(data)
      .then((res) => {
        const data = res.data;
        setItems2(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handlependingNextPageClick = async () => {
    const newOffset1 = itemOffset1 + 1;
    setItemOffset1(newOffset1);
    getpendingDetails(newOffset1);
  };
  const handleacceptedNextPageClick = async () => {
    const newOffset2 = itemOffset2 + 1;
    setItemOffset2(newOffset2);
    getacceptedDetails(newOffset2);
  };
  const handlerejectedNextPageClick = async () => {
    const newOffset3 = itemOffset3 + 1;
    setItemOffset3(newOffset3);
    getrejectedDetails(newOffset3);
  };

  const handlependingBackPageClick = async () => {
    const newOffset1 = itemOffset1 - 1;
    setItemOffset1(newOffset1);
    getpendingDetails(newOffset1);
  };
  const handleacceptedBackPageClick = async () => {
    const newOffset2 = itemOffset2 - 1;
    setItemOffset2(newOffset2);
    getacceptedDetails(newOffset2);
  };
  const handlerejectedBackPageClick = async () => {
    const newOffset3 = itemOffset3 - 1;
    setItemOffset3(newOffset3);
    getrejectedDetails(newOffset3);
  };
  return (
    <div class="container">
      <div className="d-flex justify-content-center m-4">
        <h1>Request Manage</h1>
      </div>
      <Tabs
        defaultActiveKey="pending"
        transition={Collapse}
        id="noanim-tab-example"
        className="mb-3 mt-4 row-g-2 d-flex justify-content-center"
      >
        <Tab eventKey="pending" title="Pending Request">
          <div className="container">
            <div className="row g-3 rounded-3 shadow p-2 border border-light mt-4">
              <div className="col-4 d-flex justify-content-center">
                <h2>Pending Request</h2>
              </div>
              <div className="col-8">
                <div className="row g-1 rounded-3 bg-secondary text-white align-middle mb-2">
                  <div className="col-sm-3 d-flex justify-content-center">
                    <p>Hotel Name</p>
                  </div>
                  <div className="col-sm-3 d-flex justify-content-center">
                    <p>Owner Name</p>
                  </div>
                  <div className="col-sm-2 d-flex justify-content-center">
                    <p>Location</p>
                  </div>
                  <div className="col-sm-2 d-flex justify-content-center">
                    <p>Status</p>
                  </div>
                  <div className="col-sm-2 d-flex justify-content-center">
                    <p>Actions</p>
                  </div>
                </div>

                {items2.map((item) => {
                  return (
                    <Pendingrequest
                      id={item.hotelId}
                      hname={item.name}
                      oId={item.userUId}
                      location={item.town}
                      status={item.status}
                      onfresh={() => {
                          getrejectedDetails()
                          getacceptedDetails()
                          getpendingDetails()
                      }}
                    />
                  );
                })}
                <div className="d-flex justify-content-center">
                  <button
                    className="pending-req-button mx-2"
                    onClick={handlependingBackPageClick}
                  >
                    Back
                  </button>
                  <button
                    className="pending-req-button mx-2"
                    onClick={handlependingNextPageClick}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Tab>

        <Tab eventKey="accepted" title="Accepted Request">
          <div className="container">
            <div className="row g-3 rounded-3 shadow p-2 border border-light mt-4">
              <div className="col-4 d-flex justify-content-center">
                <h2>Accepted Request</h2>
              </div>
              <div className="col-8">
                <div className="row g-1 rounded-3 bg-secondary text-white align-middle mb-2">
                  <div className="col-sm-3 d-flex justify-content-center">
                    <p>Hotel Name</p>
                  </div>
                  <div className="col-sm-3 d-flex justify-content-center">
                    <p>Owner Name</p>
                  </div>
                  <div className="col-sm-2 d-flex justify-content-center">
                    <p>Location</p>
                  </div>
                  <div className="col-sm-2 d-flex justify-content-center">
                    <p>Status</p>
                  </div>
                  <div className="col-sm-2 d-flex justify-content-center">
                    <p>Actions</p>
                  </div>
                </div>
                {items1.map((item, index) => {
                  return (
                    <Acceptedrequest
                      id={item.hotelId}
                      hname={item.name}
                      oId={item.userUId}
                      location={item.town}
                      status={item.status}
                      onfresh={() => {
                        getacceptedDetails()
                        getpendingDetails()
                    }}
                    />
                  );
                })}
                <div className="d-flex justify-content-center">
                  <button
                    className="pending-req-button mx-2"
                    onClick={handleacceptedBackPageClick}
                  >
                    Back
                  </button>
                  <button
                    className="pending-req-button mx-2"
                    onClick={handleacceptedNextPageClick}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Tab>

        <Tab eventKey="rejected" title="Rejected Request">
          <div className="container">
            <div className="row g-3 rounded-3 shadow p-2 border border-light mt-4">
              <div className="col-4 d-flex justify-content-center">
                <h2>Rejected Request</h2>
              </div>
              <div className="col-8">
                <div className="row g-1 rounded-3 bg-secondary text-white align-middle mb-2">
                  <div className="col-sm-3 d-flex justify-content-center">
                    <p>Hotel Name</p>
                  </div>
                  <div className="col-sm-3 d-flex justify-content-center">
                    <p>Owner Name</p>
                  </div>
                  <div className="col-sm-2 d-flex justify-content-center">
                    <p>Location</p>
                  </div>
                  <div className="col-sm-2 d-flex justify-content-center">
                    <p>Status</p>
                  </div>
                  <div className="col-sm-2 d-flex justify-content-center">
                    <p>Actions</p>
                  </div>
                </div>
                {items0.map((item, index) => {
                  return (
                    <Rejectedrequest
                      id={item.hotelId}
                      hname={item.name}
                      oId={item.userUId}
                      location={item.town}
                      status={item.status}
                      onfresh={() => {
                        getrejectedDetails()
                        getpendingDetails()
                    }}
                    />
                  );
                })}
                <div className="d-flex justify-content-center">
                  <button
                    className="pending-req-button mx-2"
                    onClick={handlerejectedBackPageClick}
                  >
                    Back
                  </button>
                  <button
                    className="pending-req-button mx-2"
                    onClick={handlerejectedNextPageClick}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}
export default Requestmanagemodel;
