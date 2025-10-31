"use client";

import { useEffect, useState } from 'react';

export function CurrentDate() {
  const [date, setDate] = useState('');

  useEffect(() => {
    setDate(new Date().toLocaleDateString('pt-BR'));
  }, []);

  return <span>{date}</span>;
}
