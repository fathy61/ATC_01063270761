import React, { useState } from "react";
import { uploadImageApi, addCardapi } from "../../Network/admin.api";
import toast from "react-hot-toast";

export default function AddProduct() {
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [titleAr, setTitleAr] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionAr, setDescriptionAr] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [venue, setVenue] = useState("");

  async function uploadImage(e) {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const response = await uploadImageApi(file);
      if (response.status === 200) {
        setImagePath(response.data.image);
        setUploadSuccess(true);
        toast.success("Image uploaded successfully!");
      }
    } catch (error) {
      setUploadSuccess(false);
      toast.error("Image upload failed");
    }
  }

  async function addProduct() {
    if (!imagePath) {
      toast.error("Please upload an image first.");
      return;
    }

    setIsLoading(true);

    const dataToSend = {
      title,
      titleAr,
      description,
      descriptionAr,
      image: imagePath,
      date,
      category,
      price: Number(price),
      venue,
    };

    try {
      console.log(dataToSend)
      const response = await addCardapi("product", dataToSend);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error occurred");
      console.log(error)
    }

    setIsLoading(false);
  }

  return (
    <section className="login-email">
      <div className="bg-register d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <section className="register mt-5 w-100" style={{ maxWidth: "500px" }}>
          <form onSubmit={(e) => { e.preventDefault(); addProduct(); }}>
            <div className="register-container p-4 shadow rounded bg-white">

              <div className="mb-3 d-flex align-items-center position-relative">
                <input
                  name="image"
                  type="file"
                  accept="image/*"
                  id="image"
                  className="form-control form-control-sm"
                  onChange={uploadImage}
                />
                {uploadSuccess && (
                  <i className="fa-solid fa-circle-check text-success ms-2 fs-5"></i>
                )}
              </div>

              <div className="form-floating mb-3">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Event Name"
                  className="form-control form-control-sm"
                  required
                />
                <label htmlFor="title">Event Name</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="text"
                  value={titleAr}
                  onChange={(e) => setTitleAr(e.target.value)}
                  placeholder="اسم المنتج بالعربية"
                  className="form-control form-control-sm"
                  required
                />
                <label htmlFor="titleAr">العنوان بالعربية</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description"
                  className="form-control form-control-sm"
                  required
                />
                <label htmlFor="description">Description</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="text"
                  value={descriptionAr}
                  onChange={(e) => setDescriptionAr(e.target.value)}
                  placeholder="الوصف بالعربية"
                  className="form-control form-control-sm"
                  required
                />
                <label htmlFor="descriptionAr">الوصف بالعربية</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="form-control form-control-sm"
                  required
                />
                <label htmlFor="date">Date</label>
              </div>

                <div className="form-floating mb-3">
                <select
                    className="form-select form-select-sm"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                >
                    <option value="">Select Category</option>
                    <option value="Ai">AI</option>
                    <option value="Front End">Front End</option>
                    <option value="Back End">Back End</option>
                    <option value="Flutter">Flutter</option>
                    <option value="Others">Others</option>
                </select>
                <label htmlFor="category">Category</label>
                </div>

              <div className="form-floating mb-3">
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Price"
                  className="form-control form-control-sm"
                  required
                />
                <label htmlFor="price">Price</label>
              </div>

              <div className="form-floating mb-4">
                <input
                  type="text"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  placeholder="Venue"
                  className="form-control form-control-sm"
                  required
                />
                <label htmlFor="venue">Venue</label>
              </div>

              <button
                type="submit"
                className="btn btn-warning text-white w-100"
              >
                {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Add Event"}
              </button>

            </div>
          </form>
        </section>
      </div>
    </section>
  );
}
