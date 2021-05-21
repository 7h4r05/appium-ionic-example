import { AndroidCamera, IosCamera } from "../native/camera";

describe('Ionic with appium test', () => {
  describe('Get random picture test', () => {
    it('Should check page, trigger camera/media library, take/select photo and check photo', async () => {
        const welcomeDiv = await browser.$('.center .text');
        const welcomeDivText = await welcomeDiv.getText();
        const contexts = await driver.getContexts();
        const webview = contexts.find(c => c !== 'NATIVE_APP');

        // Standard Web check
        expect(welcomeDivText).toEqual('Sample text');

        const libraryButton = await browser.$('.library-button');
        await libraryButton.waitForClickable({
            timeout: 5000
        });

        const cameraButton = await browser.$('.camera-button');
        await cameraButton.waitForClickable({
            timeout: 5000
        });

        // Standard Web check
        const cameraButtonText = await cameraButton.getText();
        expect(cameraButtonText).toEqual('Open camera');

        const libraryButtonText = await libraryButton.getText();
        expect(libraryButtonText).toEqual('Open library');
        
        // Getting camera interface based on platform
        const camera = driver.isAndroid ? new AndroidCamera() 
                                        : driver.isIOS ? new IosCamera()
                                        : null;
        if (driver.isAndroid) {
            await cameraButton.click();
        } else {
            await libraryButton.click();
        }

        await driver.waitUntil(async () => {
            // iOS can trigger click to fast so we try few times
            await camera.getPicture();

            // Get back to Webview
            await driver.switchContext(webview);

            // Check if picture got populated
            const element = await browser.$('.picture');
            return await element.isDisplayed();
        });        
    });
  });
});