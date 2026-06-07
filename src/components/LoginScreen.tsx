import { motion } from "framer-motion";
import { useState } from "react";
import { Rocket, Heart, Sparkles, Trophy } from "lucide-react";

export type PlayerInfo = { name: string; age: string };
export type GameSetup = { p1: PlayerInfo; p2: PlayerInfo; target: number };

export function LoginScreen({ onStart }: { onStart: (setup: GameSetup) => void }) {
  const [p1, setP1] = useState<PlayerInfo>({ name: "", age: "" });
  const [p2, setP2] = useState<PlayerInfo>({ name: "", age: "" });
  const [target, setTarget] = useState("3");
  const [error, setError] = useState("");

  const submit = () => {
    if (!p1.name || !p1.age || !p2.name || !p2.age || !target || Number(target) < 1) {
      setError("Please fill in every field to start the adventure!");
      return;
    }
    onStart({ p1, p2, target: Number(target) });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8">
      <motion.div
        initial={{ scale: 0.6, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 180, damping: 14 }}
        className="w-full max-w-3xl"
      >
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="text-center mb-6"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-card/70 backdrop-blur border-2 border-primary/30 shadow-lg">
            <Sparkles className="w-5 h-5 text-coral" />
            <span className="font-display text-sm sm:text-base">Tic Tac Boom!</span>
            <Sparkles className="w-5 h-5 text-grape" />
          </div>
          <h1 className="font-display text-5xl sm:text-7xl mt-4 rainbow-text">
            Let's Play!
          </h1>
          <p className="text-muted-foreground mt-2 text-base sm:text-lg">
            Tell us about the two brave players 🎮
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
          <PlayerCard
            color="sky"
            icon={<Rocket className="w-7 h-7" />}
            label="Player 1 (X)"
            data={p1}
            onChange={setP1}
            delay={0.1}
          />
          <PlayerCard
            color="coral"
            icon={<Heart className="w-7 h-7" />}
            label="Player 2 (O)"
            data={p2}
            onChange={setP2}
            delay={0.25}
          />
        </div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, type: "spring" }}
          className="mt-6 bg-card rounded-3xl p-5 sm:p-6 border-4 border-mint shadow-xl"
        >
          <label className="flex items-center gap-2 font-display text-lg mb-3">
            <Trophy className="w-6 h-6 text-coral" />
            Wins to Champion
          </label>
          <div className="flex flex-wrap items-center gap-3">
            <input
              type="number"
              min={1}
              max={20}
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="w-28 px-4 py-3 rounded-2xl bg-background border-2 border-border focus:border-primary focus:outline-none font-display text-2xl text-center"
            />
            <span className="text-muted-foreground">First to <b className="text-foreground">{target || "?"}</b> wins is the CHAMPION 👑</span>
          </div>
        </motion.div>

        {error && (
          <motion.p
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="text-destructive text-center mt-4 font-semibold"
          >
            {error}
          </motion.p>
        )}

        <motion.button
          whileHover={{ scale: 1.05, rotate: -1 }}
          whileTap={{ scale: 0.95 }}
          onClick={submit}
          className="mt-6 w-full py-4 sm:py-5 rounded-3xl font-display text-2xl sm:text-3xl text-primary-foreground shadow-2xl border-4 border-white/40"
          style={{
            backgroundImage:
              "linear-gradient(135deg, var(--coral), var(--grape) 50%, var(--sky))",
          }}
        >
          Start the Game! 🚀
        </motion.button>
      </motion.div>
    </div>
  );
}

function PlayerCard({
  color,
  icon,
  label,
  data,
  onChange,
  delay,
}: {
  color: "sky" | "coral";
  icon: React.ReactNode;
  label: string;
  data: PlayerInfo;
  onChange: (v: PlayerInfo) => void;
  delay: number;
}) {
  const bg = color === "sky" ? "var(--sky)" : "var(--coral)";
  return (
    <motion.div
      initial={{ y: 40, opacity: 0, rotate: color === "sky" ? -3 : 3 }}
      animate={{ y: 0, opacity: 1, rotate: 0 }}
      transition={{ delay, type: "spring", stiffness: 160 }}
      whileHover={{ y: -4 }}
      className="bg-card rounded-3xl p-5 sm:p-6 border-4 shadow-xl"
      style={{ borderColor: bg }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md"
          style={{ backgroundColor: bg }}
        >
          {icon}
        </div>
        <h3 className="font-display text-xl">{label}</h3>
      </div>
      <div className="space-y-3">
        <input
          type="text"
          placeholder="Player name"
          value={data.name}
          onChange={(e) => onChange({ ...data, name: e.target.value })}
          className="w-full px-4 py-3 rounded-2xl bg-background border-2 border-border focus:border-primary focus:outline-none text-base"
        />
        <input
          type="number"
          min={1}
          max={120}
          placeholder="Age"
          value={data.age}
          onChange={(e) => onChange({ ...data, age: e.target.value })}
          className="w-full px-4 py-3 rounded-2xl bg-background border-2 border-border focus:border-primary focus:outline-none text-base"
        />
      </div>
    </motion.div>
  );
}
