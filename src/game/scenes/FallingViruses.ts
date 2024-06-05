export class FallingViruses extends Phaser.Scene {
  private viruses: Phaser.Physics.Arcade.Image[];
  private destroyedViruses: Phaser.Physics.Arcade.Image[];
  private score: number;
  private remainingTime: number;

  private scoreText!: Phaser.GameObjects.Text;
  private timerText!: Phaser.GameObjects.Text;
  private timer!: Phaser.Time.TimerEvent;
  private objectsGroup!: Phaser.Physics.Arcade.Group;
  private gameEndCallback: (score: number) => void;

  constructor(gameEndCallback: (score: number) => void) {
    super();
    this.viruses = [];
    this.destroyedViruses = [];
    this.score = 0;
    this.remainingTime = 15;
    this.gameEndCallback = gameEndCallback || (() => { });
    
  }

  preload() {
    this.load.setBaseURL(window.location.origin);
    this.load.image("virus", "/virus.png");
  }

  create() {
    this.cameras.main.setBounds(0, 0, window.innerWidth, window.innerHeight);
    const startTime = Date.now();
    const timeElapsed = Date.now() - startTime;
    this.objectsGroup = this.physics.add.group();

    this.time.addEvent({
      delay: 500,
      callback: () => this.addObject(timeElapsed),
      callbackScope: this,
      loop: true,
    })
    
    this.timer = this.time.addEvent({
      delay: 1000,
      callback: this.updateTimer,
      callbackScope: this,
      loop: true,
    });

    this.timerText = this.add.text(16, 40, "Time: 15", {
      fontSize: "32px",
      color: "#fff",
    });

    this.scoreText = this.add.text(16, 16, "Score: 0", {
      fontSize: "32px",
      color: "#fff",
    });
  }

  addObject(timeElapsed: number) {
    let x = Phaser.Math.Between(
      40,
      window.innerWidth - 40
    );
    let virus = this.objectsGroup.create(x, 0, 'virus');
    virus.setVelocityY(100 + 2*Math.round(timeElapsed / 1000));
    virus.setInteractive();
    virus.on('pointerdown', () => {
      virus.destroy();
      this.score++;
      this.scoreText.setText("Score: " + this.score);
    })
  }

  update() {
    Phaser.Actions.WrapInRectangle(
      this.viruses,
      this.cameras.main.getBounds(),
      128
    );

    this.viruses.forEach((virus) => {
      if (virus.y > window.innerHeight + 40) {
        virus.destroy();
        this.destroyedViruses.push(virus);
      }
    })

    this.physics.world.collide(this.viruses);
  }

  updateTimer() {
    this.remainingTime--;
    this.timerText.setText("Time: " + this.remainingTime);

    if (this.remainingTime <= 0) {
      this.timer.remove();

      this.gameEndCallback(this.score);
    }
  }
}
