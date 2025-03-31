import { memo } from "react";

function Detail({country}) {
    return (
     <>
        <button id="back">Back</button>
        <div key={country.name} className="individual-country mode">
                <img src={country.flags.png} alt={`${country.name}'s flag`} />
                <div className="country-info">
                  <h3 className="large-text">{country.name}</h3>
                  <p className="small-bold-text">Native Name: <span className="small-text">{/*country.*/}</span></p>
                  <p className="small-bold-text">Population: <span className="small-text">{(country.population).toLocaleString()}</span></p>
                  <p className="small-bold-text">Sub Region: <span className="small-text">{/*country.*/}</span></p>
                  <p className="small-bold-text">Region: <span className="small-text">{country.region}</span></p>
                  <p className="small-bold-text">Capital: <span className="small-text">{country.capital}</span></p>

                  <p className="small-bold-text">Top Level Domain: <span className="small-text">{/*country.*/}</span></p>
                  <p className="small-bold-text">Currencies: <span className="small-text">{/*country.*/}</span></p>
                  <p className="small-bold-text">Languages: <span className="small-text">{/*country.*/}</span></p>

                  
                </div>
              </div>
     </>
    )
}