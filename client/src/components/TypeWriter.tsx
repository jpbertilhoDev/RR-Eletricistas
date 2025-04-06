
import React, { useState, useEffect, useCallback } from 'react';

const TypeWriter = () => {
  // Array de textos curtos e objetivos
  const texts = [
    "Especialistas em instalações elétricas.",
    "Manutenção residencial e comercial.",
    "Mais de 10 anos de experiência.",
    "Atendimento rápido e eficiente.",
    "Equipe qualificada e comprometida.",
    "Soluções personalizadas em elétrica."
  ];

  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);

  const handleTyping = useCallback(() => {
    const currentText = texts[currentIndex];

    if (!isDeleting) {
      // Digitando o texto
      setDisplayText(currentText.substring(0, displayText.length + 1));
      setTypingSpeed(80);

      // Se completou a digitação, espere um pouco e comece a apagar
      if (displayText.length === currentText.length) {
        setTimeout(() => setIsDeleting(true), 1500);
        setTypingSpeed(50);
      }
    } else {
      // Apagando o texto
      setDisplayText(currentText.substring(0, displayText.length - 1));
      setTypingSpeed(30);

      // Se terminou de apagar, vá para o próximo texto
      if (displayText.length === 0) {
        setIsDeleting(false);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
      }
    }
  }, [currentIndex, displayText, isDeleting, texts]);

  useEffect(() => {
    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, handleTyping, typingSpeed]);

  return (
    <div className="typewriter-container">
      <span>{displayText}</span>
      <span className="cursor">|</span>
    </div>
  );
};

export default TypeWriter;
