import { Component, OnInit, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  isChecked = true;
  constructor() {}

  ngOnInit(): void {}
}
