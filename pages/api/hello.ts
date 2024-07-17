// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import shortid from 'shortid';
import pool from "../../lib/dbConnection";


type Data = {
  name: string
  secret: string
}

export default async function RegisterHandler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

 var  name =  req.body.name;
 var secret=  shortid.generate();
    const client = await pool.connect();
  const result = await client.query('insert into user_tab ( name , secret_key ) values(   ' + '\'' + name  + '\'' + ' , '  + '\'' + + secret  + '\''  +' )');

  client.release();
  res.status(200).json({ name, secret })
}
