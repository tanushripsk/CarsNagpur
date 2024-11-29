
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './Component/Navbar';
import Footer from './Component/Footer';
import Home from './Component/Home';
import CarsData from './Component/CarsData';
import Services from './Component/Services';
import Financing from './Component/Financing';
import Insurance from './Component/Insurance';
import VehicleHistory from './Component/VehicleHistory';
import Showroom from './Component/Showroom';
import DealerShip from './Component/DealerShip';
import MyAppointment from './Component/MyAppointment';
import MyBooking from './Component/MyBooking';
import MyOrder from './Component/MyOrder';
import CarUpload from './Component/CarUpload';
import HelpCenter from './Component/HelpCenter';
import FAQ from './Component/FAQ';
import About from './Component/About';
import ContactUs from './Component/ContactUs';
import NewCars from './Component/NewCars';
import Echallan from './Component/Echallan';
import AddToCart from './Component/AddToCart';
import Policy from './Component/Policy';
import Testimonial from './Component/Testimonial';
import UsedCars from './Component/UsedCars';
import Login from './Component/Login';
import  {UserProvider}  from "./context/UserContext";
import TestDrive from './Component/TestDrive';
function App() {
  return (
   <>
   <UserProvider>
   <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>

        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>


        <Routes>
          <Route path="/carsdata/:id" element={<CarsData/>} />
        </Routes>

      

        <Routes>
          <Route path="/testdrive/:id" element={<TestDrive />} />
        </Routes>

        <Routes>
          <Route path="/usedcars" element={<UsedCars />} />
        </Routes>

        <Routes>
          <Route path="/cardetails" element={< CarsData />} />
        </Routes>

        <Routes>
          <Route path="/service" element={<Services />} />
        </Routes>

        <Routes>
          <Route path="/financing" element={<Financing />} />
        </Routes>

        <Routes>
          <Route path="/insurance" element={<Insurance />} />
        </Routes>

        <Routes>
          <Route path="/vehicle-history" element={<VehicleHistory />} />
        </Routes>

        <Routes>
          <Route path="/showrooms" element={<Showroom />} />
        </Routes>

        <Routes>
          <Route path="/dealerships" element={<DealerShip />} />
        </Routes>

        <Routes>
          <Route path="/my-appointments" element={<MyAppointment />} />
        </Routes>

        <Routes>
          <Route path="/my-bookings" element={<MyBooking />} />
        </Routes>

        <Routes>
          <Route path="/my-orders" element={<MyOrder />} />
        </Routes>

        <Routes>
          <Route path="/carup" element={<CarUpload />} />
        </Routes>

        <Routes>
          <Route path="/help" element={<HelpCenter />} />
        </Routes>

        <Routes>
          <Route path="/faq" element={<FAQ />} />
        </Routes>

        <Routes>
          <Route path="/about" element={<About />} />
        </Routes>

        <Routes>
          <Route path="/contact" element={<ContactUs />} />
        </Routes>

        <Routes>
          <Route path="/sell-car" element={<NewCars />} />
        </Routes>

        <Routes>
          <Route path="/new-car" element={<NewCars />} />
        </Routes>

        <Routes>
          <Route path="/challan" element={<Echallan />} />
        </Routes>

        <Routes>
          <Route path="/cart" element={<AddToCart />} />
        </Routes>

        <Routes>
          <Route path="/terms" element={<Policy />} />
        </Routes>

        <Routes>
          <Route path="/testimonials" element={<Testimonial />} />
        </Routes>
        
        <Footer />
      </Router>
      </UserProvider>
   </>
  );
}

export default App;
