import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ForumComponent } from './features/forum/forum.component';
import { LoginComponent } from './features/login/login.component';
import { TiendaComponent } from './features/tienda/tienda.component';
import { ProductDetailComponent } from './features/tienda/ProductDetail/ProductDetail.component';
import { RegistroComponent } from './features/registro/registro.component';
import { UserProfileComponent } from './features/profile/user-profile/user-profile.component';
import { AdminProfileComponent } from './features/profile/admin-profile/admin-profile.component';
import  { ProfileLayoutComponent } from './features/profile/profile-layout/profile-layout.component';
import { EditProfileComponent } from './features/profile/edit-profile/edit-profile.component';
import { roleGuard } from './core/guards/role.guard';
import { authGuard } from './core/guards/auth.guard';
import { ProductCreateComponent } from './features/profile/admin-profile/productCreate/productCreate.component';
import { ProductEditComponent } from './features/profile/admin-profile/productEdit/productEdit.component';
import { ProductListComponent } from './features/profile/admin-profile/productList/productList.component';
import { UserListComponent } from './features/profile/admin-profile/userCRUD/userList/userList.component';
import { UserCreateComponent } from './features/profile/admin-profile/userCRUD/userCreate/userCreate.component';
import { UserEditComponent } from './features/profile/admin-profile/userCRUD/userEdit/userEdit.component';
import { CategoryListComponent } from './features/profile/admin-profile/categoryCRUD/categoryList/categoryList.component';
import { CategoryEditComponent } from './features/profile/admin-profile/categoryCRUD/categoryEdit/categoryEdit.component';
import { CategoryCreateComponent } from './features/profile/admin-profile/categoryCRUD/categoryCreate/categoryCreate.component';
import { PostListComponent } from './features/forum/postList/postList.component';
import { PostDetailsComponent } from './features/forum/postDetails/postDetails.component';
import { PostCreateComponent } from './features/forum/postCreate/postCreate.component';
// --- ¡IMPORTACIONES CORREGIDAS! ---
import { TopicCreateComponent } from './features/profile/admin-profile/topicCRUD/topicCreate/topicCreate.component';
import { PostModerationComponent } from './features/profile/admin-profile/admin-panel/postCRUD/postModeration/postModeration.component';
import { TopicModerationListComponent } from './features/forum/topicModerationList/topicModerationList.component';
import { PostEditComponent } from './features/forum/postEdit/postEdit.component';


export const routes: Routes = [
  // --- Rutas Públicas y Generales ---
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },

  // --- Rutas de la Tienda ---
  { path: 'tienda', component: TiendaComponent, canActivate: [authGuard] },
  { path: 'tienda/:id', component: ProductDetailComponent, canActivate: [authGuard] },

  // --- Rutas del Foro (Vista Pública) ---
  { path: 'forum', component: ForumComponent, canActivate: [authGuard] },
  { path: 'forum/:topicName', component: PostListComponent, canActivate: [authGuard] },
  { path: 'forum/:topicName/create', component: PostCreateComponent, canActivate: [authGuard] },
  { path: 'posts/:postId', component: PostDetailsComponent, canActivate: [authGuard] },
  {
    path: 'posts/:postId/edit',
    component: PostEditComponent,
    canActivate: [authGuard, roleGuard],
    data: { expectedRole: 'ADMIN' }
  },

  // --- Rutas del Perfil y Panel de Administración ---
  {
    path: 'profile',
    component: ProfileLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'user', component: UserProfileComponent },
      { path: 'edit', component: EditProfileComponent },
      {
        path: 'admin',
        component: AdminProfileComponent,
        canActivate: [roleGuard],
        data: { expectedRole: 'ADMIN' }
      },
      // Gestión de Productos, Usuarios, Categorías...
      { path: 'admin/products/create', component: ProductCreateComponent, canActivate: [authGuard, roleGuard], data: { expectedRole: 'ADMIN' } },
      { path: 'admin/products/list', component: ProductListComponent, canActivate: [authGuard, roleGuard], data: { expectedRole: 'ADMIN' } },
      { path: 'admin/products/edit/:id', component: ProductEditComponent, canActivate: [authGuard, roleGuard], data: { expectedRole: 'ADMIN' } },
      { path: 'admin/users/list', component: UserListComponent, canActivate: [authGuard, roleGuard], data: { expectedRole: 'ADMIN' } },
      { path: 'admin/users/create', component: UserCreateComponent, canActivate: [authGuard, roleGuard], data: { expectedRole: 'ADMIN' } },
      { path: 'admin/users/edit/:id', component: UserEditComponent, canActivate: [authGuard, roleGuard], data: { expectedRole: 'ADMIN' } },
      { path: 'admin/categories/list', component: CategoryListComponent, canActivate: [authGuard, roleGuard], data: { expectedRole: 'ADMIN'} },
      { path: 'admin/categories/create', component: CategoryCreateComponent, canActivate: [authGuard, roleGuard], data: { expectedRole: 'ADMIN' } },
      { path: 'admin/categories/edit/:id', component: CategoryEditComponent, canActivate: [authGuard, roleGuard], data: { expectedRole: 'ADMIN' } },

      // --- Gestión del Foro (Admin) ---
      {
        path: 'admin/forum/topics/create',
        component: TopicCreateComponent,
        canActivate: [authGuard, roleGuard],
        data: { expectedRole: 'ADMIN' }
      },
      // ¡RUTAS NUEVAS Y CORREGIDAS PARA LA MODERACIÓN!
      {
        path: 'admin/forum/moderate', // Punto de entrada: Lista de Temáticas
        component: TopicModerationListComponent,
        canActivate: [authGuard, roleGuard],
        data: { expectedRole: 'ADMIN' }
      },
      {
        path: 'admin/forum/moderate/:topicName', // Detalle: Lista de Posts de una temática
        component: PostModerationComponent,
        canActivate: [authGuard, roleGuard],
        data: { expectedRole: 'ADMIN' }
      }
    ]
  },

  // --- Ruta Wildcard al Final ---
  { path: '**', redirectTo: 'home' }
];
