import React, { useContext, useEffect, useState } from 'react'
import { getAllEvents, getUserBookingAPi } from '../../Network/card.api';
import { Link, useNavigate } from 'react-router-dom';
import { LanguageContext } from '../../Context/Language';
import { isLoggedIn } from '../../Network/auth.api';

export default function AllEvents() {
  const [getProducts, setgetProducts] = useState([]);
  const [getUserBookingId, setgetUserBookingId] = useState([]);
  const [bookedCards, setBookedCards] = useState([]);
  const {language, setLanguage} = useContext(LanguageContext)
  const navigate = useNavigate()

    async function isLogged(){
        await isLoggedIn()
        .then((res) => {
          console.log("llogin???",res)
        })
        .catch((res) => {
          console.log("llogin???",res)
            navigate("/auth/login");
        })
    }


async function getCard() {
    await getAllEvents("product")
      .then((res) => {
        console.log(res)
        setgetProducts(res.data.data);
      })
      .catch((res) => {
      });
  }

  async function getUserBooking() {
    await getUserBookingAPi()
      .then((res) => {
        console.log(res);
        setgetUserBookingId(res.data.data);
      })
      .catch((res) => {});
  }

async function applyNow(id) {
  try {
    const res = await applyApi(id);
    toast.success("Event Booked Successfully");

    setBookedCards(prev => [...prev, id]);
  } catch (error) {
    toast.error("Booking failed");
  }
}

  

  function formatDate(dateString) {
    const options = { weekday: 'long', day: 'numeric', month: 'short' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', options); 
  }

  useEffect(() => {
    getCard();
    getUserBooking();
          isLogged()
  }, []);

  useEffect(() => {
    const bookedCardIds = getUserBookingId.map(booking => booking.cardId);
    setBookedCards(bookedCardIds);
  }, [getUserBookingId]);


  return (
<section>
  <div className="container">
    <div className="row">
      {getProducts.map((card) => (
        <div key={card._id} className="col-xl-4 col-md-6"> 
        <Link to="/card-details">
          <article className="card mt-4">
            <img
              className="card__background w-100"
              src={card.imageUrl}
              alt="Card"
            />
            <div className="card__content | flow w-100">
              <div className="card__content--container | flow">
                <h2 className="card__title">{language === "en" ? card.title : card.titleAr}</h2>
                  <p className="card__description mb-0">
                    {language === "en"
                      ? (card.description.length > 70
                          ? card.description.slice(0, 100) + "..."
                          : card.description)
                      : (card.descriptionAr.length > 70
                          ? card.descriptionAr.slice(0, 100) + "..."
                          : card.descriptionAr)}
                    <Link className="mx-1" to="/card-details">
                    </Link>
                  </p>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-0">
                <p className="createdAt">{formatDate(card.date)}</p>
                <button
                  onClick={() => applyNow(card._id)}
                  className="add-btn"
                  disabled={bookedCards.includes(card._id)}
                >
                  {bookedCards.includes(card._id)
                  ? (language === "en" ? "Booked" : "تم الحجز")
                  : (language === "en" ? "Book now" : "احجز الآن")}
                </button>
              </div>
            </div>
          </article>
        </Link>
        </div>
      ))}
    </div>
  </div>
</section>
  )
}
