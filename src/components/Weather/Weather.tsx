import { useState, useEffect } from 'react'
// import WeatherDay from '../WeatherDay/WeatherDay'
import styles from './weather.module.scss'
import WeatherDay from '../WeatherDay/WeatherDay'

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
    const { data, loading, error } = useFetchWeatherData('Attiki')

    const currentDate = new Date().toDateString();

    return (
        <div className={styles.weatherCont}>
            {
                loading 
                    ? 'Loading...' 
                    : error ? `${error}`
                    : (!data) ? 'No data found.'
                    : <>
                        <div className={styles.today}>
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
                    </> 
            }
            
        </div>
    )
}

export default Weather