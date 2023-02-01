import { Navigate } from "react-router";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Activity from "./pages/activity/Activity";
import Activities from "./pages/activity/Activities";
import Items from "./pages/items/Items";
import Help from "./pages/help/Help";
import Testimonials from "./pages/testimonial/Testimonials";
import HomePage from "./pages/home/HomePage";
import Item from "./pages/items/Item";
import "./global.css";
import Admin from "./pages/admin";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/activities/detail/:id" element={<Activity />} />
          <Route path="/items" element={<Items />} />
          <Route path="/items/detail/:id" element={<Item />} />
          <Route path="/help" element={<Help />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/admins" element={<Admin />} />
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
