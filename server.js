'use strict';

const express = require('express'),
    moment = require('moment');
    
const app = express();

app.set('port', (process.env.PORT || 5000));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/:date', (req, res)  => {
    const param = req.params.date;
    let date;
    
    if(param == Number(param)){ // unix timestamp
        date = moment(param, 'x');
    }else if(param == 'now'){
        date = moment();   
    }else{// natural date
        date = moment(param, 'MMMM DD, YYYY');
    }
    if(!date.isValid()){
        return res.status(400).json({error: 'Invalid date'});
    }
    res.json({
        unix: date.format('x'),
        natural: date.format('MMMM DD, YYYY')
    });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});