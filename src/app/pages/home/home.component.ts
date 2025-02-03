import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../core/services/weather.service';

@Component({
  selector: 'app-home',
  imports: [DatePipe, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  city: string = 'london';
  weatherData: any;
  location = '';
  weatherIcon = 'mostly-sunny.svg';
  currentDate = 'Tuesday 30 August';
  summary = 'Mostly Sunny';
  displayCity: string = '';
  displayRegionCountry: string = '';
  tempInCentigrade: string = '';
  lastUpdated: string = '';
  ngOnInit(): void {
    this.checkWeather();
  }
  constructor(private service: WeatherService) {}
  setCity(event: any) {
    this.city = event.target.value;
    if (this.city == '') {
      this.city = 'london';
    }
  }
  checkWeather() {
    this.weatherData = this.service.getWeather(this.city).subscribe((data) => {
      console.log(data);
      this.displayCity = `${data.location.name},`;
      this.displayRegionCountry = `${data.location.country}`;
      this.tempInCentigrade = `${data.current.temp_c}`;
      this.summary = `${data.current.condition.text}`;
      this.lastUpdated = `${data.current.last_updated}`;
    });
  }
}
