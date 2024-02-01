void setup() {
  Serial.begin(115200);
  while(!Serial) {
    printf("Waiting to connect."); // wait for the serial port to connect. 
  }
}

const char TERMINATOR = '|';

void loop() {
  // put your main code here, to run repeatedly:
  if (Serial.available() > 0) {
    // char messageBuffer[32];
    // int size = Serial.readBytesUntil('\n', messageBuffer, 32)
    String commandFromJetson = Serial.readStringUntil(TERMINATOR);
    
    // confirm
    String ackMsg = "Message: " + commandFromJetson; // String(messageBuffer);

    Serial.print(ackMsg);
    // Serial.flush();
  }
  delay(500);
} 
