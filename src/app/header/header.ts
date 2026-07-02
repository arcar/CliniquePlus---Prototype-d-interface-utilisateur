import {
  Component,
  ElementRef,
  HostListener,
  ViewChild
} from '@angular/core';

import { Userservice } from '../userservice';
import { Routes } from '../routes';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

  constructor(
    protected userService: Userservice,
    protected routes: Routes
  ) {}

  isOpened = false;

  @ViewChild('avatarBtn', { read: ElementRef })
  avatarBtn!: ElementRef<HTMLButtonElement>;

  @ViewChild('dropdownMenu', { read: ElementRef })
  dropdownMenu!: ElementRef<HTMLDivElement>;

  /* =========================
     TOGGLE
  ========================== */
  toggleUserMenu() {
    this.isOpened = !this.isOpened;

    if (this.isOpened) {
      this.updatePosition();
    }
  }

  ouvrirUserParam() {
    this.isOpened = true;
    this.updatePosition();
  }

  fermerUserParam() {
    this.isOpened = false;
  }

  /* =========================
     CLICK OUTSIDE + ESC
  ========================== */

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (!this.isOpened) return;

    const target = event.target as HTMLElement;

    const clickedAvatar =
      this.avatarBtn?.nativeElement.contains(target);

    const clickedDropdown =
      this.dropdownMenu?.nativeElement.contains(target);

    if (!clickedAvatar && !clickedDropdown) {
      this.fermerUserParam();
    }
  }

  @HostListener('document:keydown.escape')
  onEsc() {
    if (this.isOpened) {
      this.fermerUserParam();
    }
  }

  /* =========================
     POSITION RIGHT ALIGN
  ========================== */
  updatePosition() {
    const rect = this.avatarBtn.nativeElement.getBoundingClientRect();

    const rightOffset = window.innerWidth - rect.right;

    document.documentElement.style.setProperty(
      '--menu-right',
      `${rightOffset}px`
    );
  }
}