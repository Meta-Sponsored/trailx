import requests , json

apiKey = "d5f6e96071109af97ee3b206fe8cb0cb"

baseURL = "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}"

cityName = "ranchi"

completeURL = f"https://api.openweathermap.org/data/2.5/weather?q={cityName}&appid={apiKey}"

response = requests.get(completeURL)

data = response.json()

print(data)

print("Minimum Temperature ",data["main"]["temp_min"])
print("Maximum Temperature ",data["main"]["temp_max"])
print("Temperature ",data["main"]["pressure"])
print("Visibility ",data["visibility"])
print("Humidity ",data["main"]["humidity"])
print("Clouds ",data["weather"][0]["description"])