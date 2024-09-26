
import { useState, useEffect } from 'react';
import './Carousel.css'; 

interface CarouselItem {
    id: number;
    content: string;
}

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const items: CarouselItem[] = [
        { id: 1, content: "Item 1" },
        { id: 2, content: "Item 2" },
        { id: 3, content: "Item 3" },
    ];

    const totalItems = items.length;

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
        <div className="rounded-2xl carousel-container">
            <div className="carousel-inner " style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {items.map((item) => (
                    <div key={item.id} className="carousel-item">
                        {item.content}
                    </div>
                ))}
            </div>
            <div className="carousel-pagination">
                {items.map((_, index) => (
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
