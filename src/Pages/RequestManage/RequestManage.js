import React from "react";

import Navbars from "../../Components/Navbar/Navbar";
import Requestmanagemodel from "../../Layouts/RequestManageModel/RequestManageModel";
import Footer from "../../Layouts/Footer/Footer";

import '../../Assets/styles/css/Pages/requestManage.css'
function Requestmanage() {
  return (
    <>
      <Navbars />
      <div className="req-container">
        <Requestmanagemodel />
      </div>
      <Footer />
    </>
  );
}
export default Requestmanage;
