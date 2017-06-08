
const http = require('http');

function express () {
  const app = function(req, res) {
    let index = 0;
    function next() {
      const routes = app.route;
      routes[index++](req, res, next);
    }
    next();
  }
  app.route = [];
  app.use = function (callback) {
    this.route.push(callback);
  };
  app.listen = function(...args) {
    http.createServer(app).listen(...args);
  }

  return app;
}

const app = express();

app.use((req, res, next) => {
  setTimeout(() => {
    console.log('async');
    next();
  }, 1000);
});

app.use((req, res, next) => {
  console.log( 'logger request url:', req.url);
  next();
});


app.listen(3333);
