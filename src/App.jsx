import { createContext, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { ScrollToTop } from "react-simple-scroll-up";
import { Routes, Route } from "react-router-dom";
import RequireAuth from "./pages/Login/RequireAuth/RequireAuth";
import Profile from "./pages/Profile/Profile";
import Navbar from "./shared/Navbar/Navbar";
import Home from "./pages/Home/Home/Home";
import Login from "./pages/Login/Login/Login";
import ManageToDo from "./pages/ManageToDo/ManageToDo";
import CompletedToDo from "./pages/CompletedToDo/CompletedToDo";
import Dashboard from "./pages/Dashboard/Dashboard/Dashboard";
import Welcome from "./pages/Dashboard/Welcome/Welcome";
import ManageToDoS from "./pages/Dashboard/ManageToDoS/ManageToDoS";
import ManageUsers from "./pages/Dashboard/ManageUsers/ManageUsers";
import RequireAdmin from "./pages/Login/RequireAdmin/RequireAdmin";
import NotFound from "./shared/NotFound/NotFound";
import AboutMe from "./pages/AboutMe/AboutMe";
import ThemeChanger from "./shared/ThemeChanger/ThemeChanger";
import LoadingScreen from "./shared/LoadingScreen/LoadingScreen";
export const InitializeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, []);

  useEffect(() => {
    setTheme(window.localStorage.getItem("theme"));
  }, []);

  const handleThemeChange = () => {
    setTheme(!theme);
    window.localStorage.setItem("theme", !theme);
  };

  return (
    <InitializeContext.Provider value={{ handleThemeChange, theme, setTheme }}>
      <div data-theme={theme ? theme : "light"} className="bg-base-100">
        {loading ? <LoadingScreen /> : <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutMe" element={<AboutMe />} />
          <Route
            path="/toDoS"
            element={
              <RequireAuth>
                <ManageToDo />
              </RequireAuth>
            }
          />
          <Route
            path="/completed"
            element={
              <RequireAuth>
                <CompletedToDo />
              </RequireAuth>
            }
          />
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
          <Route
            path="dashboard"
            element={
              <RequireAdmin>
                <Dashboard />
              </RequireAdmin>
            }
          >
            <Route index element={<Welcome />} />
            <Route path="manageToDoS" element={<ManageToDoS />} />
            <Route path="manageUsers" element={<ManageUsers />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
        <ScrollToTop
          size={50}
          className="z-50"
          strokeFillColor="#9b7be7"
          bgColor="#fff"
          symbolSize={30}
          symbolColor="#9b7be7"
        />
        {loading ? null : <ThemeChanger />}
      </div>
    </InitializeContext.Provider>
  );
}

export default App;
