import {Transaction} from "@/pages/api/app/interfaces";
import {randomUUID} from "crypto";

export default class TransactionModel {
  private id?: string
  private sourceWalletId?: string
  private destinationWalletId?: string | null
  private category?: string
  private description?: string
  private amount?: number
  private paidAt?: string
  private createdAt?: string;
  private updatedAt?: string;
  private isPlaning?: boolean;
  private subject?: string;

  public get = (): Transaction => {
    return {
      id: this.id ?? '',
      sourceWalletId: this.sourceWalletId ?? '',
      amount: this.amount ?? 0,
      category: this.category ?? "",
      createdAt: this.createdAt ?? "",
      description: this.description ?? "",
      destinationWalletId: null,
      paidAt: this.paidAt ?? "",
      updatedAt: this.updatedAt ?? "",
    }
  }

  public set = (transaction: Transaction): Transaction => {
    this.id = transaction.id ?? randomUUID()
    this.sourceWalletId = transaction.sourceWalletId
    this.amount = transaction.amount
    this.category = transaction.category
    this.createdAt = transaction.createdAt
    this.updatedAt = transaction.updatedAt
    this.description = transaction.description
    this.paidAt = transaction.paidAt
    this.isPlaning = transaction.isPlaning
    this.subject = transaction.subject
    this.destinationWalletId = transaction.destinationWalletId

    return this.get()
  }
}
