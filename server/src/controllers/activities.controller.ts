import express, { NextFunction, Request, Response } from "express";
import { ActivityRepositoryImpl } from "../services/prisma/activities.service";
import Controller from "../interfaces/controller.interface";
import { Activity } from "@prisma/client";
import { ActivityDTO } from "../dtos/activity.dto";
import validationMiddleware from "../middlewares/validation.middleware";
import authMiddleware from "../middlewares/auth.middleware";

export class ActivityController implements Controller {
  public readonly path = "/activities";
  public readonly router = express.Router();
  private readonly activityService: ActivityRepositoryImpl;

  constructor() {
    this.activityService = new ActivityRepositoryImpl();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get("", this.getAllActivities);

    this.router.get("/:id", this.getUnique);

    this.router.get("/:id/items", this.getItems);

    this.router.use(authMiddleware);

    this.router.post(
      "",
      validationMiddleware(ActivityDTO, false),
      this.createActivity
    );

    this.router.patch(
      "/:id",
      validationMiddleware(ActivityDTO, true),
      this.updateActivity
    );

    this.router.delete("/:id", this.deleteActivity);
  }

  private createActivity = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const activity: ActivityDTO = req.body;
    try {
      const activityCreated = await this.activityService.create({
        ...activity,
      });
      return res.status(201).json(activityCreated);
    } catch (error) {
      return next(error);
    }
  };

  private getUnique = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const activityName = req.params.id;
    let retrievedActivity = null;
    try {
      retrievedActivity = await this.activityService.getByName(activityName);
      return res.status(200).json(retrievedActivity);
    } catch (error) {
      return next(error);
    }
  };

  private getItems = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const activityId = req.params.id;
    try {
      const activityObjects = await this.activityService.getActivityItems(
        activityId
      );
      return res.status(200).json(activityObjects);
    } catch (error) {
      return next(error);
    }
  };

  private getAllActivities = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    let allActivities: Activity[] = [];
    try {
      allActivities = await this.activityService.getAll();
      return res.status(200).json(allActivities);
    } catch (error) {
      return next(error);
    }
  };

  private updateActivity = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const activityId = req.params.id;
    const newData: ActivityDTO = req.body;
    let updatedActivity;
    try {
      updatedActivity = await this.activityService.update(activityId, {
        ...newData,
      });
      return res.status(200).json(updatedActivity);
    } catch (error) {
      return next(error);
    }
  };

  private deleteActivity = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const id = req.params.id;
    try {
      await this.activityService.delete(id);
      return res.status(204).json({});
    } catch (error) {
      return next(error);
    }
  };
}
