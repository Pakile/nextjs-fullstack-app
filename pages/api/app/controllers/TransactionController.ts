import {NextApiRequest, NextApiResponse} from "next"
import {TransactionRepository} from "@/pages/api/app/repositories/TransactionRepository";
import {Post, Transaction, User} from "@/pages/api/app/interfaces";
import {Auth} from "@/pages/api/app/services";

export default class TransactionController {
  private readonly req: NextApiRequest
  private res: NextApiResponse
  private transactionsRepository: TransactionRepository

  constructor(req: NextApiRequest, res: NextApiResponse) {
    this.req = req
    this.res = res
    this.transactionsRepository = new TransactionRepository()
  }


  public getCollection = async (page?: number, limit?: number) => {
    if (!page || !limit) {
      return await this.transactionsRepository
        .findAll()
        .then((posts: Transaction[]) => this.res.status(200).json(posts))
        .catch(e => this.res.status(500).json({status: 'error', message: e.message}))
    }

    await this.transactionsRepository
      .findAllPaginate(page, limit)
      .then(posts => this.res.status(200).json(posts))
      .catch(e => this.res.status(500).json({status: 'error', message: e.message}))
  }

  public store = async (transaction: Transaction) => {

    await this.transactionsRepository
      .create(transaction)
      .then(() => this.res.status(200).json({status: 'success'}))
      .catch(e => this.res.status(500).json({status: 'error', message: e.message}))
  }
}
