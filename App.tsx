
import React, { useState, useEffect, useCallback } from 'react';
import { AppState, UserSession, Candidate, Vote } from './types';
import { MOCK_CANDIDATES, VALID_PERMITS, VOTE_LIMIT } from './constants';
import CandidateCard from './components/CandidateCard';
import VotingProgress from './components/VotingProgress';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.AUTH);
  const [permitInput, setPermitInput] = useState('');
  const [session, setSession] = useState<UserSession | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load session from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('bulk_session');
    if (saved) {
      const parsed = JSON.parse(saved) as UserSession;
      setSession(parsed);
      if (parsed.remainingVotes <= 0) {
        setAppState(AppState.FINISHED);
      } else {
        setAppState(AppState.VOTING);
        // Find next candidate not yet voted on
        const votedIds = new Set(parsed.votes.map(v => v.candidateId));
        const firstUnvotedIndex = MOCK_CANDIDATES.findIndex(c => !votedIds.has(c.id));
        setCurrentIndex(firstUnvotedIndex !== -1 ? firstUnvotedIndex : 0);
      }
    }
  }, []);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (VALID_PERMITS.includes(permitInput.trim().toUpperCase())) {
      const newSession: UserSession = {
        permitId: permitInput.toUpperCase(),
        votes: [],
        remainingVotes: VOTE_LIMIT
      };
      setSession(newSession);
      localStorage.setItem('bulk_session', JSON.stringify(newSession));
      setAppState(AppState.VOTING);
      setError(null);
    } else {
      setError("Invalid voting permit. Please check your credentials from Discord.");
    }
  };

  const handleVote = useCallback((known: boolean) => {
    if (!session || isTransitioning) return;

    setIsTransitioning(true);
    const candidate = MOCK_CANDIDATES[currentIndex];
    
    const newVote: Vote = {
      candidateId: candidate.id,
      known,
      timestamp: new Date().toISOString()
    };

    const updatedSession: UserSession = {
      ...session,
      votes: [...session.votes, newVote],
      remainingVotes: session.remainingVotes - 1
    };

    setSession(updatedSession);
    localStorage.setItem('bulk_session', JSON.stringify(updatedSession));

    // Wait for animation before moving to next
    setTimeout(() => {
      if (updatedSession.remainingVotes <= 0 || currentIndex >= MOCK_CANDIDATES.length - 1) {
        setAppState(AppState.FINISHED);
      } else {
        setCurrentIndex(prev => prev + 1);
      }
      setIsTransitioning(false);
    }, 400);
  }, [session, currentIndex, isTransitioning]);

  const resetSession = () => {
    localStorage.removeItem('bulk_session');
    setSession(null);
    setAppState(AppState.AUTH);
    setPermitInput('');
    setCurrentIndex(0);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col p-6 selection:bg-blue-500/30">
      {/* Header */}
      <header className="w-full max-w-5xl mx-auto flex justify-between items-center mb-12">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center font-bold text-black text-xl font-heading shadow-lg shadow-white/10">B</div>
          <h1 className="text-xl font-bold font-heading tracking-tighter">BULK <span className="text-white/40 font-light">CODEX</span></h1>
        </div>
        {session && (
          <div className="flex items-center space-x-4">
            <div className="hidden md:block text-right">
              <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Authorized User</p>
              <p className="text-sm font-mono text-blue-400">{session.permitId}</p>
            </div>
            <button 
              onClick={resetSession}
              className="p-2 hover:bg-white/5 rounded-full transition-colors group"
              title="Reset Session"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/30 group-hover:text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto w-full">
        {appState === AppState.AUTH && (
          <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-bold font-heading mb-4 tracking-tight leading-tight">Welcome to the Codex <br/>Recognition Map.</h2>
              <p className="text-white/60 text-lg">Enter your unique voting permit to start building a decentralized network of trust.</p>
            </div>
            
            <form onSubmit={handleAuth} className="glass-card p-8 rounded-3xl space-y-6">
              <div>
                <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-2 px-1">Access Permit</label>
                <input 
                  type="text" 
                  value={permitInput}
                  onChange={(e) => setPermitInput(e.target.value)}
                  placeholder="EX: BULK"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-xl font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-white/10"
                />
                {error && <p className="text-red-400 text-sm mt-3 ml-1">{error}</p>}
              </div>
              <button 
                type="submit"
                className="w-full py-4 bg-white text-black font-bold rounded-2xl hover:bg-blue-50 transition-all active:scale-95 shadow-xl shadow-white/5"
              >
                Enter Voting Chamber
              </button>
              <div className="pt-2 text-center">
                <a href="#" className="text-white/30 text-xs hover:text-white transition-colors underline decoration-white/10 underline-offset-4">Need a permit? Join our Discord</a>
              </div>
            </form>
          </div>
        )}

        {appState === AppState.VOTING && session && (
          <div className={`w-full transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
            <VotingProgress 
              current={session.votes.length} 
              total={VOTE_LIMIT} 
            />
            <CandidateCard 
              candidate={MOCK_CANDIDATES[currentIndex]}
              onVote={handleVote}
              disabled={isTransitioning}
            />
            <div className="mt-12 text-center">
              <p className="text-white/30 text-xs flex items-center justify-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 4.946-2.563 9.384-6.333 11.39a1 1 0 01-.834 0C6.93 16.328 4.366 11.89 4.366 7c0-.681.056-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>All votes are private and end-to-end encrypted</span>
              </p>
            </div>
          </div>
        )}

        {appState === AppState.FINISHED && session && (
          <div className="text-center animate-in zoom-in-95 duration-700">
             <div className="inline-block p-4 bg-green-500/10 rounded-full mb-6">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
             </div>
             <h2 className="text-4xl font-bold font-heading mb-4">Verification Complete.</h2>
             <p className="text-white/60 text-lg mb-10 max-w-md mx-auto">
               You have successfully cast your {session.votes.length} recognition votes. 
               Your contribution helps map the hidden connections of the Codex community.
             </p>
             
             <div className="glass-card p-6 rounded-3xl inline-flex flex-col space-y-4 text-left w-full max-w-sm">
                <div className="flex justify-between items-center text-sm border-b border-white/5 pb-3">
                  <span className="text-white/40">Permit ID</span>
                  <span className="font-mono text-blue-400">{session.permitId}</span>
                </div>
                <div className="flex justify-between items-center text-sm border-b border-white/5 pb-3">
                  <span className="text-white/40">Recognition Count</span>
                  <span className="font-bold">{session.votes.filter(v => v.known).length}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-white/40">Status</span>
                  <span className="text-green-400 font-bold uppercase text-[10px] tracking-widest px-2 py-0.5 bg-green-400/10 rounded">Recorded</span>
                </div>
             </div>

             <div className="mt-12 flex flex-col md:flex-row gap-4 justify-center">
                <button 
                  onClick={() => alert("Sharing feature coming soon to MVP!")}
                  className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-bold transition-all"
                >
                  Share Recognition Profile
                </button>
                <button 
                  onClick={resetSession}
                  className="px-8 py-4 bg-transparent border border-white/20 text-white/50 hover:text-white rounded-2xl font-bold transition-all"
                >
                  Back to Entrance
                </button>
             </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full max-w-5xl mx-auto py-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-white/30 text-xs uppercase tracking-widest font-medium">
        <p>&copy; 2024 Bulk Protocol. Built for Codex Community.</p>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-white transition-colors">Manifesto</a>
          <a href="#" className="hover:text-white transition-colors">Discord</a>
          <a href="#" className="hover:text-white transition-colors">Github</a>
        </div>
      </footer>
    </div>
  );
};

export default App;
