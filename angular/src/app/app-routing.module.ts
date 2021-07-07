import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { AppRouteGuard } from "@shared/auth/auth-route-guard";
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { UsersComponent } from "./users/users.component";
import { TenantsComponent } from "./tenants/tenants.component";
import { RolesComponent } from "app/roles/roles.component";
import { ChangePasswordComponent } from "./users/change-password/change-password.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: "",
        component: AppComponent,
        canActivate: [AppRouteGuard],
        children: [
          {
            path: "home",
            component: HomeComponent,
            canActivate: [AppRouteGuard],
          },
          {
            path: "users",
            component: UsersComponent,
            data: { permission: "Pages.Users" },
            canActivate: [AppRouteGuard],
          },
          {
            path: "roles",
            component: RolesComponent,
            data: { permission: "Pages.Roles" },
            canActivate: [AppRouteGuard],
          },
          {
            path: "tenants",
            component: TenantsComponent,
            data: { permission: "Pages.Tenants" },
            canActivate: [AppRouteGuard],
          },
          { path: "about", component: AboutComponent },
          { path: "update-password", component: ChangePasswordComponent },
          {
            path: "category",
            loadChildren: () =>
              import("./features/category/category.module").then(
                (m) => m.CategoryModule
              ),
          },
          {
            path: "product",
            loadChildren: () =>
              import("./features/product/product.module").then(
                (m) => m.ProductModule
              ),
          },
          {
            path: "product-to-supply",
            loadChildren: () =>
              import(
                "./features/Products-to-supply/Products-to-supply.module"
              ).then((m) => m.ProductsToSupplyModule),
          },
          {
            path: "supplying",
            loadChildren: () =>
              import("./features/supplying/supplying.module").then(
                (m) => m.SupplyingModule
              ),
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
