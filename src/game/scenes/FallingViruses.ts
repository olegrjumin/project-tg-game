export class FallingViruses extends Phaser.Scene {
  private score: number;
  private shieldActive: boolean;
  private scoreMultiplier: number;
  private multiplierActive: boolean;

  private scoreText!: Phaser.GameObjects.Text;
  private virusGroup!: Phaser.Physics.Arcade.Group;
  private ransomwareGroup!: Phaser.Physics.Arcade.Group;
  private shieldGroup!: Phaser.Physics.Arcade.Group;
  private shieldBorder!: Phaser.GameObjects.Graphics;
  private gameEndCallback: (score: number) => void;

  constructor(
    gameEndCallback: (score: number) => void,
    scoreMultiplier: number = 1,
  ) {
    super();
    this.score = 0;
    this.shieldActive = false;
    this.gameEndCallback = gameEndCallback || (() => {});
    this.scoreMultiplier = scoreMultiplier < 5 ? scoreMultiplier : 5;
    this.multiplierActive = scoreMultiplier > 1;
  }

  preload() {
    this.load.setBaseURL(window.location.origin);
    this.load.image("background", "/assets/game-background.png");
    this.load.image("virus", "/assets/virus.png");
    this.load.image("ransomware", "/assets/ransomware.png");
    this.load.image("shield", "/assets/shield.png");
    this.load.atlas("virusAnim", "/assets/sprites.png", "/assets/sprites.json");
  }

  create() {
    const gameWidth = +this.sys.game.config.width;
    const gameHeight = +this.sys.game.config.height;
    this.cameras.main.setBounds(0, 0, gameWidth, gameHeight);
    this.add
      .image(gameWidth / 2, gameHeight / 2, "background")
      .setDisplaySize(gameWidth, gameHeight);
    const startTime = Date.now();
    this.virusGroup = this.physics.add.group();
    this.ransomwareGroup = this.physics.add.group();
    this.shieldGroup = this.physics.add.group();

    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNames("virusAnim", {
        prefix: "idle_",
        start: 0,
        end: 13,
        zeroPad: 4,
      }),
      repeat: -1,
    });
    this.anims.create({
      key: "explosion",
      frames: this.anims.generateFrameNames("virusAnim", {
        prefix: "explosion_",
        start: 0,
        end: 7,
        zeroPad: 4,
      }),
      repeat: 0,
    });

    this.time.addEvent({
      delay: 1000,
      callback: () => this.addVirus(startTime),
      callbackScope: this,
      loop: true,
    });

    this.time.addEvent({
      delay: 3000,
      callback: () => this.addRansom(startTime),
      callbackScope: this,
      loop: true,
    });

    this.time.addEvent({
      delay: 20000,
      callback: () => this.addShield(startTime),
      callbackScope: this,
      loop: true,
    });

    this.time.addEvent({
      delay: 15000,
      callback: this.deactivateScoreMultiplier,
      callbackScope: this,
      loop: true,
    });

    this.scoreText = this.add
      .text(
        gameWidth - 20,
        20,
        `${this.score}P${this.multiplierActive ? `  ${this.scoreMultiplier}X` : ""}`,
        {
          fontSize: "24px",
          color: "#000000",
          backgroundColor: "#ffffff",
          padding: { x: 5, y: 5 },
        },
      )
      .setOrigin(1, 0);

    this.shieldBorder = this.add.graphics();
    this.shieldBorder.setDepth(1);
  }

  addVirus(startTime: number) {
    const x = Phaser.Math.Between(40, +this.sys.game.config.width - 40);
    const virus = this.virusGroup.create(x, 0, "virus");
    const virusSprite = virus as Phaser.Physics.Arcade.Sprite;
    virusSprite.anims.play("idle");
    const timeElapsed = Date.now() - startTime;
    virus.type = "virus";
    virus.setVelocityY(50 + 2 * Math.round(timeElapsed / 1000));
    virus.setInteractive();
    virus.on("pointerdown", () => {
      this.handleObjectClick(virus);
    });
  }

  addRansom(startTime: number) {
    const x = Phaser.Math.Between(40, +this.sys.game.config.width - 40);
    const ransomware = this.ransomwareGroup.create(x, 0, "ransomware");
    const timeElapsed = Date.now() - startTime;
    ransomware.type = "ransomware";
    ransomware.setVelocityY(100 + 2 * Math.round(timeElapsed / 1000));
    ransomware.setInteractive();
    ransomware.on("pointerdown", () => {
      this.handleObjectClick(ransomware);
    });
  }

  addShield(startTime: number) {
    const x = Phaser.Math.Between(40, +this.sys.game.config.width - 40);
    const shield = this.shieldGroup.create(x, 0, "shield");
    const timeElapsed = Date.now() - startTime;
    shield.type = "shield";
    shield.setVelocityY(150 + 2 * Math.round(timeElapsed / 1000));
    shield.setInteractive();
    shield.on("pointerdown", () => {
      this.handleObjectClick(shield);
      this.activateShield();
    });
  }

  handleObjectClick(object: Phaser.GameObjects.GameObject) {
    let points = 0;
    if (object.type === "virus") points += 1;
    if (object.type === "ransomware") points += 3;
    if (object.type === "shield") points += 5;
    if (this.multiplierActive) {
      points *= this.scoreMultiplier;
    }

    console.log("ola");
    this.score += points;
    this.scoreText.setText(
      `${this.score}P${this.multiplierActive ? `  ${this.scoreMultiplier}X` : ""}`,
    );

    const objectSprite = object as Phaser.Physics.Arcade.Sprite;

    const pointsText = this.add
      .text(+objectSprite.x, +objectSprite.y, `+${points}`, {
        font: "16px",
        color: "#00FF00",
        stroke: "#000000",
        strokeThickness: 3,
      })
      .setOrigin(0.5);

    this.tweens.add({
      targets: pointsText,
      y: +objectSprite.y,
      duration: 1000,
      ease: "Cubic.easeOut",
      onComplete: () => pointsText.destroy(),
    });
    objectSprite.anims.pause();
    objectSprite.anims.play("explosion");
    objectSprite.on("animationcomplete", () => {
      object.destroy();
    });
    object.destroy();

    console.log("olaOB", object);
  }

  activateShield() {
    this.shieldActive = true;

    this.drawShieldBorder();

    this.time.addEvent({
      delay: 5000,
      callback: this.deactivateShield,
      callbackScope: this,
    });
  }

  drawShieldBorder() {
    const width = +this.sys.game.config.width;
    const height = +this.sys.game.config.height;
    const borderWidth = 5;

    this.shieldBorder?.clear();

    this.shieldBorder?.fillStyle(0x00ff00, 1);
    this.shieldBorder?.fillRect(0, height - borderWidth, width, borderWidth);

    this.shieldBorder?.fillStyle(0x00cc00, 0.5);
    this.shieldBorder?.fillRect(
      borderWidth,
      height - 2 * borderWidth,
      width,
      borderWidth,
    );

    this.shieldBorder?.fillStyle(0x00cc00, 0.5);
    this.shieldBorder.fillRect(0, height - 2 * borderWidth, width, borderWidth);
  }

  deactivateShield() {
    this.shieldActive = false;
    this.shieldBorder?.clear();
  }

  deactivateScoreMultiplier() {
    console.log("deactivate multiplier");
    this.multiplierActive = false;
    this.scoreText.setText(`${this.score}P`);
  }

  update() {
    this.virusGroup.children.each((virus) => {
      if (
        (virus as Phaser.Physics.Arcade.Sprite).y >
        +this.sys.game.config.height + 40
      ) {
        this.handleObjectOutOfBounds(virus);
      }
      return null;
    }, this);

    this.ransomwareGroup.children.each((ransomware) => {
      if (
        (ransomware as Phaser.Physics.Arcade.Sprite).y >
        +this.sys.game.config.height + 40
      ) {
        this.handleObjectOutOfBounds(ransomware);
      }
      return null;
    }, this);

    this.shieldGroup.children.each((shield) => {
      if (
        (shield as Phaser.Physics.Arcade.Sprite).y >
        +this.sys.game.config.height + 40
      ) {
        shield.destroy();
      }
      return null;
    }, this);
  }

  handleObjectOutOfBounds(object: Phaser.GameObjects.GameObject) {
    if (!this.shieldActive) {
      this.physics.pause();
      this.gameEndCallback(this.score);
    } else {
      object.destroy();
      this.deactivateShield();
    }
  }
}
