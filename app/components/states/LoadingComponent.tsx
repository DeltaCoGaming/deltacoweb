// app/components/LoadingComponent.tsx

'use client';

import React, { useEffect, useState } from 'react';
import Loading from '../../loading';

const LoadingComponent = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 3 seconds delay

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return <>{children}</>;
};

export default LoadingComponent;
