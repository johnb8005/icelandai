import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mountain, Waves, Sparkles, MapPin, Calendar, Users, ChevronDown, Star, Wind, Flame } from 'lucide-react';

const Iceland = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      const sections = ['hero', 'attractions', 'experiences', 'culture', 'visit'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const attractions = [
    {
      title: "Northern Lights",
      description: "Dance with the Aurora Borealis in the world's best viewing locations",
      icon: <Sparkles className="w-8 h-8" />,
      image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&h=600&fit=crop"
    },
    {
      title: "Blue Lagoon",
      description: "Relax in geothermal waters surrounded by volcanic landscapes",
      icon: <Waves className="w-8 h-8" />,
      image: "https://images.unsplash.com/photo-1515069763337-21faecd3e522?w=800&h=600&fit=crop"
    },
    {
      title: "Secret Lagoon",
      description: "Iceland's oldest natural hot spring - a hidden gem since 1891",
      icon: <Waves className="w-8 h-8" />,
      image: "https://images.unsplash.com/photo-1520688517639-beab5cb87d1f?w=800&h=600&fit=crop",
      link: "#secret-lagoon"
    },
    {
      title: "Glaciers & Ice Caves",
      description: "Explore ancient glaciers and crystal-blue ice caves",
      icon: <Mountain className="w-8 h-8" />,
      image: "https://images.unsplash.com/photo-1520769669658-f07657f5a307?w=800&h=600&fit=crop"
    },
    {
      title: "Volcanic Wonders",
      description: "Witness active volcanoes and dramatic lava fields",
      icon: <Flame className="w-8 h-8" />,
      image: "https://images.unsplash.com/photo-1523963954-13885e4c6cc4?w=800&h=600&fit=crop"
    },
    {
      title: "Majestic Waterfalls",
      description: "Stand before powerful cascades like Gullfoss and Skógafoss",
      icon: <Wind className="w-8 h-8" />,
      image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&h=600&fit=crop"
    },
    {
      title: "Black Sand Beaches",
      description: "Walk on otherworldly shores where the Atlantic meets volcanic sand",
      icon: <MapPin className="w-8 h-8" />,
      image: "https://images.unsplash.com/photo-1509057095372-215f8cc53d1a?w=800&h=600&fit=crop"
    }
  ];

  const experiences = [
    { title: "Whale Watching", season: "Apr-Oct", rating: 4.9 },
    { title: "Glacier Hiking", season: "Year-round", rating: 4.8 },
    { title: "Hot Spring Tours", season: "Year-round", rating: 4.9 },
    { title: "Puffin Watching", season: "May-Aug", rating: 4.7 },
    { title: "Snowmobiling", season: "Nov-Apr", rating: 4.8 },
    { title: "Midnight Sun", season: "Jun-Jul", rating: 5.0 }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-gray-900/90 backdrop-blur-md z-50 border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Discover Iceland
            </h1>
            <div className="hidden md:flex space-x-8">
              {['Attractions', 'Experiences', 'Culture', 'Visit'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`transition-colors hover:text-cyan-400 ${
                    activeSection === item.toLowerCase() ? 'text-cyan-400' : 'text-gray-300'
                  }`}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <div
          className="absolute inset-0 z-0"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900" />
          <img
            src="https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=1920&h=1080&fit=crop"
            alt="Iceland Landscape"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Land of Fire and Ice
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 animate-fade-in-delay">
            Where glaciers meet volcanoes, and nature paints with northern lights
          </p>
          <Button
            size="lg"
            className="bg-cyan-500 hover:bg-cyan-600 text-gray-900 font-bold px-8 py-3 rounded-full transform transition-all hover:scale-105"
          >
            Start Your Journey
          </Button>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-cyan-400" />
        </div>
      </section>

      {/* Attractions Section */}
      <section id="attractions" className="py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Natural Wonders Await
          </h2>
          <p className="text-xl text-gray-400 text-center mb-16 max-w-3xl mx-auto">
            From ethereal northern lights to powerful geysers, Iceland offers experiences found nowhere else on Earth
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {attractions.map((attraction, index) => (
              <Card
                key={index}
                className="bg-gray-800/50 border-gray-700 overflow-hidden group hover:scale-105 transition-all duration-300 cursor-pointer"
                onClick={() => attraction.link && (window.location.hash = attraction.link)}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={attraction.image}
                    alt={attraction.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-cyan-400">
                    {attraction.icon}
                  </div>
                  {attraction.link && (
                    <div className="absolute top-4 right-4 bg-cyan-500 text-gray-900 px-2 py-1 rounded-full text-xs font-bold">
                      EXPLORE
                    </div>
                  )}
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl">{attraction.title}</CardTitle>
                  <CardDescription className="text-gray-400">
                    {attraction.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Experiences Section */}
      <section id="experiences" className="py-20 px-6 bg-gray-800/30">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Unforgettable Adventures
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {experiences.map((exp, index) => (
              <Card
                key={index}
                className="bg-gray-800/50 border-gray-700 hover:border-cyan-500/50 transition-all"
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold">{exp.title}</h3>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                      <span className="text-sm text-yellow-500">{exp.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{exp.season}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section id="culture" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Viking Heritage Meets Modern Innovation
              </h2>
              <p className="text-lg text-gray-300 mb-6">
                Iceland seamlessly blends ancient sagas with cutting-edge sustainability. 
                Experience a culture that cherishes storytelling, values community, and 
                leads the world in renewable energy.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Users className="w-6 h-6 text-cyan-400" />
                  <span>Population: 375,000 friendly locals</span>
                </div>
                <div className="flex items-center gap-4">
                  <MapPin className="w-6 h-6 text-cyan-400" />
                  <span>Capital: Reykjavík - World's northernmost capital</span>
                </div>
                <div className="flex items-center gap-4">
                  <Sparkles className="w-6 h-6 text-cyan-400" />
                  <span>100% renewable electricity</span>
                </div>
              </div>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1520769669713-3ff3ae2291b9?w=800&h=600&fit=crop"
                alt="Reykjavik"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Visit Section */}
      <section id="visit" className="py-20 px-6 bg-gradient-to-r from-cyan-900/20 to-blue-900/20">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Begin Your Icelandic Saga
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Whether you seek adventure, tranquility, or wonder, Iceland delivers experiences 
            that will stay with you forever. Start planning your journey to the land of fire and ice.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-cyan-500 hover:bg-cyan-600 text-gray-900 font-bold px-8 py-3 rounded-full"
            >
              Plan Your Trip
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 font-bold px-8 py-3 rounded-full"
            >
              Download Travel Guide
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-800">
        <div className="container mx-auto text-center text-gray-400">
          <p>&copy; 2024 Discover Iceland. Powered by the midnight sun.</p>
        </div>
      </footer>
    </div>
  );
};

export default Iceland;