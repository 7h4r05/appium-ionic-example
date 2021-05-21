const process = require('process');
const fs = require('fs');

const devices = [];
for (let i=2; i < process.argv.length; i++) {
    devices.push(process.argv[i]);
}

const capabilities = [
    {
        browserName: '',
        autoWebview: true,
        autoWebviewTimeout: 20000,
        platformName: 'Android',
        deviceName: 'pixel2xl',
        app: __dirname + '/platforms/android/app/build/outputs/apk/debug/app-debug.apk',
        'app-package': 'appium.ionic.example',
        'app-activity': 'MainActivity',
        autoAcceptAlerts: 'true',
        autoGrantPermissions: 'true',
        newCommandTimeout: 300000
    },
    {
        browserName: '',
        autoWebview: true,
        autoWebviewTimeout: 20000,
        app: __dirname + '/platforms/ios/build/emulator/appium\ with\ Ionic\ example.app',
        version: '14.5',
        platform: 'iOS',
        deviceName: 'iPhone 12',
        platformName: 'iOS',
        name: 'Appium with Ionic example',
        automationName: 'XCUITest',
        nativeWebTap: 'true'
    }
];

const exportedCapabilities = capabilities.filter(c => devices.findIndex(d => d.toLowerCase() === c.deviceName.toLowerCase().trim()) >= 0);

fs.writeFileSync('wdio.capabilities.json', JSON.stringify(exportedCapabilities));
