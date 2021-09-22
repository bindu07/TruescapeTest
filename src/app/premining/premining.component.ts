import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { PreminingService } from "./premining.service";

@Component({
  selector: "app-premining",
  templateUrl: "./premining.component.html",
})
export class PreminingComponent implements OnInit {
  @ViewChild("rendererCanvas", { static: true })
  public rendererCanvas: ElementRef<HTMLCanvasElement>;
  constructor(private preminingServ: PreminingService) {}

  ngOnInit(): void {
    // this.preminingServ.createScene(this.rendererCanvas);
    this.preminingServ.loadmining(this.rendererCanvas);
    this.preminingServ.loadGLTF();
    this.preminingServ.animate();
    // this.preminingServ.loadmining();
  }
}
