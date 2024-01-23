import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  updatePassword,
  getUserbyId
} from "../../Services/Api/Utilities/Index.js";
import { toast } from 'react-toastify';

function SecuritySettings() {
  const [Status, setStatus] = useState(false);
  const [items, setItems] = useState();
  const [values, setValues] = React.useState({
    currantPassword: "",
    newPassword: "",
    confirmPassword: "",
  });


  useEffect(() => {
    toast.configure()
  }, [])

  useEffect(() => {
    getUserDetails()
  }, [])


  const notifyError = (message) => {
    toast.error(message)
  }
  const notifySuccess = (message) => {
    toast.success(message)
  }

  const getUserDetails = async () => {
    const data = {
      id: localStorage.getItem("user"),
    };
    await getUserbyId(data)
      .then((response) => {
        const data = response.data;
        setItems(data);
      })
      .catch((e) => {
        console.log(e);
      })
  };

  const changePassword = async () => {
    const data = {
      email : items.email,
      oldPassword : values.currantPassword,
      newPassword : values.newPassword
    }
    await updatePassword(data)
      .then((response) => {
        const data = response.data;
        setStatus(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };


  const cheakValidation = () =>  {
    if (values.newPassword === values.confirmPassword){
      changePassword();
      if (Status.status) {
        notifySuccess("Password change sucessfull..")
      }else {
        notifyError("An Error Occoured..")
      }
    }
    else {
      notifyError("Password does not Match. Please Re Enter the passwords.");
    }
  };

  const handlePosition = (event) => {
    event.preventDefault();
    cheakValidation();
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <div className="container">
      <main>
        <div className="row g-3">
          <div className="col-md-5 col-lg-4 my-auto">
            <ul className="list-group mb-3">
              <li className="list-group-item d-flex justify-content-center lh-base border-0">
                <Link to="/personal-settings">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      class="bi bi-person-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                    </svg>
                    <h6 className="d-inline text-dark">Personal Details</h6>
                  </div>
                </Link>
              </li>
              <li className="list-group-item active d-flex justify-content-center lh-base border-0">
                <Link to="/security-settings">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      class="bi bi-gear"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                      <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
                    </svg>
                    <h6 className="d-inline-flex m-2 text-dark">Security</h6>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-7 col-lg-8">
            <div className="py-5">
              <div className="d-flex mx-auto mb-4 justify-content-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="75"
                  height="75"
                  fill="currentColor"
                  class="bi bi-gear-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
                </svg>
              </div>
              <div className="text-center">
                <h2>Security Details</h2>
                <p className="lead">
                  You can edit your security informations here....
                </p>
              </div>
            </div>

            <div className="row g-3 rounded-3 shadow mb-5 p-3 border border-light">
              <div className="col-md-4">
                <h3>Change Password</h3>
              </div>
              <div className="col-md-8">
                <form className="row">
                  <div className="col-md-12">
                    <label for="inputEmail4" className="form-label">
                      <h5>Currant Password:</h5>
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="currantPassword"
                      placeholder="Currant Password..."
                      required
                      onChange={handleChange("currantPassword")}
                    />
                  </div>
                  <div className="col-md-12">
                    <label for="inputEmail4" className="form-label">
                      <h5>New Password:</h5>
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="newPassword"
                      placeholder="New Password..."
                      required
                      onChange={handleChange("newPassword")}
                    />
                  </div>
                  <div className="col-md-12">
                    <label for="inputEmail4" className="form-label">
                      <h5>Confirm New Password:</h5>
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      placeholder="Confirm New Password..."
                      required
                      onChange={handleChange("confirmPassword")}
                    />
                  </div>
                  <div className="col-12 d-flex justify-content-center mt-3">
                    <button
                      className="btn btn-outline-primary btn-md "
                      onClick={handlePosition}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
            {/* <div className="row g-3 rounded-3 shadow mt-4 p-3 border border-light">
              <div className="col-md-4">
                <h3>Reset Password</h3>
              </div>
              <div className="col-md-8">
                <form className="row">
                  <div className="col-md-12">
                    <label for="inputEmail4" className="form-label">
                      <h5>New Password:</h5>
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="newPassword"
                      placeholder="New Password..."
                      required
                    />
                  </div>
                  <div className="col-md-12">
                    <label for="inputEmail4" className="form-label">
                      <h5>Confirm New Password:</h5>
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      placeholder="Confirm New Password..."
                      required
                    />
                  </div>
                  <div className="col-12 d-flex justify-content-left mt-3">
                    <button
                      type="submit"
                      className="btn btn-outline-primary btn-lg "
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div> */}
          </div>
        </div>
      </main>
    </div>
  );
}
export default SecuritySettings;
