import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsComponent } from './forms/forms.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { TablesComponent } from './tables/tables.component';
import { IconsComponent } from './icons/icons.component';
import { TypographyComponent } from './typography/typography.component';
import { AlertsComponent } from './alerts/alerts.component';
import { AccordionsComponent } from './accordions/accordions.component';
import { BadgesComponent } from './badges/badges.component';
import { ProgressbarComponent } from './progressbar/progressbar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { PaginationComponent } from './pagination/pagination.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { TooltipsComponent } from './tooltips/tooltips.component';
import { CarouselComponent } from './carousel/carousel.component';
import { TabsComponent } from './tabs/tabs.component';
import { LoginComponent } from './login/login.component';
import { SheetpfeComponent } from './sheetpfe/sheetpfe.component';
import { ShowSheetpfeComponent } from './sheetpfe/show-sheetpfe/show-sheetpfe.component';
import { InternshipagreementComponent } from './internshipagreement/internshipagreement.component';
import { NotifySheetpfeComponent } from './sheetpfe/notify-sheetpfe/notify-sheetpfe.component';

import {SoutenanceComponentComponent} from "./soutenance-component/soutenance-component.component";
import {ReclamationComponent} from "./soutenance-component/reclamation/reclamation.component";


import { ForumComponent } from './forum/forum.component';
import { AdminsComponent } from './admins/admins.component';



const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'forms', component: FormsComponent },
  { path: 'buttons', component: ButtonsComponent },
  { path: 'tables', component: TablesComponent },
  { path: 'icons', component: IconsComponent },
  { path: 'typography', component: TypographyComponent },
  { path: 'alerts', component: AlertsComponent },
  { path: 'accordions', component: AccordionsComponent },
  { path: 'badges', component: BadgesComponent },
  { path: 'progressbar', component: ProgressbarComponent },
  { path: 'breadcrumbs', component: BreadcrumbsComponent },
  { path: 'pagination', component: PaginationComponent },
  { path: 'dropdowns', component: DropdownComponent },
  { path: 'tooltips', component: TooltipsComponent },
  { path: 'carousel', component: CarouselComponent },
  { path: 'tabs', component: TabsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sheet', component: SheetpfeComponent },
  { path: 'internship', component: InternshipagreementComponent },
  { path: 'sheet/notify', component: NotifySheetpfeComponent },
  { path: 'sheet/planning', component: ShowSheetpfeComponent },
  { path: 'sheet/:id', component: ShowSheetpfeComponent },

  {path: 'soutenanceNonNote' , component: SoutenanceComponentComponent},
  {path: 'soutenanceNonNote/reclamation' , component: ReclamationComponent},
  { path: 'forum', component: ForumComponent },
  { path: 'admins', component: AdminsComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
