import { useState, useEffect } from 'react'; 
import './App.scss';

function App() {
  // State to store the list of countries
  const [countries, setCountries] = useState([]);
  
  // State to track the selected region
  const [region, setRegion] = useState("");
  
  // State to store the country name input for searching
  const [countryName, setCountryName] = useState("");
  
  // State for theme settings, initialized based on localStorage
  const [themeChange, setThemeChange] = useState(() => {
    const isDark = localStorage.theme === "dark";
    return {
      crescentMoon: isDark ? "/assets/white-crescent-moon.svg" : "/assets/crescent-moon.svg",
      dropdown: isDark ? "/assets/white-dropdown.svg" : "/assets/dropdown.svg",
      searchIcon: isDark ? "url(/assets/white-search.svg)" : "url(/assets/search.svg)"
    };
  });

  // Updates the selected region and clears the country name filter
  function searchRegion(region) {
    setRegion(region);
    setCountryName("");
  }
  
  // Updates the country name filter and clears the region selection
  function searchCountryName({ target }) {
    setCountryName(target.value);
    setRegion("");
  }
  
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
      .then(result => {
        setCountries(result.filter(testCountry));
      })
      .catch(error => console.log(`An Error Occurred: ${error.message}`));
  }, [region, countryName]);
  
  // Function to filter countries based on search criteria
  function testCountry(country) {
    if (countryName) {
      return country.name.toLowerCase().includes(countryName.toLowerCase());
    }
    if (region) {
      return country.region === region;
    }
    return true;
  }
  
  // Effect to apply dark mode styling based on localStorage setting
  useEffect(() => {
    const isDark = localStorage.theme === "dark";
  
    if (isDark) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  
    setThemeChange({
      crescentMoon: isDark ? "/assets/white-crescent-moon.svg" : "/assets/crescent-moon.svg",
      dropdown: isDark ? "/assets/white-dropdown.svg" : "/assets/dropdown.svg",
      searchIcon: isDark ? "url(/assets/white-search.svg)" : "url(/assets/search.svg)"
    });
  }, []);
  
  // Function to toggle dark mode and update localStorage
  function toggleTheme() {
    const isDark = document.body.classList.toggle("dark-mode");
    localStorage.theme = isDark ? "dark" : "light";
  
    setThemeChange({
      crescentMoon: isDark ? "/assets/white-crescent-moon.svg" : "/assets/crescent-moon.svg",
      dropdown: isDark ? "/assets/white-dropdown.svg" : "/assets/dropdown.svg",
      searchIcon: isDark ? "url(/assets/white-search.svg)" : "url(/assets/search.svg)"
    });
  }
  
  return (
    <>
      {/* Header with theme toggle */}
      <header className="mode">
        <h2>Where in the world?</h2>
        <button onClick={toggleTheme} className="text-mode">
          <img id="crescent-moon" src={themeChange.crescentMoon} alt="half moon for dark mode" />
          Dark Mode
        </button>
      </header>
      
      {/* Main search and filter section */}
      <main>
        <form>
          <input className="mode text-mode" type="text" placeholder="Search for a country..." 
            style={{ backgroundImage: themeChange.searchIcon }} value={countryName} 
            onChange={(e) => searchCountryName(e)} />
          <div className="regions-search-holder">
            <div className="regions-search mode">
              <span>{region || "Filter By Region"}</span>
              <img id="dropdown" src={themeChange.dropdown} alt="dropdown arrow"/>
            </div>
            {/* Region selection dropdown */}
            <ul className="regions-list mode">
              <li onClick={() => searchRegion("Africa")}>Africa</li>
              <li onClick={() => searchRegion("Americas")}>Americas</li>
              <li onClick={() => searchRegion("Asia")}>Asia</li>
              <li onClick={() => searchRegion("Europe")}>Europe</li>
              <li onClick={() => searchRegion("Oceania")}>Oceania</li>
              <li onClick={() => searchRegion("")}>All Regions</li>
            </ul>
          </div> 
        </form>
        
        {/* Display country cards */}
        <div id="countries-container">
          {countries?.map(country => {
            return ( 
              <div key={country.name} className="individual-country mode">
                <img src={country.flags.png} alt={`${country.name}'s flag`} />
                <div className="country-info">
                  <p className="large-text">{country.name}</p>
                  <p className="small-bold-text">Population: <span className="small-text">{(country.population).toLocaleString()}</span></p>
                  <p className="small-bold-text">Region: <span className="small-text">{country.region}</span></p>
                  <p className="small-bold-text">Capital: <span className="small-text">{country.capital}</span></p>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}

export default App;