import {BrowserRouter, Route, Routes} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import Users from "./pages/Users";
import Appointments from "./pages/Appointments";
import Register from "./components/Register";
import FrontPage from "./components/FrontPage";
import EditUser from "./pages/EditUser";
import AddAppoint from "./pages/AddAppoint";
import EditAppoint from "./pages/EditAppoint";
import Profile from "./pages/Profile";
import MeetingsSend from "./pages/MeetingsSend";
import MeetingsSendEdit from "./pages/MeetingsSendEdit";
import MeetingsPage from "./pages/MeetingsPage";
import History from "./pages/History";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<FrontPage/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>

          <Route path="/users" element={<Users/>}/>
          <Route path="/users/current" element={<Profile/>}/>
          <Route path="/users/edit/:id" element={<EditUser/>}/>

          <Route path="/appointments" element={<Appointments/>}/>
          <Route path="/appointments/add_appointment" element={<AddAppoint/>}/>
          <Route path="/appointments/edit/:id" element={<EditAppoint/>}/>

          <Route path="/meetings" element={<MeetingsSend/>}/>
          <Route path="/your_meetings" element={<MeetingsPage/>}/>
          <Route path="/meetings/edit/:id" element={<MeetingsSendEdit/>}/>
          <Route path="/meetings-history" element={<History/>}/>
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
