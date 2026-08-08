import { useState } from 'react';

export function useToggle(initialValue: boolean): [boolean, () => void] {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggle = (): void => {
    setValue((currentValue) => !currentValue);
  };

  return [value, toggle];
}
