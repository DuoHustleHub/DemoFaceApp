import type {NextApiRequest, NextApiResponse} from "next";
import pool from "../../lib/dbConnection";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        console.log("entered making connection...")
        const client = await pool.connect();

        console.log("connection done...")

        console.log("executing query...")
        const result = await client.query('SELECT * FROM user_tab');

        console.log(" query executing ...")
        client.release();



        console.log(" responding ...")
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Internal Server Error' + err.message});
    }
}