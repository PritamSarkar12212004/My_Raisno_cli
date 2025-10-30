import { showMessage } from 'react-native-flash-message';

interface FlashMsgProps {
  message: string;
  description?: string;
  type?: 'success' | 'danger' | 'info' | 'warning' | 'default';
}

const FlashMsg = ({
  message,
  description,
  type = 'default',
}: FlashMsgProps) => {
  return showMessage({
    message,
    description,
    type,
  });
};

export default FlashMsg;
