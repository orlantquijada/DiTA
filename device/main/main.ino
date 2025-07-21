#include <WiFi.h>

#include "temperature.h"

// WiFi library can't be separated
const char *ssid = "your-ssid";          // Change this to your WiFi SSID
const char *password = "your-password";  // Change this to your WiFi password

const char *host = "api.thingspeak.com";        // Change to backend api
const int httpPort = 80;                        // Change to backend port
const String channelID = "2005329";             // Unneeded
const String apiKey = "V6YOTILH9I7D51F9";  // Change this to backend API key

// The default example accepts one data filed named "field1"
// For your own server you can ofcourse create more of them.
int field1 = 0;

int numberOfResults = 3;  // Number of results to be read
int fieldNumber = 1;      // Field number which will be read out

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

void sampleWifiFunction() {
  NetworkClient client;
  String footer = String(" HTTP/1.1\r\n") + "Host: " + String(host) + "\r\n" + "Connection: close\r\n\r\n";

  // WRITE --------------------------------------------------------------------------------------------
  if (!client.connect(host, httpPort)) {
    return;
  }

  client.print("GET /update?api_key=" + apiKey + "&field1=" + field1 + footer);
  readResponse(&client);

  // READ --------------------------------------------------------------------------------------------

  String readRequest = "GET /channels/" + channelID + "/fields/" + fieldNumber + ".json?results=" + numberOfResults + " HTTP/1.1\r\n" + "Host: " + host + "\r\n"
                       + "Connection: close\r\n\r\n";

  if (!client.connect(host, httpPort)) {
    return;
  }

  client.print(readRequest);
  readResponse(&client);

  ++field1;
}

// -------------------------------------------------------------------------------------------------

void setup() {
  Serial.begin(115200);
  initWifi();
  initTemperatureSensor();
}

void loop() {
    float temp = readTemperature();
    sampleWifiFunction();
    delay(1000);
}
