import { Link } from 'react-router-dom';
import { MapPin, Recycle, Leaf, Search, ArrowRight, CheckCircle, Globe, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Layout from '@/components/Layout';
import EWasteMap from '@/components/EWasteMap';
import { eWasteBins, eWasteCategories } from '@/data/eWasteBins';

const Index = () => {
  const stats = [
    { icon: MapPin, value: '10+', label: 'Collection Points' },
    { icon: Globe, value: '6', label: 'Cities Covered' },
    { icon: Users, value: '1000+', label: 'Users Helped' },
    { icon: Recycle, value: '500kg+', label: 'E-Waste Recycled' },
  ];

  const features = [
    {
      icon: Search,
      title: 'Easy Search',
      description: 'Find e-waste collection bins near you by city, area, or pincode.',
    },
    {
      icon: MapPin,
      title: 'Interactive Map',
      description: 'Visual map with all collection points and real-time directions.',
    },
    {
      icon: Recycle,
      title: 'Filter by Type',
      description: 'Filter bins by the type of e-waste they accept.',
    },
    {
      icon: Leaf,
      title: 'Eco Education',
      description: 'Learn about proper e-waste disposal and its environmental impact.',
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <Recycle className="w-4 h-4" />
                <span>Responsible E-Waste Disposal</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
                Find <span className="text-gradient">E-Waste Bins</span> Near You
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-lg">
                Locate the nearest e-waste collection points in your city. Dispose of your 
                electronic waste responsibly and help build a sustainable future.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/map">
                  <Button size="lg" className="eco-gradient text-primary-foreground shadow-eco-md hover:shadow-eco-lg group w-full sm:w-auto">
                    <MapPin className="w-5 h-5 mr-2" />
                    Locate E-Waste Bins
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/education">
                  <Button size="lg" variant="outline" className="border-primary/30 hover:bg-primary/5 w-full sm:w-auto">
                    <Leaf className="w-5 h-5 mr-2" />
                    Learn More
                  </Button>
                </Link>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                {stats.map(({ icon: Icon, value, label }) => (
                  <div key={label} className="text-center">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary mb-2">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="text-2xl font-bold text-foreground">{value}</div>
                    <div className="text-xs text-muted-foreground">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map Preview */}
            <div className="animate-fade-in lg:animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
              <div className="relative">
                <div className="absolute -inset-4 eco-gradient rounded-2xl blur-2xl opacity-20" />
                <EWasteMap bins={eWasteBins.slice(0, 5)} className="h-[400px] relative" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Use <span className="text-gradient">E-Waste Locator</span>?
            </h2>
            <p className="text-muted-foreground">
              Our platform makes it easy to find and navigate to e-waste collection centers 
              in your area, promoting responsible electronic waste disposal.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, description }, index) => (
              <Card 
                key={title}
                className="group border-border/50 shadow-eco-sm hover:shadow-eco-md transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-xl eco-gradient flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-eco-sm">
                    <Icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground">{description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* E-Waste Categories */}
      <section className="py-16 md:py-24 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Can You <span className="text-gradient">Recycle</span>?
            </h2>
            <p className="text-muted-foreground">
              E-waste bins accept various types of electronic devices and components. 
              Find the right bin for your specific items.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {eWasteCategories.map((category, index) => (
              <Link key={category.id} to="/map">
                <Card 
                  className="group text-center border-border/50 shadow-eco-sm hover:shadow-eco-md transition-all duration-300 hover:-translate-y-1 cursor-pointer animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <CardContent className="py-6">
                    <div className="text-4xl mb-3 group-hover:scale-125 transition-transform">
                      {category.icon}
                    </div>
                    <p className="text-sm font-medium">{category.label}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-2xl eco-gradient p-8 md:p-12">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />
            <div className="relative z-10 max-w-2xl mx-auto text-center text-primary-foreground">
              <Zap className="w-12 h-12 mx-auto mb-4 animate-bounce-gentle" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Dispose Your E-Waste?
              </h2>
              <p className="text-primary-foreground/80 mb-8">
                Find the nearest e-waste collection point and contribute to a cleaner environment. 
                Every device recycled makes a difference!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/map">
                  <Button size="lg" variant="secondary" className="group w-full sm:w-auto">
                    <MapPin className="w-5 h-5 mr-2" />
                    Find Bins Now
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/add-bin">
                  <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 w-full sm:w-auto">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Add New Bin
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
