import { Item, ItemType } from "@prisma/client";
import { ItemDTO } from "../../dtos/item.dto";
import {
  ItemAlreadyExistsError,
  ItemNotFoundError,
} from "../../errors/items.error";
import { prisma } from "../../prisma";
import { ItemsRepository } from "../../repositories/items.repository";

export class ItemsRepositoryImpl implements ItemsRepository {
  async create({
    name,
    price,
    link,
    itemType,
    description,
    imageUrl,
    activitiesId,
  }: ItemDTO): Promise<Item> {
    const itemExists = await prisma.item.findUnique({ where: { name: name } });

    if (itemExists != null) throw new ItemAlreadyExistsError(name);

    const itemCreated = await prisma.item.create({
      data: {
        name: name,
        price: price,
        link: link,
        itemType: itemType,
        description: description,
        imageUrl: imageUrl,
        activitiesId: activitiesId,
      },
    });
    return itemCreated;
  }

  async update(id: string, newData: ItemDTO): Promise<Item> {
    const itemExists = await prisma.item.findUnique({ where: { id: id } });

    if (itemExists == null) throw new ItemNotFoundError(id);

    const itemUpdated = await prisma.item.update({
      data: newData,
      where: { id: id },
    });
    return itemUpdated;
  }

  async delete(id: string): Promise<void> {
    const itemExists = await prisma.item.findUnique({ where: { id: id } });

    if (itemExists == null) throw new ItemNotFoundError(id);

    await prisma.item.delete({ where: { id: id } });
  }

  async getAll(): Promise<Item[]> {
    const allItems = await prisma.item.findMany();
    return allItems;
  }

  async getById(id: string): Promise<Item> {
    const recoveredItem = await prisma.item.findUnique({ where: { id: id } });

    if (recoveredItem == null) throw new ItemNotFoundError(id);

    return recoveredItem;
  }

  async getWithFilter(filter: ItemType): Promise<Item[]> {
    const recoverdedItems = await prisma.item.findMany({
      where: { itemType: filter },
    });

    return recoverdedItems;
  }

  async getActivities(itemId: string): Promise<string[]> {
    const targetItem = await prisma.item.findUnique({
      where: { id: itemId },
      include: { activities: { select: { name: true } } },
    });

    if (targetItem == null) throw new ItemNotFoundError(itemId);

    return targetItem.activities.map((activity) => activity.name);
  }

  async addActivities(itemId: string, activitiesId: string[]): Promise<Item> {
    const targetItem = await prisma.item.findUnique({
      where: { id: itemId },
    });

    if (targetItem === null) throw new ItemNotFoundError(itemId);

    const updatedItem = await prisma.item.update({
      where: { id: itemId },
      data: { activitiesId: [...targetItem.activitiesId, ...activitiesId] },
    });

    return updatedItem;
  }
}
