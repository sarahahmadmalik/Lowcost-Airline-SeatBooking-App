import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import FlightList from '../components/FlightList';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Banner from '../components/Banner';

const FlightListingPage = () => {
  const location = useLocation();
  const [flights, setFlights] = useState([]);
  const { search } = location;

  console.log("FlightListingPage rendered"); // Debugging log
  console.log("Location search:", search); // Debugging log

  useEffect(() => {
    console.log("useEffect triggered"); // Debugging log

    // Function to generate sample flights based on query parameters
    const generateSampleFlights = () => {
      // Extract query parameters from the location object
      const searchParams = new URLSearchParams(search);
      const origin = searchParams.get('origin');
      const destination = searchParams.get('destination');
        const travellers = parseInt(searchParams.get('travellers'));
      const departureDate = searchParams.get('departureDate');
      const returnDate = searchParams.get('returnDate');
      const flightClass = searchParams.get('class'); // Extract class

      console.log("Generating sample flights for:", origin, destination, travellers, departureDate, returnDate, flightClass); // Debugging log

      // Generate sample flights
      const sampleFlights = [];
      for (let i = 0; i < 10; i++) {
        const flightNumber = `FL${i + 1}`;
        const departure = departureDate;
        const Return = returnDate;
        const duration = Math.floor(Math.random() * 10) + 1; // Random duration in hours
        const price = Math.floor(Math.random() * 500) + 100; // Random price between 100 and 600
        const flight = {
          flightNumber,
          origin,
          destination,
          departure,
          Return,
          duration,
            price,
          travellers,
          airline: "ABC",
          class: flightClass // Include class in flight object
        };
        sampleFlights.push(flight);
      }
      setFlights(sampleFlights);
    };

    generateSampleFlights();
  }, [search]);

  return (
    <>
      <NavBar />
      <Banner
        imageUrl="/banner.jpg"
        heading="Flight Listings"
        subtitle="Find the best flights for your journey"
      />
      <Box display="flex" justifyContent="center" alignItems="center" m={20}>
        <FlightList flights={flights} />
      </Box>
      <Footer />
    </>
  );
};

export default FlightListingPage;
