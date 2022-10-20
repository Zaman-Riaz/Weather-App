import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Image, ImageBackground } from 'react-native';

function Weather() {
    let apiKey = '61c4ac1c0d7842844b95bc5b82b16163';
    const [searchCity, setSearchCity] = useState('');
    const [weather, setWeather] = useState();

    const searchWeather = async () => {
        let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&units=metric&appid=${apiKey}`;
        try {
            let response = await fetch(apiURL);
            let actualData = await response.json();
            console.log('Actual data', actualData);

            if (actualData) {
                setWeather(actualData);
                setSearchCity('');
            }

        }
        catch (error) {
            console.log('error found', error.response)
            setWeather(error.response)
        }
    }

    useEffect(() => {
        console.log('Data found: ', weather);
        console.log('Type of weather', typeof (weather))
    }, [weather]);


    return (

        <>
            <ImageBackground
                source={require('../src/assets/bg.jpg')}
                resizeMode='stretch'
                style={{
                    flex: 1
                }}
            >
                <View style={{ flex: 1, padding: 20 }}>

                    {/* Search bar */}
                    <View style={styles.searchSection}>
                        <TextInput
                            style={{ color: 'white' }}
                            placeholder=' Enter city name to search '
                            value={searchCity}
                            onChangeText={(text) => setSearchCity(text)}
                        />
                    </View>

                    <Button
                        title='search'
                        onPress={searchWeather}
                    />


                    <View style={styles.body}>
                        <Text>

                            {
                                (weather?.cod != "400" && weather?.cod != "404") ?
                                    <Text style={styles.tempText}>
                                        {
                                            weather?.cod != 200 ? null :
                                                (Math.round(weather?.main?.temp) + '°C')
                                        }
                                    </Text>
                                    :
                                    <Text style={styles.errMsg}>
                                        {weather?.message}
                                    </Text>
                            }
                            {
                                weather?.cod != 200 ? null :
                                    <Image
                                        style={{
                                            width: 120,
                                            height: 120,
                                        }}
                                        source={{ uri: `https://openweathermap.org/img/w/${weather?.weather[0]?.icon}.png` }}
                                    />
                            }

                            <View>
                                {
                                    weather?.cod != 200 ? null :
                                        <Text style={styles.title}>
                                            {weather?.weather[0].description}
                                        </Text>
                                }
                                {
                                    weather?.cod != 200 ? null :
                                        <Text style={styles.subTitle}>
                                            {('Humidity ' + weather?.main?.humidity + '%')}
                                        </Text>
                                }
                                {
                                    <Text style={styles.subTitle}>
                                        {weather?.name}
                                    </Text>
                                }
                            </View>

                        </Text>

                    </View>
                </View>
            </ImageBackground>
        </>
    )
}

const styles = StyleSheet.create({
    searchSection: {
        width: '88%',
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 22,
        margin: 22,
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    body: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        paddingLeft: 25,
        marginBottom: 40
    },
    tempText: {
        fontSize: 45,
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '4%',
        color: '#fff'
    },
    title: {
        fontSize: 45,
        textTransform: 'capitalize',
        color: '#fff'
    },
    subTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff'
    },
    errMsg: {
        fontSize: 22,
        fontWeight: 'bold',
        textTransform: 'capitalize',
        color: '#fff'
    }
})



export default Weather