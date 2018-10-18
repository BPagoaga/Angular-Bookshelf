import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";
import * as firebase from "firebase";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  isAuth: boolean;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    firebase.auth().onAuthStateChanged(user => {
      this.isAuth = !!user;
    });
  }

  onSignOut() {
    this.authService.signOutUser();
  }
}
