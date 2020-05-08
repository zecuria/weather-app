# Weather App
**A project that implements a rate limited Weather API with a UI**

## Setup
1.  Install [node]

2.  Install [yarn]

3.  Clone the git repo
    
4.  Install server dependencies by running `yarn install`

5.  Install client dependancies by running `cd client && yarn install`

6. After installing dependancies you will need to add `.env.development.local` file into the `/server` folder.

In the `.env.development.local` file add an API Key for OpenWeather as follows:
```
WEATHER_API_KEY=YOUR_WEATHER_API_KEY
```

## Commands
Run all these commands on the root directory

### Test
To test server run: `yarn test:server`

To test client run: `yarn test:client`

### Start
To start client and server for development: `yarn start`

To start just the client: `yarn start:client`

To start just the server: `yarn start:server`


### Build Client
To build the client: `yarn build:client`
