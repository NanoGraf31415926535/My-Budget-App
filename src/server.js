import express from 'express';
import fs from 'fs';
import bodyParser from 'body-parser';
import cors from 'cors'; // Import cors

const app = express();
const port = 5000;

app.use(cors()); // Use cors

app.use(bodyParser.json());

app.post('/api/saveData', (req, res) => {
  const data = req.body;

  fs.writeFile('./public/data.json', JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to save data' });
    } else {
      console.log('Data saved successfully');
      res.json({ message: 'Data saved successfully' });
    }
  });
});

app.get('/api/loadData', (req, res) => {
    fs.readFile('./public/data.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to load data' });
      } else {
        res.json(JSON.parse(data));
      }
    });
  });

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

app.use(express.static('public'));