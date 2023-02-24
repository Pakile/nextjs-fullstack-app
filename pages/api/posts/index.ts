import type { NextApiRequest, NextApiResponse } from 'next'
import {PostController} from "../app/controllers"

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const postController = new PostController(res)

    switch (req.method) {
        case 'GET': return postController.getCollection()
        case 'POST': return postController.store(req.body)
        default:
            res.setHeader('Allow', ['GET', 'POST'])
            res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}
