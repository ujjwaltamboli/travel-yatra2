import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function PackageForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const packageId = params.get("id"); // check if editing

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

  // ✅ Admin access check (unchanged)
  useEffect(() => {
    const checkAdminAccess = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${import.meta.env.VITE_URL}admin`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          credentials: "include",
        });

        const data = await res.json();

        if (data.success !== true) {
          alert("You do not have access to this page. Click ok to go to signup");
          navigate("/signup");
        }
      } catch (err) {
        console.error("Admin access check failed:", err);
        navigate("/about");
      }
    };

    checkAdminAccess();
  }, [navigate]);

  // ✅ Load existing package if editing
  useEffect(() => {
    const fetchPackage = async () => {
      if (packageId) {
        const res = await fetch(`${import.meta.env.VITE_URL}api/package?id=${packageId}`);
        const data = await res.json();
        setFormData(data); // prefill with package data
      }
    };
    fetchPackage();
  }, [packageId]);

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
    console.log(packageId);
    const method = packageId ? "PUT" : "POST";
    const url = packageId
      ? `${import.meta.env.VITE_URL}admin?id=${packageId}`
      : `${import.meta.env.VITE_URL}admin`;
    console.log(url);
    let res= await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    console.log(res.success);
    navigate ("/"); // redirect after save
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        {packageId ? "Edit Package" : "Add New Package"}
      </h1>

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
          {packageId ? "Update Package" : "Submit"}
        </button>
      </form>
    </div>
  );
}
