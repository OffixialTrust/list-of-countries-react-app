import { useState, useEffect, useCallback } from 'react'; 
import './App.scss';
import CountryDetail from './Components/CountryDetail';
import Body from './Components/CountryList';
import { Routes, Route, ScrollRestoration, useNavigate} from 'react-router-dom';




function App() {
  // State to handle list of countries 
  const [allCountries, setAllCountries] = useState([]);
 
  // State for theme settings, initialized based on localStorage
 const [isDark, setIsDark] = useState(() => {
  if (localStorage.theme === "dark") {
    return true;
  } else {
    return false;
  }
 });

  // Fetch country data on component mount and when filters change
  useEffect(() => {
    async function fetchData(url) {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch data");
        return await response.json();
      } catch (error) {
        console.error("Error fetching countries:", error.message);
        return [];
      }
    }     
        
    fetchData("/data.json")
      .then(result => setAllCountries(result))
      .catch(error => console.log(`An Error Occurred: ${error.message}`));
  }, []);
  // Handling navigation
  const navigate = useNavigate();
  const handleNavigation = useCallback((path) => navigate(path));

  // Function to toggle dark mode and update localStorage
  function toggleTheme() {
    setIsDark(prev => !prev);
  }
  
  // Effect to apply dark mode styling based on localStorage setting
  useEffect(() => {  
    if (isDark) {
      document.body.classList.add("dark-mode");
      localStorage.theme = "dark";
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.theme = "light";
    }
  }, [isDark]);
  
  return (
    <>
      {/* Header with theme toggle */}
      <header className="mode">
        <h3>Where in the world?</h3>
        <button onClick={toggleTheme} className="text-mode">
          <img id="crescent-moon" src={isDark ? "/assets/white-crescent-moon.svg" : "/assets/crescent-moon.svg"} alt="half moon for dark mode" />
        {isDark ? "Light" : "Dark"} Mode
        </button>
      </header>

      <Routes>
        <Route path="/" element={<Body isDark={isDark} handleNavigation={handleNavigation} allCountries={allCountries}/>} />
        <Route path="/detail/:name" element={<CountryDetail 
        allCountries={allCountries}
        isDark={isDark}
        handleNavigation={handleNavigation}
        />} />
      </Routes>

      <ScrollRestoration />
    </>
  );
}

export default App;