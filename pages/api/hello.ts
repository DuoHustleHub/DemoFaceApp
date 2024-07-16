// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import shortid from 'shortid';
import pool from "../../lib/dbConnection";


type Data = {
  name: string
  secret: string
}

export default function RegisterHandler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: 'John Doe' , secret: shortid.generate() })
}
