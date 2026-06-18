import styles from './CityList.module.css';
import Spinner from "./Spinner"
import City from "./City"

function CityList({cities, isLoading}) {
    
    if(isLoading) return(<Spinner/>);
    
    return (
        <ul className={styles.CityList}>
            {cities.map((city)=>{
                <City city={city} key={city.id}/>
            })}
        </ul>
    );
}

export default CityList;