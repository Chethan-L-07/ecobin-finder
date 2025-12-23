import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Phone, Mail, MapPin, Send, MessageSquare, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/Layout';

const ContactPage = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: 'Message Sent!',
      description: 'Thank you for contacting us. We will get back to you within 24-48 hours.',
    });

    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });

    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      value: 'info@ewastelocator.com',
      description: 'Send us an email anytime',
    },
    {
      icon: Phone,
      title: 'Call Us',
      value: '+91 98765 43210',
      description: 'Mon-Fri from 9am to 6pm',
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      value: '123 Green Street, Eco City',
      description: 'India - 560001',
    },
    {
      icon: Clock,
      title: 'Working Hours',
      value: 'Monday - Friday',
      description: '9:00 AM - 6:00 PM IST',
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
              <MessageSquare className="w-7 h-7 text-primary" />
              Contact Us
            </h1>
            <p className="text-muted-foreground">
              Get in touch with us for any questions or feedback
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-eco-md">
              <CardHeader>
                <CardTitle className="text-xl">Send us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="How can we help you?"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Write your message here..."
                      rows={6}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full sm:w-auto eco-gradient text-primary-foreground shadow-eco-sm hover:shadow-eco-md"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info Sidebar */}
          <div className="space-y-4">
            {contactInfo.map(({ icon: Icon, title, value, description }) => (
              <Card key={title} className="shadow-eco-sm hover:shadow-eco-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl eco-gradient flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{title}</h3>
                      <p className="text-primary font-medium">{value}</p>
                      <p className="text-sm text-muted-foreground">{description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Quick Response Card */}
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="font-semibold">Quick Response</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  We typically respond within 24-48 hours. For urgent matters, 
                  please call us directly during business hours.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;
