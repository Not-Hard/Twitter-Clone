import { Navigate, Route, Routes} from "react-router-dom"
import { Toaster } from "react-hot-toast";

import HomePage from "./pages/home/HomePage";
import  SignUpPage  from "./pages/authentication/signup/signupPage";
import LoginPage from "./pages/authentication/login/LoginPage.jsx";
import NotificationPage from "./pages/notification/notificationPage";
import ProfilePage from "./pages/profile/profilePage";

import Sidebar from "./components/common/sideBar";
import RightPanel from "./components/common/rightPanel";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "./components/common/loadingSpinner.jsx";




export default function App() {

  const {data: authUser, isLoading } = useQuery({
    //we use querykey to give a unique name to our query and refer to it later
    queryKey: ["authUser"],
    queryFn: async() => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();

				//if user is unauthorized
				if(data.error){
					return null;
				}


        if(!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        console.log("Auth user is here: ", data);
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    //only try once
    retry: false,
  });

  if(isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <LoadingSpinner size="lg"/>
      </div>
    )
  }


  return (
    <div className='flex max-w-6xl mx-auto'>
      {/* Common Component, it's not wrapped with Routes*/}
      { authUser && <Sidebar/>}
			<Routes>
				<Route path='/' element={authUser ? <HomePage /> : <Navigate to = "/login" />} />
				<Route path='/login' element={!authUser ?  <LoginPage /> : <Navigate to = "/" />} />
				<Route path='/signup' element={!authUser ?  < SignUpPage /> : <Navigate to = "/" />} />
        <Route path='/notifications' element={authUser ?  <NotificationPage/> : <Navigate to = "/login" />}/>
        <Route path='/profile/:username' element={authUser ?  <ProfilePage/> : <Navigate to = "/login" />}/>
			</Routes>
      {authUser && <RightPanel/>}
      <Toaster/>
		 </div>

  );
}
