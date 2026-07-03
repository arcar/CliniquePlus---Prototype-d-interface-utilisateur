import { Component, ElementRef, ViewChild } from '@angular/core';
import { Userservice } from '../userservice';
import { DatePipe } from '@angular/common';
import { Routes } from '../routes';

@Component({
  selector: 'app-info-user',
  imports: [DatePipe],
  templateUrl: './info-user.html',
  styleUrl: './info-user.scss',
})
export class InfoUser {
  constructor(protected userService : Userservice, protected routes: Routes) {
    

  }

   isModifyPhoneOpened = false;
  @ViewChild('phoneModal') modal!: ElementRef<HTMLDialogElement>;

 ouvrirModifyPhone() {
      this.modal.nativeElement.show();
      this.isModifyPhoneOpened = true;
  }

  fermerModifyPhone() {
    this.modal.nativeElement.close();
    this.isModifyPhoneOpened = false;
  }
}
