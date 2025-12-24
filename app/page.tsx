import ChatInterface from "./components/ChatInterface";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-blue-600/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-purple-600/20 rounded-full blur-[100px] pointer-events-none" />

      <main className="glass-panel w-full max-w-4xl h-[80vh] md:min-h-[600px] rounded-3xl flex flex-col relative z-10 overflow-hidden shadow-2xl ring-1 ring-white/10">

        {/* Header */}
        <header className="p-4 md:p-6 border-b border-white/5 flex items-center justify-between bg-black/20 backdrop-blur-md z-20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center font-bold text-white text-sm shadow-lg shadow-blue-500/20">
              M
            </div>
            <h1 className="text-xl font-semibold tracking-wide text-white/90">MIPE</h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs text-white/40 uppercase tracking-widest font-medium">System Online</span>
          </div>
        </header>

        {/* Chat Interface */}
        <div className="flex-1 relative overflow-hidden">
          <ChatInterface />
        </div>
      </main>
    </div>
  );
}
