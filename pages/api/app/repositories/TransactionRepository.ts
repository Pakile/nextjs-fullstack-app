import {Repository, Transaction} from "@/pages/api/app/interfaces";
import TransactionModel from "@/pages/api/app/models/TransactionModel";
import db from '../database'
import {paginate} from "@/utils";

export class TransactionRepository implements Repository {
  private transactionModel: TransactionModel

  constructor() {
    this.transactionModel = new TransactionModel
  }

  read = async () => {
    await db.read()
    return db.data?.transactions ?? []
  }

  write = async (data: { transactions: Transaction[] }) => {
    Object.assign(db.data as Object, {transactions: data.transactions})
    return await db.write()
  }

  add = async (transaction: Transaction) => {
    let transactions = await this.read()
    transactions.push(this.transactionModel.set(transaction))

    return await this.write({transactions: transactions})
  }

  findOne = async (id: string) => await this.findOneBy('id', id)

  findOneBy = async (key: string, value: string) => {
    let transactions: Transaction[] = await this.read()
    transactions = transactions.filter(post => post[key as keyof Transaction] === value)
    return transactions[0]
  }

  findAll = async () => await this.read()

  create = async (transaction: Transaction) => {
    return await this.add(transaction).then(async () => await this.read())
  }

  findAllPaginate = async (page: number = 1, limit: number = 15) => {
    const transactions: Transaction[] = await this.findAll()
    return paginate(transactions as [], page, limit)
  }

  destroy(id: any): Promise<any> {
    return Promise.resolve(undefined);
  }

  findAllBy(key: any, value: any): Promise<any> {
    return Promise.resolve(undefined);
  }

  update(id: any, data: any): Promise<any> {
    return Promise.resolve(undefined);
  }


}

