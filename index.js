const express = require('express')
const app = express()
const exphbs  = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
 
 // List of page hits
// [{date: 1541619879516}]
const hits = [];

// Timeframe to capture, in seconds
const timeframe = 10;

app.get('/', function (req, res) {
  // Log a hit each time the page is loaded
  logHits();

  // Fetch the number of recent hits
  const hits = getHits();

  var data = {
    hits: hits,
    timeframe: timeframe,
  };

  // Render the home page with the number of hits
  res.render('home', data);
});


// Return seconds since epoch
// Note: JS normally return milliseconds, so divide by 1000 and `parseInt()`
getTime = () => {
  return parseInt((new Date).getTime() / 1000);
}

// Add a hit to the existing list
logHits = () => {
  hits.push({date: getTime() });
}

// Return number of hits within the last timeframe (s)
getHits = () => {
  return hits.filter(hit => hit.date > getTime() - timeframe).length;
}

app.listen(3000);