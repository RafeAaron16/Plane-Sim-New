# Welcome to Plane Sim Project

## Requirements

- You need to have nodejs installed in your system
- You need to have a php server in your system
- (Optional) you need to have internet connectivity on your system to view google fonts 
- You need a mobile browser to run the project and see output

## Instructions

### Database instructions

Present within this folder is an sql file. This file contains code to create the testing database and it's tables. To run this file, there are two options;

#### Using commandline(Linux specific instructions)

	With Linux, we shall type in the following commands
	```bash
		mysql -u root -p
	```

	This will open up a commandline interface with the mysql server if it's already running. Enter your password to continue

	```bash
		source <path to file>
	```
	This runs the script and creates the startup database

#### Using WAMP or XAMP
	We shall add content here in the future


### Running the server
	Inside the project, there exists a server.php file as well as a database.php file found in rootOfProject/assets/php files/

	place those two files at the root of your server directory

	If you have a local php server, running
	
	```bash
		php -S localhost:4000
	``` 
	should start the server and allow all operations run normally

	However if using xampp, change the lines with http://localhost:4000/server.php to http://localhost:<port number of server>/server.php

	Afterwards go into the database.php file and change the 'username' and 'password' fields accordingly.

### Setting up the node server
	Inside this project, you will see a gamestate.js file. This file is necessary to run the simulation of the global state. 

	To run it, just type the folllowing command in your commandline environment
	
	```bash
		node gamestate.js
	```

And voila, the project is yours for the taking. Further development will be added as the project progresses.
