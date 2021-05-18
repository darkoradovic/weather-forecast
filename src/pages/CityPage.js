import axios from 'axios'
import moment from 'moment'
import React, { useContext, useEffect, useState } from 'react'
import { Col , Row, Container, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import LineChart from '../components/LineChart'
import { WeatherContext } from '../WeatherContext'

const CityPage = () => {

    const {setData} = useContext(WeatherContext) 
    const results = useContext(WeatherContext)
    
    console.log(results.results.main.temp)

    const API_KEY = 'baa188ec83f89bf8f7c82e429dbef294'
    const lat = results.results.coord.lat
    const lon = results.results.coord.lon

    useEffect(() => {
        const fetchData = async () => {
            await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly&appid=${API_KEY}`)
            .then((res) => {
                setData(res.data);
                console.log(res.data);
              });
        }

        fetchData()
    },[lat, lon, API_KEY, setData])



    const conversionC = results.results.main.temp - 273;
    return (
        <Container>
            <Row style={{textAlign:'left'}}>
                <Col>
                <h1>{results.results.name}</h1>
                <p>Date: {moment().format('DD-MM-YYYY')}</p>
                <p>Time: {moment().format('HH:mm')}</p>
                </Col>
                <Col lg={6}></Col>
                <Col>
                <h5>Current weaher details: </h5>
                <p>Temperature: {conversionC.toFixed(2)} °C</p>
                <p>Wind: {results.results.wind.speed} Km/h</p>
                <p>Humidity: {results.results.main.humidity} %</p>
                </Col>
            </Row>
            <Row lg={12}>
                 <LineChart /> 
            </Row>
            <Row>
               <Link to='/'><Button lg={4} style={{margin:'50px 0'}}>GO TO HOME PAGE</Button></Link>
            </Row>
           
        </Container>
    )
}

export default CityPage
