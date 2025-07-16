const express = require('express');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('server is on');
});

app.listen(PORT, () => console.log(`server running on ${PORT}`));
