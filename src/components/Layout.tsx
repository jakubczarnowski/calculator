import { Flex, FlexProps } from '@chakra-ui/react';
import React from 'react';

type Props = {
  children: React.ReactNode;
} & FlexProps;

export const Layout = ({ children, ...props }: Props) => {
  return (
    <Flex alignItems="center" justifyContent="center" minH="100vh" w="full" {...props}>
      {children}
    </Flex>
  );
};
