import styled from 'styled-components';

interface PageImageProps {
  $image: string;
  children?: React.ReactNode;
}

const PageImageWrapper = styled('div')<PageImageProps>(({ $image }) => ({
  backgroundImage: `url("${$image}")`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '400px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 4,
}));

const PageImageContent = styled('div')({
  color: 'inherit',
});

const PageImage: React.FC<PageImageProps> = ({ $image, children }) => {
  return (
    <PageImageWrapper $image={$image}>
      <PageImageContent>{children}</PageImageContent>
    </PageImageWrapper>
  );
};

export default PageImage;
