/**********************************************************************
*                           VARIABLES
**********************************************************************/

@buildings: darken(#ED9121, 30%); /*#843F5B; /*#CC4E5C;/*#A8516E; /*#CC5500; /*#A52A2A;  /*#98777B;*/
@vegetation: desaturate(lighten(#8A9A5B, 10%), 10%); /*Moss Green: #8A9A5B */ /*#D9DEC3;/*rgb(146,163,83);*/
@recreation: rgb(174,191,103);
@walkway: desaturate(lighten(#A45A52, 30%), 15%); /*rgb(219,198,173);*/
@water: rgb(153,207,227);
@pavement: rgb(188,189,192);
@arboretum: rgb(88,115,51);

/*Track and Field*/
@astroturf: rgb(25,111,12);
@track: rgb(194,98,102);
@mats: rgb(62,108,185);
@sand: rgb(234,204,106);
@lines: rgb(255,255,255);

Map {
  background-color: #c2c2c2;
}

#buildings {
  building-fill:@buildings;
  building-height: 2;
  text-name: [abbrev];
  text-face-name: 'Century Gothic Bold';
  text-fill: #fff;
}

#surfaces {
  polygon-opacity:1;
  polygon-fill:#cc0000;
  [road_type="Vegetation"] {
  	  polygon-fill:@vegetation;
      line-color: darken(@vegetation, 10%);
  }
  [road_type="Recreation"] {
    polygon-fill:@recreation;
  }
  [road_type="Walkway"] {
    polygon-fill:@walkway;
  }
  [road_type="Dirt"],[road_type="Side"],[road_type="Trail"] {
    polygon-fill:@walkway;
  }
  [road_type="Parking"],[road_type="Main"] {
    polygon-fill:@pavement;
  }
  [road_type="Arboretum"] {
    polygon-fill:@arboretum;
  }
  [road_type="Fountain_Water"] {
    polygon-fill:@water;
  }
  [road_type="Fountain_Out"]{
    polygon-fill: @pavement;
  }
  [road_type="Outback"]{
    polygon-fill: @walkway;
  }
}

#surface-lines {
  line-width:1;
  line-color:@pavement;
}

/**********************************************************************
*                           TRACK AND FIELD
**********************************************************************/

#track-surfaces {
  line-color:#594;
  line-width:0.5;
  polygon-opacity:1;
  polygon-fill:#ae8;
  [type="turf"]{
  	polygon-fill: @astroturf;
  }
  [type="pole vault"],
  [type="high jump"],
  [type="steeple"],
  [type="long jump"]{
  	polygon-fill: darken(@track,10);  
  }
  [type="track"]{
  	polygon-fill: @track;  
  }
  [type="high jump mat"],[type="pole vault mat"]{
  	building-fill: @mats;
    building-height: 0.2;
  }
  [type="sand pit"]{
  	polygon-fill: @sand;
  }
  [type="water pit"]{
  	polygon-fill: @water;
    line-color:#000;
    line-width:0.5;
  }
}

#track-lines {
  line-color:@lines;
  [zoom<18]{
    line-width:0;
  }
  [zoom=18]{
    line-width:0.2;
  }
  [zoom>=19]{
    line-width:0.4;
  }
  
  [type="soccer"]{
  	[zoom<18]{
    	line-width:0.2;
  	}
    [zoom=18]{
    	line-width:1;
    }
    [zoom>=19]{
        line-width:2;
    }
  }
  
    [type="jump board"]{
      line-width: 2;
    }
}



#parking-lines, #parking-stalls {
  [zoom>=16] {
  	line-color:#fff;
  }

  [zoom=16] {
   	line-width:0.2;
  }
  [zoom=17] {
   	line-width:0.5;
  }
  [zoom=18] {
   	line-width:1;
  }
  [zoom>18] {
   	line-width:1.5;
  }
}


#trees {
  [zoom>=17] {
    point-allow-overlap:true;
  	point-file: url("icons\tree.svg");
    point-opacity: 1;
  }
    [zoom=17] {
  	point-transform:"scale(.08)";
  }
  [zoom=18] {
  	point-transform:"scale(.15)";
  }
  [zoom=19] {
  	point-transform:"scale(.3)";
  }
  [zoom=20] {
  	point-transform:"scale(.5)";
  }
}


