import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Waves, Clock, MapPin, Calendar, Thermometer, Users, Star, ChevronLeft, Info, Camera } from 'lucide-react';

const SecretLagoon = () => {
  const [activeImage, setActiveImage] = useState(0);

  const images = [
    {
      url: "https://images.unsplash.com/photo-1520688517639-beab5cb87d1f?w=1200&h=800&fit=crop",
      caption: "Natural hot springs surrounded by geothermal activity"
    },
    {
      url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop",
      caption: "Steam rising from the warm waters year-round"
    },
    {
      url: "https://images.unsplash.com/photo-1473186578172-c141e6798cf4?w=1200&h=800&fit=crop",
      caption: "Northern Lights viewing from the lagoon"
    }
  ];

  const features = [
    {
      icon: <Thermometer className="w-6 h-6" />,
      title: "38-40°C",
      description: "Perfect bathing temperature"
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Open Year-Round",
      description: "365 days of relaxation"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Golden Circle",
      description: "Part of Iceland's famous route"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Authentic Experience",
      description: "Less crowded than Blue Lagoon"
    }
  ];

  const tips = [
    "Bring your own towel or rent one on-site",
    "Best visited during sunset or for Northern Lights",
    "Combine with Golden Circle tour for a full day",
    "Book in advance during peak season",
    "Don't forget your camera for the steam effects"
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-gray-900/90 backdrop-blur-md z-50 border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => window.location.hash = ''}
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
                Back to Iceland
              </button>
              <span className="text-gray-500">|</span>
              <h1 className="text-xl font-bold">Secret Lagoon</h1>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20">
        <div className="relative h-[70vh] overflow-hidden">
          <img
            src={images[activeImage].url}
            alt="Secret Lagoon"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              Secret Lagoon
            </h2>
            <p className="text-xl text-gray-300 mb-6 max-w-2xl">
              Gamla Laugin - Iceland's oldest natural geothermal pool
            </p>
            <div className="flex items-center gap-2 text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
              <span className="text-white ml-2">4.8/5 (2,341 reviews)</span>
            </div>
          </div>
        </div>

        {/* Image Gallery Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveImage(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === activeImage ? 'bg-white w-8' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Quick Info */}
      <section className="py-12 px-6 bg-gray-800/30">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-6 text-center">
                  <div className="text-cyan-400 mb-3 flex justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{feature.title}</h3>
                  <p className="text-sm text-gray-400">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-6">
        <div className="container mx-auto grid lg:grid-cols-2 gap-12">
          {/* About Section */}
          <div>
            <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Waves className="w-8 h-8 text-cyan-400" />
              About Secret Lagoon
            </h3>
            <div className="space-y-4 text-gray-300">
              <p>
                Dating back to 1891, Secret Lagoon (Gamla Laugin) is Iceland's oldest swimming pool, 
                offering an authentic and natural hot spring experience. Located in the small village 
                of Flúðir, this hidden gem provides a more intimate alternative to the famous Blue Lagoon.
              </p>
              <p>
                The pool maintains a comfortable temperature of 38-40°C (100-104°F) year-round, 
                thanks to the natural hot springs that feed it. Surrounded by steaming geothermal 
                areas and even a small geyser that erupts every few minutes, the Secret Lagoon 
                offers a truly magical Icelandic experience.
              </p>
              <p>
                Unlike more commercialized thermal baths, Secret Lagoon retains its rustic charm 
                with natural surroundings and a peaceful atmosphere. The pool's mineral-rich waters 
                are said to have healing properties, making it a perfect spot to relax after a day 
                of exploring Iceland's dramatic landscapes.
              </p>
            </div>

            {/* Tips Section */}
            <div className="mt-8">
              <h4 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                <Info className="w-6 h-6 text-cyan-400" />
                Visitor Tips
              </h4>
              <ul className="space-y-2">
                {tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-300">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Practical Information */}
          <div>
            <Card className="bg-gray-800/50 border-gray-700 mb-6">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3">
                  <Clock className="w-6 h-6 text-cyan-400" />
                  Practical Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h5 className="font-semibold mb-2">Opening Hours</h5>
                  <p className="text-gray-400">
                    Summer (May-Sept): 10:00 - 22:00<br />
                    Winter (Oct-April): 11:00 - 21:00
                  </p>
                </div>
                <div>
                  <h5 className="font-semibold mb-2">Admission</h5>
                  <p className="text-gray-400">
                    Adults: ISK 3,000 (≈ $22)<br />
                    Seniors (67+): ISK 2,100<br />
                    Teenagers (14-17): ISK 1,600<br />
                    Children (under 14): Free
                  </p>
                </div>
                <div>
                  <h5 className="font-semibold mb-2">Location</h5>
                  <p className="text-gray-400">
                    Hveramörk, 845 Flúðir<br />
                    100 km from Reykjavík (1.5 hour drive)<br />
                    GPS: 64.1376° N, 20.3088° W
                  </p>
                </div>
                <div>
                  <h5 className="font-semibold mb-2">Facilities</h5>
                  <ul className="text-gray-400 space-y-1">
                    <li>• Changing rooms with showers</li>
                    <li>• Lockers (bring your own lock)</li>
                    <li>• Towel rental available</li>
                    <li>• Small café on-site</li>
                    <li>• Free parking</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Photo Tips */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-3">
                  <Camera className="w-5 h-5 text-cyan-400" />
                  Photography Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 mb-3">
                  Secret Lagoon is incredibly photogenic, especially with the steam creating 
                  mystical effects. Best times for photos:
                </p>
                <ul className="space-y-2 text-gray-400">
                  <li>• Golden hour for warm lighting</li>
                  <li>• Blue hour for dramatic atmosphere</li>
                  <li>• Winter nights for Northern Lights</li>
                  <li>• Early morning for fewer crowds</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-cyan-900/20 to-blue-900/20">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4">
            Ready to Experience the Secret Lagoon?
          </h3>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Immerse yourself in Iceland's oldest natural pool and create unforgettable memories
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-cyan-500 hover:bg-cyan-600 text-gray-900 font-bold px-8 py-3 rounded-full"
            >
              Book Your Visit
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 font-bold px-8 py-3 rounded-full"
            >
              View on Map
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-800">
        <div className="container mx-auto text-center text-gray-400">
          <p>&copy; 2024 Discover Iceland - Secret Lagoon. Experience the magic of natural hot springs.</p>
        </div>
      </footer>
    </div>
  );
};

export default SecretLagoon;