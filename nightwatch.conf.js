
var parse  = require('comment-json').parse || JSON.parse,
    fs     = require('fs'),
    extend = require('extend');

try { 
    var overrides = parse( fs.readFileSync('config-overrides.json').toString(), null, true );
}
catch (e) {
    console.warn("Could not find or parse the configuration override files.");
};

/*
 * Generates a build number from the date and the version of the project. (e.g. 20161104-1.0.0)
 */
function generateBuildNumber(projectInfo){
    var now     = new Date(),
        version = projectInfo.version ? projectInfo.version : "0000";
    
    return now.toISOString().split("T")[0].replace(/-/g,"") + "-" + version;
}

module.exports = (function(settings) {
    var projectInfo = {};
    
    if ( overrides ) {
        // Checks if the info JSON path is defined and the file exists in that path
        if ( overrides.project.infoPath && fs.existsSync(overrides.project.infoPath) ){
            var packageJson = require(overrides.project.infoPath);
            projectInfo = extend(packageJson, overrides.project);
        }
        // If not found, it will just populate with information found in the override JSON
        else {
            projectInfo = extend(projectInfo, overrides.project);
        }
    }
    else {
        console.warn("No project information found.")
    }

    projectInfo.buildNumber = generateBuildNumber(projectInfo);
    
    // Pass the project name and build number to Browserstack config if available
    if ( settings.test_settings.browserstack ) {
        extend(settings.test_settings.browserstack.desiredCapabilities, 
               { project: projectInfo.name, build: projectInfo.buildNumber });
    }
    
    // If anything is specified under the Nightwatch key of the configuration overrides
    // forcedly used those configurations instead.
    if ( Object.keys(overrides.nightwatch).length > 0 )
        extend(settings, overrides.nightwatch)
    
  return settings;

})(require('./nightwatch.json'));