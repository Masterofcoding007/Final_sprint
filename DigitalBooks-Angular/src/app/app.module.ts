import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { GuestComponent } from './components/guest/guest.component';
import { AuthorComponent } from './components/author/author.component';
import { AdminComponent } from './components/admin/admin.component';
import { ReaderComponent } from './components/reader/reader.component';
import { PurchaseComponent } from './components/purchase/purchase.component';
import { AddbookComponent } from './components/addbook/addbook.component';
import { ShowBooksComponent } from './components/book/show-books/show-books.component';
import { BookService } from './services/book.service';
import { RouterModule } from '@angular/router';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { ShowPurchasedBookHistoryComponent } from './components/show-purchased-book-history/show-purchased-book-history.component';
import { CongractulationsComponent } from './components/congractulations/congractulations.component';
import { BookstatusComponent } from './components/bookstatus/bookstatus.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents, 
    HeaderComponent, 
    GuestComponent, 
    AuthorComponent, 
    AdminComponent, 
    ReaderComponent,
    PurchaseComponent,
    AddbookComponent,
    ShowBooksComponent,
    ShowPurchasedBookHistoryComponent,
    CongractulationsComponent,
    BookstatusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS,useClass:TokenInterceptorService,multi:true},
    BookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
