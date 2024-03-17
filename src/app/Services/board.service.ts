import { Injectable } from '@angular/core';
import { Task } from '../Models/task';
import { Board, BoardTitle } from '../Models/board';
import { title } from 'node:process';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  tasks!: Task[];
  board!: Board[];
  lastEditTimestamp!: Date;
  diffHours!: any;
  constructor() {
    if (typeof window !== 'undefined') {
      const storedBoards = localStorage.getItem('boards');
      this.board = [
        { title: BoardTitle.MUST_DO, tasks: [] },
        { title: BoardTitle.SHOULD_DO, tasks: [] },
        { title: BoardTitle.IF_I_HAVE_TIME, tasks: [] },
      ];
      if (storedBoards) {
        this.board = JSON.parse(storedBoards);
      } else {
        this.storeBoards();
      }
    }
  }
  storeBoards(): void {
    localStorage.setItem('boards', JSON.stringify(this.board));
  }
  getAllBoards(): Board[] {
    return this.board;
  }

  getBoardByTitle(title: string) {
    return this.board.find((board) => board.title === title);
  }

  addTaskToBoard(
    title: BoardTitle,
    task: { title: any; discription: any; status: boolean; diffHours: any }
  ): void {
    const board = this.getBoardByTitle(title);
    if (board) {
      board.tasks.push({
        id: board.tasks.length + 1,
        title: task.title.value,
        status: task.status || false,
        discription: task.discription.value,
        diffHours: this.diffHours,
      });
      this.storeBoards();
      console.log(board);
    }
  }
  removeAllTaskFromBoard(title: string) {
    const board = this.getBoardByTitle(title);
    if (board) {
      board.tasks = [];
      this.storeBoards();
    }
  }
  removeTaskFromBoard(title: BoardTitle, taskId: number): void {
    const board = this.getBoardByTitle(title);
    if (board) {
      board.tasks = board.tasks.filter((task) => task.id !== taskId);
      this.storeBoards();
    }
  }
  updateLastEditTimestamp() {
    this.lastEditTimestamp = new Date();
    const now = new Date();
    const diffMs = now.getTime() - this.lastEditTimestamp.getTime();
    this.diffHours = Math.floor(diffMs / (1000 * 60 * 60)); // Convert milliseconds to hours
    if (this.diffHours === 0) {
      // localStorage.setItem('last edit', 'Less than an hour ago');
      return (this.diffHours = 'Less than an hour ago');
    } else if (this.diffHours === 1) {
      // localStorage.setItem('last edit', '1 hour ago');
      return (this.diffHours = '1 hour ago');
    } else {
      // localStorage.setItem('last edit', `${this.diffHours} hours ago`);

      return `${this.diffHours} hours ago`;
    }
  }
  editTaskFromBoard(
    title: string,
    taskId: number,
    task: { title: any; discription: any; status: boolean; diffHours: any }
  ): void {
    let board = this.getBoardByTitle(title);
    console.log(board, 'kknk');
    if (board) {
      const taskIndex = board.tasks.findIndex((task) => task.id! === taskId);
      console.log(board);

      if (taskIndex !== -1) {
        const updatedTask: Task = {
          id: taskId,
          title: task.title,
          status: task.status,
          discription: task.discription,
          diffHours: this.diffHours,
        };
        board.tasks[taskIndex] = updatedTask;
      }
      console.log(board, 'knklnl');
      this.storeBoards();
    }
  }
}
