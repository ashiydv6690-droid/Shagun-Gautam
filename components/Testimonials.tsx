
import React from 'react';

const testimonials = [
  {
    quote: "The quality of the digital art is simply breathtaking. A seamless experience from browsing to purchase.",
    author: "Alex Johnson",
  },
  {
    quote: "I discovered so many talented artists here. My collection has never looked better. Highly recommended!",
    author: "Samantha Reed",
  },
  {
    quote: "An amazing platform for both artists and collectors. The curation is top-notch and the community is fantastic.",
    author: "Marcus Chen",
  }
];

const Testimonials: React.FC = () => {
  return (
    <div className="py-12 sm:py-16 mb-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="w-full">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center lg:text-left">What Our Collectors Say</h2>
            <div className="mt-6 aspect-w-16 aspect-h-9 bg-gray-200 rounded-xl overflow-hidden shadow-lg">
              <video
                className="w-full h-full object-cover"
                src="/customer-section.mp4"
                poster="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80&auto=format&fit=crop"
                controls
              />
            </div>
          </div>
          <div className="space-y-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
                <p className="text-right font-semibold text-gray-900 mt-4">- {testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
