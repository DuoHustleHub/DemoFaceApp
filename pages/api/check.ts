import type {NextApiRequest, NextApiResponse} from "next";
import pool from "../../lib/dbConnection";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const client = await pool.connect();

        const result = await client.query('insert into user_tab ( name , secret_key ) values( \'sahsi\' , \'abc\' ) ');

        client.release();

        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Internal Server Error' + err.message});
    }
}