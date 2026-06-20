import type { Request, Response } from 'express';
import express from 'express';

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const port = 3000;

app.get('/hello', (req: Request, res: Response) => {
    res.send('Hello, World!');
});

app.get('/hello/:id/:name', (req: Request, res: Response) => {
    const id = req.params.id;
    const name = req.params.name;
    const message = `Hello, ${name}! Your ID is ${id}`;

    res.send({
        message
    });

    //console.log(message);
});


app.post('/echo/:id/:name', (req: Request, res: Response) => {
    const id = req.params.id;
    const name = req.params.name;
   
    res.send({
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
