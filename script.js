class Dropdown {
    constructor(element) {
        this.element = element;
        this.trigger = element.querySelector('.dropdown-trigger');
        this.content = element.querySelector('.dropdown-content');

        // Bind event handlers
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);

        // Add event listeners
        this.element.addEventListener('mouseenter', this.handleMouseEnter);
        this.element.addEventListener('mouseleave', this.handleMouseLeave);
    }

    handleMouseEnter() {
        this.content.classList.add('visible');
    }

    handleMouseLeave() {
        this.content.classList.remove('visible');
    }
}

class Carousel {
    constructor(element) {
        this.carousel = element;
        this.track = element.querySelector('.carousel-track');
        this.slides = Array.from(element.querySelectorAll('.carousel-slide'));
        this.nextButton = element.querySelector('.next');
        this.prevButton = element.querySelector('.prev');
        this.dotsContainer = element.querySelector('.carousel-dots');
        this.refreshButton = document.querySelector('.refresh-button');

        this.currentSlide = 0;
        this.slideCount = this.slides.length;
        this.slideWidth = 100 / this.slideCount;

        this.init();
    }

    init() {
        // Set up the track width and slide widths
        this.track.style.width = `${this.slideCount * 100}%`;
        this.slides.forEach(slide => {
            slide.style.width = `${this.slideWidth}%`;
        });

        // Create dots
        this.createDots();

        // Add event listeners
        this.nextButton.addEventListener('click', () => this.next());
        this.prevButton.addEventListener('click', () => this.prev());
        this.refreshButton.addEventListener('click', () => this.fetchNewImages());

        // Start auto-advance
        this.startAutoAdvance();
    }

    async fetchNewImages() {
        // Disable the button while loading
        this.refreshButton.disabled = true;
        this.refreshButton.textContent = 'Loading...';

        try {
            // Fetch new images for each slide
            for (let i = 0; i < this.slides.length; i++) {
                const img = this.slides[i].querySelector('img');
                // Add a timestamp to prevent caching
                const timestamp = new Date().getTime();
                img.src = `https://picsum.photos/800/400?random=${timestamp + i}`;

                // Wait for the image to load
                await new Promise((resolve, reject) => {
                    img.onload = resolve;
                    img.onerror = reject;
                });
            }

            // Reset to first slide
            this.currentSlide = 0;
            this.updateTrack();
            this.updateDots();
            this.resetAutoAdvance();
        } catch (error) {
            console.error('Error loading new images:', error);
            alert('Failed to load new images. Please try again.');
        } finally {
            // Re-enable the button
            this.refreshButton.disabled = false;
            this.refreshButton.textContent = 'Get New Images';
        }
    }

    createDots() {
        for (let i = 0; i < this.slideCount; i++) {
            const dot = document.createElement('button');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.goToSlide(i));
            this.dotsContainer.appendChild(dot);
        }
        this.dots = Array.from(this.dotsContainer.children);
    }

    updateDots() {
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });
    }

    goToSlide(index) {
        this.currentSlide = index;
        this.updateTrack();
        this.updateDots();
        this.resetAutoAdvance();
    }

    next() {
        this.currentSlide = (this.currentSlide + 1) % this.slideCount;
        this.updateTrack();
        this.updateDots();
        this.resetAutoAdvance();
    }

    prev() {
        this.currentSlide = (this.currentSlide - 1 + this.slideCount) % this.slideCount;
        this.updateTrack();
        this.updateDots();
        this.resetAutoAdvance();
    }

    updateTrack() {
        this.track.style.transform = `translateX(-${this.currentSlide * this.slideWidth}%)`;
    }

    startAutoAdvance() {
        this.autoAdvanceInterval = setInterval(() => this.next(), 5000);
    }

    resetAutoAdvance() {
        clearInterval(this.autoAdvanceInterval);
        this.startAutoAdvance();
    }
}

// Initialize all dropdowns on the page
document.addEventListener('DOMContentLoaded', () => {
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => new Dropdown(dropdown));

    const carousel = document.querySelector('.carousel');
    new Carousel(carousel);
});