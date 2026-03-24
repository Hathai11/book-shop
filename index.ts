import express, { Request, Response } from 'express';
import { title } from 'node:process';

const app = express();
app.use(express.json());

interface books {
    id:Number;
    title:string;
    isRecommended:boolean;
}
let books: Book[] = [
    { id: 1, title: "อิคิไก: ความหมายของการมีชีวิตอยู่", isRecommended: true },
    { id: 2, title: "สิ่งที่เรียนรู้จากชีวิต", isRecommended: true }
];

//api zone
app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to my book shop!');
});

app.get('/api/books', (req: Request, res: Response) => {
    res.json(books);
});

app.get('/api/books/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const book = books.find(b => b.id === id);
    if (!book) return res.status(404).send('Not found this book');
    res.json(book);
});

app.post('/api/books', (req: Request, res: Response) => {
    const newBook:Book = {
        id: books.length+1,
        title: req.body.title,
        isRecommended: req.body.isRecommended || false
    };
    books.push(newBook);
    res.status(201).json(newBook);
});

app.delete('/api/books/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    books = books.filter(b => b.id !== id);
    res.send(`Book with ID: ${id} has been deleted successfully`);
});

app.put('/api/books/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const bookIndex = books.findIndex(b => b.id === id);

    if (bookIndex !== -1) {
        books[bookIndex] = { ...books[bookIndex], ...req.body };
        res.json(books[bookIndex]);
    } else {
        res.status(404).send("Not found this book");
    }
});

app.listen(3000, () => {
    console.log("=======================================");
    console.log("✅ Server is running at http://localhost:3000");
    console.log("=======================================");
});