import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { LanguageContext } from '../../Context/Language';

export default function Footer() {
const {language, setLanguage} = useContext(LanguageContext)


const getNavLink = (item) => {
switch (item) {
    case "Home":
    case "الرئيسية":
        return "/";
    case "About":
    case " من نحن ":
        return "/about";
    case "My Events":
    case " سابقة أعمالنا ":
        return "/myevents";
    case "Products":
    case "منتجاتنا":
        return "/products";
    case "Contact":
    case "اتصل بنا":
        return "/contact";
    default:
        return "/";
}
};

const navItems = language === "en"
? ["Home", "All-Events", "My Events"]
: ["الرئيسية", "جميع الفاعليات","فعالياتي"];

return (
    <section className='footer position-relative bg-f mt-150'>
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="wave"></div>
                            <ul className="social-icon p-0">
                            <li>
                                <a href="mailto:ahmedfathy159930@gmail.com" aria-label="Send Email" role="button">
                                <i className="fas fa-envelope"></i>
                                </a>
                            </li>
                            <li>
                                <a href="https://www.linkedin.com/in/ahmed-fathy61/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" role="button">
                                <i className="fab fa-linkedin"></i>
                                </a>
                            </li>
                            <li>
                                <a href="https://github.com/fathy61" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" role="button">
                                <i className="fab fa-github"></i>
                                </a>
                            </li>
                            <li>
                                <a href="https://wa.me/201063270761" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" role="button">
                                <i className="fab fa-whatsapp"></i>
                                </a>
                            </li>
                            </ul>
                    <ul className='footer-links p-0'>
                        {navItems.map((item, index) => (
                        <li key={index} className=''>
                            <Link to={getNavLink(item)}>
                              {item}
                            </Link>
                        </li>
                        ))}
                    </ul>
                        <div className="row">
                            <div className="col-md-12">
                                <p className='text-center'> &copy; 2025 EV . All Rights Reserved. </p>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    </section>
);

}

