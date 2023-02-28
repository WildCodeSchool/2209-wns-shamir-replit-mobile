export type IProject = {
  id: string;
  id_storage_number: string;
  name: string;
  description: string;
  isPublic: boolean;
  nb_views: number;
  file: { language: string }[];
};

export type CreateProject = {
  userId: number;
  name: string;
  description: string;
  isPublic: boolean;
};
