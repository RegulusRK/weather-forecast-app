import './weatherInfo.css';

function WeatherInformations({ weather }) {
  // Format the sunrise and sunset times
  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Add animation class on data update
  const weatherContainerClass = "weather-container" + (weather ? " update" : "");

  return (
    <div className={weatherContainerClass}>
      <h2>{weather.name}, {weather.sys.country}</h2>
      
      <div className="weather-main">
        <img 
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={weather.weather[0].description}
        />
        <p className="temperature">{Math.round(weather.main.temp)}°C</p>
      </div>
      
      <p className="description">{weather.weather[0].description}</p>
      
      <div className="details">
        <p>
          Feels Like
          <strong>{Math.round(weather.main.feels_like)}°C</strong>
        </p>
        <p>
          Humidity
          <strong>{weather.main.humidity}%</strong>
        </p>
        <p>
          Wind Speed
          <strong>{(weather.wind.speed * 3.6).toFixed(1)} km/h</strong>
        </p>
        <p>
          Pressure
          <strong>{weather.main.pressure} hPa</strong>
        </p>
      </div>
    </div>
  );
}

export default WeatherInformations;