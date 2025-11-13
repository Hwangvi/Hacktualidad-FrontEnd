import { AuthService } from './../../../core/service/auth.service';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, Router, RouterLinkActive } from "@angular/router";
import { Subscription } from 'rxjs';
import { User } from '../../interfaces/User'
;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [RouterLink, CommonModule, RouterLinkActive]
})
export class HeaderComponent implements OnInit, OnDestroy {

isLoggedIn: boolean = false;
  profileLink: string = '/login';
  private userSubscription!: Subscription;

  constructor(private authService: AuthService, private router: Router) { }


  ngOnInit(): void {

    this.userSubscription = this.authService.currentUser$.subscribe((user: User | null) => {
      if (user) {
        this.isLoggedIn = true;
        if (user.role === 'ADMIN') {
          this.profileLink = '/profile/admin';
        } else if (user.role === 'USER') {
          this.profileLink = '/profile/user';
        }
      } else {
        this.isLoggedIn = false;
        this.profileLink = '/login';
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

}
