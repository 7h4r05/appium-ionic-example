import { Component } from '@angular/core';
import { Camera} from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  picture: string = null;
  constructor(private camera: Camera) { }


  async openCamera() {
    await this.getPicture(this.camera.PictureSourceType.CAMERA);
  }

  async openLibrary() {
    await this.getPicture(this.camera.PictureSourceType.PHOTOLIBRARY);
  }

  private getPicture(type) {
    this.camera
        .getPicture({
          sourceType: type,
          quality: 100,
          destinationType: this.camera.DestinationType.FILE_URI,
          encodingType: this.camera.EncodingType.JPEG,
          mediaType: this.camera.MediaType.PICTURE
        })
        .then((imageUrl: string) => {
          this.picture = imageUrl;
        });
  }
}
