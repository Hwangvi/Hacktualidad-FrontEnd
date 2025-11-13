import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/service/auth.service';
import { CommonModule } from '@angular/common';
import { User } from '../../../shared/interfaces/User';

@Component({
  selector: 'app-admin-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {

  adminData: User | null = null;


  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.adminData = this.authService.currentUserValue;
  }
}
