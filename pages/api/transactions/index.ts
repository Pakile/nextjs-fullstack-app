import type {NextApiRequest, NextApiResponse} from 'next'
import {TransactionController} from "../app/controllers"
import {middleware} from "utils"
import {cors} from "@/pages/api/app/middlewares"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await middleware(req, res, cors)
  const transactionsRepository = new TransactionController(req, res)

  switch (req.method) {
    case 'GET':
      const {page, limit} = req.query
      await transactionsRepository.getCollection(parseInt(page as string), parseInt(limit as string))
      break
    case 'POST':
      await transactionsRepository.store(req.body)
      break
    default:
      res.status(405).json({status: 'error'})
      break
  }
}
