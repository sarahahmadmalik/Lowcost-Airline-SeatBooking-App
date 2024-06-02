import React, { useState } from 'react';
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Icon, Heading, Text } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { useLocation } from 'react-router-dom';
import PassengerInfoForm from '../components/PassengerInfoForm';
import ConfirmationPage from '../components/ConfirmationPage';
import CheckoutForm from '../components/CheckoutForm'; // Import the CheckoutForm component
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const Booking = () => {
  const location = useLocation();
  const [step, setStep] = useState(1);
  const [passengerDetails, setPassengerDetails] = useState([]);
  const flight = location.state.flight;

  const nextStep = () => setStep(prevStep => prevStep + 1);
  const prevStep = () => setStep(prevStep => prevStep - 1);

  return (
    <>
      <NavBar />
      <Box p={8} maxWidth="800px" mx="auto">
        <Heading as="h1" size="2xl" mb={2} textAlign="center">
          Book Your Flight
        </Heading>
        {step === 1 ? (
          <Text fontSize={20} mt={2} mb={4} textAlign="center" color="gray.600">
            Please Fill in the Details
          </Text>
        ) : step === 2 ? ( // Update the step condition to include the checkout step
          <Text fontSize={20} mt={2} mb={4} textAlign="center" color="gray.600">
            Confirm Your Booking
          </Text>
        ) : (
          <Text fontSize={20} mt={2} mb={4} textAlign="center" color="gray.600">
            Checkout
          </Text>
        )}

        <Box justifyContent="center" display="flex" mb={2}>
          <Breadcrumb spacing="8px" separator={<Icon as={ChevronRightIcon} color="gray.500" />}>
            <BreadcrumbItem isCurrentPage={step === 1}>
              <BreadcrumbLink color={step === 1 ? "blue.500" : "gray.500"}>Passenger Information</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage={step === 2}>
              <BreadcrumbLink color={step === 2 ? "blue.500" : "gray.500"}>Confirmation</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage={step === 3}> {/* Add a new breadcrumb for the checkout step */}
              <BreadcrumbLink color={step === 3 ? "blue.500" : "gray.500"}>Checkout</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Box>

        {step === 1 && (
          <PassengerInfoForm
            passengerDetails={passengerDetails}
            setPassengerDetails={setPassengerDetails}
            nextStep={nextStep}
            flight={flight}
          />
        )}

        {step === 2 && (
          <ConfirmationPage
            passengerDetails={passengerDetails}
            flight={flight}
                      prevStep={prevStep}
                      nextStep={nextStep}
          />
        )}

        {step === 3 && ( // Render the CheckoutForm when the step is the checkout step
          <CheckoutForm
            passengerDetails={passengerDetails}
            flight={flight}
            prevStep={prevStep}
          />
        )}
      </Box>
      <Footer />
    </>
  );
};

export default Booking;
