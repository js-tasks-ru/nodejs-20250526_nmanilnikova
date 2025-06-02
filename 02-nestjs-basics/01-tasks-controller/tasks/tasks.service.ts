import { Injectable, NotFoundException } from "@nestjs/common";
import { Task } from "./task.model";
import { throwError } from "rxjs";

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    const task = this.tasks.find(task => task.id === id);
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return task
  }

  createTask(task: Task): Task {
    const newTask = {
      ...task, id: this.tasks.length.toString()
    }
   this.tasks.push(newTask);

   return newTask;
  }

  updateTask(id: string, update: Task): Task {
    const task = this.tasks.find(task => task.id === id);

    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    this.tasks = this.tasks.map(task => {
      if (task.id === id) {
        return {
          ...task,
          ...update
        };
      }

      return task;
    });

    return {
      ...task,
      ...update
    };
  }

  deleteTask(id: string): Task {
    const deletedTask = this.tasks.find(task => task.id === id);

    this.tasks = this.tasks.filter(task => task.id !== id);

    if (!deletedTask) {
       throw new NotFoundException(`Task with id ${id} not found`);
    }

    return deletedTask
  }
}
