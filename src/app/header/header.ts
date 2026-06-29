import { Component, ElementRef, ViewChild } from '@angular/core';
import { Userservice } from '../userservice';
import { RouterLink} from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
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