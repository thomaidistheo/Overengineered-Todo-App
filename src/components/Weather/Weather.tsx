import { useState, useEffect } from 'react'
// import WeatherDay from '../WeatherDay/WeatherDay'
import WeatherDay from '../WeatherDay/WeatherDay'
import { IconArrowDown, IconArrowUp } from '../Icons'
import styles from './weather.module.scss'

interface FetchError {
    message: string
    statusCode?: number
}

interface WeatherForecastProps {
    error: {
        code: number,
        message: string
    }
    location: {
        name: string,
        region: string,
        country: string,
        lat: number,
        lon: number,
    },
    current: {
        temp_c: number,
        is_day: number,
        condition: {
            text: string,
            icon: string,
        },
    },
    forecast: {
        forecastday: [
            {
                date: string,
                day: {
                    avgtemp_c: number,
                    daily_chance_of_rain: number,
                    daily_chance_of_snow: number
                    condition: {
                        text: string,
                        icon: string,
                    }
                }
            }
        ]
    }
}

const useFetchWeatherData = (query: string) => {
    const [data, setData] = useState<WeatherForecastProps | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    
    useEffect(() => {
        const fetchWeather = async () => {
            if (!query) {
                setLoading(false);
                return; // Early return if query is empty
            }
            
            setLoading(true)
            try {
                const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHERAPI_KEY}&q=${query}&days=5&aqi=no&alerts=no`)
                const data: WeatherForecastProps = await response.json()

                if (!response.ok) {
                    throw new Error(data.error?.message || 'Network response was not ok');
                }

                setData(data)
            } catch (error) {
                const fetchError: FetchError = {
                    message: (error instanceof Error) ? error.message : 'Unknown error',
                    statusCode: (error instanceof Response) ? error.status : undefined
                }
                setError(fetchError.message)
            } finally {
                setLoading(false)
            }
        }

        fetchWeather()
    }, [query])

    return { data, loading, error }
}

// Example component using the custom hook
const Weather: React.FC = () => {
    const [locationQuery, setLocationQuery] = useState('');
    const [weatherOpen, setWeatherOpen] = useState<boolean>(true)

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            setLocationQuery(`${latitude},${longitude}`);
        }, (err) => {
            console.error(err);
            setLocationQuery('LocationPermissionDenied') // Use a fallback location or handle error
            setWeatherOpen(false) 
        });
    }, []);

    const { data, loading, error } = useFetchWeatherData(locationQuery)
    console.log('locationQuery: ', locationQuery)

    const currentDate = new Date().toDateString();

    return (
        <div className={`${styles.weatherCont} ${weatherOpen ? styles.weatherVisible : styles.weatherNotVisible}`}>
            {
                loading 
                    ? 'Loading...' 
                    : error ? <div className={styles.error}>{error}</div>
                    : !data ? 'No data found.'
                    : weatherOpen && <div className={styles.weather}>
                        <div className={`${styles.today}`}>
                            <WeatherDay 
                                dataDate={currentDate}
                                avgtemp_c={data.current.temp_c}
                                condition={data.current.condition.text}
                                icon={data.current.condition.icon}
                                isToday={true}
                            />
                        </div>
                        {data && data.forecast.forecastday.map((day, index) => (
                            <WeatherDay 
                                key={index}
                                avgtemp_c={day.day.avgtemp_c}
                                // rain_chance={day.day.daily_chance_of_rain}
                                dataDate={day.date}
                                isToday={false}
                                icon={day.day.condition.icon}
                                condition={day.day.condition.text}
                            />
                        ))}
                    </div> 
            }
            <button className={styles.weatherBtn} onClick={() => setWeatherOpen(!weatherOpen)}>
                {!weatherOpen 
                    ? <IconArrowDown 
                        height="24"
                        width="24"
                        // color="#000"
                    />
                    : <IconArrowUp 
                        height="24"
                        width="24"
                        // color="#000"
                    />
                }
            </button>
        </div>
    )
}

export default Weather