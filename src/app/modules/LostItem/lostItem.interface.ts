export type TReportLostItem = {
  userId: string;
  title: string;
  description: string;
  category: string;
  brand: string;
  isFound: boolean;
  foundAt: Date;
  lostDate: Date;
  lostLocation: string;
  images?: string[];
  username?: string;
  email?: string;
  phone?: string;
};
