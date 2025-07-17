// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAB31I6C1OqiJGRaFjQYBUo8Wc5sgH0Bn4",
    authDomain: "aitoolx-directory.firebaseapp.com",
    projectId: "aitoolx-directory",
    storageBucket: "aitoolx-directory.firebasestorage.app",
    messagingSenderId: "758939808222",
    appId: "1:758939808222:web:b20102c2df65421fd12d4f"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Typed.js
    const typed = new Typed('#typed-text', {
        strings: ['AI Tools', 'ML Platforms', 'Data Science', 'Automation', 'Generative AI'],
        typeSpeed: 60,
        backSpeed: 30,
        loop: true,
        showCursor: true,
        cursorChar: '|'
    });

    // Initialize Lottie animation
    const animationContainer = document.getElementById('lottie-animation');
    lottie.loadAnimation({
        container: animationContainer,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'https://assets6.lottiefiles.com/packages/lf20_gn0tojcq.json'
    });

    // Create particle effect
    createParticles();

    // Set up event listeners
    document.getElementById('searchInput').addEventListener('input', filterTools);
    document.getElementById('categoryFilter').addEventListener('change', filterTools);
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    
    // Subscription buttons
    document.getElementById('subscribeBtn').addEventListener('click', openModal);
    document.getElementById('heroSubscribe').addEventListener('click', openModal);
    document.getElementById('footerSubscribe').addEventListener('click', subscribe);
    
    // Set initial theme
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark-mode');
    }

    // Load data from Firebase
    loadCategories();
    loadTools();
});

function createParticles() {
    const container = document.getElementById('particles');
    const count = 30;
    
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random properties
        const size = Math.random() * 5 + 2;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const animationDuration = Math.random() * 10 + 10;
        const animationDelay = Math.random() * 5;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.animationDuration = `${animationDuration}s`;
        particle.style.animationDelay = `${animationDelay}s`;
        
        container.appendChild(particle);
    }
}

function loadCategories() {
    const categoriesGrid = document.querySelector('.categories-grid');
    categoriesGrid.innerHTML = '';
    
    // Sample categories - in a real app, these would come from Firebase
    const categories = [
        { name: "AI Assistants", icon: "fas fa-robot", count: 24 },
        { name: "Image Generation", icon: "fas fa-image", count: 18 },
        { name: "Video Tools", icon: "fas fa-video", count: 15 },
        { name: "Writing Assistants", icon: "fas fa-pen", count: 32 },
        { name: "Coding Tools", icon: "fas fa-code", count: 27 },
        { name: "Data Science", icon: "fas fa-chart-line", count: 21 },
        { name: "Marketing", icon: "fas fa-bullhorn", count: 19 },
        { name: "Productivity", icon: "fas fa-tasks", count: 26 }
    ];
    
    categories.forEach((category, index) => {
        const categoryCard = document.createElement('div');
        categoryCard.className = `category-card fade-in delay-${index % 4}`;
        categoryCard.innerHTML = `
            <div class="category-icon"><i class="${category.icon}"></i></div>
            <h3 class="category-name">${category.name}</h3>
            <div class="category-count">${category.count}+ Tools</div>
        `;
        categoriesGrid.appendChild(categoryCard);
    });
}

function loadTools() {
    const toolGrid = document.getElementById('tool-grid');
    toolGrid.innerHTML = '<div class="loader"></div>';
    
    // Sample tools - in a real app, these would come from Firebase
    setTimeout(() => {
        toolGrid.innerHTML = '';
        
        const tools = [
            { 
                name: "ChatGPT", 
                category: "AI Assistants", 
                icon: "https://cdn-icons-png.flaticon.com/512/6134/6134346.png", 
                link: "#",
                description: "Advanced AI conversational assistant with natural language understanding.",
                rating: 5,
                reviews: "10,000+"
            },
            { 
                name: "Midjourney", 
                category: "Image Generation", 
                icon: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png", 
                link: "#",
                description: "AI-powered image generation from text descriptions.",
                rating: 5,
                reviews: "8,500+"
            },
            { 
                name: "RunwayML", 
                category: "Video Tools", 
                icon: "https://cdn-icons-png.flaticon.com/512/2991/2991341.png", 
                link: "#",
                description: "Creative suite for artists using machine learning models.",
                rating: 4,
                reviews: "5,200+"
            },
            { 
                name: "Jasper", 
                category: "Writing Assistants", 
                icon: "https://cdn-icons-png.flaticon.com/512/1006/1006363.png", 
                link: "#",
                description: "AI writing assistant for content creators and marketers.",
                rating: 4,
                reviews: "7,800+"
            },
            { 
                name: "GitHub Copilot", 
                category: "Coding Tools", 
                icon: "https://cdn-icons-png.flaticon.com/512/2111/2111288.png", 
                link: "#",
                description: "AI pair programmer that suggests code in your editor.",
                rating: 5,
                reviews: "15,000+"
            },
            { 
                name: "DataRobot", 
                category: "Data Science", 
                icon: "https://cdn-icons-png.flaticon.com/512/2103/2103834.png", 
                link: "#",
                description: "Automated machine learning platform for data scientists.",
                rating: 4,
                reviews: "3,500+"
            }
        ];
        
        tools.forEach((tool, index) => {
            const toolCard = document.createElement('a');
            toolCard.href = tool.link;
            toolCard.target = "_blank";
            toolCard.rel = "noopener noreferrer";
            toolCard.className = `tool-card fade-in delay-${index % 3}`;
            toolCard.innerHTML = `
                <div class="tool-icon">
                    <img src="${tool.icon}" alt="${tool.name}">
                    <div class="tool-badge">AI</div>
                </div>
                <div class="tool-info">
                    <h3>${tool.name}</h3>
                    <p class="tool-category">${tool.category}</p>
                    <p class="tool-description">${tool.description}</p>
                    <div class="tool-meta">
                        <span class="tool-rating">${'★'.repeat(tool.rating)}${'☆'.repeat(5 - tool.rating)}</span>
                        <span class="tool-reviews">${tool.reviews} reviews</span>
                    </div>
                </div>
                <div class="tool-link">
                    <span>Explore</span>
                    <i class="fas fa-arrow-right"></i>
                </div>
            `;
            toolGrid.appendChild(toolCard);
        });
        
        // Populate category filter
        const categoryFilter = document.getElementById('categoryFilter');
        const categories = [...new Set(tools.map(tool => tool.category))];
        
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categoryFilter.appendChild(option);
        });
    }, 1500);
}

function filterTools() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const category = document.getElementById('categoryFilter').value;
    
    const toolCards = document.querySelectorAll('.tool-card');
    
    toolCards.forEach(card => {
        const name = card.querySelector('h3').textContent.toLowerCase();
        const desc = card.querySelector('.tool-description').textContent.toLowerCase();
        const toolCategory = card.querySelector('.tool-category').textContent;
        
        const matchesSearch = name.includes(searchTerm) || desc.includes(searchTerm);
        const matchesCategory = category === 'all' || toolCategory === category;
        
        if (matchesSearch && matchesCategory) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
}

function openModal() {
    alert('Subscribe to our newsletter for the latest AI tools and updates!');
}

function subscribe() {
    const email = document.getElementById('subscribeEmail').value;
    if (email && validateEmail(email)) {
        alert(`Thank you for subscribing with ${email}! You'll receive our updates soon.`);
        document.getElementById('subscribeEmail').value = '';
    } else {
        alert('Please enter a valid email address');
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
