import Phaser from "phaser";
import WebFontLoader, { Config } from "webfontloader";

export default class WebFontFile extends Phaser.Loader.File {
  private fontNames: string[];
  private service: string;

  constructor(
    loader: Phaser.Loader.LoaderPlugin,
    fontNames: string | string[],
    service: string = "google",
  ) {
    super(loader, {
      type: "webfont",
      key: fontNames.toString(),
    });

    this.fontNames = Array.isArray(fontNames) ? fontNames : [fontNames];
    this.service = service;
  }

  load(): void {
    const config: Config = {
      active: () => {
        this.loader.nextFile(this, true);
      },
    };

    switch (this.service) {
      case "google":
        config["google"] = {
          families: this.fontNames,
        };
        break;

      default:
        throw new Error("Unsupported font service");
    }

    WebFontLoader.load(config);
  }
}
