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

  async checkIsExists(id: number) {
    const exists = await this.taskRepository.exists({
      where: {id}
    })

    if (!exists) {
      throw new NotFoundException('Not Found');
    }
  }

  create(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.save(createTaskDto);
  }

  async findAll(page?: number, limit?: number): Promise<Task[]> {
    if (page && limit) {
      const [items]: [items: Task[], total: number] = await this.taskRepository.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
      });

      return items;
    }

    return this.taskRepository.find()

  }

  async findOne(id: number): Promise<Task> {
    await this.checkIsExists(id)

    return this.taskRepository.findOne({
      where: {id}
    })
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    await this.checkIsExists(id)

    await this.taskRepository.update(id, updateTaskDto);

    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.checkIsExists(id)

    await this.taskRepository.delete(id);
  }
}
