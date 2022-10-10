import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddbookComponent } from './components/addbook/addbook.component';
import { AuthorComponent } from './components/author/author.component';
import { BookComponent } from './components/book/book.component';
import { ShowBooksComponent } from './components/book/show-books/show-books.component';
import { BookstatusComponent } from './components/bookstatus/bookstatus.component';
import { CongractulationsComponent } from './components/congractulations/congractulations.component';
import { GuestComponent } from './components/guest/guest.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { ReaderComponent } from './components/reader/reader.component';
import { ShowPurchasedBookHistoryComponent } from './components/show-purchased-book-history/show-purchased-book-history.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/book' },
  {path:"user", component: UserComponent},
  {path:"book", component: BookComponent},
  {path:"guest", component: GuestComponent},
  {path:"login", component: LoginComponent},
  {path:"signup", component: SignupComponent},
  {path:"author", component: AuthorComponent},
  {path:"reader", component: ReaderComponent},
  {path:"showbooks", component: ShowBooksComponent},
  {path:"addbook", component: AddbookComponent},
  {path:"congractulations", component: CongractulationsComponent},
  {path:"showpurchasedbooks", component: ShowPurchasedBookHistoryComponent},
  {path:"bookstatus", component: BookstatusComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents=[UserComponent, BookComponent, LoginComponent, SignupComponent, HeaderComponent,ReaderComponent]
