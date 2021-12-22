const createTestCafe = require('testcafe');
const fs = require('fs');
const path = require("path");
let runner = null;
let testcafe = null;

const runTest = async function (host, port, browser) {
    await createTestCafe(host, port)
        .then(tc => {
            testcafe = tc;
            runner = testcafe.createRunner();

            return testcafe.createBrowserConnection();
        })
        .then(remoteConnection => {
            // Outputs remoteConnection.url so that it can be visited from the remote browser.
            console.log(remoteConnection.url);
            const stream = fs.createWriteStream(`./${browser}--report.html`);

            remoteConnection.once('ready', () => {
                runner
                    .src([
                        path.join(__dirname, './script/TodoDemo.js')
                    ])
                    .browsers(remoteConnection)
                    .reporter('st-html', stream)
                    .run({
                            skipJsErrors: true,
                            quarantineMode: true,
                            assertionTimeout: 10000,
                            pageLoadTimeout: 10000,
                            selectorTimeout: 10000
                        }
                    )
                    .then(failedCount => {
                        console.log(failedCount);
                        testcafe.close();
                    });
            });
        });
};

runTest('192.168.1.6', 1111, 'test')
