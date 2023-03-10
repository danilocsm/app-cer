import { Activity } from "@prisma/client";
import { ActivityDTO } from "../../dtos/activity.dto";
import {
  ActivityAlreadyExistsError,
  ActivityNotFoundError,
} from "../../errors/activity.error";
import { prisma } from "../../prisma";
import {
  ActivityItem,
  ActivityRepository,
} from "../../repositories/activities.repository";

export class ActivityRepositoryImpl implements ActivityRepository {
  async create({
    name,
    description,
    observations,
    difficulty,
    itemsId,
    illnesses,
    image,
  }: ActivityDTO): Promise<Activity> {
    name = name.toLowerCase();
    const activity = await prisma.activity.findUnique({
      where: { name: name },
    });

    if (activity != null) throw new ActivityAlreadyExistsError(activity.name);

    const newActivity = await prisma.activity.create({
      data: {
        name,
        description,
        observations,
        difficulty,
        itemsId,
        illnesses,
        image,
      },
    });
    return newActivity;
  }

  async update(id: string, newData: ActivityDTO): Promise<Activity> {
    const activityExists = await prisma.activity.findUnique({
      where: { id: id },
    });

    if (activityExists == null) throw new ActivityNotFoundError(id);

    const updatedActivity = await prisma.activity.update({
      data: { ...newData },
      where: { id: id },
    });
    return updatedActivity;
  }

  async delete(id: string): Promise<void> {
    const activityExists = await prisma.activity.findUnique({
      where: { id: id },
    });

    if (activityExists == null) throw new ActivityNotFoundError(id);

    await prisma.activity.delete({ where: { id: activityExists.id } });
  }

  async getAll(): Promise<Activity[]> {
    const allActivities = await prisma.activity.findMany();
    return allActivities;
  }

  async getById(id: string): Promise<Activity> {
    const targetActivity = await prisma.activity.findUnique({
      where: { id: id },
    });

    if (targetActivity == null) throw new ActivityNotFoundError(id);

    return targetActivity;
  }

  async getByName(name: string): Promise<Activity> {
    const targetActivity = await prisma.activity.findUnique({
      where: { name: name },
    });

    if (targetActivity == null) throw new ActivityNotFoundError(name);

    return targetActivity;
  }

  async getActivityItems(id: string): Promise<ActivityItem[]> {
    const targetActivity = await prisma.activity.findUnique({
      where: { id: id },
      include: {
        items: {
          select: {
            name: true,
            description: true,
            imageUrl: true,
          },
        },
      },
    });

    if (targetActivity == null) throw new ActivityNotFoundError(id);

    return targetActivity.items;
  }
}
