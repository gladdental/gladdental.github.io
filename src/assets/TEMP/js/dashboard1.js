 $(document).ready(function() {
     "use strict";
     // toat popup js
     $.toast({
         heading: 'Welcome to Ample admin',
         text: 'Use the predefined ones, or specify a custom position object.',
         position: 'top-right',
         loaderBg: '#fff',
         icon: 'warning',
         hideAfter: 3500,
         stack: 6
     })


     //ct-visits
     new Chartist.Line('#ct-visits', {
         labels: ['1m ago', '3w ago', '2w ago', '1w ago', '4d ago', '2d ago', '1d ago', 'Now'],
         series: [
             [2, 3, 5, 2, 7, 4, 9, 8],
             [1, 0, 2, 5, 2, 6, 2, 5]
         ]
     }, {
         top: 0,
         low: 0,
         showPoint: true,
         fullWidth: true,
         plugins: [
             Chartist.plugins.tooltip()
         ],
         axisY: {
             labelInterpolationFnc: function(value) {
                 return (value / 1) + 'k';
             }
         },
         showArea: true
     });
     // counter
     // alert(document.getElementById("totalcustomer").innerHTML);

     $(".counter").counterUp({
         delay: 100,
         time: 1200
     });

     // while(2 > 1){
     //     console.log("a")
     // }

     var sparklineLogin = function() {
         $('#sparklinedash').sparkline([0, 5, 6, 10, 9, 12, 4, 9], {
             type: 'bar',
             height: '30',
             barWidth: '4',
             resize: true,
             barSpacing: '5',
             barColor: '#7ace4c'
         });
         $('#sparklinedash2').sparkline([0, 5, 6, 10, 9, 12, 4, 9], {
             type: 'bar',
             height: '30',
             barWidth: '4',
             resize: true,
             barSpacing: '5',
             barColor: '#7460ee'
         });
         $('#sparklinedash3').sparkline([0, 5, 6, 10, 9, 12, 4, 9], {
             type: 'bar',
             height: '30',
             barWidth: '4',
             resize: true,
             barSpacing: '5',
             barColor: '#11a0f8'
         });
         $('#sparklinedash4').sparkline([0, 5, 6, 10, 9, 12, 4, 9], {
             type: 'bar',
             height: '30',
             barWidth: '4',
             resize: true,
             barSpacing: '5',
             barColor: '#f33155'
         });
     }
     var sparkResize;
     $(window).on("resize", function(e) {
         clearTimeout(sparkResize);
         sparkResize = setTimeout(sparklineLogin, 500);
     });
     sparklineLogin();

     // alert(document.getElementById("totalcustomer").innerHTML);

 });