import type { Request, Response } from 'express';
import express from 'express';

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const port = 3000;

app.get('/hello', (req: Request, res: Response) => {
    res.send('Hello, World!');
});


app.post('/echo', (req: Request, res: Response) => {
    res.send({
        data: req.body,
        message: 'Data received successfully'
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
