import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../Services/tasks.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  deleteTask(i: number) {
    this.taskService.deleteTask(i);
  }
  constructor(public taskService: TasksService, private title: Title) {
    this.title.setTitle('Home');
  }
  ngOnInit(): void {}
}
