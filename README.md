 ## This is a Server Auth for MongoDB

``` npm install --save express mongoose morgan body-parser bcrypt-nodejs jwt-simple passport passport-jwt passport-local ```

make sure you install mongooose
https://docs.mongodb.com


```
mkdir -p /data/db
```

```
sudo chown -R $USER /data/db
```
* to run the mondoose database; run:  

```
mongod
```


* connect the database to the web server, in index.js:

```
const mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost:backendauth/backendauth')

    ```

### Debug mongodb We ca use Robomongo
