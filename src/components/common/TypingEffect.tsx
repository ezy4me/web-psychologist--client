import { useState, useEffect } from 'react';
import styled from 'styled-components';

type PropsType = {
  text: string;
  typingDelay: number;
  erasingDelay: number;
  pauseDelay: number;
};

const TypingEffect = ({ text, typingDelay, erasingDelay, pauseDelay }: PropsType) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let timeoutId: number;

    const handleTyping = () => {
      const currentTextLength = displayText.length;
      if (isTyping) {
        if (currentTextLength === text.length) {
          setIsTyping(false);
          timeoutId = window.setTimeout(() => setDisplayText(''), pauseDelay);
        } else {
          setDisplayText(text.substring(0, currentTextLength + 1));
          timeoutId = window.setTimeout(handleTyping, typingDelay);
        }
      } else {
        if (currentTextLength === 0) {
          setIsTyping(true);
          timeoutId = window.setTimeout(() => setDisplayText(''), pauseDelay);
        } else {
          setDisplayText(text.substring(0, currentTextLength - 1));
          timeoutId = window.setTimeout(handleTyping, erasingDelay);
        }
      }
    };

    timeoutId = window.setTimeout(handleTyping, isTyping ? typingDelay : erasingDelay);

    return () => window.clearTimeout(timeoutId);
  }, [displayText, isTyping, text, typingDelay, erasingDelay, pauseDelay]);

  return <StyledTypingEffect>{displayText}</StyledTypingEffect>;
};

const StyledTypingEffect = styled.h1`
  font-size: 40px;
  font-weight: bold;
  color: #333;
`;

export default TypingEffect;
