import { Component, OnInit } from "@angular/core";
import { Book } from "../models/book";
import { Subscription } from "rxjs";
import { BooksService } from "../services/books.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-book-list",
  templateUrl: "./book-list.component.html",
  styleUrls: ["./book-list.component.css"]
})
export class BookListComponent implements OnInit {
  books: Book[];
  booksSubscription: Subscription;
  displayedColumns: string[] = ["picture", "title", "author", "action"];

  constructor(private booksService: BooksService, private router: Router) {}

  ngOnInit() {
    this.booksSubscription = this.booksService.booksSubject.subscribe(
      (books: Book[]) => {
        this.books = books;
      }
    );
    this.booksService.emitBooks();
  }

  onNewBook() {
    this.router.navigate(["/books", "new"]);
  }

  onDeleteBook(book: Book) {
    this.booksService.removeBook(book);
  }

  onViewBook(id: number) {
    this.router.navigate(["/books", "view", id]);
  }

  ngOnDestroy() {
    this.booksSubscription.unsubscribe();
  }
}
