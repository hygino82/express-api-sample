import type { Request, Response } from "express";
import express from "express";
import mysql from "mysql2";
import type { RequestActorDto } from "./types/actor.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined,
  connectionLimit: 10,
  multipleStatements: true,
});

app.get("/details/:id", (req: Request, res: Response) => {
  pool.getConnection((err: any, connection: any) => {
    if (err) {
      console.error("Error connecting to the database:", err);

      res.status(500).send({
        success: false,
        statusCode: 500,
        message: "Error connecting to the database",
      });

      return;
    }

    const id = req.params.id;

    const query = "SELECT * FROM tb_actor WHERE id = ?";

    connection.query(query, [id], (err: any, rows: any) => {
      connection.release();

      if (err) {
        res.status(400).send({
          success: false,
          statusCode: 400,
          message: "Error executing query",
        });

        return;
      }

      if (rows.length === 0) {
        res.status(404).send({
          success: false,
          statusCode: 404,
          message: "No data found for the given ID",
        });

        return;
      }

      res.status(200).send({
        success: true,
        statusCode: 200,
        message: "Data retrieved successfully",
        data: rows,
      });
    });
  });
});

app.post("/echo/:id/:name", (req: Request, res: Response) => {
  const id = req.params.id;
  const name = req.params.name;

  res.status(201).send({
    data: req.body,
    params: {
      id,
      name,
    },
  });
});

app.post("/actor", (req: Request, res: Response) => {
  pool.getConnection((err: any, connection: any) => {
    if (err) {
      console.error("Error connecting to the database:", err);

      res.status(500).send({
        success: false,
        statusCode: 500,
        message: "Error connecting to the database",
      });

      return;
    }

    const actor: RequestActorDto = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    };

    if (!actor.firstName || !actor.lastName) {
      connection.release();

      res.status(400).send({
        success: false,
        statusCode: 400,
        message: "Bad request",
      });

      return;
    }

    const query = "INSERT INTO tb_actor (first_name, last_name) VALUES (?, ?)";

    connection.query(
      query,
      [actor.firstName, actor.lastName],
      (err: any, result: any) => {
        connection.release();

        if (err) {
          res.status(400).send({
            success: false,
            statusCode: 400,
            message: "Error executing query",
          });

          return;
        }

        res.status(201).send({
          success: true,
          statusCode: 201,
          message: "Data inserted successfully",
          data: result,
        });
      },
    );
  });
});

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
