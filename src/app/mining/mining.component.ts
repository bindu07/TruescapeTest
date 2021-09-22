import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { MiningService } from "./mining.service";

@Component({
  selector: "app-mining",
  templateUrl: "./mining.component.html",
  styleUrls: ["./mining.component.scss"],
})
export class MiningComponent implements OnInit {
  @ViewChild("rendererCanvas", { static: true })
  public rendererCanvas: ElementRef<HTMLCanvasElement>;
  constructor(private miningService: MiningService) {}

  ngOnInit(): void {
    // this.preminingServ.createScene(this.rendererCanvas);
    this.miningService.loadGLTF();
    // this.miningService.animate();
    // this.preminingServ.loadmining();
  }
}
