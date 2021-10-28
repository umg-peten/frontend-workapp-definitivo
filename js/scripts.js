/***  Dashboard  ***/
var myVar = setInterval(myTimer, 1000);
var date = new Date().toLocaleString();
function myTimer() {
    $("#datetime").text(date);
}

$(document).ready(function () {

    DashboardCharts();
    ClockingChart();
    
    /* Graficos*/
    function DashboardCharts() {
        var ctx1 = document.getElementById('chart1').getContext('2d');
        var myChart = new Chart(ctx1, {
            type: 'pie',
            data: {
                labels: ['Activos', 'Inactivos', 'Licencia', 'Falta', 'En proceso (despido)'],
                datasets: [{
                    label: '# de Empleados',
                    data: [45, 5, 3, 2, 1, 0],
                    backgroundColor: [
                        'rgba(255, 99, 132)',
                        'rgba(54, 162, 235)',
                        'rgba(255, 206, 86)',
                        'rgba(75, 192, 192)',
                        'rgba(153, 102, 255)',
                        'rgba(255, 159, 64)'
                    ],
                    borderWidth: 1
                }]
            }

        });

        /* Obtener los dias anteriores */
        var days = [];
        for (i = 1; i <= 7; i++) {
            var day = moment().add(i, 'days');
            day.locale('es');
            days.push(day.format('dddd'));
        }

        /* Graficos #2 */
        var ctx2 = document.getElementById('chart2').getContext('2d');
        var myChart = new Chart(ctx2, {
            type: 'bar',
            data: {
                labels: days,
                datasets: [{
                    label: '# de trabajadores que registraron asistencia',
                    data: [43, 43, 45, 44, 45, 45, 45],
                    backgroundColor: [
                        'rgba(255, 99, 132)',
                        'rgba(54, 162, 235)',
                        'rgba(255, 206, 86)',
                        'rgba(75, 192, 192)',
                        'rgba(153, 102, 255)',
                        'rgba(255, 159, 64)'
                    ],
                    borderWidth: 1
                }]
            }

        });
    }

    function ClockingChart() {
        var numberOfDays = 30;
        var days = [];
        for (i = 1; i <= numberOfDays; i++) {
            var day = moment().add(i, 'days');
            day.locale('es');
            days.push(day.format('dddd'));
        }

        var ctx3 = document.getElementById('chart3').getContext('2d');
        var myChart = new Chart(ctx3, {
            type: 'bar',
            data: {
                labels: days,
                datasets: [{
                    label: '# de Empleados',
                    data: [45, 5, 3, 2, 1, 0],
                    backgroundColor: [
                        'rgba(255, 99, 132)',
                        'rgba(54, 162, 235)',
                        'rgba(255, 206, 86)',
                        'rgba(75, 192, 192)',
                        'rgba(153, 102, 255)',
                        'rgba(255, 159, 64)'
                    ],
                    borderWidth: 1
                }]
            }

        });
    }


});