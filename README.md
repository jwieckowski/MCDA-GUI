# MCDA-GUI
User interface built in React to simplify usage of Multi-Criteria Decision Analysis methods

## Table of contents
* [General info](#general-info)
* [Functionalities](#functionalities)
* [Technologies](#technologies)
* [Setup](#setup)

## General info
GUI created to simplify the usage of Multi-Criteria Decision Analysis methods. Performance is based on the [PYMCDM](https://gitlab.com/shekhand/mcda/-/tree/master/) python module. Application back-end is handled by [Python-Flask](https://flask.palletsprojects.com/en/1.1.x/), where the calculations of the MCDA is being made. Front-end side is handled in [React](https://reactjs.org/) and [Material-UI](https://material-ui.com/).

## Functionalities
* Provides main assumptions for selected MCDA methods
* Enables to calculate the preference values for the input decision matrix
* Enables to choose the MCDA method, type of normalization or preference function, method for calculate criteria weights and type of criteria
* Obtained results can be saved and then they can be compared with the selected correlation coefficients

## Technologies
* Node.js
* React
* Material-UI
* Redux
* Redux-Saga
* Python
* Python-Flask
## Setup
To run the back-end server, install python dependecies 
```
pip instal numpy
pip install pymcdm
pip install flask
pip install flask_cors
```
and run the command:
```
python server/server.py
```

To run the react application, install it locally using the npm:
```
npm install
npm start
```

To carry out the application tests:
```
npm test
```

Application opens at the default port 3000 at address [localhost:3000](http://localhost:3000/)



