import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Moon, Sun, RotateCcw } from "lucide-react";
import { LoginScreen, type GameSetup } from "./LoginScreen";
import { GameBoard } from "./GameBoard";
import { Scoreboard } from "./Scoreboard";
import { RoundResult, ChampionScreen } from "./Celebration";
import { checkWinner, isDraw, type Board } from "@/lib/game";

const EMPTY: Board = Array(9).fill(null);

export function TicTacToeApp() {
  const [setup, setSetup] = useState<GameSetup | null>(null);
  const [board, setBoard] = useState<Board>(EMPTY);
  const [turn, setTurn] = useState<"X" | "O">("X");
  const [scores, setScores] = useState({ p1: 0, p2: 0 });
  const [round, setRound] = useState(1);
  const [winLine, setWinLine] = useState<number[] | null>(null);
  const [result, setResult] = useState<null | { kind: "win" | "draw"; winnerName?: string }>(null);
  const [champion, setChampion] = useState<string | null>(null);
  const [wipeKey, setWipeKey] = useState(0);
  const [shake, setShake] = useState(false);
  const [dark, setDark] = useState(false);
  const boardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const fireConfetti = useCallback((big = false) => {
    const count = big ? 6 : 2;
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        confetti({
          particleCount: big ? 140 : 90,
          spread: big ? 110 : 80,
          startVelocity: big ? 55 : 40,
          origin: { x: Math.random(), y: Math.random() * 0.4 + 0.2 },
          colors: ["#a855f7", "#f97171", "#7dd3fc", "#86efac", "#fde68a"],
        });
      }, i * 250);
    }
  }, []);

  const handleCellClick = (i: number) => {
    if (board[i] || winLine || result || champion) return;
    const next = [...board];
    next[i] = turn;
    setBoard(next);
    const { winner, line } = checkWinner(next);
    if (winner) {
      setWinLine(line);
      const isP1 = winner === "X";
      const newScores = { ...scores, [isP1 ? "p1" : "p2"]: scores[isP1 ? "p1" : "p2"] + 1 };
      const winnerName = isP1 ? setup!.p1.name : setup!.p2.name;
      setTimeout(() => {
        setScores(newScores);
        if (newScores[isP1 ? "p1" : "p2"] >= setup!.target) {
          fireConfetti(true);
          setTimeout(() => setChampion(winnerName), 600);
        } else {
          fireConfetti(false);
          setResult({ kind: "win", winnerName });
        }
      }, 900);
    } else if (isDraw(next)) {
      setShake(true);
      setTimeout(() => setShake(false), 600);
      setTimeout(() => setResult({ kind: "draw" }), 500);
    } else {
      setTurn(turn === "X" ? "O" : "X");
    }
  };

  const nextRound = () => {
    setBoard(EMPTY);
    setWinLine(null);
    setResult(null);
    setRound((r) => r + 1);
    setTurn(round % 2 === 0 ? "X" : "O");
    setWipeKey((k) => k + 1);
  };

  const resetAll = () => {
    setSetup(null);
    setBoard(EMPTY);
    setTurn("X");
    setScores({ p1: 0, p2: 0 });
    setRound(1);
    setWinLine(null);
    setResult(null);
    setChampion(null);
    setWipeKey(0);
  };

  if (!setup) {
    return (
      <>
        <ThemeToggle dark={dark} setDark={setDark} />
        <LoginScreen onStart={(s) => setSetup(s)} />
      </>
    );
  }

  const currentName = turn === "X" ? setup.p1.name : setup.p2.name;

  return (
    <div className="min-h-screen p-4 sm:p-6">
      <ThemeToggle dark={dark} setDark={setDark} />

      <div className="max-w-6xl mx-auto pt-12 sm:pt-4">
        <div className="text-center mb-5">
          <h1 className="font-display text-3xl sm:text-4xl rainbow-text">Tic Tac Boom!</h1>
          <motion.p
            key={currentName + turn}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mt-1 text-muted-foreground text-sm sm:text-base"
          >
            <motion.span
              animate={{ x: [0, 6, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="inline-block mr-1"
            >
              👉
            </motion.span>
            <b className="text-foreground">{currentName}</b>'s turn ({turn})
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-[1fr_320px] gap-5">
          <div ref={boardRef} className={shake ? "shake" : ""}>
            <GameBoard
              board={board}
              winLine={winLine}
              onCellClick={handleCellClick}
              disabled={!!result || !!champion}
              wipeKey={wipeKey}
            />
            <div className="flex justify-center mt-4">
              <button
                onClick={resetAll}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border-2 border-border hover:border-primary text-sm font-semibold transition-colors"
              >
                <RotateCcw className="w-4 h-4" /> New game
              </button>
            </div>
          </div>
          <Scoreboard setup={setup} scores={scores} currentTurn={turn} round={round} />
        </div>
      </div>

      <AnimatePresence>
        {result && !champion && (
          <RoundResult kind={result.kind} winnerName={result.winnerName} onNext={nextRound} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {champion && <ChampionScreen name={champion} onPlayAgain={resetAll} />}
      </AnimatePresence>
    </div>
  );
}

function ThemeToggle({ dark, setDark }: { dark: boolean; setDark: (v: boolean) => void }) {
  return (
    <motion.button
      whileHover={{ scale: 1.1, rotate: 15 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setDark(!dark)}
      className="fixed top-4 right-4 z-50 w-11 h-11 rounded-full bg-card border-2 border-border shadow-lg flex items-center justify-center"
      aria-label="Toggle theme"
    >
      {dark ? <Sun className="w-5 h-5 text-sunny" /> : <Moon className="w-5 h-5 text-grape" />}
    </motion.button>
  );
}
