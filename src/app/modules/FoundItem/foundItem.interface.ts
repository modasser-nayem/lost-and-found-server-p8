export type TReportFoundItem = {
  userId: string;
  title: string;
  description: string;
  category: string;
  brand: string;
  foundDate: Date;
  foundLocation: string;
  images?: string[];
  username?: string;
  email?: string;
  phone?: string;
};
