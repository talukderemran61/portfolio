import { error } from 'console';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import axios from "axios";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Serve static files from /public
app.use(express.static(path.join(__dirname, 'public')));

// all global variables
const PORT = 3001;
const API_URL = "https://restcountries.com/v3.1";

// Home route
app.get('/', (req, res) => {
    res.render('index.ejs');
});

// Country route
app.get('/country', async (req, res) => {
    const name = req.query.name.toLowerCase();

    try {
        console.log(name);  // debug code

        // fetch main country data
        const response = await axios.get(`${API_URL}/name/${name}?fullText=true&fields=name,capital,population,region,subregion,languages,currencies,flags,borders,maps`);
        console.log(response.data[0]);  // debug code
        const country = response.data[0];
        
        console.log("problem in country.ejs");
        res.render('country.ejs', { country });
    } catch (error) {
        console.log("error: country not found");
        res.status(404).render("error.ejs", {
            message: "Country not found. Please check the spelling and try again.",
        });
        // res.status(404).send("country not available");
    }
});

// Region route placeholder
app.get('/region/', (req, res) => {
  res.send(`Region page coming soon`);
});

// Catch-all route for errors
app.get('/*splat', (req, res) => {
    res.send('404 Page not found');  
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
