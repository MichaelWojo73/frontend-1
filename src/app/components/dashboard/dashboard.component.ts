import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoDashboard } from 'src/app/models/todo-dashboard';
import { TodoDataService } from 'src/app/services/todo-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  todoSummary$: Observable<TodoDashboard>;

  constructor(private service: TodoDataService) { }

  ngOnInit(): void {
    this.todoSummary$ = this.service.getDashboard();
  }

}
