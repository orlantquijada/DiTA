#include <Arduino.h>

/***********************************************************/
#define         Pin                     (32)  //Analog input 3 of your arduino
#define         Read_Resolution      (12)

/***********************************************************/

int cleanAve = 500;

void initSmokeSensor() {
  //set the resolution to 12 bits (0-4095)
  analogReadResolution(Read_Resolution);

  Serial.print("Calibrating please wait... ");
  // int calcR0 = 0;

  // for(int i = 1; i<=100; i ++)
  // {
  //   calcR0 += analogRead(Pin);
  //   Serial.print(".");
  //   delay(100);
  // }

  // cleanAve = calcR0/100;

  // Serial.print(cleanAve);
  Serial.println("  done!.");
}

int getAverage() {
  return cleanAve;
}

int readSmokeSensor() {
  int data = analogRead(Pin);

  Serial.printf("Smoke value = %d\n", data);

  return data;
}
