import App from "./app";
import { ActivityController } from "./controllers/activities.controller";
import { AuthenticationController } from "./controllers/authentication.controller";
import { ItemsController } from "./controllers/items.controller";
import { QuestionsController } from "./controllers/questions.controller";
import { TestimonialController } from "./controllers/testimonial.controller";
import { UserController } from "./controllers/users.controller";

const app = new App(
  [
    new ActivityController(),
    new ItemsController(),
    new TestimonialController(),
    new AuthenticationController(),
    new UserController(),
    new QuestionsController(),
  ],
  3333
);

app.listen();
