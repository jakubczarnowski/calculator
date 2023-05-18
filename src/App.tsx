import { Text, Container, Flex, Input, useToast, Box } from '@chakra-ui/react';
import { Layout } from './components/Layout';
import { useState } from 'react';
import { SignButton } from './components/SignButton';
import { calculate } from './utils/calculate';
import { useHistory } from './hooks/useHistory';
import { EquationHistory } from './providers/HistoryProvider';
import React from 'react';

function App() {
  const toast = useToast();
  const [equation, setEquation] = useState('');
  const [result, setResult] = useState('');
  const { addHistory, history } = useHistory();

  const handleAddSign = (sign: string) => {
    setEquation((prev) => prev + sign);
  };

  const handleClear = () => {
    setEquation('');
  };

  const handleCalculate = () => {
    try {
      const calculationResult = calculate(equation);
      addHistory({ equation, result: calculationResult.toString(), timestamp: Date.now() });
      setResult(calculationResult.toString());
    } catch (err) {
      if (!(err instanceof Error)) return;
      toast({
        title: 'Error',
        description: err.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleGoToHistory = (item: EquationHistory) => {
    setEquation(item.equation);
    setResult(item.result);
  };

  const renderButton = (sign: string, onClick?: () => void) => (
    <SignButton onClick={onClick ? onClick : () => handleAddSign(sign)}>
      <Text userSelect="none" fontSize={['lg', '3xl', '5xl']}>
        {sign}
      </Text>
    </SignButton>
  );

  return (
    <Layout>
      <Container
        display="flex"
        flexDir="column"
        border="1px solid black"
        borderRadius="2xl"
        maxW="container.lg"
        p={4}
      >
        <Flex direction="row" gap={4}>
          <Text fontSize="2xl" fontWeight="bold">
            Calculator
          </Text>
          <Input readOnly variant="flushed" textAlign="right" value={equation} />
        </Flex>
        <Box ml="auto">
          <Text fontSize="2xl" fontWeight="semibold" w="full" textAlign="right">
            Result: {result}
          </Text>
        </Box>
        <Flex direction={{ base: 'column', md: 'row' }} w="full" justifyContent="center" gap={3}>
          <Flex maxW="container.md" w="full" direction="column" gap={2}>
            <Flex direction="row" gap={2}>
              {renderButton('1')}
              {renderButton('2')}
              {renderButton('3')}
              {renderButton('+')}
            </Flex>
            <Flex direction="row" gap={2}>
              {renderButton('4')}
              {renderButton('5')}
              {renderButton('6')}
              {renderButton('-')}
            </Flex>
            <Flex direction="row" gap={2}>
              {renderButton('7')}
              {renderButton('8')}
              {renderButton('9')}
              {renderButton('*')}
            </Flex>
            <Flex direction="row" gap={2}>
              {renderButton('cls', handleClear)}
              {renderButton('0')}
              {renderButton('=', handleCalculate)}
              {renderButton('/')}
            </Flex>
          </Flex>

          <Flex direction="column" w="200px" maxHeight="700px" overflowY="auto" gap={2}>
            {history
              .sort((a, b) => b.timestamp - a.timestamp)
              .map((item, index) => (
                <Flex
                  key={index}
                  direction="column"
                  p={2}
                  w="full"
                  onClick={() => handleGoToHistory(item)}
                  border="1px solid black"
                  borderRadius="xl"
                >
                  <Text
                    userSelect="none"
                    fontSize={['sm', 'lg', '2xl']}
                    w="full"
                    fontWeight="semibold"
                  >
                    Equation:{' '}
                    <Text as="span" fontWeight="light">
                      {item.equation}
                    </Text>
                  </Text>
                </Flex>
              ))}
          </Flex>
        </Flex>
      </Container>
    </Layout>
  );
}

export default App;
