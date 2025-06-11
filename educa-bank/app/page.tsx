'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Login from "../components/login";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      router.push('/');
    }
  }, [router]);

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <Login />
      </div>
    </section>
  );
}