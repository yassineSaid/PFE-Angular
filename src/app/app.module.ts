import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsComponent } from './forms/forms.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { TablesComponent } from './tables/tables.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
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
import { HttpClientModule, HttpClient} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { SheetpfeComponent } from './sheetpfe/sheetpfe.component';
import { ShowSheetpfeComponent } from './sheetpfe/show-sheetpfe/show-sheetpfe.component';
import { AddSheetpfeComponent } from './sheetpfe/add-sheetpfe/add-sheetpfe.component';
import { DetailSheetpfeComponent } from './sheetpfe/detail-sheetpfe/detail-sheetpfe.component';
import { AffectSheetpfeEnseignantComponent } from './sheetpfe/affect-sheetpfe-enseignant/affect-sheetpfe-enseignant.component';
import { InternshipagreementComponent } from './internshipagreement/internshipagreement.component';
import { AddInternshipagreementComponent } from './internshipagreement/add-internshipagreement/add-internshipagreement.component';
import { ShowInternshipagreementComponent } from './internshipagreement/show-internshipagreement/show-internshipagreement.component';
import { ValidSheetpfeComponent } from './sheetpfe/valid-sheetpfe/valid-sheetpfe.component';
import { NotifySheetpfeComponent } from './sheetpfe/notify-sheetpfe/notify-sheetpfe.component';
import { SoutenanceComponentComponent } from './soutenance-component/soutenance-component.component';
import { ReclamationComponent } from './soutenance-component/reclamation/reclamation.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    DashboardComponent,
    FormsComponent,
    ButtonsComponent,
    TablesComponent,
    TypographyComponent,
    IconsComponent,
    AlertsComponent,
    AccordionsComponent,
    BadgesComponent,
    ProgressbarComponent,
    BreadcrumbsComponent,
    PaginationComponent,
    DropdownComponent,
    TooltipsComponent,
    CarouselComponent,
    TabsComponent,
    LoginComponent,
    SheetpfeComponent,
    ShowSheetpfeComponent,
    AddSheetpfeComponent,
    DetailSheetpfeComponent,
    AffectSheetpfeEnseignantComponent,
    InternshipagreementComponent,
    AddInternshipagreementComponent,
    ShowInternshipagreementComponent,
    ValidSheetpfeComponent,
    NotifySheetpfeComponent,
    SoutenanceComponentComponent,
    ReclamationComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  providers: [
    HttpClient,
    FormBuilder,
    CookieService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AffectSheetpfeEnseignantComponent,
    ValidSheetpfeComponent
  ],
})
export class AppModule { }
