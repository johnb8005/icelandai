import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Waves, Clock, MapPin, Calendar, Thermometer, Users, Star, ChevronLeft, Info, Camera, ArrowRight, Heart, Share2, Navigation, Phone, Mail } from 'lucide-react';

const SecretLagoon = () => {
  const [activeImage, setActiveImage] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const observerRef = useRef<IntersectionObserver | null>(null);

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

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    // Auto-rotate images
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % images.length);
    }, 5000);

    // Intersection Observer for reveal animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.reveal').forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
      observerRef.current?.disconnect();
    };
  }, []);

  const features = [
    {
      icon: <Thermometer className="w-6 h-6" />,
      title: "38-40°C",
      description: "Perfect bathing temperature",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Open Year-Round",
      description: "365 days of relaxation",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Golden Circle",
      description: "Part of Iceland's famous route",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Authentic Experience",
      description: "Less crowded than Blue Lagoon",
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  const tips = [
    { text: "Bring your own towel or rent one on-site", icon: "🏖️" },
    { text: "Best visited during sunset or for Northern Lights", icon: "🌅" },
    { text: "Combine with Golden Circle tour for a full day", icon: "🗺️" },
    { text: "Book in advance during peak season", icon: "📅" },
    { text: "Don't forget your camera for the steam effects", icon: "📸" }
  ];

  const highlights = [
    { title: "Historic Pool", description: "Operating since 1891", stat: "134 years" },
    { title: "Natural Temperature", description: "Geothermally heated", stat: "38-40°C" },
    { title: "Geyser Show", description: "Erupts every 5 minutes", stat: "Every 5min" },
    { title: "Visitor Rating", description: "Based on 2,341 reviews", stat: "4.8/5" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white overflow-hidden">
      {/* Animated Background Gradient Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-teal-500/20 to-cyan-500/20 blur-3xl animate-float" />
        <div className="absolute bottom-0 left-1/3 w-[700px] h-[700px] rounded-full bg-gradient-to-r from-orange-500/20 to-pink-500/20 blur-3xl" />
      </div>

      {/* Glass Morphism Navigation */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl">
        <div className="glass rounded-2xl px-8 py-4 shadow-2xl">
          <div className="flex justify-between items-center">
            <button
              onClick={() => window.location.hash = ''}
              className="flex items-center gap-3 text-gray-300 hover:text-white transition-all group"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to Iceland</span>
            </button>
            <h1 className="text-xl font-bold gradient-text">Secret Lagoon</h1>
          </div>
        </div>
      </nav>

      {/* Hero Section with Image Carousel */}
      <section className="relative pt-24">
        <div className="relative h-[80vh] overflow-hidden">
          {/* Image Carousel */}
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === activeImage ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={image.url}
                alt={image.caption}
                className="w-full h-full object-cover"
                style={{
                  transform: `scale(${1 + scrollY * 0.0002})`,
                }}
              />
            </div>
          ))}

          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-cyan-500/20" />

          {/* Hero Content */}
          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto px-6 pb-16 max-w-7xl">
              <div className="max-w-3xl">
                <div className="inline-block mb-6 px-6 py-2 glass rounded-full text-sm font-medium">
                  ♨️ Gamla Laugin - Since 1891
                </div>

                <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
                  <span className="gradient-text">Secret Lagoon</span>
                </h1>

                <p className="text-2xl text-gray-300 mb-8 leading-relaxed">
                  Iceland's oldest natural geothermal pool - a timeless sanctuary of warmth and wonder
                </p>

                <div className="flex flex-wrap items-center gap-6 mb-8">
                  <div className="flex items-center gap-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 fill-yellow-500 text-yellow-500" />
                    ))}
                    <span className="text-lg font-semibold ml-2">4.8/5</span>
                  </div>
                  <span className="text-gray-400">|</span>
                  <span className="text-gray-300">2,341 reviews</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="group bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-bold px-10 py-7 rounded-2xl text-lg shadow-glow-cyan transform transition-all hover:scale-105"
                  >
                    Book Your Visit
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>

                  <Button
                    size="lg"
                    variant="outline"
                    className="glass border-2 border-white/20 hover:border-white/40 text-white font-bold px-10 py-7 rounded-2xl text-lg backdrop-blur-xl"
                  >
                    <Navigation className="mr-2 w-5 h-5" />
                    Get Directions
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Image Gallery Navigation */}
          <div className="absolute bottom-8 right-8 flex gap-3">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(index)}
                className={`group relative overflow-hidden rounded-xl transition-all ${
                  index === activeImage ? 'w-24 h-24' : 'w-16 h-16 opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img.url} alt={img.caption} className="w-full h-full object-cover" />
                <div className={`absolute inset-0 border-2 transition-all ${
                  index === activeImage ? 'border-cyan-400' : 'border-transparent'
                }`} />
              </button>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="absolute top-8 right-8 flex gap-3">
            <button className="p-4 glass rounded-2xl hover:bg-white/20 transition-all group">
              <Heart className="w-6 h-6 group-hover:fill-red-500 group-hover:text-red-500 transition-all" />
            </button>
            <button className="p-4 glass rounded-2xl hover:bg-white/20 transition-all">
              <Share2 className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* Quick Features Grid */}
      <section className="relative py-16 px-6 -mt-20">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-4 gap-6 reveal">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group bg-gray-900/50 border-gray-800 hover:border-gray-700 overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8 text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <div className="text-white">{feature.icon}</div>
                  </div>
                  <h3 className="font-bold text-xl mb-2 group-hover:text-cyan-400 transition-colors">{feature.title}</h3>
                  <p className="text-sm text-gray-400">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="relative py-16 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-4 gap-6">
            {highlights.map((item, index) => (
              <div
                key={index}
                className="reveal glass rounded-2xl p-8 text-center hover:bg-white/10 transition-all cursor-pointer group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl font-black gradient-text mb-2 group-hover:scale-110 transition-transform">
                  {item.stat}
                </div>
                <div className="text-lg font-semibold mb-1">{item.title}</div>
                <div className="text-sm text-gray-400">{item.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="relative py-20 px-6">
        <div className="container mx-auto max-w-7xl grid lg:grid-cols-2 gap-16">
          {/* About Section */}
          <div className="reveal">
            <div className="inline-block px-6 py-2 glass rounded-full text-sm font-medium mb-6">
              ♨️ About the Lagoon
            </div>

            <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
              A <span className="gradient-text">Natural Wonder</span>
              <br />
              <span className="text-white">Since 1891</span>
            </h2>

            <div className="space-y-6 text-lg text-gray-300 leading-relaxed mb-10">
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
            <div className="glass rounded-3xl p-8 mb-8">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Info className="w-7 h-7 text-cyan-400" />
                Visitor Tips
              </h3>
              <div className="space-y-4">
                {tips.map((tip, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white/5 transition-all group cursor-pointer"
                  >
                    <span className="text-2xl group-hover:scale-110 transition-transform">{tip.icon}</span>
                    <span className="text-gray-300 group-hover:text-white transition-colors">{tip.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <Button
              size="lg"
              className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-bold px-8 py-6 rounded-2xl shadow-glow-cyan group"
            >
              View Full Guide
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Practical Information */}
          <div className="space-y-6">
            {/* Opening Hours & Pricing */}
            <Card className="reveal bg-gray-900/50 border-gray-800 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-teal-600/20 to-cyan-600/20 border-b border-gray-800">
                <CardTitle className="text-2xl flex items-center gap-3">
                  <Clock className="w-7 h-7 text-cyan-400" />
                  Practical Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-8">
                <div className="p-6 glass rounded-2xl">
                  <h4 className="font-bold text-lg mb-4 text-cyan-400">Opening Hours</h4>
                  <div className="space-y-2 text-gray-300">
                    <div className="flex justify-between items-center p-3 rounded-xl hover:bg-white/5 transition-all">
                      <span>Summer (May-Sept)</span>
                      <span className="font-semibold">10:00 - 22:00</span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-xl hover:bg-white/5 transition-all">
                      <span>Winter (Oct-April)</span>
                      <span className="font-semibold">11:00 - 21:00</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 glass rounded-2xl">
                  <h4 className="font-bold text-lg mb-4 text-cyan-400">Admission</h4>
                  <div className="space-y-2 text-gray-300">
                    {[
                      { label: "Adults", price: "ISK 3,000", usd: "≈ $22" },
                      { label: "Seniors (67+)", price: "ISK 2,100", usd: "" },
                      { label: "Teenagers (14-17)", price: "ISK 1,600", usd: "" },
                      { label: "Children (under 14)", price: "Free", usd: "" }
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between items-center p-3 rounded-xl hover:bg-white/5 transition-all">
                        <span>{item.label}</span>
                        <span className="font-semibold">
                          {item.price} {item.usd && <span className="text-gray-500 text-sm">{item.usd}</span>}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 glass rounded-2xl">
                  <h4 className="font-bold text-lg mb-4 text-cyan-400">Location</h4>
                  <div className="space-y-3 text-gray-300">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                      <div>
                        <div className="font-semibold">Hveramörk, 845 Flúðir</div>
                        <div className="text-sm text-gray-400">100 km from Reykjavík (1.5 hour drive)</div>
                        <div className="text-sm text-gray-500 mt-1">GPS: 64.1376° N, 20.3088° W</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 glass rounded-2xl">
                  <h4 className="font-bold text-lg mb-4 text-cyan-400">Facilities</h4>
                  <ul className="space-y-3 text-gray-300">
                    {[
                      "Changing rooms with showers",
                      "Lockers (bring your own lock)",
                      "Towel rental available",
                      "Small café on-site",
                      "Free parking"
                    ].map((facility, i) => (
                      <li key={i} className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-all">
                        <span className="w-2 h-2 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500" />
                        {facility}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Photography Tips */}
            <Card className="reveal bg-gray-900/50 border-gray-800 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-b border-gray-800">
                <CardTitle className="text-xl flex items-center gap-3">
                  <Camera className="w-6 h-6 text-purple-400" />
                  Photography Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-gray-300 mb-4 leading-relaxed">
                  Secret Lagoon is incredibly photogenic, especially with the steam creating
                  mystical effects. Best times for photos:
                </p>
                <ul className="space-y-3">
                  {[
                    { time: "Golden hour", desc: "for warm lighting", icon: "🌅" },
                    { time: "Blue hour", desc: "for dramatic atmosphere", icon: "🌆" },
                    { time: "Winter nights", desc: "for Northern Lights", icon: "✨" },
                    { time: "Early morning", desc: "for fewer crowds", icon: "🌄" }
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-all group">
                      <span className="text-xl group-hover:scale-110 transition-transform">{item.icon}</span>
                      <div>
                        <span className="font-semibold text-white">{item.time}</span>
                        <span className="text-gray-400"> {item.desc}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-6">
        <div className="container mx-auto max-w-5xl reveal">
          <div className="relative glass rounded-[3rem] p-12 md:p-20 text-center overflow-hidden shadow-2xl">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-teal-600/20 via-cyan-600/20 to-blue-600/20 animate-gradient" />

            <div className="relative z-10">
              <h2 className="text-5xl md:text-7xl font-black mb-8">
                Ready to <span className="gradient-text">Experience</span>
                <br />
                <span className="text-white">the Secret Lagoon?</span>
              </h2>

              <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
                Immerse yourself in Iceland's oldest natural pool and create unforgettable memories
                in this geothermal sanctuary
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Button
                  size="lg"
                  className="group bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-bold px-10 py-7 rounded-2xl text-lg shadow-glow-cyan transform transition-all hover:scale-105"
                >
                  Book Your Visit
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="glass border-2 border-white/20 hover:border-white/40 text-white font-bold px-10 py-7 rounded-2xl text-lg backdrop-blur-xl"
                >
                  View on Map
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-6 border-t border-white/10">
        <div className="container mx-auto text-center">
          <div className="mb-6">
            <h3 className="text-2xl font-bold gradient-text mb-2">Secret Lagoon</h3>
            <p className="text-gray-500">Experience the magic of natural hot springs ✨</p>
          </div>
          <p className="text-gray-600 text-sm">&copy; 2025 Discover Iceland. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default SecretLagoon;
