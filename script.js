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

// Initialize all dropdowns on the page
document.addEventListener('DOMContentLoaded', () => {
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => new Dropdown(dropdown));
});