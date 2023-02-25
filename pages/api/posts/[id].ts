import type {NextApiRequest, NextApiResponse} from 'next'
import {PostController} from "../app/controllers"
import {middleware} from "@/pages/api/app/helpers"
import {cors, auth, admin} from "@/pages/api/app/middlewares"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await middleware(req, res, cors)

    const postController = new PostController(res)

    switch (req.method) {
        case 'GET': return postController.getItem(req.query.id as string)
        case 'PATCH': {
            await auth(req, res)
            await admin(req, res)

            return postController.update(req.query.id as string, req.body)
        }
        case 'DELETE': {
            await auth(req, res)
            await admin(req, res)

            return postController.destroy(req.query.id as string)
        }
        default:
            res.setHeader('Allow', ['GET', 'PATCH', 'DELETE'])
            res.status(405).json({status: 'error'})
    }
}
