function convertDegrees(deg){
	if ( 354.38 <= deg || deg <= 5.62 ) return 'N';
	if ( 5.63 <= deg && deg <= 16.87 ) return 'NbE';
	if ( 16.88 <= deg && deg <= 28.12 ) return 'NNE';
	if ( 28.13 <= deg && deg <= 39.37 ) return 'NEbN';
	if ( 39.38 <= deg && deg <= 50.62 ) return 'NE';
	if ( 50.63 <= deg && deg <= 61.87 ) return 'NEbE';
	if ( 61.88 <= deg && deg <= 73.12 ) return 'ENE';
	if ( 73.13 <= deg && deg <= 84.37 ) return 'EbN';
	if ( 84.38 <= deg && deg <= 95.62 ) return 'E';
	if ( 95.63 <= deg && deg <= 106.87 ) return 'EbS';
	if ( 106.88 <= deg && deg <= 118.12 ) return 'ESE';
	if ( 118.13 <= deg && deg <= 129.37 ) return 'SEbE';
	if ( 129.38 <= deg && deg <= 140.62 ) return 'SE';
	if ( 140.63 <= deg && deg <= 151.87 ) return 'SEbS';
	if ( 151.88 <= deg && deg <= 163.12 ) return 'SSE';
	if ( 163.13 <= deg && deg <= 174.37 ) return 'SbE';
	if ( 174.38 <= deg && deg <= 185.62 ) return 'S';
	if ( 185.63 <= deg && deg <= 196.87 ) return 'SbW';
	if ( 196.88 <= deg && deg <= 208.12 ) return 'SSW';
	if ( 208.13 <= deg && deg <= 219.37 ) return 'SWbS';
	if ( 219.38 <= deg && deg <= 230.62 ) return 'SW';
	if ( 230.63 <= deg && deg <= 241.87 ) return 'SWbW';
	if ( 241.88 <= deg && deg <= 253.12 ) return 'WSW';
	if ( 253.13 <= deg && deg <= 264.37 ) return 'WbS';
	if ( 264.38 <= deg && deg <= 275.62 ) return 'W';
	if ( 275.63 <= deg && deg <= 286.87 ) return 'WbN';
	if ( 286.88 <= deg && deg <= 298.12 ) return 'WNW';
	if ( 298.13 <= deg && deg <= 309.37 ) return 'NWbW';
	if ( 309.38 <= deg && deg <= 320.37 ) return 'NW';
	if ( 320.63 <= deg && deg <= 331.87 ) return 'NWbN';
	if ( 331.88 <= deg && deg <= 343.12 ) return 'NNW';
	if ( 343.13 <= deg && deg <= 354.37 ) return 'NbW';
}

module.exports = convertDegrees;