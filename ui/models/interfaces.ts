export interface Item {
  id?: number;
  item: string;
  category: string;
  notes: string;
  status: string;
  inCart: boolean;
  updated?: string;
  groupId?: number;
}
