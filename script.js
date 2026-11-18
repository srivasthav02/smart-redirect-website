// Edit this list to add or change tools.
const TOOLS = [
  { name: "Claude",       url: "https://claude.ai",              cat: "AI Chat",      desc: "AI assistant for writing, coding and analysis" },
  { name: "ChatGPT",      url: "https://chatgpt.com",            cat: "AI Chat",      desc: "Conversational AI assistant" },
  { name: "Gemini",       url: "https://gemini.google.com",      cat: "AI Chat",      desc: "Google's AI assistant" },
  { name: "Perplexity",   url: "https://www.perplexity.ai",      cat: "Research",     desc: "AI search with cited sources" },
  { name: "GitHub",       url: "https://github.com",             cat: "Development",  desc: "Code hosting and collaboration" },
  { name: "Google Colab", url: "https://colab.research.google.com", cat: "Development", desc: "Run Python notebooks in the browser" },
  { name: "Google Drive", url: "https://drive.google.com",       cat: "Productivity", desc: "Cloud file storage" },
  { name: "Google Docs",  url: "https://docs.google.com",        cat: "Productivity", desc: "Write and share documents" },
  { name: "Notion",       url: "https://www.notion.so",          cat: "Productivity", desc: "Notes, tasks and wikis" },
  { name: "Canva",        url: "https://www.canva.com",          cat: "Design",       desc: "Posters, slides and social graphics" }
];

const grid = document.getElementById("grid");
const empty = document.getElementById("empty");
const search = document.getElementById("search");
const filters = document.getElementById("filters");
let activeCat = "All";

const cats = ["All", ...new Set(TOOLS.map(t => t.cat))];
cats.forEach(c => {
  const b = document.createElement("button");
  b.textContent = c;
  b.setAttribute("aria-pressed", c === activeCat);
  b.onclick = () => {
    activeCat = c;
    [...filters.children].forEach(x => x.setAttribute("aria-pressed", x === b));
    render();
  };
  filters.appendChild(b);
});

function render() {
  const q = search.value.trim().toLowerCase();
  const list = TOOLS.filter(t =>
    (activeCat === "All" || t.cat === activeCat) &&
    (t.name + " " + t.desc).toLowerCase().includes(q));
  grid.innerHTML = list.map(t =>
    `<li><a href="${t.url}" target="_blank" rel="noopener noreferrer">
       <strong>${t.name}</strong><span>${t.desc}</span></a></li>`).join("");
  empty.hidden = list.length > 0;
}
search.addEventListener("input", render);
render();
