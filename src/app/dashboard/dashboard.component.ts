import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import {DashboardService} from './dashboard.service';

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
    {data: [], label: 'Nombre Des Etudiant'},
  ];

  ngOnInit() {

    this.dashboardService.statEtrangerSheet().subscribe(data => {
      data.forEach(e => {
        this.barChartLabels.push(e[0]);
        this.barChartData[0].data.push(e[1]);
      });
    });
  }


}
