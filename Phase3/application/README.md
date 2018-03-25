## Running Locally

Make sure you have [Node.js](http://nodejs.org/) and the [MAMP](https://www.mamp.info/) installed.

```sh
$ git clone https://github.gatech.edu/gt-omscs-dbscd-spring18/6400Spring18Team105.git # or clone your own fork
$ cd 6400Spring18Team105/Phase3/application
$ npm install
$ npm start
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

## Preparing MSSQL

Run MAMP and make sure that MySQL is running on the port 3306.

Run the following command to create required TABLEs for the application.

```sh
$ node ./scripts/create_database.js
```
