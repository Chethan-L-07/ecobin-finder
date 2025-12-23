import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, AlertTriangle, Leaf, Recycle, Globe, Battery, Smartphone, Monitor, Cpu, Lightbulb, TreePine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Layout from '@/components/Layout';

const EducationPage = () => {
  const hazards = [
    {
      icon: AlertTriangle,
      title: 'Lead',
      description: 'Found in CRT monitors and soldering. Damages nervous system, kidneys, and brain development.',
    },
    {
      icon: AlertTriangle,
      title: 'Mercury',
      description: 'Present in LCD displays and batteries. Causes neurological damage and birth defects.',
    },
    {
      icon: AlertTriangle,
      title: 'Cadmium',
      description: 'Found in rechargeable batteries. Linked to kidney damage and cancer.',
    },
    {
      icon: AlertTriangle,
      title: 'Brominated Flame Retardants',
      description: 'Used in circuit boards and cables. Disrupts hormones and affects development.',
    },
  ];

  const tips = [
    {
      icon: Smartphone,
      title: 'Mobile Phones',
      description: 'Before disposal, factory reset your phone to erase personal data. Remove SIM and memory cards.',
    },
    {
      icon: Monitor,
      title: 'Computers & Monitors',
      description: 'Wipe hard drives securely using specialized software. Remove any backup batteries.',
    },
    {
      icon: Battery,
      title: 'Batteries',
      description: 'Never throw batteries in regular trash. They contain toxic chemicals and can cause fires.',
    },
    {
      icon: Cpu,
      title: 'Circuit Boards',
      description: 'These contain valuable metals like gold and copper. Proper recycling recovers these materials.',
    },
  ];

  const faqs = [
    {
      question: 'What is e-waste?',
      answer: 'E-waste refers to discarded electronic devices and equipment including computers, televisions, mobile phones, batteries, and other electronic appliances. It is one of the fastest-growing waste streams globally.',
    },
    {
      question: 'Why is e-waste recycling important?',
      answer: 'E-waste contains hazardous materials that can contaminate soil and water if improperly disposed. Recycling recovers valuable materials like gold, silver, copper, and rare earth elements, reducing the need for mining.',
    },
    {
      question: 'How should I prepare my devices for recycling?',
      answer: 'Back up important data, then perform a factory reset on all devices. Remove batteries, SIM cards, and memory cards. Keep cables and accessories together with the device when possible.',
    },
    {
      question: 'Are there any devices that cannot be recycled?',
      answer: 'Most electronic devices can be recycled. However, some facilities may not accept certain items like smoke detectors or medical devices. Check with your local collection point for specific restrictions.',
    },
    {
      question: 'Is there a fee for e-waste recycling?',
      answer: 'Most e-waste collection points accept common electronics for free. Some may charge a small fee for items requiring special handling like CRT monitors or refrigerators.',
    },
    {
      question: 'What happens to my e-waste after collection?',
      answer: 'E-waste goes through sorting, dismantling, and material recovery processes. Hazardous materials are safely extracted, valuable metals are recovered, and plastics are processed for reuse.',
    },
  ];

  const stats = [
    { value: '53.6M', label: 'Metric tons of e-waste generated globally in 2019', icon: Globe },
    { value: '17.4%', label: 'Of e-waste is formally collected and recycled', icon: Recycle },
    { value: '$57B', label: 'Worth of raw materials in e-waste annually', icon: Cpu },
    { value: '2050', label: 'E-waste could double by this year if no action taken', icon: AlertTriangle },
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
              <BookOpen className="w-7 h-7 text-primary" />
              E-Waste Education
            </h1>
            <p className="text-muted-foreground">
              Learn about responsible e-waste disposal and its importance
            </p>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-2xl eco-gradient p-8 md:p-12 mb-12">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent" />
          <div className="relative z-10 max-w-2xl text-primary-foreground">
            <Leaf className="w-12 h-12 mb-4 animate-bounce-gentle" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why E-Waste Management Matters
            </h2>
            <p className="text-primary-foreground/90 text-lg">
              Electronic waste is one of the fastest-growing waste streams in the world. 
              Proper disposal prevents environmental pollution and recovers valuable materials 
              for reuse, contributing to a circular economy.
            </p>
          </div>
        </section>

        {/* Global Stats */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">The Global E-Waste Crisis</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map(({ value, label, icon: Icon }, index) => (
              <Card 
                key={index}
                className="border-border/50 shadow-eco-sm hover:shadow-eco-md transition-all"
              >
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">{value}</div>
                  <p className="text-sm text-muted-foreground">{label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Environmental Hazards */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-2">Environmental Hazards</h2>
          <p className="text-muted-foreground mb-6">
            E-waste contains harmful substances that can damage health and environment
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {hazards.map(({ icon: Icon, title, description }) => (
              <Card key={title} className="border-destructive/20 bg-destructive/5">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-destructive" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{title}</h3>
                      <p className="text-sm text-muted-foreground">{description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Disposal Tips */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-2">Proper Disposal Tips</h2>
          <p className="text-muted-foreground mb-6">
            Follow these guidelines for safe and responsible e-waste disposal
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {tips.map(({ icon: Icon, title, description }) => (
              <Card key={title} className="border-border/50 shadow-eco-sm">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg eco-gradient flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{title}</h3>
                      <p className="text-sm text-muted-foreground">{description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Benefits Section */}
        <section className="mb-12 bg-secondary/50 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <TreePine className="w-8 h-8 text-primary" />
            <h2 className="text-2xl font-bold">Benefits of E-Waste Recycling</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Leaf className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold">Environmental Protection</h3>
              <p className="text-sm text-muted-foreground">
                Prevents toxic chemicals from contaminating soil, water, and air.
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Recycle className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold">Resource Recovery</h3>
              <p className="text-sm text-muted-foreground">
                Recovers valuable metals like gold, silver, copper, and rare earth elements.
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold">Energy Conservation</h3>
              <p className="text-sm text-muted-foreground">
                Recycling uses less energy than mining and processing virgin materials.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-border/50 rounded-lg px-4 shadow-eco-sm"
              >
                <AccordionTrigger className="text-left font-medium hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </div>
    </Layout>
  );
};

export default EducationPage;
