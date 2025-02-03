import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ConditionsService } from '../../core/services/conditions.service';
import { WeatherService } from '../../core/services/weather.service';

@Component({
  selector: 'app-home',
  imports: [DatePipe, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  conditionsData: any;
  city: string = 'london';
  weatherData: any;
  location = '';
  weatherIcon = 'Group1.svg';
  currentDate = 'Tuesday 30 August';
  summary = 'Mostly Sunny';
  displayCity: string = '';
  displayRegionCountry: string = '';
  tempInCentigrade: string = '';
  lastUpdated: string = '';
  ngOnInit(): void {
    this.checkWeather();
  }
  constructor(
    private service: WeatherService,
    private conditionService: ConditionsService
  ) {
    this.conditionsData = this.conditionService.getConditions();
    console.log(this.conditionsData);
  }
  setCity(event: any) {
    this.city = event.target.value;
  }
  checkWeather() {
    this.weatherData = this.service.getWeather(this.city).subscribe((data) => {
      console.log(data);
      this.displayCity = `${data.location.name},`;
      this.displayRegionCountry = `${data.location.region}, ${data.location.country}`;
      this.tempInCentigrade = `${data.current.temp_c}`;
      this.summary = `${data.current.condition.text}`;
      this.lastUpdated = `${data.current.last_updated}`;
      //this.weatherIcon = `${data.current.condition.icon}`;
    });
  }
}
