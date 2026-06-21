import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import type { Request, Response } from "express";
import express from "express";
import mysql from "mysql2";
import type { RequestUserDto } from "./types/user.js";

dotenv.config();

const app = express();

async function encryptPassword(password: string): Promise<string> {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  return hashedPassword;
}

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

app.post("/user", (req: Request, res: Response) => {
  pool.getConnection(async (err: any, connection: any) => {
    if (err) {
      console.error("Error connecting to the database:", err);

      res.status(500).send({
        success: false,
        statusCode: 500,
        message: "Error connecting to the database",
      });

      return;
    }

    const user: RequestUserDto = {
      email: req.body.email,
      password: req.body.password,
      phoneNumber: req.body.phoneNumber,
    };

    if (!user.email || !user.password || !user.phoneNumber) {
      connection.release();

      res.status(400).send({
        success: false,
        statusCode: 400,
        message: "Bad request",
      });

      return;
    }

    let encryptedPassword: string;
    try {
      encryptedPassword = await encryptPassword(user.password);
      console.log(encryptedPassword);
    } catch (e) {
      connection.release();
      console.error("Error encrypting password:", e);
      res.status(500).send({
        success: false,
        statusCode: 500,
        message: "Error encrypting password",
      });
      return;
    }

    const query = "CALL register_user(?, ?, ?)";
    //Call MySQL Stored Procedure

    //const query = "INSERT INTO tb_user (email, phone_number, password, last_update) VALUES (?, ?, ?, CURRENT_TIMESTAMP)";

    connection.query(
      query,
      [user.email, user.phoneNumber, encryptedPassword],
      (err: any, result: any) => {
        connection.release();

        if (err) {
          res.status(400).send({
            success: false,
            statusCode: 400,
            //err,
          });

          return;
        }

        res.status(201).send({
          success: true,
          statusCode: 201,
          message: "Data inserted successfully",
          //data: result,
        });
      },
    );
  });
});

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
