import { Component, OnInit, OnDestroy } from '@angular/core';
import * as CanvasJS from './canvasjs.min';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  public Revenue: any[];
  public Revenue2: any[];
  public datapoint: any[] = [];
  public datapoint2: any[] = [];

  public datapoint_lineChart = [];
  public datapoint_lineChart2 = [];
  public option: boolean = false;
  public typeChart: boolean = false;

  public Statistic : any;

  private d = new Date();
  private m = new Date().getMonth();
  private y = new Date().getFullYear();

  constructor(
    public adminService: AdminService,
    public renderer: Renderer2,
  ) { }

  ngOnInit() {
    this.loadData(null);
    this.loadTotalStatistic();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadTotalStatistic() {
    this.subscription = this.adminService.getTotalStatistic().subscribe(data => {
      this.Statistic = data;
    }, error => {
      console.log(error);
    });
  }

  loadData(month) {
    this.subscription = this.adminService.getRevenueByMonth(month).subscribe(data => {
      this.Revenue = data['revenue'];
      this.datapoint = [];
      this.Revenue.forEach(element => {
        this.datapoint.push(element['money']);
      });
      if(month == null){
        this.drawChartRevenueByMonth(this.m + 1);
      }else{
        this.drawChartRevenueByMonth(month);
      }
    }, error => {
      console.log(error);
    });
  }

  drawChartRevenueByMonth(month) {
    let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Doanh Thu Trong Tháng " + month
      },
      data: [{
        type: "column",
        dataPoints: [
          { y: this.datapoint[0] + this.datapoint[1] + this.datapoint[2] + this.datapoint[3] + this.datapoint[4], label: "Day 1-5" },
          { y: this.datapoint[5] + this.datapoint[6] + this.datapoint[7] + this.datapoint[8] + this.datapoint[9], label: "Day 6-10" },
          { y: this.datapoint[10] + this.datapoint[11] + this.datapoint[12] + this.datapoint[13] + this.datapoint[14], label: "Day 11-15" },
          { y: this.datapoint[15] + this.datapoint[16] + this.datapoint[17] + this.datapoint[18] + this.datapoint[19], label: "Day 16-20" },
          { y: this.datapoint[20] + this.datapoint[21] + this.datapoint[22] + this.datapoint[23] + this.datapoint[24], label: "Day 21-25" },
          { y: this.datapoint[25] + this.datapoint[26] + this.datapoint[27] + this.datapoint[28] + this.datapoint[29] + this.datapoint[30], label: "Day 26-End" },
        ]
      }]
    });
    chart.render();
  }

  selectMonth(month) {
    if(this.typeChart){
      this.loadLineChartDataMonthly(month);
    }else{
      this.loadData(month);
    }
  }

  selectOptions(option: boolean) {
    this.option = option;
    if (option) {
      if(this.typeChart){
        this.loadLineChartDataYearly(null);
      }else{
        this.loadRevenueYearly(null);
      }
    } else {
      if(this.typeChart){
        this.loadLineChartDataMonthly(null);
      }else{
        this.loadData(null);
      }
    }

  }

  loadRevenueYearly(year) {
    this.subscription = this.adminService.getRevenueByYear(year).subscribe(data => {
      this.Revenue = data['revenue'];
      this.Revenue.forEach(element => {
        this.datapoint2.push(element['money']);
      });
      if(year == null){
        this.drawChartRevenueByYear(this.y);
      }else{
        this.drawChartRevenueByYear(year);
      }
    }, error => {
      console.log(error);
    });
  }

  drawChartRevenueByYear(year) {
    let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Doanh thu trong năm " + year
      },
      data: [{
        type: "column",
        dataPoints: [
          { y: this.datapoint2[0], label: "Tháng 1" },
          { y: this.datapoint2[1], label: "Tháng 2" },
          { y: this.datapoint2[2], label: "Tháng 3" },
          { y: this.datapoint2[3], label: "Tháng 4" },
          { y: this.datapoint2[4], label: "Tháng 5" },
          { y: this.datapoint2[5], label: "Tháng 6" },
          { y: this.datapoint2[6], label: "Tháng 7" },
          { y: this.datapoint2[7], label: "Tháng 8" },
          { y: this.datapoint2[8], label: "Tháng 9" },
          { y: this.datapoint2[9], label: "Tháng 10" },
          { y: this.datapoint2[10], label: "Tháng 11" },
          { y: this.datapoint2[11], label: "Tháng 12" },
        ]
      }]
    });
    chart.render();
  }

  selectTypeChart(value) {
    if (value=='true') {
      this.loadLineChartDataMonthly(null);
      this.typeChart = true;
    } else {
      this.loadData(null);
      this.typeChart = false;
    }
    this.option = false;
    (document.getElementById('optionChart') as HTMLInputElement).checked = true;
    
  }

  loadLineChartDataMonthly(month) {
    this.subscription = this.adminService.getRevenueByMonth(month).subscribe(data => {
      this.Revenue2 = data['revenue'];
      this.datapoint_lineChart = [];
      this.Revenue2.forEach(element => {
        this.datapoint_lineChart.push({ x: element['create_at__day'], y: element['money'] });
      });
      if(month == null){
        this.drawLineChartMonthly(this.m + 1);
      }else{
        this.drawLineChartMonthly(month);
      }
    }, error => {
      console.log(error);
    });
  }

  drawLineChartMonthly(month) {
    let dataPoints = this.datapoint_lineChart;

    let dpsLength = 0;
    let chart = new CanvasJS.Chart("lineChartContainer", {
      exportEnabled: true,
      title: {
        text: "Doanh thu trong tháng "+month
      },
      data: [{
        type: "spline",
        dataPoints: dataPoints,
      }]
    });
    dpsLength = dataPoints.length
    chart.render();
  }

  loadLineChartDataYearly(year) {
    this.subscription = this.adminService.getRevenueByYear(year).subscribe(data => {
      this.Revenue2 = data['revenue'];
      this.datapoint_lineChart2 = [];
      this.Revenue2.forEach(element => {
        this.datapoint_lineChart2.push({ x: element['create_at__month'], y: element['money'] });
      });

      if(year == null){
        this.drawLineChartYearly(this.y + 1);
      }else{
        this.drawLineChartYearly(year);
      }
    }, error => {
      console.log(error);
    });
  }

  drawLineChartYearly(year) {
    let dataPoints = this.datapoint_lineChart2;

    let dpsLength = 0;
    let chart = new CanvasJS.Chart("lineChartContainer", {
      exportEnabled: true,
      title: {
        text: "Doanh thu trong năm "+year
      },
      data: [{
        type: "spline",
        dataPoints: dataPoints,
      }]
    });
    dpsLength = dataPoints.length
    chart.render();
  }

}
