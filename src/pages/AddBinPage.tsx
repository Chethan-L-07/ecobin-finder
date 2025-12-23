import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, PlusCircle, MapPin, Phone, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/Layout';
import { eWasteCategories } from '@/data/eWasteBins';

const AddBinPage = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    area: '',
    city: '',
    pincode: '',
    contact: '',
    operatingHours: '',
    acceptedItems: [] as string[],
    additionalInfo: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryToggle = (categoryLabel: string) => {
    setFormData((prev) => ({
      ...prev,
      acceptedItems: prev.acceptedItems.includes(categoryLabel)
        ? prev.acceptedItems.filter((item) => item !== categoryLabel)
        : [...prev.acceptedItems, categoryLabel],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: 'Bin Submitted Successfully!',
      description: 'Your e-waste bin location has been submitted for review. We will verify and add it to the map soon.',
    });

    // Reset form
    setFormData({
      name: '',
      address: '',
      area: '',
      city: '',
      pincode: '',
      contact: '',
      operatingHours: '',
      acceptedItems: [],
      additionalInfo: '',
    });

    setIsSubmitting(false);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
              <PlusCircle className="w-7 h-7 text-primary" />
              Add New E-Waste Bin
            </h1>
            <p className="text-muted-foreground">
              Help the community by adding a new collection point
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card className="shadow-eco-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Location Details
              </CardTitle>
              <CardDescription>
                Enter the basic information about the e-waste collection point
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Collection Point Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Green Tech Recyclers"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Full Address *</Label>
                <Textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter the complete address"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="area">Area *</Label>
                  <Input
                    id="area"
                    name="area"
                    value={formData.area}
                    onChange={handleInputChange}
                    placeholder="e.g., Koramangala"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="e.g., Bangalore"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pincode">Pincode *</Label>
                  <Input
                    id="pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    placeholder="e.g., 560034"
                    pattern="[0-9]{6}"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="shadow-eco-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Phone className="w-5 h-5 text-primary" />
                Contact & Hours
              </CardTitle>
              <CardDescription>
                Help users reach the collection point
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contact">Contact Number *</Label>
                  <Input
                    id="contact"
                    name="contact"
                    value={formData.contact}
                    onChange={handleInputChange}
                    placeholder="+91 98765 43210"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="operatingHours">Operating Hours *</Label>
                  <Input
                    id="operatingHours"
                    name="operatingHours"
                    value={formData.operatingHours}
                    onChange={handleInputChange}
                    placeholder="Mon-Sat: 9AM - 6PM"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Accepted Items */}
          <Card className="shadow-eco-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                Accepted E-Waste Types
              </CardTitle>
              <CardDescription>
                Select all types of e-waste accepted at this location
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {eWasteCategories.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center space-x-3 p-3 rounded-lg border border-border/50 hover:bg-secondary/50 transition-colors cursor-pointer"
                    onClick={() => handleCategoryToggle(category.label)}
                  >
                    <Checkbox
                      id={category.id}
                      checked={formData.acceptedItems.includes(category.label)}
                      onCheckedChange={() => handleCategoryToggle(category.label)}
                    />
                    <label
                      htmlFor={category.id}
                      className="text-sm font-medium cursor-pointer flex items-center gap-2"
                    >
                      <span className="text-lg">{category.icon}</span>
                      {category.label}
                    </label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <Card className="shadow-eco-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-primary" />
                Additional Information
              </CardTitle>
              <CardDescription>
                Any other details that might be helpful
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                id="additionalInfo"
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleInputChange}
                placeholder="e.g., Parking available, specific instructions, etc."
                rows={4}
              />
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex gap-4 justify-end">
            <Link to="/">
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              className="eco-gradient text-primary-foreground shadow-eco-sm hover:shadow-eco-md"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                  Submitting...
                </>
              ) : (
                <>
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Submit for Review
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default AddBinPage;
