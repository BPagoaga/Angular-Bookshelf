import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Book } from "../models/book";
import * as firebase from "firebase";

@Injectable({
  providedIn: "root"
})
export class BooksService {
  books: Book[] = [];
  booksSubject = new Subject<Book[]>();

  constructor() {
    this.getBooks();
  }

  emitBooks() {
    this.booksSubject.next(this.books);
  }

  saveBooks() {
    firebase
      .database()
      .ref("/books")
      .set(this.books);
  }

  getBooks() {
    firebase
      .database()
      .ref("/books")
      .on("value", (data: firebase.database.DataSnapshot) => {
        this.books = data.val() ? data.val() : [];
        this.emitBooks();
      });
  }

  getSingleBook(id: number) {
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref("/books/" + id)
        .once("value")
        .then(
          (data: firebase.database.DataSnapshot) => {
            resolve(data.val());
          },
          error => {
            reject(error);
          }
        );
    });
  }

  createNewBook(newBook: Book) {
    this.books.push(newBook);
    this.saveBooks();
    this.emitBooks();
  }

  removeBook(book: Book) {
    const bookIndexToRemove = this.books.findIndex(bookEl => bookEl === book);
    this.books.splice(bookIndexToRemove, 1);
    this.saveBooks();
    this.emitBooks();
  }

  uploadFile(file: File) {
    return new Promise((resolve, reject) => {
      const almostUniqueFileName = Date.now().toString();
      const upload = firebase
        .storage()
        .ref()
        .child("images/" + almostUniqueFileName + file.name)
        .put(file);
      upload.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        () => {
          console.log("Chargement…");
        },
        error => {
          reject("Erreur de chargement ! : " + error);
        },
        () => {
          resolve(upload.snapshot.downloadURL);
        }
      );
    });
  }
}
