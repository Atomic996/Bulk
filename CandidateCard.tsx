
import React from 'react';
import { Candidate } from '../types';

interface CandidateCardProps {
  candidate: Candidate;
  onVote: (known: boolean) => void;
  disabled: boolean;
}

const CandidateCard: React.FC<CandidateCardProps> = ({ candidate, onVote, disabled }) => {
  return (
    <div className="w-full max-w-md mx-auto transform transition-all duration-500 ease-out">
      <div className="glass-card rounded-3xl p-8 flex flex-col items-center space-y-6 shadow-2xl border border-white/10">
        {/* Avatar Container */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <img
            src={candidate.avatarUrl}
            alt={candidate.name}
            className="relative w-32 h-32 rounded-full object-cover border-4 border-black/50"
          />
        </div>

        {/* Text Details */}
        <div className="text-center">
          <h2 className="text-2xl font-bold font-heading tracking-tight text-white">{candidate.name}</h2>
          <p className="text-blue-400 font-medium">{candidate.handle}</p>
        </div>

        {/* Actions */}
        <div className="flex flex-col w-full gap-3">
          <button
            onClick={() => onVote(true)}
            disabled={disabled}
            className="w-full py-4 px-6 bg-white text-black font-bold rounded-2xl hover:bg-blue-50 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            <span>I know them</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          
          <button
            onClick={() => onVote(false)}
            disabled={disabled}
            className="w-full py-4 px-6 bg-transparent border border-white/20 text-white/70 font-medium rounded-2xl hover:bg-white/5 transition-all active:scale-95 disabled:opacity-50"
          >
            I don't know them
          </button>
        </div>

        <div className="pt-4 border-t border-white/5 w-full text-center">
          <p className="text-xs text-white/30 uppercase tracking-widest">Codex Verification Active</p>
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;
