/**
 * @license
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your incidents ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojpictochart', 'ojs/ojlegend', 'ojs/ojchart','ojs/ojselectcombobox'],
 function(oj, ko, $) {
  
    function IncidentsViewModel() {
      var self = this;

      this.val = ko.observable("4");
      this.valueChangedHandler = function (event) {
        console.log(event.detail.value);
      }


      var high = {
        "二月":   [6,7,2,4,5,4,7,6,10,8,9,7,12,17,9,11,11,11,9,9,9,15,15,13,11,13,16,15],
        "三月": [14,12,18,24,10,11,10,11,11,14,17,20,24,23,20,11,13,15,11,10,9,15,19,21,22,22,23,25,24,20,22],
        "四月": [27,24,24,16,16,16,14,21,26,29,29,21,20,18,20,21,21,24,27,27,26,28,24,16,22,22,27,26,23,31]};
      var low = {
        "二月":   [1,-2,-3,-3,-2,-2,-1,1,4,0,-1,0,3,7,5,3,6,7,6,6,5,4,6,8,4,6,12,8],
        "三月": [7,7,11,7,7,7,7,3,4,6,8,13,14,16,9,9,10,10,7,6,5,8,10,13,13,13,14,14,14,13,14],
        "四月": [16,17,17,12,11,7,7,12,16,17,16,15,15,12,10,10,12,14,16,17,19,20,13,12,13,15,15,18,19,22]};
        var colorHandler = new oj.ColorAttributeGroupHandler();
        var legendItems = [];
        var temp = ["-10～-5°C","-5～0°C","0～5°C","5～10°C","10～15°C","15～20°C","20～25°C","≥26°C"];
        var colors = ["267db3", "66a3c9","47bdef", "6ddbdb", "a2bf39", "fad55c", "ffb54d", "ed6647"];
  
        var getPictoItems = function (month, monthIndex){
          var pictoItems = [];
          var h_values = high[month];
          var l_values = low[month];
          var firstDay = (new Date(2018, monthIndex, 1)).getDay();
          var pointer = 0;
          for (var i = 0; i < h_values.length; i++) {
            var high_val = h_values[i];
            var low_val = l_values[i];
            if(pointer < firstDay){
              pictoItems.push({name: '', color: 'rgba(0,0,0,0)'});
              pointer++;
              i--;
            }
            else
              pictoItems.push({shape: 'circle', name: month+' '+(i+1)+"日 <br>最<b style='color:red'>高</b>气温 "+high_val+"°C <br>最<b style='color:blue'>低</b>气温 "+low_val+"°C", color: "#"+colors[Math.floor((high_val+low_val)/10)+2]});
          }
          return pictoItems;
        }
  
        for (var i = 0; i < temp.length; i++) {
          legendItems.push({text: temp[i] , color: "#"+colors[i]});
        };
  
        this.febItems = ko.observableArray(getPictoItems('二月', 1));
        this.marItems = ko.observableArray(getPictoItems('三月', 2));
        this.aprItems = ko.observableArray(getPictoItems('四月', 3));
        this.legendSections = ko.observableArray([{items: legendItems}]);
  
        this.tooltipFunction = function (dataContext) {
          return {'insert':dataContext.name};
        }


            var colorHandler = new oj.ColorAttributeGroupHandler();

            /* chart data */
            var mathScores = [80, 80, 85, 68, 65, 77, 73, 75, 63, 68, 69, 65, 59, 57, 61];
            var engScores = [51, 47, 56, 49, 48, 59, 59, 58, 58, 62, 66, 79, 74, 78, 85];

    // 一层后门出风口温湿度
    var d5000187_hum_hi  = {
      "二月": [32.5,29.5,27.4,22.9,27.3,27.7,33.8,32.2,45.2,41.4,29.8,23.5,35.9,39.6,44.4,46,47.3,55.7,54.2,50.2,48.8,46.7,47,55.3,49.5,47.6,60.5,60.2],
      "三月": [49.4,57.8,64.4,68.6,46.5,50.1,52.8,47.1,46.9,50.5,51.3,63.4,65,63.5,69.8,50.2,53.3,56.5,48,49.4,49.4,54.4,50.2,56.5,53,57.1,56.2,57.9,61.3,60,60],
      "四月": [61.4,62.5,63.2,56.1,52.3,46.4,35.7,48,52.7,55.7,56,53,71.4,57,52.3,42.5,52.1,54.8,62.9,64.2,68.4,94.4,71.2,54.7,50.9,51.4,56,89.4,98.3,95.5]};
    var d5000187_hum_avg = {
      "二月": [24.37,19.84,15.37,12.43,14.92,17.66,19.7,20.26,27.87,21.52,13.56,13.09,20.42,26.34,33.39,35.56,33.95,42.2,40.59,38.23,37.12,30.81,30.58,38.08,29.69,31.91,37.34,38.49],
      "三月": [26.94,37.18,45.74,57.34,45.66,49.8,38.5,29.32,29.83,39.36,42.87,51.06,58.04,61.33,57.62,33.8,36.63,41.6,32.25,33.62,33.76,34.68,43.67,47.04,48.44,51.73,51.13,50.53,54.38,53.04,49.17],
      "四月": [255.35,58.97,59.44,47.7,48.98,33.45,25.12,37.5,41.46,48.13,40.3,43.12,57.57,50.4,39.16,36.64,38.5,47.13,52.47,56.47,62.47,72.14,61.12,50.23,45.34,41.37,46.16,53.88,66.08,77.64]};
    var d5000187_hum_low = {
      "二月": [9.6,10,8,3.3,4.9,6.9,5.3,8.5,13.2,11.3,7.3,3.7,7.2,15.5,15.4,18.5,14.8,23.4,23.3,19.5,19.8,15.3,11.6,21.1,16.2,18.2,17.4,24.5],
      "三月": [11.7,19,27.3,46.4,44.9,49.6,24.5,19.9,12.8,31.2,33.5,37.5,49.6,60.8,41.2,18.1,18.3,27,18.7,22,19.3,18.7,37.7,35.1,44.7,45.4,46.1,41.4,44.1,49.8,34.6],
      "四月": [50.6,54.9,55.7,43.6,45.2,25.2,19.3,26.4,28.7,41.6,33.2,33.7,38.3,45.6,27.2,30.8,26.1,40,43,50.3,59,62.3,54.6,44.1,38.9,32.3,35.8,38.6,39.1,64.2]};
    var d5000187_temp_hi  = {
      "二月": [33.4,31.1,33.8,31.9,34.8,32.9,35,31.8,37.5,36.7,35.6,29,30.6,30.4,33.6,30.3,31.8,29.3,31.4,29.4,31.5,32.2,32,30.8,35,31.5,35.9,32],
      "三月": [36.1,31.6,34.9,23.9,20.8,17.7,31.8,28.8,29.7,19.9,20.4,21.3,22.6,21.8,23.4,31.5,34.6,34.3,34.5,31,31.1,32.3,22.3,22.7,23.2,23.5,23.8,24.5,24.9,24.7,24.9],
      "四月": [25.7,26,26.7,25.3,23.7,22.9,22.3,22.7,24.4,25.7,26.2,24.9,24.3,23.3,23.7,22.7,23.1,23.8,25.1,25.7,26.3,28,26.8,23.8,24.4,24.7,27,26.4,27.2,27.5]};
    var d5000187_temp_avg = {
      "二月": [18.62,21.47,22.87,20.96,22.83,20.64,23.06,21.31,25.95,23.03,24.68,21.31,22.68,24.59,20.75,19.77,19.89,20.7,20.31,19.95,19.87,22.76,23.27,23.88,24.81,23.82,26.86,25.35],
      "三月": [26.34,24.45,26.15,22.41,20.74,17.68,23.09,21.4,19.73,17.9,18.79,20.18,21.52,21.6,21.98,23.6,24.28,26.57,25.97,24.12,23.22,24.49,20.89,21.43,21.88,22.31,22.58,23.24,23.79,23.09,23.67],
      "四月": [24.69,25.23,25.91,23.26,21.4,20.95,20.4,21.4,23.19,24.29,24.35,23.77,23.67,21.99,22.07,21.19,21.46,22.74,23.83,24.59,25.59,25.32,24.77,22.5,23.15,23.68,25.2,24.27,24.25,23.04]};
    var d5000187_temp_low = {
      "二月": [13.7,13,11.7,12.5,12.5,12.1,12.3,13.3,14.6,13.5,14.2,13.8,14.6,16.6,15.2,13.6,14,15.5,15.3,14.3,14.4,14.4,15.3,17.1,16.2,16.6,17.6,18.6],
      "三月": [17.7,18,20,20.2,20.7,17.6,16.2,13.1,14.8,16.1,17.1,18.4,19.8,21.5,19.9,18.3,18.9,19.5,17.7,16.6,16.5,17.6,19.2,19.8,20.2,20.5,21.1,21.6,22.2,20.9,21.6],
      "四月": [23.1,24.3,24.5,21,19,18.6,18.3,19.9,20.8,22.4,22.6,22.4,22.8,20.1,20.1,19.1,19.8,21.1,22.5,23.1,24.3,17.1,22.6,20.7,21.6,22.3,23.4,15.7,15.7,16.1]};

    // 后门温湿度
    var d5000188_hum_hi  = {
      "二月": [31.8,26.1,23.3,19.1,21,24.4,26.8,27.8,37.9,38.8,26.2,18.7,32.1,37.6,37.6,38.1,38.7,46.7,49.8,41.6,44,39.1,40.1,48.2,47.1,41.1,56.9,56.5],
      "三月": [49,51.1,58,76.1,46.9,47.5,70.5,46,37.5,44.7,52.6,64.3,61.6,64,79.2,48.6,47.6,53.4,47.2,43.4,45.2,45.5,47.6,51.3,50.6,52.8,54.9,55.1,56.6,57.7,54.9],
      "四月": [57.9,59.7,62.2,53.8,51,45.4,32.2,42.8,54.6,56,57.5,54.2,75.1,57.4,51.9,39.5,45.4,51.5,60,62.1,65.9,73.1,71.8,54.5,55.7,49.1,55.9,63.4,74.3,77.9]};
    var d5000188_hum_avg = {
      "二月": [23.03,21.13,18.11,14.28,17.02,18.45,22.1,21.34,33.28,23.95,18.49,12.86,22.39,29.5,33.07,33.89,33.23,43.61,42.79,39.65,37.91,33.13,33.55,43.22,35.81,34.55,42.83,42.06],
      "三月": [33.8,42.02,53.98,61.14,46.61,47.38,49.69,34.21,30.39,37.93,42.52,50.36,55.82,61.17,59.51,37.66,41.39,47.47,38.8,38.72,38.69,37.61,41.6,45.41,46.88,48.78,47.61,47.1,51.19,50.52,46.54],
      "四月": [52.16,56.17,57.15,46.06,46.97,33.29,24.52,34.88,39.49,47.18,41.3,42.85,59.94,48.98,37.03,35.1,34.84,43.25,49.55,54.77,61.81,65.8,61.63,48.72,46.38,39.36,45.57,51.53,62.21,67.27]};
    var d5000188_hum_low = {
      "二月": [19,15.7,16.1,9,12.5,11.6,15.4,13,27.3,18.1,12.4,6.7,14.5,23,29.3,31.9,30,38.5,39.2,36.7,33,27.5,22.5,38.6,31.4,30,34.2,36.3],
      "三月": [24.2,35.4,50.4,46.6,46.4,47.3,45,29.9,23.5,31.2,24.5,35.9,46.9,58.5,43.2,30.3,36.8,43.1,33.9,34.9,35,29.6,36.9,32.1,43.9,43.3,43,37.6,41.7,46.9,28.2],
      "四月": [47.3,51.9,53.3,43.1,43.6,26.6,19.5,23.4,23,38.7,35.2,32.3,39.5,45,27,30.1,21.9,35.3,39.4,48.2,59.6,60.5,53.5,43.1,40,30.1,33.2,38.5,54.4,59.9]};
    var d5000188_temp_hi  = {
      "二月": [20.9,21.4,20.9,20,21.1,19.9,21.2,20.5,23.4,22.5,22.1,21.4,21.7,23.9,22.2,21.2,20.4,20.4,20.6,20.1,20.8,22.4,22,22.7,23.3,24.1,24.5,24.9],
      "三月": [23.9,22.2,23.9,23.6,21.3,18.1,20.9,21.4,20.4,18.7,20.6,21.7,23.6,21.9,24,23.1,22.5,26.5,23.8,23.4,21.7,24.1,23.2,22.8,24.2,24.7,25.2,25.9,26.5,25.9,25.3],
      "四月": [27.1,27.6,28.3,25.7,24.3,23.1,22.6,23.8,24.8,26.9,26.5,25.4,24.4,23.8,22.6,23.1,23.2,25.2,26.6,26.8,27,28.9,27.1,24.4,23.8,25.8,27.1,27.3,27.5,27.7]};
    var d5000188_temp_avg = {
      "二月": [18.19,18.64,18.21,16.93,17.92,17.56,18.39,18.25,20.46,19.72,19.77,19.13,19.45,21.65,19.57,19.29,18.7,18.78,18.39,18.11,18.12,19.94,20.03,20.67,20.78,21.38,22.53,22.8],
      "三月": [21.02,20.74,22.05,22.4,21.21,18.04,18.13,18.44,18.58,17.57,18.26,20.35,22.17,21.75,21.79,20.88,21.13,23.62,22.14,21.2,20.05,21.66,21.81,21.58,22.68,23.43,23.68,24.47,25.1,24.3,24.37],
      "四月": [25.71,26.46,27.07,24.23,22.43,21.79,21.32,22.33,23.37,24.97,24.24,24.06,23.29,22.8,21.83,22.02,22.12,23.97,24.77,25.31,26.2,27.17,24.61,23.4,22.85,24.06,25.69,25.15,25.77,26.19]};
    var d5000188_temp_low = {
      "二月": [16.2,16,15.2,14,14.3,14.8,14.7,15.9,16.2,16.7,16.7,16.8,16.6,17.8,17.8,17.8,17.8,17.7,17.4,16.8,16.8,16.8,18.1,18.1,18.5,18.5,19.3,20.3],
      "三月": [18,18.6,20.2,21.1,21.2,18,11.5,15.3,13.2,15,14.7,18.5,20.1,21.6,20.2,16.1,17.8,20.4,20.3,19.4,18.5,18.5,19.7,19.6,21.1,21.6,22,22.5,23.3,22.6,22.7],
      "四月": [24.1,25,25.5,22.8,20.6,20.1,20.1,20.2,21.3,22.1,22.1,22.2,21.6,20.7,20.4,20.2,19.6,22.6,22.6,23.3,25,25.8,22.4,22.1,21.1,21.5,23.3,23.2,24,24.4]};

    // 地下办公室温湿度
    var d5000189_hum_hi  = {
      "二月": [31.5,29.9,21.8,20.4,23.3,22.3,26.6,26.5,34,32.8,26.9,21.5,38,32,31.1,31.6,32.4,36.5,36.5,34.2,32,34.3,37,41.9,39.8,38.9,44.1,47.1],
      "三月": [45.3,42.5,47.5,57.9,49.4,40.8,52.5,54.3,43.7,47.1,50.9,55.8,66.5,66.5,73.3,62.8,61.5,61.1,59.7,56.7,52.7,56.7,65.1,58.4,65.3,66.2,65.1,67.5,67.5,65.3,60.8],
      "四月": [65.2,67.3,74.6,65.9,59.9,51.7,47.6,54.4,59.8,63.6,62.9,59.1,64.6,62.4,55.4,51.4,55.9,56.4,61.3,63.6,68.1,68.6,69.7,60.1,61.6,56.2,59.7,69.2,71,69]};
    var d5000189_hum_avg = {
      "二月": [24.32,24.53,17.43,15.58,17.34,18.88,21.47,22.05,29.56,21.11,19.89,17.96,27.03,28.36,28.2,28.37,28,30.68,33.51,28.98,27.53,31.23,33.95,37.77,34.16,33.82,41.46,43.13],
      "三月": [35.81,37.06,42.91,52.31,48.23,40.68,47.57,44.59,38.78,42.56,46.6,52.33,58.68,65.22,67.67,56.09,55.29,57.18,51.15,47.6,47.65,51.57,52.7,52.94,60.27,59.69,62.11,58.91,63.58,54.59,53],
      "四月": [62.9,64.24,66.05,57.54,53.17,45.68,39.75,49.57,54.16,58.78,55.55,52.82,57.64,57.31,51.75,46.1,47.5,52.01,58.01,61.43,65.73,66.87,61.24,55.92,54.35,53.11,57.41,57.7,61.56,64.59]};
    var d5000189_hum_low = {
      "二月": [21,19.3,15.5,12.5,13.5,14.6,15.1,17.7,19,15.4,12.1,12.3,14.8,22.8,24.3,23.1,23,25.5,27.8,24.3,21.7,24.4,32,30.7,30.3,26.5,36.2,34.6],
      "三月": [31.7,30.5,34.6,46.6,47,40.4,40.2,33.1,29.8,35.1,38.6,43.5,47.2,63.5,58.3,51.8,50.9,48.4,40.7,39.2,40.8,43.5,36.1,43.6,55.2,49.8,56.4,45.5,59.1,40.2,39.6],
      "四月": [59,56.3,51.4,46.1,42,36.3,30.9,38.8,40.9,47.8,46.9,42.4,47.3,54.5,47.7,37.7,37.8,42.7,51.6,50.5,62.8,56.8,50.8,53,47.2,47.5,53.9,47.7,52.3,59.9]};
    var d5000189_temp_hi  = {
      "二月": [26.9,26.8,27.5,27.9,28.2,27.6,27.6,26.8,27.9,28.9,28.5,27.3,27.5,28.3,28.7,28.8,28.5,28.7,28.4,29,30.6,28,23,28,28.3,28.5,24.2,26.7],
      "三月": [27.2,28.6,29.2,23.8,22.7,21.2,22.5,26.7,26.7,26.5,26.5,26.4,26.2,21.8,21.9,22.6,23.1,27.3,27.9,28,23.7,23.2,26.2,27.9,22.6,26.7,23,28.4,24,29.4,29.9],
      "四月": [24.4,26.8,29.3,28.2,28.6,28.8,28.4,23.7,23.5,28.2,24.5,24.3,27.8,24.4,23.8,28.2,28,28.8,24.5,28.2,24.8,26,25.9,25,25,24.7,25,26,26.3,27]};
    var d5000189_temp_avg = {
      "二月": [22.52,22.58,24.58,24.79,24.26,23.23,23.39,23.04,23.9,26.17,25.03,23.07,23.36,25.76,24.42,23.99,24.19,25.17,23.79,25.46,25.71,23.15,22.33,23.18,24.02,23.86,23.45,23.2],
      "三月": [23.76,24.37,25.32,23.29,22.7,21.18,21.8,22.46,22.46,22.54,22.22,22.25,22.26,21.72,21.53,21.95,22.54,23.43,23.86,23.62,22.96,22.73,23,23.32,22.38,23.14,22.56,23.62,23.31,25.82,25.56],
      "四月": [24.1,24.43,24.92,24.46,24.89,25.01,24.5,23.34,23.3,24,24.03,24.01,24.62,23.91,23.55,24.2,23.82,24.56,24.16,24.47,24.58,25.44,25.21,24.59,24.16,24.29,24.55,24.94,25.45,26.28]};
    var d5000189_temp_low = {
      "二月": [19.9,21.1,21.4,20.8,20.8,21,21.3,21.1,22.1,22.1,22.3,21.7,21.5,22.7,21.9,21.4,21.5,22.1,21.5,21.7,21.8,21.4,21.5,21.3,22.2,22.1,22.4,22],
      "三月": [22.4,22.2,23.6,22.6,22.7,21.1,21.1,21.3,21.4,21.3,21.2,21.3,21.4,21.7,21.2,21.1,21.8,22.4,22.9,22.4,22.4,22.1,22,21.8,22.1,22.1,22.2,22.3,22.7,22.7,23.9],
      "四月": [23.7,23.9,23.8,23.7,23.8,23.7,23,22.9,23.1,23.1,23.7,23.7,23.7,23.5,23.1,23.2,22.7,23.5,23.9,24,24.3,24.5,23.8,24.2,21.5,23.9,24.1,22.4,22.9,23.3]};

    // 一层正门温湿度
    var d500018a_hum_hi  = {
      "二月": [100,30.1,29.4,24.1,27,28.8,29.6,31.8,39.2,41.2,29.7,20.8,30.7,35.7,39.2,39.6,37.5,46.7,48.8,43.9,43.8,39.7,44.4,47.1,46.3,42.8,56.6,62.1],
      "三月": [54.3,58.7,64.3,73.3,51.5,53.2,57.3,51.4,47.8,50.6,54.2,61.4,65,69.1,74.3,49.5,51.5,59.8,56.6,54.5,56.6,54.1,58.5,58.7,57.9,58.5,60.2,59.3,61.9,62.6,54.8],
      "四月": [57.6,63.1,61.6,54.9,57.5,47.1,31.6,41.5,46.4,51.5,57.3,52.4,63,62,49.6,38.5,44.4,47.7,54.4,57.9,100,100,100,56.6,48.7,46.2,100,100,100,100]};
    var d500018a_hum_avg = {
      "二月": [57.6,63.1,61.6,54.9,57.5,47.1,31.6,41.5,46.4,51.5,57.3,52.4,63,62,49.6,38.5,44.4,47.7,54.4,57.9,100,100,100,56.6,48.7,46.2,100,100,100,100],
      "三月": [37.03,47.19,57.88,62.34,51.23,53.05,50.81,39.37,37.52,42.64,44.88,53.19,58.06,64.59,61.27,42.03,44.88,53.6,44.87,47.48,46.85,44.46,48.36,50.84,52.14,53.82,52.43,50.47,54.08,53.32,47.46],
      "四月": [52.56,58.09,57.29,47.59,48.23,33.46,23.9,34.69,39.39,47.5,41.27,42.17,53.28,50.14,37.89,36,35.66,42.83,47.54,52.24,59.18,64.79,58.4,48.56,44.59,38.48,44.34,48.19,57.8,64.03]};
    var d500018a_hum_low = {
      "二月": [18.4,17.6,18.1,12.7,14.7,14,18.8,15.1,27.7,21.1,14.2,9.1,14.5,24.6,30,32.5,29.2,37.3,39.5,36.2,34.4,28.9,19.2,37.4,31.7,31.7,33.8,40.7],
      "三月": [26.2,38.4,50.3,51.2,50.7,52.9,47.5,34.3,25.2,33.3,30,41.7,48,63,45.9,33.2,36.7,46.5,37.8,43,38.7,34,42.9,38,49.4,47.8,45.2,40.4,41.9,49,33.6],
      "四月": [46.6,54.5,53.6,44.7,44,25,15.6,23.9,28.2,44.6,35.8,32.4,37.5,45.5,31.2,34,25.8,35.8,40.5,46.2,56.4,50.2,51.3,43.5,40.7,31.8,35.4,37.1,51.5,57.1]};
    var d500018a_temp_hi  = {
      "二月": [25,20.4,21.8,20.9,21.8,20.4,22.7,20.6,24.1,23.1,22.6,20.5,22.3,22.9,23.3,21.8,22.8,22.3,22.7,22.1,22.2,22,23.2,23.4,24.4,23.8,25.4,22.4],
      "三月": [25,21.7,24.3,24.2,19,16.5,20.7,19.6,18.3,18.8,20,21.2,23.3,21.3,22.9,22.4,24.3,24.2,22.9,19.5,19.6,22.6,20.6,22.1,22.6,22.9,23.6,24.7,25.1,25.1,25.3],
      "四月": [26.8,26.3,27.8,25.5,23.9,22.1,21.2,23.7,25.1,26.7,26.2,25.4,25.1,23,24.1,23.2,24.3,25.3,26.7,26.9,27.2,28.1,27.2,23.6,25.3,25.4,27.2,27.7,27.9,27.2]};
    var d500018a_temp_avg = {
      "二月": [24.9,18.1,18.26,16.38,17.71,17.69,18.81,18.28,20.74,19.78,19.35,18.14,19.5,21.09,20.11,19.2,19.28,19.78,19.59,19.39,19.06,19.7,20.54,21.29,21.33,20.99,22.36,19.99],
      "三月": [20.98,19.43,21.18,21.54,18.71,16.45,18,16.17,15.31,16.37,17.8,19.65,21.53,20.98,21.46,19.65,20.46,21.23,19.52,17.07,16.77,19.16,19.13,20.6,21.2,21.61,22.05,22.94,23.84,23.55,24.09],
      "四月": [25.3,25.44,26.37,24.25,21.99,20.83,20.37,22.14,23.78,24.99,25.1,24.48,24.27,21.8,22.88,22.4,22.79,23.99,25.12,25.57,26.3,27,25.24,22.83,24.05,24.39,26,25.94,26.43,26.51]};
    var d500018a_temp_low = {
      "二月": [16.5,15.3,14.4,11.4,12.7,14.7,14.9,15.8,16.5,16.2,15.8,15.9,16.3,18,18.2,17.1,17.1,18,18.3,17.6,17.6,17.5,17.6,19,18.7,18.2,18.5,17.6],
      "三月": [17.4,17.2,18.4,18.7,18.6,16.4,15.5,12.6,13.1,14.3,15.4,17.1,18.9,20.7,19.5,18.1,18.3,18.7,16.7,14.6,14.6,15.7,17.2,18.5,19.7,20.2,20.5,21,22.1,22.3,22.3],
      "四月": [23.5,24.6,25,23.1,19.8,19.3,18.6,20,21.6,23.3,24,23.7,22.8,19.4,21.5,21.4,21.5,22.3,23.5,24.3,24.9,25.9,23,21.7,22.3,23.1,23.8,24.8,25.1,25.9]};

            // Function to create the histogram data
            var createAreaData = function (hi_values, low_values) {
              var items = [];
              for (var i = 0; i < hi_values.length; i++) {
                items.push({high: hi_values[i],
                            low: low_values[i]});
              }
              return items;
            };

            var lineSeries = [
              {name: "一层后门出风口温度", items: d5000187_temp_avg["二月"], categories: ['d5000187'], color: colorHandler.getValue("d5000187")},
              {name: "后门温度", items: d5000188_temp_avg["二月"], categories: ['d5000188'], color: colorHandler.getValue("d5000188")},
              {name: "地下办公室温度", items: d5000189_temp_avg["二月"], categories: ['d5000189'], color: colorHandler.getValue("d5000189")},
              {name: "一层正门温度", items: d500018a_temp_avg["二月"], categories: ['d500018a'], color: colorHandler.getValue("d500018a")}
              ];
            var lineGroups = [];
            for (var i = 0; i < d500018a_temp_avg["二月"].length; i++) {
              lineGroups.push(i + 1);
            }
            this.lineSeriesValue = ko.observableArray(lineSeries);
            this.lineGroupsValue = ko.observableArray(lineGroups);

            var yAxis = {title: '温度监控', referenceObjects: [
                {text: '温度范围', type: 'area', items: createAreaData(d5000187_temp_hi["二月"],d5000187_temp_low["二月"]), categories: ['d5000187'],
                color: 'rgba(35,123,177,0.5)', displayInLegend: 'off', location: 'back'},
                {text: '温度范围', type: 'area', items: createAreaData(d5000188_temp_hi["二月"],d5000188_temp_low["二月"]), categories: ['d5000188'],
                color: 'rgba(104,193,130,0.5)', displayInLegend: 'off', location: 'back'},
                {text: '温度范围', type: 'area', items: createAreaData(d5000189_temp_hi["二月"],d5000189_temp_low["二月"]), categories: ['d5000189'],
                  color: 'rgba(250,213,92,0.5)', displayInLegend: 'off', location: 'back'},
                {text: '温度范围', type: 'area', items: createAreaData(d500018a_temp_hi["二月"],d500018a_temp_low["二月"]), categories: ['d500018a'],
                  color: 'rgba(237,102,71,0.5)', displayInLegend: 'off', location: 'back'}
              ]};

            this.yAxisData = ko.observable(yAxis);
            this.hiddenCategoriesValue = ko.observableArray([]);
            this.highlightedCategoriesValue = ko.observableArray([]);

            /* create legend */
            this.legendSections2 = [{items: [
            {color: colorHandler.getValue("d5000187"), text: "一层后门出风口温度", id: "d5000187"},
            {color: colorHandler.getValue("d5000188"), text: "后门温度", id: "d5000188"},
            {color: colorHandler.getValue("d5000189"), text: "地下办公室温度", id: "d5000189"},
            {color: colorHandler.getValue("d500018a"), text: "一层正门温度", id: "d500018a"}]}];
      // Below are a set of the ViewModel methods invoked by the oj-module component.
      // Please reference the oj-module jsDoc for additional information.

      /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here. 
       * This method might be called multiple times - after the View is created 
       * and inserted into the DOM and after the View is reconnected 
       * after being disconnected.
       */
      self.connected = function() {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after the View is disconnected from the DOM.
       */
      self.disconnected = function() {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after transition to the new View is complete.
       * That includes any possible animation between the old and the new View.
       */
      self.transitionCompleted = function() {
        // Implement if needed
      };
    }

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new IncidentsViewModel();
  }
);
