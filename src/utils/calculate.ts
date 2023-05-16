export function calculate(expression: string): number {
  const signs = expression.split('');
  const stack = signs.reduceRight((stack: number[], token: string) => {
    const value = parseFloat(token);

    if (!isNaN(value)) {
      stack.push(value);
    } else {
      if (stack.length < 2) {
        throw new Error('Invalid expression: Not enough operands');
      }

      const a = stack.pop() as number;
      const b = stack.pop() as number;

      switch (token) {
        case '+':
          stack.push(a + b);
          break;
        case '-':
          stack.push(a - b);
          break;
        case '*':
          stack.push(a * b);
          break;
        case '/':
          if (a === 0) {
            throw new Error("Don't divide by zero");
          }
          stack.push(a / b);
          break;
        default:
          throw new Error('Unknown operator: ' + token);
      }
    }

    return stack;
  }, []);

  if (stack.length !== 1) {
    throw new Error('Invalid expression: Too many operands');
  }

  return stack.pop() as number;
}
