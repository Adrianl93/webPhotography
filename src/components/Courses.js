import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Courses.css';
import whatsappIcon from '../assets/whatsappIcon.svg';

const Courses = ({ data }) => {
    const [timeLeft, setTimeLeft] = useState({});
    const courseStartDate = new Date(data.courseStartDate);
    const navigate = useNavigate(); // Hook para redireccionar

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            const difference = courseStartDate - now;

            const timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };

            setTimeLeft(timeLeft);

            if (difference <= 0) {
                clearInterval(timer);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [courseStartDate]);

    const handleWhatsAppClick = () => {
        const phoneNumber = data.contact.whatsapp.replace(/\D/g, ''); // Eliminar caracteres no numéricos
        const message = data.contact.message;
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    const handleViewCoursesClick = () => {
        navigate('/OnlineCourses'); // Redirige a la página de cursos online
    };

    return (
        <div className="course-container">
            <div className="contentGrid"> 
                <div className="course-image-container">
                    <img src={data.image} alt="Curso de fotografía" className="course-image" />
                </div>
                <div className="course-description">
                    <h2>{data.title}</h2>
                    <p>{data.description}</p>
                    <button className="whatsapp-button" onClick={handleWhatsAppClick}>
                        Inscribirse&nbsp;&nbsp;&nbsp;&nbsp;<img src={whatsappIcon} alt="WhatsApp Icon" width="25" height="25" />
                    </button>
                    <div className="countdown">
                        <h3>El próximo curso comienza en:</h3>
                        <div id="timer" className="timer">
                            <div>{timeLeft.days}<span>días</span></div>
                            <div>{timeLeft.hours}<span>horas</span></div>
                            <div>{timeLeft.minutes}<span>minutos</span></div>
                            <div>{timeLeft.seconds}<span>segundos</span></div>
                        </div>
                    </div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <h3>Si no puedes asistir, siempre puedes comprar nuestros cursos online clickeando aquí:</h3>
                    <button className="view-courses-button" onClick={handleViewCoursesClick}>
                        Ver Cursos Online
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Courses;
