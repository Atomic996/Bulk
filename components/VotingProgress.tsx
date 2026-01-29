
import React from 'react';

interface VotingProgressProps {
  current: number;
  total: number;
}

const VotingProgress: React.FC<VotingProgressProps> = ({ current, total }) => {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <div className="flex justify-between items-end mb-2">
        <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Session Progress</span>
        <span className="text-sm font-medium text-blue-400">{current} / {total}</span>
      </div>
      <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default VotingProgress;
