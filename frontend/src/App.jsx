
import { WallpaperProvider } from './context/WallpaperContext';
import { ThemeProvider } from './context/ThemeContext';
import {Navigate, Route, Routes} from "react-router";
import ChatPage from "./pages/ChatPage";
import AuthPage from "./pages/AuthPage";
import {useAuth} from "@clerk/react";
import PageLoader from "./components/PageLoader";
import { useAuthStore } from "./store/useAuthStore";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";

function App() {
  const { isSignedIn, isLoaded } = useAuth();
  // const {checkAuth, isCheckingAuth, clearAuth} = useAuthStore();
  const clearAuth = useAuthStore((state)=> state.clearAuth);
  const isCheckingAuth = useAuthStore((state)=> state.isCheckingAuth);
  const checkAuth = useAuthStore((state)=> state.checkAuth);

  useEffect(()=>{
    if(!isLoaded) return;

    if(isSignedIn) checkAuth();

    else{
      clearAuth()
    }

  },[checkAuth, isLoaded, isSignedIn, clearAuth])
  if(!isLoaded || (isSignedIn && isCheckingAuth)) return <PageLoader/>;
  return (
    <ThemeProvider>
    <WallpaperProvider>
      <Routes>
        <Route path="/" element = {isSignedIn ? <ChatPage/> : <Navigate to={"/auth"} replace/>} />
        <Route path="/auth" element = {!isSignedIn ? <AuthPage/> : <Navigate to={"/"} replace/> } />
      </Routes>
      <Toaster/>
    </WallpaperProvider>
    </ThemeProvider>
  )
}

export default App
