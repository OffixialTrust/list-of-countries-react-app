import { useState, useEffect, memo } from 'react'; 

function Body({allCountries, handleNavigation, isDark}) {
  
      // State to store the list of countries
  const [countries, setCountries] = useState([]);
  
  // State to track the selected region
  const [region, setRegion] = useState("");
  
  // State to store the country name input for searching
  const [countryName, setCountryName] = useState("");

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
    
  useEffect(() => {
    setCountries(allCountries.filter(testCountry));
  }, [allCountries, region, countryName]);
      
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

  return(
    <>
      {/* Main search and filter section */}
      <main>
      <button id="top-btn" className="mode"><a href="#" className="mode">Top</a></button>

        <form onSubmit={e => e.preventDefault()}>
          <input className="mode text-mode" type="text" placeholder="Search for a country..." 
            style={   isDark ? { backgroundImage: "url(/assets/white-search.svg)" } : { backgroundImage: "url(/assets/search.svg)" }} value={countryName} 
            onChange={(e) => searchCountryName(e)} />
          <div className="regions-search-holder">
            <div className="regions-search mode">
              <span>{region || "Filter By Region"}</span>
              <img id="dropdown" src={isDark ? "/assets/white-dropdown.svg" : "/assets/dropdown.svg"} alt="dropdown arrow"/>
            </div>
            {/* Region selection dropdown */}
            <ul className="regions-list mode">
              <li onClick={() => searchRegion("Africa")}>Africa</li>
              <li onClick={() => searchRegion("Americas")}>Americas</li>
              <li onClick={() => searchRegion("Asia")}>Asia</li>
              <li onClick={() => searchRegion("Europe")}>Europe</li>
              <li onClick={() => searchRegion("Oceania")}>Oceania</li>
              <li onClick={() => searchRegion("Polar")}>Polar</li>
              <li onClick={() => searchRegion("")}>All Regions</li>
            </ul>
          </div> 
        </form>
        
        {/* Display country cards */}
        <div id="countries-container">
          {countries?.map(country => {
            return ( 
              <div key={country.name} className="individual-country mode" onClick={() => handleNavigation(`/detail/${country.name}`)}>
                <img src={country.flags.png} alt={`${country.name}'s flag`} />
                <div className="country-info">
                  <h2 className="large-text">{country.name}</h2>
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

export default memo(Body);