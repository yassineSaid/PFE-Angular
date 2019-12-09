import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../app.component.scss', './dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  constructor(private dashboardService: DashboardService) { }

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = [];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    { data: [], label: 'Nombre Des Etudiant' },
  ];
  loading: boolean = true;
  offres: any[] = [];
  entierAleatoire(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  goToLink(url: string) {
    window.open(url, "_blank");
  }
  ngOnInit() {

    this.dashboardService.statEtrangerSheet().subscribe(data => {
      data.forEach(e => {
        this.barChartLabels.push(e[0]);
        this.barChartData[0].data.push(e[1]);
      });
    });
    this.dashboardService.getOffres().subscribe(data => {
      for (var i = 0; i < 5; i++) {
        this.offres.push(data[this.entierAleatoire(0, 50)]);
      }
      console.log(this.offres);
      this.loading = false
    },
      error => {
        console.log(error);
        this.loading = false;
      })
  }


}
