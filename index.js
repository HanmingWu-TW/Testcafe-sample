const createTestCafe = require('testcafe');
const fs = require('fs');
const path = require("path");
let testcafe = null;

console.log('starting tests');
createTestCafe()
    .then(tc => {
        testcafe = tc;
        const runner = testcafe.createRunner();
        const stream = fs.createWriteStream(`./web-chrome-report.html`);
        return runner
            .src([
                path.join(__dirname, './script/MainMenu/*.js'),
                path.join(__dirname, './script/MarketingCentral/*/*.js'),
                path.join(__dirname, './script/OperatingPlatform/*/*.js'),
                path.join(__dirname, './script/SystemSetting/*.js'),
            ])
            // .browsers('chrome:headless --lang=zh-cn')
            .browsers('chrome')
            // .video('videos', {
            //     pathPattern: '${FIXTURE}-${TEST}-${BROWSER}.mp4'
            // },{
            //     r: 60,
            //     s: '1366*768',
            //     aspect: '1366:768'
            // })
            .screenshots(
                // 保存路径
                './error/',
                true,
                // 保存路劲格式
                'chrome' + '_${DATE}_${TIME}.png'
            )
            .reporter('st-html', stream)
            .run({
                    skipJsErrors: true,
                    // quarantineMode: true,
                    assertionTimeout: 10000,
                    pageLoadTimeout: 10000,
                    selectorTimeout: 10000,
                    // speed: 0.8
                }
            )
    })
    .then(async failedCount => {
        console.log('Tests failed: ' + failedCount);
        await testcafe.close();
    });