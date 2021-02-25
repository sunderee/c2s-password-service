# C2SPswdService

Password microservice for C2S PassMan manager developed with Nest.js framework. You can run the server through CLI or inside a Docker container.

```bash
# Install dependencies
npm install

# Run in development (watch) mode or production mode
npm run start
npm run start:prod

# FOR DOCKER: build an image and run the container
docker build -t <tag> .
docker run --name <name> -p 3000:3000 <tag>
```

Usage: create a POST request to `/password/new_password` with the following body

```json
{
    "length": 11,
    "uppercase": false,
    "numbers": true,
    "specials": true
}
```

The response should be something like this

```json
{
    "length": 11,
    "security": 3,
    "password": "9rd4-$zk&y%"
}
```

where `security` parameter ranges between 0 and 4.

If deploying the app on Heroku, these are the necessary steps **before** pushing:

```bash
heroku git:remote -a <heroku-app-name>
heroku config:set NPM_CONFIG_PRODUCTION=false
heroku config:set NODE_ENV=production
```
