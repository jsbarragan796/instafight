# Instafight
## Description
This is a web application let you make a fight between instagram accounts, who has the most number of recent likes wins, let the fight begin!!.  This was my  midterm exam of my sprint 2018
[Web development](http://johnguerra.co/classes/webDevelopment_spring_2018/)
at [Uniandes](https://www.uniandes.edu.co).

There is a deployed version available at [here](https://www.uniandes.edu.co)

## Getting Started
The following instructions will get you a copy of the project up and running on your local machine for development, testing purposes or grading the exam.

### Prerequisites
In order to run this project you need to have installed  ```npm``` and ```mongodb```.




### Installation

Once you clone or download the project use the Terminal prompt and change the directory to the project folder ```cd ./instafight ```.

Then install backend node dependencies
```
npm install
```

Then install react frontend node dependencies
```sh
cd frontapp
npm install
```

This project uses ```Environment Variables``` to connect to the db. So at the project's root directory create a ```.env``` file following the next structure.
```
PORT=5000
```
I did upload my credentials to my data base however you can go to the instafight/routes/index.js and comment the admin env and uncomment the read only access. If you use want to use your own base feel free. 
### Usage
At the root directory star the backend by using
```
npm start
```
The the backend now running at http://localhost:5000 as define in the ```.env``` file. Feel free to change it just keep in mind the frontend uses the 3000 port.

Then user another Terminal prompt to run the frontend from the root directory

```sh
cd frontend
npm start
```
Now the app will be up and running at http://localhost:3000


#### Build
In case you want a build version of the frontend just run at its directory.
```
npm start build
```
Then starting the only the server app will be get the app running at http://localhost:5000
### Deployed version

There is a deployed version available at [Instafight](https://instafighting.herokuapp.com)

## Author
[__Juan Sebastián Barrgán Jerónimo__](https://github.com/jsbarragan796)

## License
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This repository has the standard MIT license. You find it [here.](https://github.com/jsbarragan796/filaAgil/blob/master/LICENSE)
