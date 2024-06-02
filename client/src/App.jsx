import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FlightListingPage from './pages/FlightListingPage';
import Main from './pages/Main';
import Booking from './pages/Booking';

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/flight-list" element={<FlightListingPage />} />
        <Route path="/user-detail-form" element={<Booking />} />
      </Routes>
  );
};

export default App;
