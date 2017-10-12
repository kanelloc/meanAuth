import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-global-metrics',
  templateUrl: './global-metrics.component.html',
  styleUrls: ['./global-metrics.component.css']
})
export class GlobalMetricsComponent implements OnInit {
  @Input() totalUsers: number;
  constructor() { }

  ngOnInit() {
  }

}
