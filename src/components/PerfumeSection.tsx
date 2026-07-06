import React from 'react';
import { Perfume } from '../types/perfume';
import { PerfumeCard } from './PerfumeCard';

interface PerfumeSectionProps {
  id: string;
  title: string;
  perfumes: Perfume[];
}

export const PerfumeSection: React.FC<PerfumeSectionProps> = ({ id, title, perfumes }) => {
  return (
    <section id={id} className="py-16 px-8">
      <h2 className="text-3xl font-bold text-center mb-12">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {perfumes.map((perfume, index) => (
          <PerfumeCard key={`${id}-${index}`} perfume={perfume} />
        ))}
      </div>
    </section>
  );
};
