import { memo } from "react";
import { useParams } from "react-router-dom";

function CountryDetail({ handleNavigation, isDark, allCountries }) {
  const { name } = useParams();
  const country = allCountries.find(country => country.name === name);

  if (!country) { return <p>Country not found</p> }
  const borderCountries = [];
  const countryLookup = new Map();
  allCountries.forEach(country => countryLookup.set(country.alpha3Code, country.name));

  let noBorderCountries = false;

  if (country.borders) {
    country.borders.forEach(code => {
      borderCountries.push(countryLookup.get(code));
    });
  } 

  if (borderCountries.length === 0) {
    noBorderCountries = true;
  }
  
    return (
     <>
        <button className="back-button mode text-mode" onClick={() => handleNavigation("/")}>
          <img src={isDark ? "/assets/white-back-arrow.svg" : "/assets/back-arrow.svg"} alt="back arrow" /> 
          Back
          </button>
        <div key={country.name} id="country-details">              
        <div id="section-1">
          <img src={country.flags.png} alt={`${country.name}'s flag`} />
        </div>
                  <div id="section-2">
                    <h3 className="large-text">{country.name} </h3>
                    <p className="small-bold-text">Native Name: <span className="small-text">{country.nativeName || "N/A"}</span></p>
                    <p className="small-bold-text">Population: <span className="small-text">{country.population ? country.population.toLocaleString() : "N/A"}</span></p>
                    <p className="small-bold-text">Region: <span className="small-text" id="region">{country.region}</span></p>
                    <p className="small-bold-text">Sub Region: <span className="small-text">{country.subregion || "N/A"}</span></p>
                    <p className="small-bold-text">Capital: <span className="small-text" id="capital">{country.capital || "N/A"}</span></p>
                  </div>
        
                  <div id="section-3">
                    <p className="small-bold-text">Top Level Domain: <span className="small-text">{country.topLevelDomain}</span></p>
                    <p className="small-bold-text">Currencies: <span className="small-text">{country.currencies?.length ? country.currencies.map(e => e.name).join(", ") : "N/A"}</span></p>
                    <p className="small-bold-text">Languages: <span className="small-text">{country.languages?.length ? country.languages.map(e => e.name).join(", ") : "N/A"}</span></p>
                  </div>

                  <div id="section-4">
                    <h4>Border Countries:</h4>
                    <div>

                    </div>
                    {
                      noBorderCountries ?
                        <span className="mode">No Acknowledged Border Country</span>
                       : borderCountries?.map(borderCountryName => <span className="mode" key={borderCountryName}>{borderCountryName}</span>)
                    }
                  </div>              
        </div>
     </>
    )
}

export default memo(CountryDetail);