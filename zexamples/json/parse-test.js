var txt = '[{"name":"Petros","date":"1911-12-31"},{"name":"Poghos","date":"2014-06-14"},{"name":"Ani","date":"1986-17-12"}]';

var data = JSON.parse(txt);
console.log(data[0].name);
console.log(data[2].name);