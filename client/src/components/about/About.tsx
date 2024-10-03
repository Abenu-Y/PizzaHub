import p1 from '../../assets/image/about/unsplash1.jpg';
import p2 from '../../assets/image/about/pizza-cafe.jpg';
import p3 from '../../assets/image/about/pizza-cafe.jpg';
import p4 from '../../assets/image/about/joinus.jpg';
import React from 'react';
import { Link } from 'react-router-dom';

const AboutUs: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      
      {/* Parallax Section */}
      <div
        className="flex items-center justify-center w-full bg-fixed bg-center bg-cover h-96"
        style={{
          backgroundImage: `url(${p3})`,
          backgroundPosition: 'bottom',
          backgroundSize: 'cover',
        }}
      >
        <h1 className="font-serif text-5xl font-bold text-center text-white">Welcome to PizzaHub!</h1>
      </div>

      {/* Mission Section */}
      <div className="w-full max-w-4xl px-6 py-12 text-center bg-white">
        <h2 className="text-3xl font-semibold text-[#FF9921] mb-4">Our Mission</h2>
        <p className="text-lg text-gray-600">
          We connect pizza lovers with their favorite restaurants, making ordering and managing pizza easier than ever.
        </p>
      </div>

      {/* Parallax Section 2 */}
      <div
        className="flex items-center justify-center w-full bg-fixed bg-center bg-cover h-96"
        style={{
          backgroundImage: `url(${p2})`,
        }}
      >
        <h2 className="text-3xl font-bold text-center text-white">What We Do</h2>
      </div>

      {/* What We Do Section */}
      <div className="w-full max-w-4xl px-6 py-12 text-center bg-white">
        <h2 className="text-3xl font-semibold text-[#FF9921] mb-4">What We Do</h2>
        <p className="text-lg text-gray-600">
          PizzaHub lets you easily choose your pizza toppings and helps restaurants manage their menus and orders.
        </p>
      </div>

      {/* Parallax Section 3 */}
      <div
        className="flex items-center justify-center w-full bg-fixed bg-center bg-cover h-96"
        style={{
          backgroundImage: `url(${p1})`,
        }}
      >
        <h2 className="text-3xl font-bold text-center text-white">Why Choose Us?</h2>
      </div>

      {/* Why Choose Us Section */}
      <div className="w-full max-w-4xl px-6 py-12 text-center bg-white">
        <h2 className="text-3xl font-semibold text-[#FF9921] mb-4">Why Choose Us?</h2>
        <p className="text-lg text-gray-600">
          With PizzaHub, you'll enjoy an easy, personalized pizza ordering experience using cutting-edge technology.
        </p>
      </div>

      {/* Final Parallax Section */}
      <div
        className="flex items-center justify-center w-full bg-fixed bg-center bg-cover h-96"
        style={{
          backgroundImage: `url(${p4})`,
        }}
      >
        <h2 className="text-3xl font-bold text-center text-[#FF9921]">Join Us!</h2>
      </div>
      
      {/* Call to Action */}
      <div className="w-full max-w-4xl px-6 py-12 text-center bg-white">
        <h2 className="text-3xl font-semibold text-[#FF9921] mb-4">Join Us!</h2>
        <p className="text-lg text-gray-600">
          Experience pizza like never before with PizzaHub. Let’s create unforgettable memories, one slice at a time.
        </p>
        <div className="mt-4">
          <Link to="/admin_register" className="max-w-2xl px-6 py-3 text-lg text-white bg-orange-400 rounded-lg hover:text-orange-600">
              Join Us as a Restaurant Partner!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
