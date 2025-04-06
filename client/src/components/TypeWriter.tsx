import { useState, useEffect } from 'react';

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
  typingSpeed = 100,
  deletingSpeed = 50,
  delayAfterText = 2000,
  delayAfterDelete = 500,
  className = ""
}: TypeWriterProps) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    if (texts.length === 0) return;

    let timeout: NodeJS.Timeout;

    if (isWaiting) {
      timeout = setTimeout(() => {
        setIsWaiting(false);
        setIsDeleting(true);
      }, isDeleting ? delayAfterDelete : delayAfterText);
      return () => clearTimeout(timeout);
    }

    if (isDeleting) {
      if (currentText.length === 0) {
        setIsDeleting(false);
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
        setIsWaiting(true);
      } else {
        timeout = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1));
        }, deletingSpeed);
      }
    } else {
      const targetText = texts[currentTextIndex];
      if (currentText.length < targetText.length) {
        timeout = setTimeout(() => {
          setCurrentText(targetText.slice(0, currentText.length + 1));
        }, typingSpeed);
      } else {
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