<?php

namespace App\Models;

class WeatherForecast
{
  public int $temperatureC;
  public string $summary;
  
  public function __construct(int $temperature, $summary) {
    $this->temperatureC = $temperature;
    $this->summary = $summary;
  }
  
  public function getDate(): string {
    return  date("Y-m-d H:i:s");
  }
  
  public function getTemperatureC() { return $this->temperatureC; }
  
  public function setTemperatureC($temp) { $this->temperatureC = $temp; }
  
  public function getTemperatureF(): int {
    return 32 + (int)($this->temperatureC / 0.5556);
  }
  
  public function getSummary() {
    return $this->summary;
  }
  
  public function setSummary($summary) {
    $this->summary = $summary;
  }
}
