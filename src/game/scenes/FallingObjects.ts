export class FallingObjects extends Phaser.Scene {
  private planes: Phaser.Physics.Arcade.Image[];
  private score: number;
  private scoreText!: Phaser.GameObjects.Text;
  private timerText!: Phaser.GameObjects.Text;
  private timer!: Phaser.Time.TimerEvent;
  private gameEndCallback: (score: number) => void;

  constructor(gameEndCallback: (score: number) => void) {
    super();
    this.planes = [];
    this.score = 0;
    this.gameEndCallback = gameEndCallback || (() => {});
  }

  preload() {
    this.load.setBaseURL("https://labs.phaser.io");
    this.load.image("carrot", "assets/sprites/carrot.png");
  }

  create() {
    this.cameras.main.setBounds(0, 0, 800, 600);

    const objectWidth = 25;
    const objectHeight = 25;
    const margin = 20;

    for (let i = 0; i < 100; i++) {
      const x = Phaser.Math.Between(
        objectWidth / 2 + margin,
        800 - objectWidth / 2 - margin
      );

      const y = Phaser.Math.Between(objectHeight / 2, 600 - objectHeight / 2);

      const plane = this.physics.add.image(x, y, "carrot");
      plane.setVelocityY(20);
      plane.setInteractive();

      plane.on("pointerdown", () => {
        plane.destroy();
        this.score++;
        this.scoreText.setText("Score: " + this.score);
      });

      this.planes.push(plane);
    }

    this.scoreText = this.add.text(16, 16, "Score: 0", {
      fontSize: "32px",
      color: "#fff",
    });

    this.timerText = this.add.text(16, 40, "Time: 15", {
      fontSize: "32px",
      color: "#fff",
    });

    const startTime = Date.now();

    this.timer = this.time.addEvent({
      delay: 1000,
      callback: () => this.updateTimer(startTime),
      loop: true,
    });
  }

  update() {
    Phaser.Actions.WrapInRectangle(
      this.planes,
      this.cameras.main.getBounds(),
      128
    );

    this.physics.world.collide(this.planes);
  }

  updateTimer(startTime: number) {
    const timeElapsed = Date.now() - startTime;
    const timeLeft = 15 - Math.round(timeElapsed / 1000);
    this.timerText.setText("Time: " + timeLeft);

    if (timeLeft <= 0) {
      this.timer.remove();

      this.gameEndCallback(this.score);
    }
  }
}
