export type ItemObjectProps = {
  id: string;
  name: string;
  price: number;
  link: string;
  imageUrl: string;
  description: string;
  activitiesId: string[];
};

export type DoubtObjectProps = {
  id: string;
  name: string;
  contactEmail: string;
  text: string;
  isAnswered: boolean;
};

export type TestimonialObjectProps = {
  id: string;
  author: string;
  text: string;
  subject: string;
};

export type ActivityObjectProps = {
  id: string;
  name: string;
  description: string;
  difficulty: string;
  illnesses: string;
  image: string;
  observations: string;
  items: ItemObjectProps[];
};
