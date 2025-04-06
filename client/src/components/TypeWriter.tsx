
import { useState, useEffect, useCallback } from 'react';

interface TypeWriterProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayAfterText?: number;
  delayAfterDelete?: number;
  className?: string;
}

const TypeWriter = ({
  texts,
  typingSpeed = 70,
  deletingSpeed = 40,
  delayAfterText = 1500,
  delayAfterDelete = 300,
  className = ""
}: TypeWriterProps) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  // Função para continuar para o próximo texto de forma contínua
  const moveToNextText = useCallback(() => {
    setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
  }, [texts.length]);

  useEffect(() => {
    if (texts.length === 0) return;

    let timeout: NodeJS.Timeout;

    if (isWaiting) {
      // Tempo para aguardar antes de começar a próxima ação
      timeout = setTimeout(() => {
        setIsWaiting(false);
        if (isDeleting) {
          // Se terminou de apagar, avance para o próximo texto
          moveToNextText();
        } else {
          // Se terminou de escrever, comece a apagar
          setIsDeleting(true);
        }
      }, isDeleting ? delayAfterDelete : delayAfterText);
    } else if (isDeleting) {
      if (currentText.length === 0) {
        // Quando terminar de apagar
        setIsDeleting(false);
        setIsWaiting(true);
      } else {
        // Continue apagando
        timeout = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1));
        }, deletingSpeed);
      }
    } else {
      const targetText = texts[currentTextIndex];
      if (currentText.length < targetText.length) {
        // Continue digitando
        timeout = setTimeout(() => {
          setCurrentText(targetText.slice(0, currentText.length + 1));
        }, typingSpeed);
      } else {
        // Quando terminar de digitar
        setIsWaiting(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [
    currentText,
    currentTextIndex,
    isDeleting,
    isWaiting,
    texts,
    typingSpeed,
    deletingSpeed,
    delayAfterText,
    delayAfterDelete,
    moveToNextText
  ]);

  return (
    <span className={className}>
      {currentText}
      <span className="inline-block w-1 h-[1em] ml-1 bg-white animate-blink align-middle">
        {/* Cursor animado */}
      </span>
    </span>
  );
};

export default TypeWriter;
