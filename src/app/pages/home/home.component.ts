import { CommonModule, DatePipe, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCloudMoon } from '@fortawesome/free-solid-svg-icons';
import { ConditionsService } from '../../core/services/conditions.service';
import { WeatherService } from '../../core/services/weather.service';

@Component({
  selector: 'app-home',
  imports: [DatePipe, CommonModule, FontAwesomeModule, NgClass],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  faCloudMoon = faCloudMoon;
  conditionsData: any;
  city: string = 'london';
  weatherData: any;
  location = '';
  weatherIcon = '';
  currentDate = 'Tuesday 30 August';
  summary = 'Mostly Sunny';
  displayCity: string = '';
  displayRegionCountry: string = '';
  tempInCentigrade: string = '';
  lastUpdated: string = '';
  isDay: number = 0;
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
      this.weatherIcon = this.getIcon(
        data.current.is_day,
        data.current.condition.code
      );
      this.isDay = data.current.is_day;
    });
  }
  getIcon(day: number, code: number) {
    if (day === 1 && code === 1000) {
      return '1000-d-sunny.svg';
    } else if (day === 0 && code === 1000) {
      return '1000-n-clear.svg';
    } else if (day === 1 && code === 1003) {
      return '1003-d-partly-cloudy.png';
    } else if (day === 0 && code === 1003) {
      return '1003-n-partly-cloudy.png';
    } else if (day === 1 && code === 1030) {
      return '1030-d-mist.png';
    } else if (day === 0 && code === 1030) {
      return '1030-n-mist.svg';
    } else if (day === 1 && code === 1006) {
      return '1006-d-cloudy.png';
    } else if (day === 0 && code === 1006) {
      return '1006-n-cloudy.png';
    } else if (day === 1 && code === 1009) {
      return '1009-d-overcast.png';
    } else if (day === 0 && code === 1009) {
      return '1009-n-overcast.png';
    } else if (day === 1 && code === 1063) {
      return '1063-d-patchy-rain.png';
    } else if (day === 0 && code === 1063) {
      return '1063-n-patchy-rain.png';
    } else if (day === 1 && code == 1213) {
      return '1213-d-light-snow.png';
    } else if (day === 0 && code === 1213) {
      return '1213-n-light-snow.png';
    } else {
      return 'icon-not available';
    }
  }
}
