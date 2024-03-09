import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

interface NotificationProps {
  title: string;
  text: string;
  icon: 'success' | 'error' | 'warning' | 'info' | 'question' | undefined;
}

export const showNotification = ({ title, text, icon }: NotificationProps) => {
  MySwal.fire({
    title: title,
    text: text,
    icon: icon,
    buttonsStyling: true,
    confirmButtonColor: '#0b85ff',
  });
};
