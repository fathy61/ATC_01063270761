import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LanguageContext } from "../../Context/Language";


export default function Navbar() {
  const [activeLink, setactiveLink] = useState("home")
    const {language, setLanguage} = useContext(LanguageContext)

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      // setuserLogin(true); 
    } else {
      // setuserLogin(null); 
    }

  }, [])

  function scrollToTop() {
    window.scrollTo(0, 0)
  }

  return (
    <>
      <header>

      {language === "en" ? (

        <nav className="navbar navbar-expand-lg bg">
          <div className="container">
            {/* <img src={""} alt="jabaness food" className="mb-2"/> */}
            <a className="navbar-brand logo ms-3" href="#">
              Events
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">

              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item mx-2">
                  <Link className={activeLink === "home" ? "active nav-link" : "nav-link"}
                    onClick={() => setactiveLink("home")}
                    aria-current="page" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item mx-2">
                  <Link className={activeLink === "myevents" ? "active nav-link" : "nav-link"}
                    onClick={() => setactiveLink("myevents")}
                    to="/myevents">
                    My Events
                  </Link>
                </li>
                <li className="nav-item mx-2">
                  <Link className={activeLink === "allevents" ? "active nav-link" : "nav-link"}
                    onClick={() => setactiveLink("allevents")}
                    to="/allevents">
                      All-Events
                  </Link>
                </li>
                <li className="nav-item mx-2">
                  <Link className={activeLink === "admin" ? "active nav-link" : "nav-link"}
                    onClick={() => setactiveLink("admin")}
                    to="/admin">
                      Admin
                  </Link>
                </li>
              </ul>
                              <button
                        className="btn btn-light btn-sm ar-en ms-3"
                        onClick={() => setLanguage(language === "en" ? "ar" : "en")}
                    >
                        {language === "en" ? "العربية" : "English"}
                </button>

            </div>
          </div>


        </nav>
      ) : (

        <nav className="navbar navbar-expand-lg bg">
          <div className="container">
            <a className="navbar-brand logo ms-3" href="#">
              فاعليات
            </a>
            
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">

              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item mx-2">
                  <Link className={activeLink === "home" ? "active nav-link" : "nav-link"}
                    onClick={() => setactiveLink("home")}
                    aria-current="page" to="/">
                    الرئيسيه
                  </Link>
                </li>
                <li className="nav-item mx-2">
                  <Link className={activeLink === "myevents" ? "active nav-link" : "nav-link"}
                    onClick={() => setactiveLink("myevents")}
                    to="/myevents">
                    فاعلياتي
                  </Link>
                </li>
                <li className="nav-item mx-2">
                  <Link className={activeLink === "allevents" ? "active nav-link" : "nav-link"}
                    onClick={() => setactiveLink("allevents")}
                    to="/allevents">
                      جميع الفاعليات
                  </Link>
                </li>
                <li className="nav-item mx-2">
                  <Link className={activeLink === "admin" ? "active nav-link" : "nav-link"}
                    onClick={() => setactiveLink("admin")}
                    to="/admin">
                      لوحه التحكم
                  </Link>
                </li>
              </ul>
                  <button
                        className="btn btn-light btn-sm ar-en ms-3"
                        onClick={() => setLanguage(language === "en" ? "ar" : "en")}
                    >
                        {language === "en" ? "العربية" : "English"}
                </button>

            </div>
          </div>


        </nav>
      )}

      </header>
    </>
  );
}