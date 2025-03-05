document.addEventListener('DOMContentLoaded', () => {
    const heroImages = [
        {
            url: 'https://source.unsplash.com/1600x900/?university',
            alt: 'University Campus'
        },
        {
            url: 'https://source.unsplash.com/1600x900/?college',
            alt: 'College Life'
        },
        {
            url: 'https://source.unsplash.com/1600x900/?library',
            alt: 'University Library'
        },
        {
            url: 'https://source.unsplash.com/1600x900/?graduation',
            alt: 'Graduation'
        }
    ];

    const heroImagesContainer = document.querySelector('.hero-images');
    
    // Create and load images
    heroImages.forEach((image, index) => {
        const img = document.createElement('img');
        img.src = image.url;
        img.alt = image.alt;
        img.className = index === 0 ? 'active' : '';
        heroImagesContainer.appendChild(img);
    });

    // Image slideshow
    let currentImageIndex = 0;
    const images = heroImagesContainer.querySelectorAll('img');

    setInterval(() => {
        images[currentImageIndex].classList.remove('active');
        currentImageIndex = (currentImageIndex + 1) % images.length;
        images[currentImageIndex].classList.add('active');
    }, 5000);
}); 