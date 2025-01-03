import React from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { Courses } from '../components/Courses';
import { AiTutor } from '../components/AiTutor';

export function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Courses />
      <AiTutor />
    </div>
  );
}