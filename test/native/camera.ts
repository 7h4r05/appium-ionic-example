export interface Camera {
    getPicture(): Promise<void>;
}

export class AndroidCamera implements Camera {
    async getPicture() {
        // Native actions outside of webview
        // This is actually not required in this test case
        await driver.switchContext('NATIVE_APP');
        // Click camera button
        await driver.pressKeyCode(27);

        // Combination of 61 & 62 key triggers 'check' icon
        await driver.pressKeyCode(61);
        await driver.pressKeyCode(62);
    }
}

export class IosCamera implements Camera {
    async getPicture() {
        // Native actions outside of webview
        // This is actually not required in this test case
        await driver.switchContext('NATIVE_APP');
        // Random tap in the top-left corner where some picture from media library should be
        await driver.execute('mobile: tap', { x: 50, y: 100});
    }
}