import React from 'react';

export default function About() {
    return (
        <div className="bg-gray-100 min-h-screen p-8">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-3xl font-bold mb-6 text-blue-600">About Us</h1>
                <p className="text-lg mb-4">
                    Welcome to our Travel and Tourism App! We aim to provide the best travel experiences by connecting you with top destinations, hotels, and activities.
                </p>

                <h2 className="text-2xl font-semibold mb-4 text-green-600">Our Mission</h2>
                <p className="text-lg mb-4">
                    Our mission is to make travel planning easy and accessible for everyone, offering a seamless booking experience and personalized recommendations.
                </p>

                <h2 className="text-2xl font-semibold mb-4 text-purple-600">Our Services</h2>
                <ul className="list-disc pl-5 mb-4">
                    <li className="mb-2">Destination Exploration</li>
                    <li className="mb-2">Hotel Booking</li>
                    <li className="mb-2">Activity Planning</li>
                    <li>Travel Guides</li>
                </ul>

                <h2 className="text-2xl font-semibold mb-4 text-red-600">Contact Us</h2>
                <p className="text-lg">
                    Have questions? Reach out to us at <a href="mailto:info@travelapp.com" className="text-blue-500 underline">info@travelapp.com</a>
                </p>
            </div>
        </div>
    );
}
