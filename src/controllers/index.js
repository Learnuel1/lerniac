const fs = require('fs');
const path = require('path');
const controllers = {};

fs.readdirSync(__dirname).forEach(file => {
    if (file !== 'index.js' && file.endsWith('.js')) {
        const controllerName = path.basename(file, '.js');
        const controller = require(path.join(__dirname, file));
        let slicedControllerName = controllerName.split('.')[0];
         slicedControllerName = slicedControllerName.concat("_", controllerName.split('.')[1]);
        controllers[slicedControllerName] = controller;
    }
});

module.exports = controllers;