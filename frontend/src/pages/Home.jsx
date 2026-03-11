import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import Services from '../components/Services';
import Features from '../components/Features';
import Stats from '../components/Stats';
import FreeTrial from '../components/Trial';
import Testimonials from '../components/Testimonials';


export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Services />
      <Features />
      <Stats />
      <FreeTrial />
      <Testimonials />
    </>
  );
}
