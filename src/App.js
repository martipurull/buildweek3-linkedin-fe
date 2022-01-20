import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import MyNavbar from "./components/MyNavbar";
import Profile from "./components/Profile";
import Error from "./components/Error";
import Feed from "./components/Feed";
import Jobs from './components/Jobs'
import JobDetails from './components/JobDetails'
import CreateJob from './components/CreateJob'
import Search from './components/Search'

const App = () => {
  return (
    <BrowserRouter>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/profile/:userName" element={<Profile />} />
        <Route path="/jobs" element={<Jobs />} />
        {/* <Route path="/search" element={<Search />} /> */}
        <Route path="/jobs-create" element={<CreateJob />} />
        <Route path="/jobs/:jobId" element={<JobDetails />} />
        <Route path="*" element={<Error error="Page not found" />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
