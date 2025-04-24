import './weatherInfo5days.css';

function WeatherInformations5days({ weather5days }) {
  // Process data to get one forecast per day
  let dailyForecasts = {};

  for (let forecast of weather5days.list) {
    const date = new Date(forecast.dt * 1000).toLocaleDateString();
    if (!dailyForecasts[date]) {
      dailyForecasts[date] = forecast;
    }
  }

  const nextFiveDays = Object.values(dailyForecasts).slice(1, 6);

  // Convert timestamp to readable day name
  function formatDay(date) {
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayIndex = new Date(date.dt * 1000).getDay();
    return dayNames[dayIndex];
  }

  return (
    <div className="forecast-container">
      <h3>5-Day Forecast</h3>
      
      <div className="forecast-grid">
        {nextFiveDays.map((forecast, index) => (
          <div 
            key={forecast.dt} 
            className="weather-item" 
            style={{"--item-index": index}}
          >
            <p className="day-name">{formatDay(forecast)}</p>
            <img 
              src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`} 
              alt={forecast.weather[0].description} 
            />
            <p className="weather-description">{forecast.weather[0].description}</p>
            <div className="temperature-range">
              <span className="min-temp">{Math.round(forecast.main.temp_min)}°</span>
              <span>/</span>
              <span className="max-temp">{Math.round(forecast.main.temp_max)}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeatherInformations5days;