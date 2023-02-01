import { Activity, Item } from "@prisma/client";
import { ActivityDTO } from "../dtos/activity.dto";

export interface ActivityRepository {
  create(activity: ActivityDTO): Promise<Activity>;
  update(id: string, newData: ActivityDTO): Promise<Activity>;
  delete(id: string): Promise<void>;
  getAll(): Promise<Activity[]>;
  getById(id: string): Promise<Activity>;
  getByName(name: string): Promise<Activity>;
  getActivityItems(id: string): Promise<ActivityItem[]>;
}

export type ActivityItem = {
  name: string;
  description: string;
  image?: string;
};
