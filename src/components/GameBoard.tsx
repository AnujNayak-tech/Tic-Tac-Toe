import { motion, AnimatePresence } from "framer-motion";
import { Rocket, Heart } from "lucide-react";
import type { Board } from "@/lib/game";

export function GameBoard({
  board,
  winLine,
  onCellClick,
  disabled,
  wipeKey,
}: {
  board: Board;
  winLine: number[] | null;
  onCellClick: (i: number) => void;
  disabled: boolean;
  wipeKey: number;
}) {
  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={wipeKey}
          initial={{ x: 300, opacity: 0, rotate: 6 }}
          animate={{ x: 0, opacity: 1, rotate: 0 }}
          exit={{ x: -300, opacity: 0, rotate: -6 }}
          transition={{ type: "spring", stiffness: 140, damping: 18 }}
          className="grid grid-cols-3 gap-3 sm:gap-4 p-4 sm:p-6 bg-card rounded-[2rem] border-4 border-primary/30 shadow-2xl"
        >
          {board.map((cell, i) => {
            const isWin = winLine?.includes(i);
            return (
              <motion.button
                key={i}
                whileHover={!cell && !disabled ? { scale: 1.08, rotate: -2, y: -3 } : {}}
                whileTap={!cell && !disabled ? { scale: 0.92 } : {}}
                onClick={() => !cell && !disabled && onCellClick(i)}
                className={`aspect-square rounded-3xl bg-background flex items-center justify-center text-4xl sm:text-6xl border-4 ${
                  isWin ? "win-cell border-sunny" : "border-border"
                } ${!cell && !disabled ? "cursor-pointer" : "cursor-default"}`}
                aria-label={`Cell ${i + 1}`}
              >
                <AnimatePresence>
                  {cell && (
                    <motion.span
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 260, damping: 14 }}
                    >
                      {cell === "X" ? (
                        <Rocket
                          className="w-12 h-12 sm:w-20 sm:h-20"
                          style={{ color: "var(--sky)" }}
                          strokeWidth={2.5}
                          fill="currentColor"
                          fillOpacity={0.2}
                        />
                      ) : (
                        <Heart
                          className="w-12 h-12 sm:w-20 sm:h-20"
                          style={{ color: "var(--coral)" }}
                          strokeWidth={2.5}
                          fill="currentColor"
                          fillOpacity={0.5}
                        />
                      )}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
