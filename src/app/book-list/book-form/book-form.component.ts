import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Book } from "../../models/book";
import { BooksService } from "../../services/books.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-book-form",
  templateUrl: "./book-form.component.html",
  styleUrls: ["./book-form.component.css"]
})
export class BookFormComponent implements OnInit {
  bookForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private booksService: BooksService,
    private router: Router,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.bookForm = this.formBuilder.group({
      title: ["", Validators.required],
      author: ["", Validators.required],
      synopsis: ""
    });
  }

  onSaveBook() {
    const title = this.bookForm.get("title").value;
    const author = this.bookForm.get("author").value;
    const synopsis = this.bookForm.get("synopsis").value;
    const newBook = new Book(title, author);
    newBook.synopsis = synopsis;

    if (this.fileUrl && this.fileUrl !== "") {
      newBook.photo = this.fileUrl;
    }

    this.booksService.createNewBook(newBook);
    this.router.navigate(["/books"]);
  }

  onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.booksService
      .uploadFile(file)
      .then((url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.snackBar.open("Chargement de fichier", "effectué", {
          duration: 2000
        });
      })
      .catch(err => {
        this.snackBar.open("Chargement de fichier", "Echec", {
          duration: 2000
        });
      });
  }

  detectFiles(event) {
    this.onUploadFile(event.target.files[0]);
  }
}
