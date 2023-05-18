import React from 'react';
import { Flex, FlexProps } from '@chakra-ui/react';

type Props = {
  children: React.ReactNode;
  onClick: () => void;
} & FlexProps;

export const SignButton = ({ children, onClick, ...props }: Props) => {
  return (
    <Flex
      aspectRatio={1}
      maxW="300px"
      border="1px solid black"
      borderRadius="2xl"
      direction="column"
      alignItems="center"
      justifyContent="center"
      w="full"
      onClick={onClick}
      {...props}
    >
      {children}
    </Flex>
  );
};
