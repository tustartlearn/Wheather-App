import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from "@mui/material";

const API_KEY = "c9139ed84eb24f946fd55ca06eae36c8"; // Replace with your OpenWeatherMap API key

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const getWeather = async () => {
    if (!city) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
      setError("");
    } catch (err) {
      setError("City not found");
      setWeather(null);
    }
    setLoading(false);
  };

  return ( 
   
    <Box
      sx={{
        textAlign: "center",
        mt: 5,
        px: 2,
      }}
    >
      <Typography variant="h4" gutterBottom>
        🌦️ Weather App
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 3 }}>
        <TextField
          label="Enter city name"
          variant="outlined"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <Button variant="contained" onClick={getWeather}>
          Get Weather
        </Button>
      </Box>

      {loading && <CircularProgress />}

      {error && (
        <Typography color="error" variant="body1" gutterBottom>
          {error}
        </Typography>
      )}

      {weather && (
        <Card
          sx={{
            // maxWidth: 400,
            // margin: "0 auto",
            // p: 2,
            // backgroundColor: "#f5f5f5",
          }}
        >
      <Card
  sx={{
    width: "50%",           
    maxWidth:300,               
    mx: "auto",                   
    mt:1 ,
    p: 2,
    backgroundColor: "#57564F",    
              
  }}
>
  <CardContent>
    <Typography variant="h5" gutterBottom>
      {weather.name}
    </Typography>

    <Typography variant="subtitle1" gutterBottom sx={{ textTransform: "capitalize" }}>
      {weather.weather[0].description}
    </Typography>

    <Typography variant="h6" gutterBottom>
       {weather.main.temp}°C
    </Typography>

    <Box mt={2}>
      <img
        alt="weather icon"
        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
      />
    </Box>
  </CardContent>
</Card>


        </Card>
      )}
    </Box> 
  );
}
