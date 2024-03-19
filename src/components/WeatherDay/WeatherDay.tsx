import styles from './weatherDay.module.scss'

interface WeatherDayProps {
    avgtemp_c: number,
    // rain_chance: number,
    dataDate: string,
    isToday: boolean,
    icon: string
    condition: string
}

const WeatherDay: React.FC<WeatherDayProps> = ({ avgtemp_c, dataDate, isToday, condition, icon }) => {

    const dateString = dataDate;
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { weekday: 'short' };

    return (
        <div className={styles.weatherDayCont}>
            <div className={styles.day}>
                {
                    isToday
                        ? 'Now'
                        : new Intl.DateTimeFormat('en-US', options).format(date)
                }
            </div>
            <div className={styles.icon}>
                <img src={icon} alt={condition} />
            </div>
            <div className={styles.temp}>{avgtemp_c}°C</div>
            {/* <div className={styles.rain}>
                {
                    isToday
                        ? condition
                        : `${rain_chance}%` 
                }
            </div> */}

        </div>
    )
}

export default WeatherDay