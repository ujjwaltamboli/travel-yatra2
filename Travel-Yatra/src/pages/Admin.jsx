import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PackageForm() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminAccess = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log(token);
        const res = await fetch(`${import.meta.env.VITE_URL}admin`, {
          method: "GET", // or POST, PUT, etc.
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          credentials: "include", // use this if you're using cookies
        });

        const data = await res.json();

        if (data.success !== true) {
          alert("You donot have access to this page. Click ok to go to signup");
          navigate("/signup");
        }
      } catch (err) {
        console.error("Admin access check failed:", err);
        navigate("/about");
      }
    };

    checkAdminAccess();
  }, [navigate]);
  console.log("Hello World");
  const [formData, setFormData] = useState({
    packageName: "",
    packageDescription: "",
    packageDestination: "",
    packageDays: 0,
    packageNights: 0,
    packageAccommodation: "",
    packageTransportation: "",
    packageMeals: "",
    packageActivities: "",
    packagePrice: 0,
    packageDiscountPrice: 0,
    packageOffer: false,
    packageRating: 0,
    packageTotalRatings: 0,
    packageImages: ["", "", ""],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith("packageImages")) {
      const index = Number(name.split("-")[1]);
      const updatedImages = [...formData.packageImages];
      updatedImages[index] = value;
      setFormData({ ...formData, packageImages: updatedImages });
    } else if (type === "number") {
      setFormData({
        ...formData,
        [name]: value === "" ? 0 : Number(value),
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);

    await fetch(`${import.meta.env.VITE_URL}admin`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(formData),
    });
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Package</h1>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input
          type="text"
          name="packageName"
          placeholder="Package Name"
          value={formData.packageName}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <textarea
          name="packageDescription"
          placeholder="Package Description"
          value={formData.packageDescription}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="packageDestination"
          placeholder="Destination"
          value={formData.packageDestination}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="packageDays"
          placeholder="Days"
          value={formData.packageDays}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="packageNights"
          placeholder="Nights"
          value={formData.packageNights}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="packageAccommodation"
          placeholder="Accommodation"
          value={formData.packageAccommodation}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="packageTransportation"
          placeholder="Transportation"
          value={formData.packageTransportation}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="packageMeals"
          placeholder="Meals"
          value={formData.packageMeals}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="packageActivities"
          placeholder="Activities"
          value={formData.packageActivities}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="packagePrice"
          placeholder="Price"
          value={formData.packagePrice}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="packageDiscountPrice"
          placeholder="Discount Price"
          value={formData.packageDiscountPrice}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="packageOffer"
            checked={formData.packageOffer}
            onChange={handleChange}
          />
          <label>Offer</label>
        </div>
        <input
          type="number"
          name="packageRating"
          placeholder="Rating"
          value={formData.packageRating}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="packageTotalRatings"
          placeholder="Total Ratings"
          value={formData.packageTotalRatings}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        {/* Image URL Inputs */}
        <h3 className="font-semibold">Image URLs (Max 3)</h3>
        {formData.packageImages.map((url, index) => (
          <input
            key={index}
            type="text"
            name={`packageImages-${index}`}
            placeholder={`Image URL ${index + 1}`}
            value={url}
            onChange={handleChange}
            className="border p-2 rounded"
          />
        ))}

        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Submit
        </button>
      </form>
    </div>
  );
}
