import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Footer from "./footer";
import Header from "./header";
import BeforeProject from "./BeforeProject";
function AllBefeforeProject() {
    return(
        <>
        <Header />
        <BeforeProject />
        <Footer />
        </>
    )
}
export default AllBefeforeProject;