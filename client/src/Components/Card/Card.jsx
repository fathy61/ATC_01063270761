import React, { useContext, useEffect, useState } from 'react';
import { applyApi, getCardApi, getUserBookingAPi } from '../../Network/card.api';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { LanguageContext } from '../../Context/Language';

export default function Card() {
  const [getProducts, setgetProducts] = useState([]);
  const [getUserBookingId, setgetUserBookingId] = useState([]);
  const [bookedCards, setBookedCards] = useState([]);
  const {language, setLanguage} = useContext(LanguageContext)

  async function getCard() {
    await getCardApi("product")
      .then((res) => {
        console.log(res);
        setgetProducts(res.data.data);
      })
      .catch((res) => {});
  }

  async function getUserBooking() {
    await getUserBookingAPi()
      .then((res) => {
        console.log(res);
        setgetUserBookingId(res.data.data);
      })
      .catch((res) => {});
  }

  useEffect(() => {
    getCard();
    getUserBooking();
  }, []);

  useEffect(() => {
    const bookedCardIds = getUserBookingId.map(booking => booking.cardId);
    setBookedCards(bookedCardIds);
  }, [getUserBookingId]);

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

  return (
<section>
  <div className="container">
    <div className="row">
      {getProducts.map((card) => (
        <div key={card._id} className="col-xl-4 col-md-6"> 
          <article className="card mt-4">
          <Link className='w-100' to={`/card-details/${card._id}`}>
            <img
              className="card__background w-100"
              src={card.imageUrl}
              alt="Card"
            />
          </Link>
            <div className="card__content | flow w-100">
              <div className="card__content--container | flow">
                  <h2 className="card__title">{language === "en" ? card.title : card.titleAr}</h2>
                  <Link className='w-100 text-decoration-none' to={`/card-details/${card._id}`}>
                  <p className="card__description mb-0 pt-2">
                    {language === "en"
                      ? (card.description.length > 70
                          ? card.description.slice(0, 100) + "..."
                          : card.description)
                      : (card.descriptionAr.length > 70
                          ? card.descriptionAr.slice(0, 100) + "..."
                          : card.descriptionAr)}
                  </p>
                  </Link>
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
        </div>
      ))}
    </div>
  </div>
</section>

  );
}
