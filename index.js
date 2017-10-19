var yaml    = require('js-yaml');
var request = require('request');
var fs      = require('fs');

// Font Awesome v4.7.0 (Updated 10/19/2017)
var faYaml  = 'https://raw.githubusercontent.com/FortAwesome/Font-Awesome/master/src/icons.yml';

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

request(faYaml, function (error, response, body) {
    if (error) {
        console.log('error: ', error);
        return;
    }

    var raw = yaml.safeLoad(body);
    var output = '';

    for (var i = 0; i < raw.icons.length; i++) {
        var icon = raw.icons[i];

        // Specify icon output format, e.g. "fa-glass : Glass"
        output += 'fa-' + icon.id + ' : ' + capitalizeFirstLetter(icon.name) + '\r\n';
    }

    fs.writeFile('./output/list.txt', output, function(error) {
        if (error) {
            return console.log('error: ', error);
        }

        console.log('File saved.');
    });
});
