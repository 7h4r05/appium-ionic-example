import { Pipe } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { WebView } from "@ionic-native/ionic-webview/ngx";

@Pipe({
    name: 'safeUrl'
})
export class SafeUrlPipe{
    constructor( private webview: WebView,
                 private sanitize: DomSanitizer) { }

    transform(url: string){
        return this.sanitize.bypassSecurityTrustUrl(this.webview.convertFileSrc(url));
    }
}