import { readFileSync } from 'fs';

const capabilities = JSON.parse(readFileSync('wdio.capabilities.json', 'utf8'));

export const config = {
    runner: 'local',
    port: 4723,
    specs: [
        './test/specs/**/*.ts'
    ],
    maxInstances: 2,
    capabilities,
    logLevel: 'info',
    bail: 0,
    baseUrl: 'http://localhost',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: [['appium',{
        args: {
            allowInsecure: 'chromedriver_autodownload'
        }
    }]],
    framework: 'jasmine',
    reporters: ['spec'],
    jasmineOpts: {
        defaultTimeoutInterval: 60000,
        expectationResultHandler: function(passed, assertion) {
        }
    }
}
