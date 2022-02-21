/* Javascript for StudioAnalyticsXBlock. */
function StudioAnalyticsXBlock(runtime, element) {
    document.querySelector(".showResults").addEventListener("click", showResults);
    // See load and submit funcions at python script
    var handlerUrlAnalytics = runtime.handlerUrl(element, 'load_analytics');
   

    // On document load
    $(function ($) {
        $.ajax({
            type: "POST",
            url: handlerUrlAnalytics,
            data: "null", // No return needed.
            dataType: 'json',
            success: function (data) {
                //add a header to the web page
                var header = '';
                header = '<div class="bg-primary  d-flex justify-content-center"> <h2 class="h1 text-white">Resultados Tests</h2> </div>';
                $("#analytics-header").append(header);
                //show database results (student id, date, test name and test result) in an HTML table
                data.map((student) => {
                    var html = ''
                    /*if (student.test == 1) test_name = "Kolb"
                    if (student.test == 2) test_name = "Hermann"
                    if (student.test == 3) test_name = "Inteligencias Multiples"
                    if (student.test == 4) test_name = "Honey-Alonso"
                    if (student.test == 5) test_name = "Felder Silverman"*/
                    if (student.test == 6) test_name = "Bandler & Grinder"
             

                    html += '<tr>'
                    html += '<td>' + student.user_id + '</td>'
                  //html += '<td>' + student.fecha + '</td>'
                    html += '<td>' + test_name + '</td>'
                    html += '<td>' + student.result.result + '</td>'
                    html += '</tr>'
                    $("#analytics-table").append(html);
                })
            }
        });
    });
       
    function showResults() {
    	
        $.ajax({
            type: "POST",
            url: handlerUrlAnalytics,
            data: "null", // No return needed.
            dataType: 'json',
            success: function (data) {
                //show database results (student id, date, test name and test result) in an HTML table
		let a=0,k=0,v=0;
		let  res = [];
                data.map((student) => {

                    
                    //for (let i=0; i<12 ; i++){
                    let x = student.result.result;
                        //let x = student.result.result_details[i];
                        //let y = x.result;
                    res.push(x);
                   
                    console.log(res);
                 
		   for (var i=0; i<res.length; i++){
			if(res[i].substr(0,16) == "Dominante Visual"){
				v++;
			}else if(res[i].substr(0,18) == "Dominante Auditivo"){
				a++;
			}else{
				k++;
			}
		  }        
                } )
               
               
                var Chartgrafico = {
                type: "pie",
                data: {
                    datasets: [{
                    data: [v,a,k],
                    backgroundColor: [
                        '#0e2f57', '#0870bc', '#08bcff',
                    ],
                    }],
                    labels: [
                    v+" Visual" , a+" Auditivo", k+ " Kinestésico",
                    ]
                },
                options: {
                    responsive: true,
                }
                
                }

                var grafica = document.getElementById('grafico').getContext('2d');
                window.pie = new Chart(grafica, Chartgrafico);
               
               
                var Chartgrafico2 = {
                type: "bar",
                data: {
                    datasets: [{
                    data: [v,a,k],
                    backgroundColor: [
                        '#0e2f57', '#0870bc', '#08bcff',
                    ],
                 
                    }],

                    labels: [
                    v+ " Visual" , a+" Auditivo", k+ " Kinestésico",
                    ]
                   
                },
                options: {
                 responsive: true,
                    scales: {
              	  yAxes: [{
                    ticks: {
                   beginAtZero: true
                    },
                  scaleLabel: {
			display: true,
			labelString: "Total Estudiantes"
		   }
              	   }]
     		},
     		  legend: {
    			display: false //ELiminar el label "undefined"
   		   }
                }
                }

                var grafica2 = document.getElementById('grafico2').getContext('2d');
                window.bar = new Chart(grafica2, Chartgrafico2);

               
               
               /* ******************************************************* */
		/*

                var Chartgrafico3 = {
                type: "pie",
                data: {
                    datasets: [{
                    data: [o3, p3, q3, r3, s3],
                    backgroundColor: [
                        "#c83349", "#e06377", "#ffeead", "#ffcc5c", "#feb236",
                    ],
                    }],
                    labels: [
                    a3+" Mucho más Verbal", b3+" Más Verbal", c3+" Equilibrio", d3+" Más Visual", e3+" Mucho más Visual",
                    ]
                },
                options: {
                    responsive: true,
                }
                }

                var grafica3 = document.getElementById('grafico3').getContext('2d');
                window.pie = new Chart(grafica3, Chartgrafico3);

                var Chartgrafico4 = {
                   
                    type: "pie",
                    data: {
                        datasets: [{
                        data: [o4, p4, q4, r4, s4],
                        backgroundColor: [
                            "#405d27", "#82b74b", "#e3eaa7", "#bdcebe", "#618685",
                        ],
                        }],
                        labels: [
                            a4+" Mucho más Global", b4+" Más Global", c4+" Equilibrio", d4+" Más Secuencial", e4+" Mucho más Secuencial",
                        ]
                    },
                    options: {
                        responsive: true,
                    }
                    }
   
                    var grafica4 = document.getElementById('grafico4').getContext('2d');
                    window.pie = new Chart(grafica4, Chartgrafico4);*/

                    var texto = "Total de Estudiantes = ";
                    var objetivo = document.getElementById('resultado');
                    objetivo.innerHTML = texto + res.length;
                                               
            }
        });
    }}


