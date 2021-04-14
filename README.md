# Mars Rover Kata: Js to Ts 

## Project Setup

* Copy and customize **.env.example** into **.env**
* Copy and customize **docker/mongodb/init-mongo.example.js** into **docker/mongodb/init-mongo.js**

## Npm Scripts

Start Server
```bash
$ npm run start
```

Test
```bash
$ npm run test
```

Start Docker (MongoDB)
```bash
$ npm run docker:up
```

Stop Docker (MongoDB)
```bash
$ npm run docker:down
```


## Migrate From Js to Ts

### Step 1: Add TSC

* Add Typescript: 
```
npm install -D typescript
npm install -D @types/node
```

* Add **build** script to **package.json** (clean **dist** folder before build):
```
...
"build": "rm -rf dist && tsc"
...
```

* Add **tsconfig.json** (with **allowJs** parameter set to **true**)

* Launch build script to generate **dist** folder:
```
npm run build
```

* Change **start** script in **package.json** (entry point must be **server.js** inside **dist** folder):
```
...
"start": "nodemon ./dist/server.js --watch",
...
```

* Change **test** script in **package.json** (input folder must be **dist**):
```
...
"test": "jest --verbose ./dist",
...
```
