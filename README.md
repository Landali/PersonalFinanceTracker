# PersonalFinanceTracker

# Contents

1. [Description](#Description)
2. [How to run it locally](#local-run)
3. [Environment Variables](#env-variables)
4. [Steps](#steps)
# Description

Full stack application Nodejs, Express, React My Sql
A web app application done to do tracking of the users monthly incomes and expenses. The application allows the user to create their monthly budget and keep a track of how much he is spending and recoverying per transaction.

# How to run it locally

- Before cloning the repository
```
 1. Download MySql (https://www.mysql.com/downloads/) and Mysql Workbench (https://dev.mysql.com/downloads/workbench/) and follow their respective instructions

```
 Now that local db is setup its time to clone the repo. NOTE: Once the repo is clone make sure to read the environment variables section to add the envs files needed for the web app.
 1. Clone the react app repo from (https://github.com/Landali/PersonalFinanceTracker)
    - HTTPS : https://github.com/Landali/PersonalFinanceTracker.git
 2. Go to project folder and do cd server. Once on the server folder write on command line: npm install. This
 will install the packages needed for the backend.
 3. Once backend is done write on command line cd ..
 4. Write once more cd client
 5. Once inside of the client folder do a npm install. This will install all the packages needed for front end side.
 6. Open two consoles one for server and other for client. NOTE: Make sure to be on the main branch of the project.
 7. To start the client write on the console inside of the client folder: npm start
 8. Will take a bit to start locally once it starts check the console to get the links provided to go into the app. NOTE: In case the app doesn't start by any reason do a hard cache clean on the tab or launch it on incognito.
 9. To start the server write on the console inside of the server folder: npm run startDev
 10. Once both projects are running you are ready to start. Sequelize will do the neccesary changes on the db once app runs.



# Environment Variables
```
- Client

Client side .env file should be created on root where the package.json is. It should contain the following envs:

FAST_REFRESH=false
SKIP_PREFLIGHT_CHECK=false
REACT_APP_BACKEND_URL=http://localhost:3001 

NOTE: For the REACT_APP_BACKEND_URL the port will depend on the one you decided to add in the env files in the backend side.
```
```
- Server

NODE_ENV=development
# Development envs
DEV_DB_USERNAME=root
DEV_DB_PASSWORD=1234
DEV_DB_DATABASE=financetracker
DEV_DB_HOST=127.0.0.1

# Test envs
TEST_DB_USERNAME=root
TEST_DB_PASSWORD=1234
TEST_DB_DATABASE=financetracker
TEST_DB_HOST=127.0.0.1

# Production envs
PROD_DB_USERNAME=root
PROD_DB_PASSWORD=1234
PROD_DB_DATABASE=financetracker
PROD_DB_HOST=127.0.0.1

# JTW Token Options
ACCESS_TOKEN_SECRET= 1234
ACCESS_TOKEN_EXPIRATION_TIME=20m

# Server

SERVER_PORT=3001

NOTE: The envs used for local are the one starting with DEV_. The envs used will be controlled by 
NODE_ENV env.


```

# Steps

The flow of the app is the following:
 1. Once the apps starts it will send you to the sign in view. In there there should be an icon that will allow the user to access the sign up view.
 2. Once a user has been acquired the next step is to log in.
 3. Once logged the app will send the user towards the user profile view in there you can modify the user profile if wanting.
 3. Lets say we want to start doing a budget, on the sidebar there should be a link that will allow access to the budget view.
 4. Once on the budget view there should be a button that says add. It will pop out a modal in which we can create a budget. A card will be added to the view.
 5. Each card of the budget will have a general information plus the four options: update, expenses, incomes and delete.
 6. Incomes and expenses are links that will redirect each to their respective views, delete will just delete the card and update will opena  modal with the loaded options of the budget we want to modify.
 7. Both Income and Expenses views work the same manner as to how the view works.
 8. A table will be preset on each view and a add controller similar to budgets views will appear.
 9. Once clicked it will pop up a modal in which we will add the income or expense.
 10. Once done the table will update with the new element. NOTE: Last two elements of the tables are the update and delete controllers of the view.
 11. The update cell will open a modal with the loaded settings of the income or expense.
 12. The delete cell will delete the cell from the table completely deleting the income or expense and updating the balance on budget.
 