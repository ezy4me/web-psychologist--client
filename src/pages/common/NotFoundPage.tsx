import TypingEffect from "@/components/common/TypingEffect";
import { Container } from "@mui/material";

const NotFoundPage = () => {
  return (
    <Container>
      <TypingEffect
        text="404 Not Found"
        typingDelay={100}
        erasingDelay={100}
        pauseDelay={1000}
      />
    </Container>
  );
};

export default NotFoundPage;
