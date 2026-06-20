import type { Request, Response } from 'express';
import express from 'express';
import mysql from 'mysql2';

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const port = 3000;

app.get('/details/:id', (req: Request, res: Response) => {
    const pool = mysql.createPool({
        host: '127.0.0.1',
        user: 'root',
        password: '89631139',
        database: 'dbtest',
        connectionLimit: 10,
        multipleStatements: true
    });

    pool.getConnection((err: any, connection: any) => {
        if (err) {
            console.error('Error connecting to the database:', err);

            res.status(500).send({
                success: false,
                statusCode: 500,
                message: 'Error connecting to the database'
            });

            return;
        }

        const id = req.params.id;
        const query = 'SELECT * FROM tb_actor WHERE id = ?';
        connection.query(query, [id], (err: any, rows: any) => {

            if (err) {
                connection.release();

                res.status(400).send({
                    success: false,
                    statusCode: 400,
                    message: 'Error executing query'
                });
            }

            if (rows.length === 0) {
                connection.release();
                res.status(404).send({
                    success: false,
                    statusCode: 404,
                    message: 'No data found for the given ID'
                });
                return;
            }

            res.status(200).send({
                success: true,
                statusCode: 200,
                message: 'Data retrieved successfully',
                data: rows
            });

            connection.release();
        });
    });
});

app.post('/echo/:id/:name', (req: Request, res: Response) => {
    const id = req.params.id;
    const name = req.params.name;

    res.status(201).send({
        data: req.body,
        params: {
            id,
            name
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
