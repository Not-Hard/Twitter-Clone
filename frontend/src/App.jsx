import { Route, Routes} from "react-router-dom"

import HomePage from "./pages/home/homePage";
import  SignUpPage  from "./pages/authentication/signup/signupPage";
import LoginPage from "./pages/authentication/login/loginPage";
import NotificationPage from "./pages/notification/notificationPage";
import ProfilePage from "./pages/profile/profilePage";

import Sidebar from "./components/common/sideBar";
import RightPanel from "./components/common/rightPanel";



export default function App() {
  return (
    <div className='flex max-w-6xl mx-auto'>
      {/* Common Component, it's not wrapped with Routes*/}
      <Sidebar/>
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/signup' element={<SignUpPage />} />
				<Route path='/login' element={<LoginPage />} />
        <Route path='/notifications' element={<NotificationPage/>}/>
        <Route path='/profile/:username' element={<ProfilePage/>}/>
			</Routes>
      <RightPanel/>
		</div>

  );
}
