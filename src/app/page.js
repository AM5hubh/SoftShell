import ContactFormSection from "@/components/home/contactform";
import HeroSection from "@/components/home/herosection";
import HowItWorksSection from "@/components/home/howitworks";
import TestimonialsSection from "@/components/home/testimonials";
import WhyChooseUsSection from "@/components/home/whychooseus";

export default function Home() {
  return (
    <div className="items-center justify-items-center">
      {/* heroSection */}
      <div className="w-full">
        <HeroSection />
      </div>
      {/* How it works */}
      <div className="w-full">
        <HowItWorksSection />
      </div>
      {/* Why Choose us */}
      <div className="w-full">
        <WhyChooseUsSection />
      </div>
      {/* Customer Testimonials */}
      <div className="w-full">
        <TestimonialsSection />
      </div>
      {/* Contact/LeadForm */}
      <div className="w-full">
        <ContactFormSection />
      </div>
    </div>
  );
}
