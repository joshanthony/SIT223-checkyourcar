# SIT223 CheckYourCar

### How to run this code locally

There are 2 folders, these should be considered as *separate applications*:

- /frontend/ this is our front-end react app, creating using [create-react-app](https://create-react-app.dev/docs/getting-started). To run this front-end you need to cd into the /frontend/ folder and use the `npm run` command from the terminal (you will need [npm installed from here](https://www.npmjs.com/get-npm)) once that is done the front-end app should be available at http://localhost:3000/
- /backend/ this is our back-end django application, which uses django and the django rest framework to define a back-end API that is consumed by the front-end. To run this back-end you need to cd into the /backend/ folder and use `python3 manage.py runserver` and it should launch and be available at http://127.0.0.1:8000/api/ you can use a command line tool called pip to install the dependencies from the requirements.txt file in the backend folder

### How does the database work?

Django allows you to write your database schema in python and new push changes to the database structure via the command line, [here is an example page that shows how to do this](https://docs.djangoproject.com/en/3.1/intro/tutorial02/). This example app uses sqlite as the database for development purposes, changing this to another database is super easy with django, you don't need to change any database schema, all you do is connect your MySQL database and run the database migration and you're done!
