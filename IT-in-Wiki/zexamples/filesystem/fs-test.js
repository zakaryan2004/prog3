var fs = require("fs");
var faker = require("faker");
var f = "fake-data.csv";

for (var i = 0; i < 10; i++) {
    name = faker.name.findName();
    bio = faker.lorem.sentence(),
        date = faker.date.past();
    fs.appendFile(f, name + "," + bio + "," + date + "\n");
}