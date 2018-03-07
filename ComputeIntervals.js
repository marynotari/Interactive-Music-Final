// Calculate intervals between shooting incidents in Shootings.js
// As told by Yotam Mann for Interactive Music ITP NYU Spring 2018
// See https://momentjs.com/docs/#/displaying/difference/

var previousDate = -1;

for (var i = 0; i < Shootings.length; i++) {
  var incident = Shootings[i]
	if (previousDate === -1){
   	previousDate = incident.DATE
    incident.time = 0
  } else {
    var dateMoment = moment(incident.DATE, 'M/DD/YY')
    // console.log(dateMoment)
  	incident.time = dateMoment.diff(previousDate, 'days')
  }
  incident.time = incident.time / 150;
}
