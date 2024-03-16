import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { TasksService } from '../../Services/tasks.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../../Models/task';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
  providers: [NgbModalConfig, NgbModal],
})
export class TodoListComponent implements OnInit {
  discription!: string;
  taskId: any;
  lastEditTimestamp: Date | null = null;
  diffHours: number | string | undefined;
  task!: Task;
  modalTitle: any;
  taskTitle!: string;
  isEditing: any;
  status!: boolean;
  // cardTitles:
  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private router: Router,
    private routerActive: ActivatedRoute,
    public taskService: TasksService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
    if (typeof window !== 'undefined') {
      localStorage.getItem('last edit');
    }
  }
  open(content: any, task: Task) {
    if (task) {
      this.taskTitle = task.title;
      this.discription = task.discription;
      this.status = task.status;
      this.isEditing = true;
      this.taskId = task.id;
    } else {
      this.taskTitle = '';
      this.discription = '';
      this.isEditing = false;
    }
    this.modalService.open(content);
  }

  deleteTask(i: number) {
    this.taskService.deleteTask(i);
    this.taskService.updateLastEditTimestamp();
  }

  saveTask(title: any, discription: any) {
    this.taskService.addTask(title, discription, this.status);
    this.taskService.updateLastEditTimestamp();
  }
  updateTask() {
    this.taskService.updateTask(this.taskId, {
      id: this.taskId,
      title: this.taskTitle,
      discription: this.discription,
      status: this.status,
    });
    this.taskService.updateLastEditTimestamp();
  }
  toggleTaskStatus(task: Task) {
    task.status = !task.status; // Toggle the status (true -> false, false -> true)
    this.taskService.updateTask(task.id, task); // Update the task in the service
  }
  deleteAllTasks() {
    this.taskService.deleteAllTasks(); // Update the task in the service
    this.taskService.updateLastEditTimestamp();
  }
  ngOnInit(): void {}
}
