import { useState, useEffect, useMemo, useCallback } from 'react'; 
import './App.scss';
import CountryDetail from './Components/CountryDetail';
import Body from './Components/CountryList';
import { Routes, Route, Navigate, useNavigate} from 'react-router-dom';




function App() {
  // State to handle list of countries 
  const [allCountries, setAllCountries] = useState([]);

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

  // State for theme settings, initialized based on localStorage
  const [themeChange, setThemeChange] = useState(() => {
    const isDark = localStorage.theme === "dark";
    return {
      backarrow: isDark ? "/assets/white-back-arrow.svg" : "/assets/back-arrow.svg",
      crescentMoon: isDark ? "/assets/white-crescent-moon.svg" : "/assets/crescent-moon.svg",
      dropdown: isDark ? "/assets/white-dropdown.svg" : "/assets/dropdown.svg",
      searchIcon: isDark ? "url(/assets/white-search.svg)" : "url(/assets/search.svg)",
      mode: isDark ? "Light" : "Dark"
    };
  });

  // Effect to apply dark mode styling based on localStorage setting
  useEffect(() => {
    const isDark = localStorage.theme === "dark";
  
    if (isDark) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    toggleMode(isDark);
  }, []);
  
  // Function to toggle dark mode and update localStorage
  function toggleMode(isDark) {
    setThemeChange({
      backarrow: isDark ? "/assets/white-back-arrow.svg" : "/assets/back-arrow.svg",
      crescentMoon: isDark ? "/assets/white-crescent-moon.svg" : "/assets/crescent-moon.svg",
      dropdown: isDark ? "/assets/white-dropdown.svg" : "/assets/dropdown.svg",
      searchIcon: isDark ? "url(/assets/white-search.svg)" : "url(/assets/search.svg)",
      mode: isDark ? "Light" : "Dark"
    });
  }

  function toggleTheme() {
    const isDark = document.body.classList.toggle("dark-mode");
    localStorage.theme = isDark ? "dark" : "light";
    toggleMode(isDark);
  }
  
  return (
    <>
      {/* Header with theme toggle */}
      <header className="mode">
        <h3>Where in the world?</h3>
        <button onClick={toggleTheme} className="text-mode">
          <img id="crescent-moon" src={themeChange.crescentMoon} alt="half moon for dark mode" />
        {themeChange.mode} Mode
        </button>
      </header>

      {/*<Body themeChange={themeChange} handleNavigation={handleNavigation} allCountries={allCountries}/>*/}

      <Routes>
        <Route path="/" element={<Body themeChange={themeChange} handleNavigation={handleNavigation} allCountries={allCountries}/>} />
        <Route path="/detail/:name" element={<CountryDetail 
        allCountries={allCountries}
        themeChange={themeChange}
        handleNavigation={handleNavigation}
        />} />
      </Routes>
    </>
  );
}

export default App;