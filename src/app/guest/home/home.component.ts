import { Component, OnInit } from '@angular/core';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { Book } from 'src/app/model/book.model';
import { Purchase } from 'src/app/model/purchase.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BookService } from 'src/app/services/book.service';
import { PurchaseService } from 'src/app/services/purchase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  books: Array<Book> = [];
  faBook = faBook; //font aweome book image
  errorMessage: string = ""
  infoMessage: string = ""

  constructor(private authService: AuthenticationService, private bookService: BookService
    , private purchaseService: PurchaseService) { }

  ngOnInit() {
    this.bookService.getAllBooks().subscribe(data => {
      this.books = data;
    })
  }


  purchase(item: Book) {
    if(!this.authService.currentUserValue?.id){
      this.errorMessage = 'You must be authentified to buy a book!'
      return;
    }
    // bookId?: number, userId?: number, purchaseTime?: Date, price?: number
    const purchase = new Purchase(undefined, item.id, this.authService.currentUserValue.id, item.createTime, item.price);
    this.purchaseService.savePurchase(purchase).subscribe(data => {
      this.infoMessage="Purchase completed!"
    }, err => { 'Unexpected error ccurred!'; console.log(err);})
  }

}
