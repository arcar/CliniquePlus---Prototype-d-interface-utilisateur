import { Component, ElementRef, ViewChild } from '@angular/core';
import { Userservice } from '../userservice';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  constructor(protected userService : Userservice) {
    

  }

  isOpened = false;
  @ViewChild('userModal') modal!: ElementRef<HTMLDialogElement>;

 ouvrirUserParam() {
      this.modal.nativeElement.show();
      this.isOpened = true;
  }

  fermerUserParam() {
    this.modal.nativeElement.close();
    this.isOpened = false;
  }
}