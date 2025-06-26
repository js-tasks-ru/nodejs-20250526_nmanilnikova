import {Injectable, NotFoundException} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { Task } from "./entities/task.entity";

@Injectable()
export class TasksService {
  constructor(
      @InjectRepository(Task)
      private readonly taskRepository: Repository<Task>,
  ) {}

  create(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.save(createTaskDto);
  }

  async findAll(page: number, limit: number): Promise<Task[]> {
    const [items]: [items: Task[], total: number] = await this.taskRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });

    return items;
  }

  async findOne(id: number): Promise<Task> {
    const exists = await this.taskRepository.exists({
      where: {id}
    })

    if (!exists) {
      throw new NotFoundException('Not Found');
    }

    return this.taskRepository.findOne({
      where: {id}
    })
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const exists = await this.taskRepository.exists({
      where: {id}
    })

    if (!exists) {
      throw new NotFoundException('Not Found');
    }

    await this.taskRepository.update(id, updateTaskDto);

    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const exists = await this.taskRepository.exists({
      where: {id}
    })

    if (!exists) {
      throw new NotFoundException('Not Found');
    }

    await this.taskRepository.delete(id);
  }
}
