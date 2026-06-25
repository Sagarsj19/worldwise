import { createContext, useState, useEffect, useContext } from "react"
const BASE_URL = "http://localhost:8000";
const CitiesContext= createContext();

function CitiesProvider({children}){
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentCity, setCity] = useState([]);

    async function createCity(newCity) {
    try {
        setIsLoading(true);

        const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
            "Content-Type": "application/json",
        },
        });

        const data = await res.json();

        setCities(cities => [...cities, data]);
    } catch {
        alert("Their is error while creating city");
    } finally {
        setIsLoading(false);
    }
    }

    async function deleteCity(id) {
    try {
        setIsLoading(true);
        await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE"
        });
        setCities((cities) => cities.filter((city) => city.id != id));
    } catch {
        alert("Their is error while deleting city");
    } finally {
        setIsLoading(false);
    }
    }

    useEffect(function () {
        async function fetchCities() {
             try {
                setIsLoading(true);
                const response = await fetch(`${BASE_URL}/cities`);
                const data = await response.json();
                setCities(data);
            } catch {
                alert("Error while fetching data");
            } finally{
                setIsLoading(false);
            }
        }
        fetchCities();
    }
    , []);

    async function getCity(id){
        try {
                setIsLoading(true);
                const response = await fetch(`${BASE_URL}/cities/${id}`);
                const data = await response.json();
                setCity(data);
            } catch {
                alert("Error while fetching data");
            } finally{
                setIsLoading(false);
            }
    }

    return (
        <CitiesContext.Provider value={{
            cities,
            isLoading,
            currentCity,
            getCity,
            createCity,
            deleteCity
        }} >
            {children}
        </CitiesContext.Provider>
    );
}

function useCities(){
    const context = useContext(CitiesContext);
    if(context === undefined) throw new Error("Cities context used outside the citiesProvider");
    return context;
}

export {CitiesProvider, useCities};