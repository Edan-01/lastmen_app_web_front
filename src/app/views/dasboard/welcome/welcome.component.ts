// welcome.component.ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.updateClock();
    setInterval(() => {
      this.updateClock();
    }, 1000);
  }

  updateClock() {
    var currentTime = new Date();
    var currentHours = currentTime.getHours();
    var currentMinutes = currentTime.getMinutes();
    var currentSeconds = currentTime.getSeconds();

    document.getElementById("hours")!.innerHTML = currentHours.toString();
    document.getElementById("minutes")!.innerHTML = currentMinutes.toString();
    document.getElementById("seconds")!.innerHTML = currentSeconds.toString();
  }
}


