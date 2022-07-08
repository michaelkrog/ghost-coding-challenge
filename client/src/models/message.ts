export interface Message {
  id?: string;
  username: string;
  name: string;
  text: string;
  createdDate: Date;
  lastModifiedDate: Date;
  votes: number;
  parentId?: string;
}