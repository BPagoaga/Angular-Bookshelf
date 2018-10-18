import { Component } from "@angular/core";
import * as firebase from "firebase";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "bookshelf";

  constructor() {
    const config = {
      apiKey: "AIzaSyDnL9LFRgFDwGsOxedQsT_IVN29w5QAtVI",
      authDomain: "angular-firebase-580c8.firebaseapp.com",
      databaseURL: "https://angular-firebase-580c8.firebaseio.com",
      projectId: "angular-firebase-580c8",
      storageBucket: "angular-firebase-580c8.appspot.com",
      messagingSenderId: "965297493113"
    };

    firebase.initializeApp(config);
  }
}
