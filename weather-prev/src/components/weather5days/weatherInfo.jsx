import './WeatherInformations5days.css';

function WeatherInformations5days({ weather5days }) {

    const dailyForecasts = {}

    for(let forecast of weather5days.list) {
        const date = new Date(forecast.dt * 1000).toLocaleDateString()
        if(!dailyForecasts[date]) {
            dailyForecasts[date] = forecast
        }
    }

    const nextFiveDays = Object.values(dailyForecasts).slice(1, 6);

    

    return (
        <div className='weather-container'>
            <p>5 Days</p>
        </div>
    );
}

export default WeatherInformations5days;