<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller;

use App\Models\WeatherForecast;

class MyTestController extends Controller
{
  public function __construct()
  {
    $this->middleware('auth:api');
  }

  public function show()
  {
    $mydata = [
      'firstName' => 'My Name',
      'lastName' => 'Family Name'
    ];

    $weathers = [
      new WeatherForecast(27, "Regula"),
      new WeatherForecast(40, "Killer"),
      new WeatherForecast(10, "Cold"),
      new WeatherForecast(22, "Great")
    ];

    return response()->json($weathers);
  }
}
