import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { TiendaComponent } from './features/home/tienda/tienda.component';
import { ForumComponent } from './features/forum/forum.component';
import { LoginComponent } from './features/login/login.component';
import { RegistroComponent } from './features/registro/registro.component';
import { UserProfileComponent } from './features/profile/user-profile/user-profile.component';
import { AdminProfileComponent } from './features/profile/admin-profile/admin-profile.component';
import  { ProfileLayoutComponent } from './features/profile/profile-layout/profile-layout.component';
import { EditProfileComponent } from './features/profile/edit-profile/edit-profile.component';
import { roleGuard } from './core/guards/role.guard';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  { path: 'registro', component: RegistroComponent},
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'tienda', component: TiendaComponent, canActivate: [authGuard] },
  { path: 'forum', component: ForumComponent, canActivate: [authGuard] },
  { path: 'forum/redTeam', component: ForumComponent, canActivate : [authGuard]},
  { path: 'forum/blueTeam', component: ForumComponent, canActivate : [authGuard]},
  { path: 'forum/purpleTeam', component: ForumComponent, canActivate : [authGuard]},
  { path: 'forum/tienda', component: ForumComponent, canActivate : [authGuard]},

 {
    path: 'profile',
    component: ProfileLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'user', component: UserProfileComponent },
      {path: 'edit', component: EditProfileComponent},
      {
        path: 'admin',
        component: AdminProfileComponent,
        canActivate: [roleGuard],
        data: { expectedRole: 'ADMIN' }
      }
    ]
  },
 { path: '', redirectTo: 'login', pathMatch: 'full' },
 {path: '**', redirectTo: 'home' }
];
