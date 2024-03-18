import styles from './loader.module.scss'

export default function Loader() {
    return (
        <div className={styles.loaderCont}>
            <div className={styles.loader}></div>
        </div>
    )
}
