// --- 1. DATA GENERATOR (With Plot Descriptions) ---

const adjectives = ["Dark", "Infinite", "Silent", "Lost", "Brave", "Frozen", "Last", "Hidden", "Secret", "Crimson", "Shattered", "Golden", "Wild", "Electric", "Deadly"];
const nouns = ["Kingdom", "Horizon", "Knight", "Galaxy", "Soul", "Prophecy", "Storm", "Vengeance", "Protocol", "Mission", "Heart", "Empire", "Legacy", "Shadow", "Dream"];

// Plot fragments to generate unique descriptions
const plotOpeners = ["In a dystopian future,", "After a mysterious event,", "When an ancient evil awakes,", "Trapped in a simulation,", "Against all odds,"];
const plotActions = ["a reluctant hero must rise,", "a team of experts assemble,", "a lone warrior seeks revenge,", "the world faces extinction,", "humanity's last hope fights"];
const plotClosers = ["to save the universe.", "before time runs out.", "or risk losing everything.", "in a battle for survival.", "changing history forever."];

const posters = [
    "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg", "https://image.tmdb.org/t/p/w500/9gk7admal4ZLvd9XwXy37r1IGLO.jpg",
    "https://image.tmdb.org/t/p/w500/gEU2QniL6C8zYEFeuDOblcKnfQJ.jpg", "https://image.tmdb.org/t/p/w500/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg",
    "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg", "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
    "https://image.tmdb.org/t/p/w500/uxzzxijgPIY7slzFvMotPv8wjKA.jpg", "https://image.tmdb.org/t/p/w500/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg",
    "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg", "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    "https://image.tmdb.org/t/p/w500/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg", "https://image.tmdb.org/t/p/w500/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg",
    "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg", "https://image.tmdb.org/t/p/w500/zVMyvNowgbsBAL6O5esWfRpAcKf.jpg",
    "https://image.tmdb.org/t/p/w500/kyeqWdyUXW608qlYkRqosgbbJyK.jpg", "https://image.tmdb.org/t/p/w500/fiVW06jE7z9YnO4trhaMEdclSiC.jpg",
    "https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg", "https://image.tmdb.org/t/p/w500/hr0L2aueqlP2gCqfkovDm78ktp.jpg",
    "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg", "https://image.tmdb.org/t/p/w500/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg"
];

const trailerMap = {
    "Action": "KWKjXRk18ki", "Sci-Fi": "YoHD9XEInc0", "Horror": "heK_m21kF5k", "Comedy": "_Z3QKkl1WyM", "Thriller": "mqqft2x_Aa4"
};
const genres = ["Action", "Sci-Fi", "Horror", "Comedy", "Thriller"];

function generate100Movies() {
    let arr = [];
    // Add Titanic manually as ID 9999 for the Hero section
    arr.push({
        id: 9999, title: "Titanic", year: 1997, genre: "Romance", rating: "9.0", poster: "", trailer: "CH7F118yK5o",
        desc: "84 years later, a 101-year-old woman named Rose tells the story to her granddaughter about her life set in April 10th 1912, on a ship called Titanic."
    });

    for (let i = 1; i <= 100; i++) {
        const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
        const noun = nouns[Math.floor(Math.random() * nouns.length)];
        const genre = genres[Math.floor(Math.random() * genres.length)];

        // Generate Description
        const p1 = plotOpeners[Math.floor(Math.random() * plotOpeners.length)];
        const p2 = plotActions[Math.floor(Math.random() * plotActions.length)];
        const p3 = plotClosers[Math.floor(Math.random() * plotClosers.length)];
        const desc = `${p1} ${p2} ${p3}`;

        arr.push({
            id: i,
            title: `The ${adj} ${noun} ${i > 70 ? 'II' : ''}`,
            year: 2000 + Math.floor(Math.random() * 25),
            genre: genre,
            rating: (Math.random() * 3 + 6).toFixed(1),
            poster: posters[i % posters.length],
            trailer: trailerMap[genre],
            desc: desc // Added Description Field
        });
    }
    return arr;
}

// --- 2. STATE & RENDER ---
let allMovies = generate100Movies();
let displayMovies = allMovies.filter(m => m.id !== 9999); // Exclude Titanic from grid
let page = 1;
const itemsPerPage = 20;
let favorites = JSON.parse(localStorage.getItem('cs_favs')) || [];

function render() {
    const grid = document.getElementById('grid');
    const sliceEnd = page * itemsPerPage;
    const currentSlice = displayMovies.slice(0, sliceEnd);

    if (page === 1) grid.innerHTML = '';

    grid.innerHTML = currentSlice.map(m => {
        const isFav = favorites.includes(m.id);
        return `
        <div class="card" onclick="openTrailer(${m.id})">
            <div class="fav-heart ${isFav ? 'active' : ''}" onclick="event.stopPropagation(); toggleFav(${m.id})">
                ${isFav ? '♥' : '♡'}
            </div>
            <div class="play-icon-overlay"></div>
            <img src="${m.poster}" class="card-img" loading="lazy">
            <div class="card-body">
                <h3>${m.title}</h3>
                <div class="card-meta">
                    <span>${m.year} • ${m.genre}</span>
                    <span class="rating">★ ${m.rating}</span>
                </div>
            </div>
        </div>
    `}).join('');

    document.getElementById('loadMoreBtn').style.display = sliceEnd >= displayMovies.length ? 'none' : 'inline-block';
    updateFavCount();
}

// --- 3. FILTERING ---
function applyFilter(category, el) {
    document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
    if (el) el.classList.add('active');
    page = 1;

    if (category === 'All') displayMovies = allMovies.filter(m => m.id !== 9999);
    else if (category === 'favorites') displayMovies = allMovies.filter(m => favorites.includes(m.id));
    else displayMovies = allMovies.filter(m => m.genre === category && m.id !== 9999);

    render();
}

// --- 4. FAVORITES ---
function toggleFav(id) {
    if (favorites.includes(id)) favorites = favorites.filter(fav => fav !== id);
    else favorites.push(id);
    localStorage.setItem('cs_favs', JSON.stringify(favorites));
    render();
}
function toggleFilter(type) { if (type === 'favorites') applyFilter('favorites', null); }
function updateFavCount() {
    const badge = document.getElementById('fav-count');
    badge.innerText = favorites.length;
    badge.classList.toggle('active', favorites.length > 0);
}

// --- 5. SEARCH ---
document.getElementById('search').addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    page = 1;
    displayMovies = allMovies.filter(m => m.id !== 9999 && m.title.toLowerCase().includes(term));
    render();
});
document.getElementById('loadMoreBtn').addEventListener('click', () => { page++; render(); });

// --- 6. MODAL WITH DESCRIPTION LOGIC ---
const modal = document.getElementById('modal');

function openTrailer(id) {
    // Find movie data by ID
    const movie = allMovies.find(m => m.id === id);
    if (!movie) return;

    // Populate Text
    document.getElementById('m-title').innerText = movie.title;
    document.getElementById('m-desc').innerText = movie.desc; // Insert Description
    document.getElementById('m-year').innerText = movie.year;
    document.getElementById('m-genre').innerText = movie.genre;
    document.getElementById('m-rating').innerText = `${Math.floor(movie.rating * 10)}% Match`;

    // Embed YouTube
    const container = document.getElementById('video-container');
    container.innerHTML = `<iframe src="https://www.youtube.com/embed/${movie.trailer}?autoplay=1&rel=0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.style.display = 'none';
    document.getElementById('video-container').innerHTML = '';
    document.body.style.overflow = 'auto';
}
window.onclick = function (event) { if (event.target == modal) closeModal(); }

render();