#include <NetworkClientSecure.h>
#include <WiFi.h>
#include "LCDIC2.h"

// #include "temperature.h"
#include "mq2.h"

// LCDIC2 lcd(0x27, 20, 4);

#define BUTTON_PIN 5
#define LED_PIN 2
#define DEVICE_ID "device001"

const String latitude = "10.33028";
const String longitude = "123.87722";

// WiFi library can't be separated
const char *ssid = "Tabi";          // Change this to your WiFi SSID
const char *password = "avreg$^DF456^";  // Change this to your WiFi password
// const char *ssid = "TinRam";          // Change this to your WiFi SSID
// const char *password = "tinram053787";  // Change this to your WiFi password

const char *host = "di-ta-web-app.vercel.app";        // Change to backend api
const int httpPort = 443;                        // Change to backend port
const String apiKey = "tIBDRV12mxvwcQTUHx/GCvumG+oVHyNR7Gi3SNJLiLE=";  // Change this to backend API key

bool hasFire = false;

void initWifi() {
  Serial.println();
  Serial.println("******************************************************");
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void readResponse(NetworkClient *client) {
  unsigned long timeout = millis();
  while (client->available() == 0) {
    if (millis() - timeout > 5000) {
      Serial.println(">>> Client Timeout !");
      client->stop();
      return;
    }
  }

  // Read all the lines of the reply from server and print them to Serial
  while (client->available()) {
    String line = client->readStringUntil('\r');
    Serial.print(line);
  }

  Serial.printf("\nClosing connection\n\n");
}

void pingClient() {
  NetworkClientSecure client;
  client.setInsecure();
  
  String readRequest = String("GET /api/ping HTTP/1.1\r\nHost: ") + host + "\r\n"
                       + "Connection: close\r\n\r\n";

  if (!client.connect(host, httpPort)) {
    Serial.printf("\nCan't connect to client\n\n");
    return;
  }

  client.print(readRequest);
  readResponse(&client);
}


void sendData(bool isOnFire, int smokeValue) {
  NetworkClientSecure client;
  client.setInsecure();
  
  String readRequest = String("POST /api/fires HTTP/1.1\r\nHost: ")
                      + host
                      + "\r\nContent-Type: application/json"
                      + "\r\nAuthorization: Bearer "
                      + "\r\nContent-Length: "
                      + apiKey
                      + "\r\n\r\n{\r\n    \"latitude\": " + latitude + ",\r\n"
                      + "    \"longitude\": " + longitude + ",\r\n"
                      + "    \"deviceId\": \"" + DEVICE_ID + "\",\r\n"
                      + "    \"smokeValue\": " + smokeValue + "\r\n"
                      + "}\r\n"
                      + "Connection: close\r\n\r\n";
  Serial.println(readRequest);
  if (!client.connect(host, httpPort)) {
    Serial.printf("\nCan't connect to client\n\n");
    return;
  }

  client.print(readRequest);
  readResponse(&client);
}

// -------------------------------------------------------------------------------------------------

void setup() {
  Serial.begin(115200);

  // lcd.begin();
  // lcd.print("Setting up..");

  pinMode(LED_PIN, OUTPUT);

  initWifi();
  // initTemperatureSensor();
  initSmokeSensor();
}

void loop() {
    // lcd.clear();
    // float temp = readTemperature();
    int smoke = readSmokeSensor();
    int cleanAve = getAverage();

    // lcd.setCursor(0, 0);
    // lcd.print("Longitude:" + longitude);
    // lcd.setCursor(0, 1);
    // lcd.print("Latitude:" + latitude);
    // lcd.setCursor(0, 2);
    // lcd.print("Smoke:" + String(smoke));

    // lcd.setCursor(0, 3);
    if (cleanAve < smoke) {
      sendData(true, smoke);
      digitalWrite(LED_PIN, HIGH);
      // lcd.print("On Fire!!!");
      delay(10000);
    } else {
      digitalWrite(LED_PIN, LOW);
      // lcd.print("All Clear");
      delay(1000);
    }

    // pingClient();
}
