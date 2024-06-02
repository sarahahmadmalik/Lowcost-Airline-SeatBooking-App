import React from 'react';
import NavBar from '../components/NavBar';
import Hero from '../components/Hero';
import TravelSupport from '../components/TravelSupport';
import TravelMemories from '../components/TravelMemories';
import Subscribe from '../components/Subscribe';
import Footer from '../components/Footer';
import FlightSearch from '../components/FlightSearch';
import HeroHeading from '../components/HeroHeading';

function Main() {
  return (
    <>
      <NavBar />
          <Hero />
          <HeroHeading>
          Experience the convenience of booking flights and selecting seats all in one place. Your next adventure is just a few clicks away.
          </HeroHeading>
          <FlightSearch />
          
      <TravelSupport />
      <TravelMemories />
      <Subscribe />
      <Footer />
      </>
  );
}

export default Main;
