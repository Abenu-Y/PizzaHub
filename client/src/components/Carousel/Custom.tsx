import { useState, useEffect } from 'react';
import './Carousel.css'; 
import { carouselImage } from '../../utils/data/image';

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const totalItems = carouselImage.length;

    const showSlide = (index: number) => {
        setCurrentIndex(index);
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % totalItems);
    };

    // Auto-play effect
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 3000); 

        return () => clearInterval(interval); 
    }, []);

    return (
        <div className="carousel-container">
            <div className="carousel-inner" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {carouselImage.map((item, idx) => (
                    <div key={idx} className="carousel-item" style={{ borderRadius: '10px' }}> {/* Add border radius here */}
                        <img src={item} alt="" className="object-cover w-full h-full rounded-[10px]" /> {/* Ensure rounded corners on images */}
                    </div>
                ))}
            </div>
            <div className="carousel-pagination">
                {carouselImage.map((_, index) => (
                    <span
                        key={index}
                        className={`dot ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => showSlide(index)}
                    ></span>
                ))}
            </div>
        </div>
    );
};

export default Carousel;
