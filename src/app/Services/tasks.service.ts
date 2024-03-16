import { Injectable } from '@angular/core';
import { Task } from '../Models/task';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  tasks!: Task[];
  lastEditTimestamp!: Date;
  diffHours!: any;

  getAllTasks() {
    this.tasks;
  }
  deleteAllTasks() {
    this.tasks = [];
  }
  getTask(id: number) {
    this.tasks[id];
  }
  addTask(title: any, discription: any, status: boolean) {
    this.tasks.push({
      id: this.tasks.length + 1,
      title: title.value,
      status: status || false,
      discription: discription.value,
    });
    this.storData();
  }
  updateTask(id: number, item: Task) {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    if (taskIndex !== -1) {
      this.tasks[taskIndex] = item;
      this.storData();
    }
  }
  deleteTask(i: number) {
    this.tasks.splice(i, 1);
    this.storData();
  }
  storData() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
  updateLastEditTimestamp() {
    this.lastEditTimestamp = new Date();
    const now = new Date();
    const diffMs = now.getTime() - this.lastEditTimestamp.getTime();
    this.diffHours = Math.floor(diffMs / (1000 * 60 * 60)); // Convert milliseconds to hours
    if (this.diffHours === 0) {
      localStorage.setItem('last edit', 'Less than an hour ago');
      return (this.diffHours = 'Less than an hour ago');
    } else if (this.diffHours === 1) {
      localStorage.setItem('last edit', '1 hour ago');

      return (this.diffHours = '1 hour ago');
    } else {
      localStorage.setItem('last edit', `${this.diffHours} hours ago`);

      return `${this.diffHours} hours ago`;
    }
  }
  constructor() {
    this.getAllTasks();

    if (typeof window !== 'undefined') {
      try {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
          this.tasks = JSON.parse(storedTasks);
        }
      } catch (error) {
        console.error('Error accessing localStorage:', error);
        // Optionally, provide a fallback mechanism here
      }
    }
  }
}

// npm install -g angular-cli-ghpages
// ng build --prod --base-href "link repo in github"
// ngh --dir dist/todolist
