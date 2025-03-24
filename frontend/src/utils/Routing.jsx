//Imports
import { Routes, Route } from "react-router-dom"

//Pages
import HomePage from "../Pages/HomePage"
import LandingPage from "../Pages/LandingPage"
import CreateAccount from "../Pages/CreateAccount"
import SuccessPage from "../Pages/SuccessPage"
import SignInOptionsPage from "../Pages/SignInOptionsPage"
import Video from "../Pages/Video"
import EndMeet from "../Pages/EndMeet"
import KickedOutPage from "../Pages/KickedOutPage"
import OAuthSuccessRedirect from "../Components/Auth/OAuthSuccessRedirect"
import ForgotPassword from "../Pages/ForgotPassword/ForgotPassword"
import ContactSupport from "../Pages/ContactSupport/ContactSupport"


const Routing = () => {
  return (

    <>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<HomePage />} />
        <Route path="/oauth-success" element={<OAuthSuccessRedirect />} />
        <Route path="/create" element={<CreateAccount />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/options" element={<SignInOptionsPage />} />
        <Route path="/video" element={<Video />} />
        <Route path="/end-meet" element={<EndMeet />} />
        <Route path="/kick" element={<KickedOutPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/contact-support" element={<ContactSupport />} />
      </Routes>

    </>
  )
}

export default Routing