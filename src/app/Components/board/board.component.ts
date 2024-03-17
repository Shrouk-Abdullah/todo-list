import { Component } from '@angular/core';
import { Task } from '../../Models/task';
import { BoardService } from '../../Services/board.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Board, BoardTitle } from '../../Models/board';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
  providers: [NgbModalConfig, NgbModal],
})
export class BoardComponent {
  boards: Board[] = [];
  selectedBoard!: string;
  discription!: string;
  taskId!: number;
  diffHours!: string;
  task!: Task;
  taskTitle!: string;
  isEditing!: boolean;
  status!: boolean;
  getClassForBoard(boardTitle: BoardTitle): string {
    switch (boardTitle) {
      case BoardTitle.MUST_DO:
        return 'must-do';
      case BoardTitle.SHOULD_DO:
        return 'should-do';
      case BoardTitle.IF_I_HAVE_TIME:
        return 'if-i-have-time';
      default:
        return '';
    }
  }
  open(content: any, task: Task) {
    console.log(task);
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
  constructor(
    public boardService: BoardService,
    private modalService: NgbModal
  ) {
    this.boards = this.boardService.getAllBoards();
  }

  addTask(title: any, discription: any, selectedBoard: BoardTitle): void {
    this.boardService.updateLastEditTimestamp();
    if (selectedBoard) {
      this.boardService.addTaskToBoard(selectedBoard, {
        title,
        discription,
        status: this.status,
        diffHours: this.diffHours,
      });
    }
  }
  removeTask(selectedBoard: BoardTitle, taskId: number): void {
    this.boardService.updateLastEditTimestamp();
    if (selectedBoard) {
      this.boardService.removeTaskFromBoard(selectedBoard, taskId);
    }
  }

  updateTask(title: string) {
    this.boardService.updateLastEditTimestamp();
    this.boardService.editTaskFromBoard(title, this.taskId, {
      title: this.taskTitle,
      discription: this.discription,
      status: this.status,
      diffHours: this.diffHours,
    });
  }
  toggleTaskStatus(task: Task, boardTitle: BoardTitle) {
    this.boardService.updateLastEditTimestamp();
    task.status = !task.status;
    this.boardService.editTaskFromBoard(boardTitle, this.taskId, task);
  }
  deleteAllTasks(title: string) {
    this.boardService.updateLastEditTimestamp();
    this.boardService.removeAllTaskFromBoard(title);
  }
}
