import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MontyHallGameService } from '../../services/monty-hall-game.service';
import { NgForm } from '@angular/forms';
import { MontyHall, PlayRequest } from '../../models/monty-hall-game.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-monty-hall-game',
  templateUrl: './monty-hall-game.component.html',
  styleUrls: ['./monty-hall-game.component.css'],
})
export class MontyHallComponent implements OnInit {
  resultList: any[] = []; // List to store game results
  subscribe: Subscription = new Subscription(); // Subscription to handle observables
  numberOfRounds: number = 1; // Number of rounds to play
  showForm: boolean = false; // Flag to show/hide the form
  showRounds: boolean = true; // Flag to show/hide the rounds input
  showResults: boolean = false; // Flag to show/hide the results table
  showPlayBack: boolean = false; // Flag to show/hide the play again button
  clickCount: number = 0; // Counter to keep track of rounds played

  constructor(
    public monty_hall: MontyHallGameService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.resetForm(); // Reset the form on initialization
  }

  // Function to reset the form
  resetForm(form?: NgForm) {
    if (form != null) form.resetForm(); // Reset the form if it's not null
    this.monty_hall.formData = new MontyHall(); // Reset the form data
  }

  // Function to handle form submission
  onSubmit(form: NgForm) {
    this.clickCount++; // Increment the click count

    // Prepare the request data
    var req = new PlayRequest();
    req.InitialDoorSelection = this.monty_hall.formData.InitialDoorSelection;
    req.ChangeDoor = this.monty_hall.formData.ChangeDoor == '1' ? true : false;

    // Subscribe to the playGame service
    this.subscribe.add(
      this.monty_hall.playGame(req).subscribe(
        (res: any) => {
          console.log('Record inserted successfully!', res);
          this.resultList.push(res); // Add the result to the resultList
          this.showToastr(res.isWin); // Show toastr notification based on win/loss
        },
        (error: any) => {
          console.log('Failed to insert record:', error);
        },
        () => {
          this.resetForm(form); // Reset the form after submission
        }
      )
    );

    // Hide the form if all rounds are played
    if (this.clickCount === this.numberOfRounds) {
      this.showForm = false;
    }
  }

  // Function to handle play button click
  onPlayClick() {
    this.showRounds = false; // Hide the rounds input
    this.showForm = true; // Show the form
    this.showResults = true; // Show the results table
    this.showPlayBack = true; // Show the play again button
  }

  // Function to handle play again button click
  onPlayBackClick() {
    location.reload(); // Reload the page
  }

  // Function to show toastr notifications based on win/loss
  showToastr(isWin: boolean) {
    if (isWin) {
      this.toastr.success('Congratulations! You won the game!', 'Win', {
        positionClass: 'toast-top-right',
      });
    } else {
      this.toastr.error('Sorry, you lost the game. Try again!', 'Loss', {
        positionClass: 'toast-top-right',
      });
    }
  }
}
