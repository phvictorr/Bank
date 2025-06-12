'use client';

import React, { useState, useEffect } from 'react';
import { Spinner } from '@heroui/react';
import { useRouter } from 'next/navigation';

export function withAuth<P>(Component: React.FC<P>): React.FC<P> {
  const AuthenticatedComponent: React.FC<P> = (props: P) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [user, setUser] = useState('');
    const [saldo, setSaldo] = useState('0');
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('jwtToken');
      if (!token) {
        router.push('/login');
      } else {
        try {
          const decodedToken = JSON.parse(atob(token.split('.')[1]));
          const jwtUser = decodedToken.userID;
          setUser(jwtUser);

          const expiryTimestamp = decodedToken.exp * 1000;
          if (Date.now() >= expiryTimestamp) {
            localStorage.removeItem('jwtToken');
            router.push('/login');
            return;
          }

          const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
          fetch(`${backendUrl}/users/${jwtUser}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
            .then(response => response.json())
            .then(data => {
              if (data.saldo) {
                setSaldo(data.saldo);
              }
              setIsLoaded(true);
            })
            .catch(error => {
              console.error('Error fetching data:', error);
              setIsLoaded(true);
            });
        } catch (error) {
          console.error('Token inválido ou corrompido:', error);
          localStorage.removeItem('jwtToken');
          router.push('/login');
        }
      }
    }, [router]);

    if (!isLoaded) {
      return (
        <div className="flex items-center justify-center h-screen">
          <Spinner classNames={{ label: "text-foreground mt-4" }} label="Carregando" variant="wave" color="default" />
        </div>
      );
    }

    return <Component {...props} user={user} saldo={saldo} />;
  };

  return AuthenticatedComponent;
}