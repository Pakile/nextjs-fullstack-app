export type Transaction = {
  id: string;
  sourceWalletId: string;
  destinationWalletId: string | null;
  category: string;
  description: string;
  amount: number;
  paidAt: string;
  createdAt: string;
  updatedAt: string;
  isPlaning?: boolean;
  subject?: string;
}
