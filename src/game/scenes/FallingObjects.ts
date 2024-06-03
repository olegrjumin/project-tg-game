export class FallingObjects extends Phaser.Scene {
  private planes: Phaser.GameObjects.Image[];

  constructor() {
    super();

    this.planes = [];
  }

  preload() {
    this.load.setBaseURL("https://labs.phaser.io");
    this.load.image("carrot", "assets/sprites/carrot.png");
  }

  create() {
    this.cameras.main.setBounds(0, 0, 800, 600);

    for (let i = 0; i < 128; i++) {
      const x = Phaser.Math.Between(0, 800);
      const y = Phaser.Math.Between(0, 600);

      this.planes.push(this.add.image(x, y, "carrot"));
    }
  }

  update() {
    Phaser.Actions.IncY(this.planes, 1, 0.025);

    Phaser.Actions.WrapInRectangle(
      this.planes,
      this.cameras.main.getBounds(),
      128
    );
  }
}
