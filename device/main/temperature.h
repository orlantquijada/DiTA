// temperature.h
#ifndef TEMPERATURE_H
#define TEMPERATURE_H

#include <Arduino.h>

// Function declarations
void initTemperatureSensor();
float readTemperature();
float readHumidity();
float convertToFahrenheit(float celsius);

#endif
