var fs = require('fs');
var data = require('./data/stackOverAPI.json');
for(i = 0;i < 7;i++)
{
    var _count = data[i].count;
    var count = _count.toLocaleString(
        'en-US', // use a string like 'en-US' to override browser locale
        { minimumFractionDigits: 0 }
      );      
      // In en-US, logs '100,000.00'
      // In de-DE, logs '100.000,00'
      // In hi-IN, logs '1,00,000.00'
    console.log(i+1 + ":" + data[i].name + ", "+ count + " questions");
}
