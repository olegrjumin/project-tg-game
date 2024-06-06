import Phaser from "phaser";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateFallingVirusesScene } from "../game/useCreateFallingVirusesScene";

export const Game = () => {
  const phaserGameRef = useRef<Phaser.Game | null>(null);
  const navigate = useNavigate();

  const handleGameEndCallback = useCallback(
    (score: number) => {
      navigate("/result", {
        state: { score },
      });
    },
    [navigate],
  );

  const Scene = useCreateFallingVirusesScene(handleGameEndCallback)
  const config: Phaser.Types.Core.GameConfig = useMemo(
    () => ({
      type: Phaser.AUTO,
      backgroundColor: "#282c34",
      parent: "game",
      width: window.innerWidth,
      height: window.innerHeight,
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 0, x: 0 },
        },
      },
      scene: Scene,
    }),
    [Scene],
  );

  useEffect(() => {
    if (phaserGameRef.current) {
      return;
    }
    phaserGameRef.current = new Phaser.Game(config);
    return () => {
      phaserGameRef.current?.destroy(true);
      phaserGameRef.current = null;
    };
  }, [config]);

  return <div id="game"></div>;
};
