import { motion } from "framer-motion";
import { Rocket, Heart, Trophy } from "lucide-react";
import type { GameSetup } from "./LoginScreen";

export function Scoreboard({
  setup,
  scores,
  currentTurn,
  round,
}: {
  setup: GameSetup;
  scores: { p1: number; p2: number };
  currentTurn: "X" | "O";
  round: number;
}) {
  return (
    <div className="bg-card rounded-3xl p-5 border-4 border-grape/30 shadow-xl space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl flex items-center gap-2">
          <Trophy className="w-5 h-5 text-coral" />
          Ladder
        </h2>
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-mint/30 text-foreground">
          Round {round}
        </span>
      </div>

      <PlayerRow
        name={setup.p1.name}
        age={setup.p1.age}
        score={scores.p1}
        target={setup.target}
        color="var(--sky)"
        icon={<Rocket className="w-5 h-5" />}
        symbol="X"
        active={currentTurn === "X"}
      />
      <PlayerRow
        name={setup.p2.name}
        age={setup.p2.age}
        score={scores.p2}
        target={setup.target}
        color="var(--coral)"
        icon={<Heart className="w-5 h-5" />}
        symbol="O"
        active={currentTurn === "O"}
      />
    </div>
  );
}

function PlayerRow({
  name,
  age,
  score,
  target,
  color,
  icon,
  symbol,
  active,
}: {
  name: string;
  age: string;
  score: number;
  target: number;
  color: string;
  icon: React.ReactNode;
  symbol: "X" | "O";
  active: boolean;
}) {
  const remaining = Math.max(0, target - score);
  const pct = Math.min(100, (score / target) * 100);
  const initials = name.slice(0, 2).toUpperCase();

  return (
    <motion.div
      animate={{ scale: active ? 1.02 : 1 }}
      className="rounded-2xl p-3 border-2 relative overflow-hidden"
      style={{
        borderColor: active ? color : "transparent",
        background: active
          ? `color-mix(in oklab, ${color} 15%, transparent)`
          : "color-mix(in oklab, var(--muted) 60%, transparent)",
      }}
    >
      {active && (
        <motion.div
          animate={{ x: [-4, 4, -4] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="absolute -left-1 top-1/2 -translate-y-1/2 font-display text-xl"
          style={{ color }}
        >
          ▶
        </motion.div>
      )}
      <div className="flex items-center gap-3 pl-4">
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center text-white font-display shadow-md shrink-0"
          style={{ backgroundColor: color }}
        >
          {initials || icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-display truncate">{name}</p>
            <span
              className="text-xs px-2 py-0.5 rounded-full font-bold"
              style={{ backgroundColor: color, color: "white" }}
            >
              {symbol}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">Age {age}</p>
        </div>
        <motion.div
          key={score}
          initial={{ scale: 1.6, color: "var(--coral)" }}
          animate={{ scale: 1, color: "var(--foreground)" }}
          transition={{ type: "spring" }}
          className="font-display text-3xl"
        >
          {score}
        </motion.div>
      </div>

      <div className="mt-3 pl-4">
        <div className="h-3 rounded-full bg-background/60 overflow-hidden">
          <motion.div
            initial={false}
            animate={{ width: `${pct}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
            className="h-full rounded-full"
            style={{
              backgroundImage: `linear-gradient(90deg, ${color}, var(--sunny))`,
            }}
          />
        </div>
        <p className="text-xs mt-1.5 font-semibold text-muted-foreground">
          {remaining === 0
            ? "🏆 Champion!"
            : `${remaining} more win${remaining > 1 ? "s" : ""} to go!`}
        </p>
      </div>
    </motion.div>
  );
}
