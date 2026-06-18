import {BrowserRouter, Routes, Route} from "react-router-dom"
import Product from "./Pages/Product";
import Pricing from "./Pages/Pricing";
import HomePage from "./Pages/HomePage";
import AppLayout from "./Pages/AppLayout";
import PageNotFound from "./Pages/PageNotFound";
import "./index.css"
import CityList from "./Components/CityList";
import { useState, useEffect } from "react";
import Login from "./Pages/Login";


const BASE_URL = "http://localhost:8000";

function App(){
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

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

    return<BrowserRouter>
        <Routes>
            <Route index element={<HomePage/>}/>
            <Route path="product" element={<Product/>}/>
            <Route path="pricing" element={<Pricing/>}/>
            <Route path="app" element={<AppLayout/>}>
                <Route index element={<CityList cities={cities} isLoading={isLoading} />}/>
                <Route path="cities" element={<CityList/>}/>
                <Route path="countries" element={<p>list of countrues</p>}/>
                <Route path="form" element={<p>form</p>}/>
            </Route>
            <Route path="login" element={<Login/>}/>
            <Route path="*" element={<PageNotFound/>}/>
        </Routes>
    </BrowserRouter>
}
export default App;