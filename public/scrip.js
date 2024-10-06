
const testimonials = document.querySelector('.testimonials-slider');
let currentIndex = 0;

function showTestimonial(index) {
    const testimonialsCards = testimonials.children;
    for (let i = 0; i < testimonialsCards.length; i++) {
        testimonialsCards[i].style.display = 'none'; 
    }
    testimonialsCards[index].style.display = 'block'; 
}

function nextTestimonial() {
    currentIndex = (currentIndex + 1) % testimonials.children.length;
    showTestimonial(currentIndex);
}

showTestimonial(currentIndex);
setInterval(nextTestimonial, 5000); 
