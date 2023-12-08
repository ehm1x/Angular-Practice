# FinalLearningApp

This project uses Angular version 17.0.3.
This is just a learning project for me to get familiar with some of the Angular semanitics 
## Development server

You will need MongoDB, Fantasy-Web-Server(https://github.com/ehm1x/Fantasy-Web-Server), and a prereq nfl.json file you can access here "https://api.sleeper.app/v1/players/nfl"
Edit Fantasy-Web-Server file path that loads the .json file to your own and do "node updateplayers" this will take about 10-15 minutes and will populate a mongodb on default config localhost.
Once that has completed you will need to do "node app" and then finally you can go back to this app and run `ng serve --open` for a dev server. Navigate to `http://localhost:4200/`. 

