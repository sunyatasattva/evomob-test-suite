var request   = require('request'),
    chalk     = require('chalk'),
    checkmark = String.fromCharCode("10003"),
    cross     =  String.fromCharCode("10799"); 

module.exports = {
    parseTestData: function(client, thisTest){
        var testData = {
            project: client.options.desiredCapabilities.project,
            module:  client.currentTest.module,
            name:    client.currentTest.name,
            status:  thisTest.results.failed > 0 || thisTest.results.errors > 0 ? "failed" : "passed"
        };
        
        testData.tests = thisTest.results.tests.map(function(test){
            return {
                message: test.message,
                failure: test.failure 
            };
        });
        
        return testData;
    },
    prepareSlackData: function(testData, thisTest){
        var slackData = {
            "channel":    "#general", 
            "username":   "nightwatch", 
            "icon_emoji": testData.status === "failed" ? ":speak_no_evil:" : ":monkey_face:",
            "attachments": [
                {
                    "fallback": testData.status === "failed" ? "Test case failed on Nightwatch" : "Test successfully passed on Nightwatch",

                    "color": testData.status === "failed" ? "danger" : "good",

                    "title": testData.project + " / " + testData.module + " / " + testData.name,
                    // @todo Link title to Browserstack session. See #7
                    //"title_link": "https://api.slack.com/",

                    "text": testData.status === "failed" ? ":x: Test case failed on Nightwatch" : ":white_check_mark: Test case passed successfully",
                    
                    "mrkdwn_in": ["text", "pretext", "fields"]
                }
            ]
        }
        
        slackData.attachments[0].fields = thisTest.results.tests.map(function(test){
            if( test.failure ) {
                return {
                    "title": "Assertion",
                    "value": "`" + test.message + "`\n```" + test.failure + "```",
                    "short": false
                } 
            }
        });
        
        return slackData;
    },
    postData: function(data, callback){
        var config = {
                url: 'https://hooks.slack.com' + process.env.SLACK_NOTIFICATION_HOOK,
                json: data
            }
        
        request
        .post(config,
            function(error, response, body){
                if (!error && response.statusCode == 200)
                    console.info( chalk.green(checkmark) + " Message successfully sent to Slack channel" ); 
                else
                    console.warn( chalk.red(cross) + " There was a problem sending the message to Slack channel");

                callback();
            })
        .on('error', function(e){
            console.error( chalk.red(cross) + " There was a problem sending the message to Slack channel: " + e.message); 
        });
    }
}