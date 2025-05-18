import React, { useContext, useEffect, useState } from 'react'
import { getBookingId, getUserBookingAPi } from '../../Network/card.api';
import { Link, useNavigate } from 'react-router-dom';
import { LanguageContext } from '../../Context/Language';
import { isLoggedIn } from '../../Network/auth.api';



export default function MyEvents() {
const {language, setLanguage} = useContext(LanguageContext)
const [bookedCardsDetails, setBookedCardsDetails] = useState([]);
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

async function getUserBooking() {
  try {
    const res = await getUserBookingAPi();
    const bookings = res.data.data;

    const uniqueCardIds = [...new Set(bookings.map(b => b.cardId))];
    console.log("Unique Card IDs:", uniqueCardIds);

    const detailsPromises = uniqueCardIds.map(async (id) => {
      try {
        const cardRes = await getBookingId(id);
        console.log("Card Details for", id, cardRes);
        return cardRes.data?.data; // ✅ هنا التعديل الصح
      } catch (err) {
        console.error("Error fetching card", id, err);
        return null;
      }
    });

    const cardsDetails = await Promise.all(detailsPromises);
    const filteredDetails = cardsDetails.filter(Boolean); // remove undefined/null
    setBookedCardsDetails(filteredDetails);

    console.log("Final Booked Cards Details:", filteredDetails);
  } catch (err) {
    console.error("Error fetching booked cards", err);
  }

  console.log("bookedCardsDetails",bookedCardsDetails)
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

useEffect(() => {
  getUserBooking();
  isLogged()
}, []);


  return (
<section>
  <div className="container">
    <div className="row">
      {bookedCardsDetails.map((card) => (
        <div key={card._id} className="col-xl-4 col-md-6">
          <Link to="/card-details">    
          <article className="card mt-4">
            <img
              className="card__background w-100"
              src={card.imageUrl || "https://i.imgur.com/QYWAcXk.jpeg"}
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
                <button className="add-btn" disabled>
                  {language === "en" ? "Booked" : "تم الحجز"}
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
