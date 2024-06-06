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

  constructor(gameEndCallback: (score: number) => void, scoreMultiplier: number = 1) {
    super();
    this.score = 0;
    this.shieldActive = false;
    this.gameEndCallback = gameEndCallback || (() => {});
    this.scoreMultiplier = scoreMultiplier < 5 ? scoreMultiplier : 5;
    this.multiplierActive = scoreMultiplier > 1;
  }

  preload() {
    this.load.setBaseURL(window.location.origin);
    this.load.image("virus", "/assets/virus.png");
    this.load.image("ransomware", "/assets/ransomware.png");
    this.load.image("shield", "/assets/shield.png");
  }

  create() {
    this.cameras.main.setBounds(0, 0, +this.sys.game.config.width, +this.sys.game.config.height);
    const startTime = Date.now();
    this.virusGroup = this.physics.add.group();
    this.ransomwareGroup = this.physics.add.group();
    this.shieldGroup = this.physics.add.group();
    
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

    this.scoreText = this.add.text(16, 16, `Protection: ${this.score}%${this.multiplierActive ? `  ${this.scoreMultiplier}X points` : ''}`, {
      fontSize: "16px",
      color: "#fff", 
    });

  }

  addVirus(startTime: number) {
    const x = Phaser.Math.Between(40, +this.sys.game.config.width - 40);
    const virus = this.virusGroup.create(x, 0, "virus");
    const timeElapsed = Date.now() - startTime;
    virus.type = 'virus';
    virus.setVelocityY(150 + 2 * Math.round(timeElapsed / 1000));
    virus.setInteractive();
    virus.on("pointerdown", () => {
      this.handleObjectClick(virus);
    });
  }

  addRansom(startTime: number) {
    const x = Phaser.Math.Between(40, +this.sys.game.config.width - 40);
    const ransomware = this.ransomwareGroup.create(x, 0, "ransomware");
    const timeElapsed = Date.now() - startTime;
    ransomware.type = 'ransomware';
    ransomware.setVelocityY(200 + 2 * Math.round(timeElapsed / 1000));
    ransomware.setInteractive();
    ransomware.on("pointerdown", () => {
      this.handleObjectClick(ransomware);
    });
  }

  addShield(startTime: number) {
    const x = Phaser.Math.Between(40, +this.sys.game.config.width - 40);
    const shield = this.shieldGroup.create(x, 0, "shield");
    const timeElapsed = Date.now() - startTime;
    shield.type = 'shield';
    shield.setVelocityY(250 + 2 * Math.round(timeElapsed / 1000));
    shield.setInteractive();
    shield.on("pointerdown", () => {
      this.handleShieldClick(shield);
    });
  }

  handleObjectClick(object: Phaser.GameObjects.GameObject) {
    let points = 0
    if(object.type === 'virus') points += 1;
    if(object.type === 'ransomware') points += 3;
    if(this.multiplierActive) {
      points *= this.scoreMultiplier;
    }

    this.score += points;
    this.scoreText.setText(`Protection: ${this.score}%${this.multiplierActive ? `  ${this.scoreMultiplier}X points` : ''}`);
    object.destroy();
  }

  handleShieldClick(shield: Phaser.GameObjects.GameObject) {
    shield.destroy();
    this.score += this.multiplierActive ? 5 * this.scoreMultiplier : 5;
    this.scoreText.setText(`Protection: ${this.score}%${this.multiplierActive ? `  ${this.scoreMultiplier}X points` : ''}`);
    this.activateShield();
  }

  activateShield() {
    this.shieldActive = true;

    if(!this.shieldBorder) {
      this.shieldBorder = this.add.graphics();
      this.shieldBorder.lineStyle(8, 0x00ff00, 1)
      this.shieldBorder.strokeRect(0, 0, +this.sys.game.config.width, +this.sys.game.config.height);
    } else {
      this.shieldBorder.setVisible(true);
    }

    this.time.addEvent({
      delay: 5000,
      callback: this.deactivateShield,
      callbackScope: this
    })
    
  }

  deactivateShield() {
    this.shieldActive = false;
    if(this.shieldBorder) {
      this.shieldBorder.setVisible(false);
    }
  }

  deactivateScoreMultiplier() {
    console.log('deactivate multiplier')
    this.multiplierActive = false;
    this.scoreText.setText(`Protection: ${this.score}%`);
  }

  update() {
    this.virusGroup.children.each((virus) => {
      if((virus as Phaser.Physics.Arcade.Sprite).y  > +this.sys.game.config.height + 40) {
        this.handleObjectOutOfBounds(virus);
      }
      return null;
    }, this)

    this.ransomwareGroup.children.each((ransomware) => {
      if((ransomware as Phaser.Physics.Arcade.Sprite).y  > +this.sys.game.config.height + 40) {
        this.handleObjectOutOfBounds(ransomware)
      }
      return null;
    }, this)

    this.shieldGroup.children.each((shield) => {
      if((shield as Phaser.Physics.Arcade.Sprite).y > +this.sys.game.config.height +40) {
        shield.destroy();
      }
      return null;
    }, this)

  }

  handleObjectOutOfBounds(object: Phaser.GameObjects.GameObject) {
    if(!this.shieldActive) {
      this.physics.pause();
      this.gameEndCallback(this.score);
    }
    else {
      object.destroy();
      this.deactivateShield()
    }
  }
}
