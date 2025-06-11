'use client';

import React, { useState } from "react";
import { Button, Input } from "@heroui/react";
import { Icon } from "@iconify/react";
import ShinyText from './ShinyText';

export default function Login() {
  const [isVisible, setIsVisible] = useState(false);
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
    try {
      const response = await fetch(`${backendUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user, password })
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('jwtToken', data.token);
        window.location.href = '/home';
      } else {
        alert('Login failed!');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large">
        <div className="flex flex-col items-center pb-6">
          <ShinyText text="educa bank" disabled={false} speed={3} className='text-6xl font-sans' />
          <p className="text-small text-default-500">Entre na sua conta.</p>
        </div>
        <form className="flex flex-col gap-3" onSubmit={handleLogin}>
          <div className="flex flex-col gap-2">
            <Input
              isRequired
              name="User"
              placeholder="Digite seu @"
              type="User"
              variant="bordered"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
            <Input
              isRequired
              type={isVisible ? "text" : "password"}
              name="password"
              placeholder="Digite sua senha"
              variant="bordered"
              endContent={
                <button type="button" onClick={toggleVisibility}>
                  {isVisible ? (
                    <Icon className="pointer-events-none text-2xl text-default-400" icon="solar:eye-closed-linear" />
                  ) : (
                    <Icon className="pointer-events-none text-2xl text-default-400" icon="solar:eye-bold" />
                  )}
                </button>
              }
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button color="default" type="submit">
            <ShinyText text="Confirmar" disabled={false} speed={3} className='custom-class' />
          </Button>
        </form>
      </div>
    </div>
  );
}