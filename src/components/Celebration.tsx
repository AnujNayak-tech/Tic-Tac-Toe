import { motion } from "framer-motion";
import { Trophy, Crown, CloudRain } from "lucide-react";

export function RoundResult({
  kind,
  winnerName,
  onNext,
}: {
  kind: "win" | "draw";
  winnerName?: string;
  onNext: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-40 bg-background/70 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ y: 200, scale: 0.7, rotate: -8 }}
        animate={{ y: 0, scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 180, damping: 14 }}
        className="bg-card rounded-[2rem] p-8 max-w-md w-full text-center border-4 border-primary/40 shadow-2xl"
      >
        {kind === "win" ? (
          <>
            <motion.div
              animate={{ y: [0, -12, 0], rotate: [-6, 6, -6] }}
              transition={{ duration: 1.4, repeat: Infinity }}
              className="text-7xl mb-2"
            >
              <Trophy className="w-24 h-24 mx-auto text-sunny" fill="currentColor" />
            </motion.div>
            <h2 className="font-display text-4xl sm:text-5xl rainbow-text mb-2">
              {winnerName} wins!
            </h2>
            <p className="text-muted-foreground">Round goes to you! ⭐️</p>
          </>
        ) : (
          <>
            <motion.div
              animate={{ rotate: [-4, 4, -4] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            >
              <CloudRain className="w-24 h-24 mx-auto text-sky" />
            </motion.div>
            <h2 className="font-display text-4xl mt-2 mb-2">It's a Draw!</h2>
            <p className="text-muted-foreground">Better luck next time! 💫</p>
          </>
        )}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNext}
          className="mt-6 w-full py-4 rounded-2xl font-display text-xl text-primary-foreground shadow-lg"
          style={{
            backgroundImage:
              "linear-gradient(135deg, var(--grape), var(--coral))",
          }}
        >
          Next Round →
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export function ChampionScreen({
  name,
  onPlayAgain,
}: {
  name: string;
  onPlayAgain: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden bg-background/80 backdrop-blur-md">
      {/* floating stars */}
      {Array.from({ length: 18 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: "100vh", x: `${Math.random() * 100}vw`, opacity: 0 }}
          animate={{
            y: "-20vh",
            opacity: [0, 1, 1, 0],
            rotate: 360,
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
          className="absolute text-3xl"
        >
          {["⭐", "🎉", "✨", "🎊", "💫"][i % 5]}
        </motion.div>
      ))}

      <motion.div
        initial={{ scale: 0.3, opacity: 0, rotate: -20 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 140, damping: 12 }}
        className="relative bg-card rounded-[2.5rem] p-8 sm:p-10 max-w-lg w-full text-center border-4 shadow-2xl"
        style={{ borderColor: "var(--sunny)" }}
      >
        <motion.div
          animate={{ y: [0, -16, 0], rotate: [-8, 8, -8] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="mb-3"
        >
          <Crown className="w-28 h-28 mx-auto text-sunny" fill="currentColor" />
        </motion.div>
        <h1 className="font-display text-6xl sm:text-7xl rainbow-text mb-2">
          CHAMPION!
        </h1>
        <p className="font-display text-2xl sm:text-3xl mt-2">{name} 👑</p>
        <p className="text-muted-foreground mt-3">
          You conquered the Tic Tac Boom arena!
        </p>

        <motion.button
          whileHover={{ scale: 1.05, rotate: -1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onPlayAgain}
          className="mt-7 w-full py-4 rounded-2xl font-display text-2xl text-primary-foreground shadow-xl border-2 border-white/40"
          style={{
            backgroundImage:
              "linear-gradient(135deg, var(--coral), var(--grape) 50%, var(--sky))",
          }}
        >
          Play Again 🎮
        </motion.button>
      </motion.div>
    </div>
  );
}
