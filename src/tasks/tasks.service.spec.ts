import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

const mockUser = {
  id: 'someId',
  username: 'someUser',
  password: 'somePassword',
  tasks: [],
};

const mockFilterDto = {
  status: undefined,
  search: undefined,
};

describe('TasksService', () => {
  let tasksService: TasksService;
  let tasksRepository: Repository<Task>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useValue: {
            createQueryBuilder: jest.fn(() => ({
              where: jest.fn().mockReturnThis(),
              andWhere: jest.fn().mockReturnThis(),
              getMany: jest.fn().mockReturnThis(),
            })),
          },
        },
      ],
    }).compile();

    tasksService = module.get<TasksService>(TasksService);
    tasksRepository = module.get<Repository<Task>>(getRepositoryToken(Task));
  });

  describe('getTasks', () => {
    it('calls repository with query builder and returns the result', () => {
      expect(tasksRepository.createQueryBuilder).not.toHaveBeenCalled();

      tasksService.getTasks(mockFilterDto, mockUser);

      expect(tasksRepository.createQueryBuilder).toHaveBeenCalled();
      expect(tasksRepository.createQueryBuilder().where).toHaveBeenCalled();
    });
  });
});
