import { createFileRoute } from "@tanstack/react-router";
import { TicTacToeApp } from "@/components/TicTacToeApp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tic Tac Boom! — A Cartoon Tic Tac Toe Adventure" },
      {
        name: "description",
        content:
          "A bouncy, cartoon-style 2-player Tic Tac Toe game with score ladders, confetti, and champion celebrations.",
      },
      { property: "og:title", content: "Tic Tac Boom!" },
      {
        property: "og:description",
        content: "A bouncy, cartoon-style Tic Tac Toe game for two players.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return <TicTacToeApp />;
}
