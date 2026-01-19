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
const PORT = 3000;
const API_URL = "https://restcountries.com/v3.1";
let cache = null;
let lastFetch = 0;
const TTL = 1000 * 60 * 60 * 24;    // 24 hours

async function getCountries() {     // fetch all countries data & store as cache
    const now = Date.now();

    if (!cache || (now - lastFetch > TTL)) {
        const res = await axios.get(`${API_URL}/all?fields=name,capital,population,region,subregion,languages,currencies,flags,borders,cca3`);
        cache = res.data;
        lastFetch = now;
    };
    return cache;
};

(async () => {
    await getCountries();
})();

function fetchCountryByName(source, name) {     // takes cache as source and name to filter
    return source.filter(c => c.name.common.toLowerCase().includes(name.toLowerCase()));
}
function fetchCountryByRegion(source, region) {
    return source.filter(c => c.region.toLowerCase() === region.toLowerCase());
}

// Home route with all countries loaded
app.get('/', async (req, res) => {

    const { name } = req.query;
    const { region } = req.query;
    
    let results = cache;

    if(name) {
        // fetch country by name from cache
        results = fetchCountryByName(cache, name);
    }
    if(region) {
        // fetch countries by region data from cache
        results = fetchCountryByRegion(cache, region);
    }

    res.render('index.ejs', { allCountries: results });
});


// auto search with keystroke
app.get('/search', (req, res) => {
    const { name, region } = req.query;

    let results = cache;

    if (region) {
        results = fetchCountryByRegion(results, region);
    }

    if(name) {
        results = fetchCountryByName(results, name);
    } else if (!region && !name) {
        results = cache;
    };

    res.json(results);
});

// Country route
app.get('/country', async (req, res) => {
    const { name } = req.query;

    try {
        // fetch main country data from cache
        const countryData = fetchCountryByName(cache, name);
        const country = countryData[0];
        
        let neighbors = [];
        // fetch neighboring countries from cache
        if ( country.borders && country.borders.length > 0 ) {
            const borderCountries = cache.filter(c => country.borders.includes(c.cca3));

            neighbors = borderCountries.map(c => ({
                name: c.name.common,
                flags: c.flags
            }));
        };
        res.render('country.ejs', { country, neighbors });
    } catch (error) {
        console.log("error: country not found");
        res.status(404).render("error.ejs", {
            message: "Country not found. Please check the spelling and try again.",
        });
    }
});

// Catch-all route for errors
app.get('/*splat', (req, res) => {
    res.status(404).render('error.ejs', { message: '404 Page not found' });  
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
