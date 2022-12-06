import { Text, Box } from '@/components';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const ErrorMessage = ({ children }: Props) => {
  return (
    <Box margin="5px 0 0">
      <Text fontSize="xs" fontWeight="regular" color="danger">
        {children}
      </Text>
    </Box>
  );
};

export default ErrorMessage;
