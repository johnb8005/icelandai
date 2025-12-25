import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mountain, Waves, Sparkles, MapPin, Calendar, Users, Star, Wind, Flame, ArrowRight, Play, Heart, Share2 } from 'lucide-react';

const Iceland = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const observerRef = useRef<IntersectionObserver | null>(null);

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

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

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
      window.removeEventListener('mousemove', handleMouseMove);
      observerRef.current?.disconnect();
    };
  }, []);

  const attractions = [
    {
      title: "Northern Lights",
      description: "Dance with the Aurora Borealis in the world's best viewing locations",
      icon: <Sparkles className="w-8 h-8" />,
      image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&h=600&fit=crop",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Blue Lagoon",
      description: "Relax in geothermal waters surrounded by volcanic landscapes",
      icon: <Waves className="w-8 h-8" />,
      image: "https://images.unsplash.com/photo-1515069763337-21faecd3e522?w=800&h=600&fit=crop",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Secret Lagoon",
      description: "Iceland's oldest natural hot spring - a hidden gem since 1891",
      icon: <Waves className="w-8 h-8" />,
      image: "https://images.unsplash.com/photo-1520688517639-beab5cb87d1f?w=800&h=600&fit=crop",
      link: "#secret-lagoon",
      color: "from-teal-500 to-emerald-500",
      featured: true
    },
    {
      title: "Glaciers & Ice Caves",
      description: "Explore ancient glaciers and crystal-blue ice caves",
      icon: <Mountain className="w-8 h-8" />,
      image: "https://images.unsplash.com/photo-1520769669658-f07657f5a307?w=800&h=600&fit=crop",
      color: "from-blue-400 to-indigo-500"
    },
    {
      title: "Volcanic Wonders",
      description: "Witness active volcanoes and dramatic lava fields",
      icon: <Flame className="w-8 h-8" />,
      image: "https://images.unsplash.com/photo-1523963954-13885e4c6cc4?w=800&h=600&fit=crop",
      color: "from-orange-500 to-red-500"
    },
    {
      title: "Majestic Waterfalls",
      description: "Stand before powerful cascades like Gullfoss and Skógafoss",
      icon: <Wind className="w-8 h-8" />,
      image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&h=600&fit=crop",
      color: "from-cyan-400 to-blue-500"
    },
    {
      title: "Black Sand Beaches",
      description: "Walk on otherworldly shores where the Atlantic meets volcanic sand",
      icon: <MapPin className="w-8 h-8" />,
      image: "https://images.unsplash.com/photo-1509057095372-215f8cc53d1a?w=800&h=600&fit=crop",
      color: "from-gray-500 to-slate-600"
    }
  ];

  const experiences = [
    { title: "Whale Watching", season: "Apr-Oct", rating: 4.9, gradient: "from-blue-500 to-purple-500" },
    { title: "Glacier Hiking", season: "Year-round", rating: 4.8, gradient: "from-cyan-500 to-blue-500" },
    { title: "Hot Spring Tours", season: "Year-round", rating: 4.9, gradient: "from-orange-500 to-pink-500" },
    { title: "Puffin Watching", season: "May-Aug", rating: 4.7, gradient: "from-yellow-500 to-orange-500" },
    { title: "Snowmobiling", season: "Nov-Apr", rating: 4.8, gradient: "from-gray-400 to-blue-400" },
    { title: "Midnight Sun", season: "Jun-Jul", rating: 5.0, gradient: "from-yellow-400 to-amber-500" }
  ];

  const stats = [
    { label: "Natural Wonders", value: "200+", icon: <Mountain className="w-6 h-6" /> },
    { label: "Active Volcanoes", value: "30", icon: <Flame className="w-6 h-6" /> },
    { label: "Waterfalls", value: "10,000+", icon: <Wind className="w-6 h-6" /> },
    { label: "Glaciers", value: "269", icon: <Sparkles className="w-6 h-6" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white overflow-hidden">
      {/* Animated Background Gradient Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-[800px] h-[800px] rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl"
          style={{
            top: mousePosition.y / 10 - 400,
            left: mousePosition.x / 10 - 400,
            transition: 'all 0.3s ease-out'
          }}
        />
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-3xl animate-float" />
        <div className="absolute bottom-0 left-1/3 w-[700px] h-[700px] rounded-full bg-gradient-to-r from-teal-500/20 to-emerald-500/20 blur-3xl" />
      </div>

      {/* Glass Morphism Navigation */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl">
        <div className="glass rounded-2xl px-8 py-4 shadow-2xl">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold gradient-text">
              Discover Iceland
            </h1>
            <div className="hidden md:flex items-center gap-8">
              {['Attractions', 'Experiences', 'Culture', 'Visit'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`relative transition-all hover:text-white font-medium ${
                    activeSection === item.toLowerCase() ? 'text-white' : 'text-gray-400'
                  }`}
                >
                  {item}
                  {activeSection === item.toLowerCase() && (
                    <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full" />
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Immersive with 3D Effect */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Parallax Background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            transform: `translateY(${scrollY * 0.5}px) scale(${1 + scrollY * 0.0002})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/70 to-gray-950" />
          <img
            src="https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=1920&h=1080&fit=crop"
            alt="Iceland Landscape"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto mt-20">
          <div className="inline-block mb-6 px-6 py-2 glass rounded-full text-sm font-medium animate-fade-in">
            ✨ Experience the Land of Fire and Ice
          </div>

          <h2 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
            <span className="gradient-text">Iceland</span>
            <br />
            <span className="text-white">Beyond Imagination</span>
          </h2>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto animate-fade-in-delay leading-relaxed">
            Where glaciers meet volcanoes, and nature paints the sky with aurora borealis.
            Discover a world that exists nowhere else on Earth.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Button
              size="lg"
              className="group bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold px-10 py-7 rounded-2xl text-lg shadow-glow-cyan transform transition-all hover:scale-105 hover:-translate-y-1"
            >
              Start Your Journey
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="group glass border-2 border-white/20 hover:border-white/40 text-white font-bold px-10 py-7 rounded-2xl text-lg backdrop-blur-xl"
            >
              <Play className="mr-2 w-5 h-5" />
              Watch Film
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="glass rounded-2xl p-6 hover:bg-white/10 transition-all hover:scale-105 cursor-pointer reveal"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-cyan-400 mb-2 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold mb-1 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Attractions Section - Bento Grid Layout */}
      <section id="attractions" className="relative py-32 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20 reveal">
            <div className="inline-block px-6 py-2 glass rounded-full text-sm font-medium mb-6">
              🏔️ Natural Wonders
            </div>
            <h2 className="text-5xl md:text-7xl font-black mb-6">
              <span className="gradient-text">Extraordinary</span> Landscapes
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              From ethereal northern lights to powerful geysers, Iceland offers experiences found nowhere else on Earth
            </p>
          </div>

          {/* Bento Grid - Featured Layout */}
          <div className="grid md:grid-cols-3 gap-6">
            {attractions.map((attraction, index) => (
              <div
                key={index}
                className={`reveal group relative overflow-hidden rounded-3xl ${
                  attraction.featured ? 'md:col-span-2 md:row-span-2' : ''
                }`}
                onClick={() => attraction.link && (window.location.hash = attraction.link)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Card
                  className={`h-full bg-gray-900/50 border-gray-800 hover:border-gray-700 overflow-hidden cursor-pointer transition-all duration-500 ${
                    attraction.featured ? 'min-h-[600px]' : 'min-h-[320px]'
                  }`}
                >
                  <div className="relative h-full overflow-hidden">
                    {/* Image with Zoom Effect */}
                    <img
                      src={attraction.image}
                      alt={attraction.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${attraction.color} opacity-0 group-hover:opacity-40 transition-opacity duration-500`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />

                    {/* Content */}
                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                      <div className={`flex items-center gap-3 mb-4 text-white group-hover:scale-110 transition-transform duration-300`}>
                        <div className={`p-3 rounded-2xl bg-gradient-to-br ${attraction.color} shadow-lg`}>
                          {attraction.icon}
                        </div>
                        {attraction.featured && (
                          <span className="px-4 py-1.5 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full text-xs font-bold uppercase tracking-wide">
                            Featured
                          </span>
                        )}
                      </div>

                      <h3 className={`font-bold mb-3 text-white ${attraction.featured ? 'text-4xl' : 'text-2xl'}`}>
                        {attraction.title}
                      </h3>

                      <p className={`text-gray-300 leading-relaxed ${attraction.featured ? 'text-lg mb-6' : 'text-sm mb-4'}`}>
                        {attraction.description}
                      </p>

                      {attraction.link && (
                        <div className="flex items-center gap-2 text-cyan-400 font-semibold group-hover:gap-4 transition-all">
                          Explore More
                          <ArrowRight className="w-5 h-5" />
                        </div>
                      )}
                    </div>

                    {/* Quick Actions */}
                    <div className="absolute top-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-3 glass rounded-full hover:bg-white/20 transition-all">
                        <Heart className="w-5 h-5" />
                      </button>
                      <button className="p-3 glass rounded-full hover:bg-white/20 transition-all">
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experiences Section - Modern Cards */}
      <section id="experiences" className="relative py-32 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20 reveal">
            <div className="inline-block px-6 py-2 glass rounded-full text-sm font-medium mb-6">
              ⛷️ Adventures Await
            </div>
            <h2 className="text-5xl md:text-7xl font-black mb-6">
              Unforgettable <span className="gradient-text">Experiences</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="reveal group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Card className="h-full bg-gray-900/50 border-gray-800 hover:border-gray-700 overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer">
                  <CardContent className="p-8">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${exp.gradient} mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                      <Star className="w-8 h-8 text-white" />
                    </div>

                    <h3 className="text-2xl font-bold mb-3 group-hover:text-cyan-400 transition-colors">
                      {exp.title}
                    </h3>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{exp.season}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(exp.rating)
                                  ? 'fill-yellow-500 text-yellow-500'
                                  : 'text-gray-600'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm font-semibold text-yellow-500">{exp.rating}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture Section - Split Layout */}
      <section id="culture" className="relative py-32 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="reveal">
              <div className="inline-block px-6 py-2 glass rounded-full text-sm font-medium mb-6">
                🛡️ Rich Heritage
              </div>

              <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
                <span className="gradient-text">Viking</span> Heritage
                <br />
                <span className="text-white">Modern Innovation</span>
              </h2>

              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Iceland seamlessly blends ancient sagas with cutting-edge sustainability.
                Experience a culture that cherishes storytelling, values community, and
                leads the world in renewable energy.
              </p>

              <div className="space-y-6 mb-10">
                {[
                  { icon: <Users className="w-6 h-6" />, text: "375,000 friendly locals", gradient: "from-purple-500 to-pink-500" },
                  { icon: <MapPin className="w-6 h-6" />, text: "Reykjavík - World's northernmost capital", gradient: "from-blue-500 to-cyan-500" },
                  { icon: <Sparkles className="w-6 h-6" />, text: "100% renewable electricity", gradient: "from-green-500 to-emerald-500" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-5 group cursor-pointer">
                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${item.gradient} shadow-lg group-hover:scale-110 transition-transform`}>
                      {item.icon}
                    </div>
                    <span className="text-lg group-hover:text-cyan-400 transition-colors">{item.text}</span>
                  </div>
                ))}
              </div>

              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold px-8 py-6 rounded-2xl shadow-glow-cyan group"
              >
                Learn Our Story
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            <div className="reveal relative">
              <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl group">
                <img
                  src="https://images.unsplash.com/photo-1520769669713-3ff3ae2291b9?w=800&h=600&fit=crop"
                  alt="Reykjavik"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />

                {/* Floating Stats */}
                <div className="absolute bottom-8 left-8 right-8 glass rounded-2xl p-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-1">
                        #1
                      </div>
                      <div className="text-sm text-gray-400">Peace Index</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-1">
                        100%
                      </div>
                      <div className="text-sm text-gray-400">Renewable</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Bold & Modern */}
      <section id="visit" className="relative py-32 px-6">
        <div className="container mx-auto max-w-5xl reveal">
          <div className="relative glass rounded-[3rem] p-12 md:p-20 text-center overflow-hidden shadow-2xl">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-cyan-600/20 to-pink-600/20 animate-gradient" />

            <div className="relative z-10">
              <h2 className="text-5xl md:text-7xl font-black mb-8">
                Begin Your <span className="gradient-text">Icelandic Saga</span>
              </h2>

              <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                Whether you seek adventure, tranquility, or wonder, Iceland delivers experiences
                that will stay with you forever. Start planning your journey to the land of fire and ice.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Button
                  size="lg"
                  className="group bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold px-10 py-7 rounded-2xl text-lg shadow-glow-cyan transform transition-all hover:scale-105"
                >
                  Plan Your Trip
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="glass border-2 border-white/20 hover:border-white/40 text-white font-bold px-10 py-7 rounded-2xl text-lg backdrop-blur-xl"
                >
                  Download Travel Guide
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Minimal & Clean */}
      <footer className="relative py-12 px-6 border-t border-white/10">
        <div className="container mx-auto text-center">
          <div className="mb-6">
            <h3 className="text-2xl font-bold gradient-text mb-2">Discover Iceland</h3>
            <p className="text-gray-500">Powered by the midnight sun ✨</p>
          </div>
          <p className="text-gray-600 text-sm">&copy; 2025 Discover Iceland. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Iceland;
