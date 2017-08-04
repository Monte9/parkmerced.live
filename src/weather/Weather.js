// original source code: https://github.com/IonicaBizau/react-weather-app
// All credit for this Weather module is due to the above author

import React, { Component } from 'react';
import './Weather.css';

const WUNDERGROUND_KEY = "20aa5779261e4fad";

const ICON_SET = {
    chancesleet: "snowy",
    chancesnow: "snowy",
    clear: "sunny",
    flurries: "snowy",
    fog: "cloudy",
    hazy: "cloudy",
    rain: "rainy",
    chancerain: "rainy",
    sleet: "snowy",
    snow: "snowy",
    chanceflurries: "snowy",
    tstorms: "stormy",
    chancetstorms: "stormy",
    sunny: "sunny",
    mostlysunny: "sunny",
    partlysunny: "sunny",
    partlycloudy: "cloudy",
    mostlycloudy: "cloudy",
    cloudy: "cloudy"
};

const SUPPORTED_LANGUAGES = [
    "AF", "AL", "AR", "HY", "AZ",
    "EU", "BY", "BU", "LI", "MY",
    "CA", "CN", "TW", "CR", "CZ",
    "DK", "DV", "NL", "EN", "EO",
    "ET", "FA", "FI", "FR", "FC",
    "GZ", "DL", "KA", "GR", "GU",
    "HT", "IL", "HI", "HU", "IS",
    "IO", "ID", "IR", "IT", "JP",
    "JW", "KM", "KR", "KU", "LA",
    "LV", "LT", "ND", "MK", "MT",
    "GM", "MI", "MR", "MN", "NO",
    "OC", "PS", "GN", "PL", "BR",
    "PA", "RO", "RU", "SR", "SK",
    "SL", "SP", "SI", "SW", "CH",
    "TL", "TT", "TH", "TR", "TK",
    "UA", "UZ", "VU", "CY", "SN",
    "JI", "YI"
];

const DAYS = [ "SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"]

function getIcon(icon) {
  return ICON_SET[icon];
}

function getTemp (text) {
  return (text.match(/(\-?[0-9]+)/) || [])[1];
}


class Weather extends Component {
  constructor (props) {
    super(props);
    this.state = {};

    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        this.setState({
          coordinates: pos.coords
        });
        this.check();
      }, () => {
        this.check();
      }, options);
    }

    this.check();

    setInterval(() => this.check(), 10 * 60 * 1000);
  }

  check () {
      fetch("https://ipinfo.io/json")
        .then(res => res.json())
        .then(ip => {
            let lang = ip.country;
            if (!SUPPORTED_LANGUAGES.includes(lang)) {
                lang = "EN";
            }
            let crd = this.state.coordinates;
            crd = crd || {
                latitude: +ip.loc.split(",")[0]
              , longitude: +ip.loc.split(",")[1]
            }
            const query = [crd.latitude, crd.longitude].join(",");
            const WUNDERGROUND_URL = `https://api.wunderground.com/api/${WUNDERGROUND_KEY}/forecast/lang:${lang}/q/${query}.json`;
            return fetch(WUNDERGROUND_URL)
        })
        .then(c => c.json())
        .then(forecast => {
            this.setState({
                forecast
            });
        });
  }

  padTime(n) {
    return (n < 10) ? '0' + n : n;
  }

  displayTime() {
    const date_data = new Date();
    const hours = date_data.getHours();
    const mins = date_data.getMinutes();
    const sec = date_data.getSeconds();
    const day = DAYS[date_data.getDay()];

    const date = this.padTime(hours) + ":" + this.padTime(mins) + " AM"

    return (
      <div className="left-container">
        <div className="left-time">{date}</div>
        <div className="left-day">{day}</div>
      </div>
    )
  }

  renderWeatherToday () {
      const today = this.state.forecast.forecast.txt_forecast.forecastday[0];
      const temp = getTemp(today.fcttext);

      let icon = getIcon(today.icon);
      let hours = new Date().getHours();
      if ((icon === "sunny" || icon === "clear") && (hours > 20 || hours < 7)) {
          icon = "starry";
      }

      return (
        <div className="weather-today">
          <div className="top-container">
            {this.displayTime()}
            { temp &&
              <div className="right-container">
                <div className="big-temp">{temp}</div>
              </div>
            }
          </div>
          <div className="border" />
          <p className="icon-description">{today.fcttext}</p>
        </div>
      );
  }

  render() {
    if (!this.state.forecast) {
      return (
        <div className="weather-container">
          <p className="loading-label">Loading...</p>
        </div>
      );
    }
    return (
      <div>
        {this.renderWeatherToday()}
      </div>
    );
  }
}

export default Weather;
