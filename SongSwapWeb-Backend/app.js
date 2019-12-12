const express = require('express'); 
const app = express(); 
const path = require('path'); 
const port = process.env.PORT || 4000; 

const indexRoute = require('./src/routes/index'); 

app.use('/', indexRoute);
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log('Example app listening on port 4000!');
});
