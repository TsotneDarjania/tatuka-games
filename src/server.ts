import express from 'express';

const app = express();
const port = 3000;

app.use(express.static('src/client/build'));

app.get('*', (req, res) => {
  res.sendFile('index.html', { root: 'src/client/build' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
