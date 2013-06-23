dojo.require("esri.map");
dojo.require("esri.dijit.Scalebar");
dojo.require("esri.layers.FeatureLayer");
(function () {
    "use strict";
    var map,
    buildings,
    places,
    services,
    departments,
	groupLayers = {
		accessibility: ['Automatic Doors','Accessible Parking','Accessible Restrooms','Accessible Routes'],
		tour: ['Campus Sculptures','Campus Sculpture Tour'],
		transportation: ['Bus Stops','Bike Racks'],
		atus: ['Computer Labs'],
		construction: ['Construction Sites'],
		emergency: ['Emergency Phones'],
		dining: ['Resident Dining','Retail Dining'],
		parking: ['Accessible Parking','Parking Lots','Parking Paystations','Motorcycle Parking','parking annotation'],
		sustainability: ['Bus Stops','Bike Racks','Sustainability']
	};

    buildings = {
        AI: {
            name: 'Academic Instructional Center',
            extent: [-13635054, 6229519, -13635055, 6229519]
        },
		AC: {
            name: 'Administrative Services Center',
            extent: [-13633712, 6229343, -13633712, 6229343]
        },
        AW: {
            name: 'Academic Instructional West',
            extent: [-13635144, 6229506, -13635145, 6229506]
        },
        AS: {
            name: 'Administrative',
            extent: [-13633711, 6229343, -13633712, 6229343]
        },
        AL: {
            name: 'Alumni House',
            extent: [-13634729, 6230993, -13634720, 6230993]
        },
        AB: {
            name: 'Archives Building',
            extent: [-13635050, 6228506, -13635051, 6228506]
        },
        AR: {
            name: 'Armory',
            extent: [-13635352, 6231056, -13635353, 6231056]
        },
        AH: {
            name: 'Arntzen Hall',
            extent: [-13635039, 6229828, -13635039, 6229828]
        },
        AA: {
            name: 'Arts Annex',
            extent: [-13634996, 6230087, -13634997, 6230087]
        },
        BI: {
            name: 'Biology',
            extent: [-13635190, 6229844, -13635191, 6229844]
        },
		BL: {
            name: 'Birnam Wood Laundry',
            extent: [-13634303, 6229769, -13633833, 6229075]
        },
        BW: {
            name: 'Birnam Wood',
            extent: [-13634603, 6229669, -13633733, 6229075]
        },
        BC: {
            name: 'Birnam Wood Community',
            extent: [-13634255, 6229306, -13634256, 6229306]
        },
        BH: {
            name: 'Bond Hall',
            extent: [-13635074, 6230292, -13635075, 6230292]
        },
        BK: {
            name: 'Bookstore',
            extent: [-13635094, 6230623, -13635095, 6230623]
        },
        BT: {
            name: 'Buchanan Towers',
            extent: [-13635150, 6228619, -13635151, 6228619]
        },
        CS: {
            name: 'Campus Services',
            extent: [-13635513, 6228744, -13635514, 6228744]
        },
        CA: {
            name: 'Canada House',
            extent: [-13635298, 6230510, -13635299, 6230510]
        },
        CV: {
            name: 'Carver Gymnasium',
            extent: [-13635140, 6230175, -13635141, 6230175]
        },
        CB: {
            name: 'Chemistry Building',
            extent: [-13635152, 6229956, -13635153, 6229956]
        },
        CH: {
            name: 'College Hall',
            extent: [-13635185, 6230352, -13635186, 6230352]
        },
        CM: {
            name: 'Commissary',
            extent: [-13634904, 6228716, -13634905, 6228716]
        },
        CF: {
            name: 'Communications Facility',
            extent: [-13634990, 6229632, -13634991, 6229632]
        },
        EH: {
            name: 'Edens Hall',
            extent: [-13634796, 6230704, -13634797, 6230704]
        },
        EN: {
            name: 'Edens Hall North',
            extent: [-13634743, 6230770, -13634744, 6230770]
        },
        ES: {
            name: 'Environmental Studies',
            extent: [-13635022, 6229750, -13635023, 6229750]
        },
        FC: {
            name: 'Fairhaven College',
            extent: [-13635043, 6229223, -13635044, 6229223]
        },
		FN: {
            name: 'Fairhaven Cabin - North',
            extent: [-13635174, 6228923, -13635174, 6228923]
        },
		FS: {
            name: 'Fairhaven Cabin - South',
            extent: [-13635174, 6228923, -13635174, 6228923]
        },
        FT: {
            name: 'Fairhaven Towers',
            extent: [-13635300, 6229500, -13634904, 6228700]
        },
        FI: {
            name: 'Fine Arts Building',
            extent: [-13634996, 6230087, -13634997, 6230087]
        },
        FR: {
            name: 'Fraser Hall',
            extent: [-13634923, 6230372, -13634924, 6230372]
        },
        HH: {
            name: 'Haggard Hall',
            extent: [-13635112, 6230419, -13635113, 6230419]
        },
        HG: {
            name: 'Higginson Hall',
            extent: [-13634809, 6230812, -13634800, 6230812]
        },
        HS: {
            name: 'High Street Hall',
            extent: [-13635328, 6230412, -13635329, 6230412]
        },
        HI: {
            name: 'Highland Hall',
            extent: [-13635364, 6230103, -13635365, 6230103]
        },
        HU: {
            name: 'Humanities Hall',
            extent: [-13634963, 6230417, -13634964, 6230417]
        },
        MA: {
            name: 'Mathes Hall',
            extent: [-13634936, 6230843, -13634937, 6230843]
        },
        MH: {
            name: 'Miller Hall',
            extent: [-13634981, 6230231, -13634982, 6230231]
        },
        NA: {
            name: 'Nash Hall',
            extent: [-13634853, 6230884, -13634854, 6230884]
        },
        OM: {
            name: 'Old Main',
            extent: [-13634864, 6230503, -13634865, 6230503]
        },
        PS: {
            name: 'Parking Services',
            extent: [-13635513, 6228744, -13635514, 6228744]
        }, //can't have duplicate abbrevs, so used PS instead
        PH: {
            name: 'Parks Hall',
            extent: [-13635140, 6229763, -13635141, 6229763]
        },
        PA: {
            name: 'PAC (Performing Arts Center)',
            extent: [-13635184, 6230526, -13635185, 6230526]
        },
        PP: {
            name: 'Physical Plant',
            extent: [-13634748, 6228260, -13634749, 6228260]
        },
        SV: {
            name: 'Recreation Center',
            extent: [-13635422, 6229438, -13635423, 6229438]
        },
        RA: {
            name: 'Ridgeway Alpha',
            extent: [-13635396, 6229964, -13635397, 6229964]
        },
        RB: {
            name: 'Ridgeway Beta',
            extent: [-13635437, 6229786, -13635438, 6229786]
        },
        RC: {
            name: 'Ridgeway Commons',
            extent: [-13635488, 6229950, -13635489, 6229950]
        },
        RD: {
            name: 'Ridgeway Delta',
            extent: [-13635405, 6229878, -13635406, 6229878]
        },
        RG: {
            name: 'Ridgeway Gamma',
            extent: [-13635487, 6229714, -13635488, 6229714]
        },
        RK: {
            name: 'Ridgeway Kappa',
            extent: [-13635566, 6229799, -13635567, 6229799]
        },
        RO: {
            name: 'Ridgeway Omega',
            extent: [-13635351, 6229946, -13635352, 6229946]
        },
        RS: {
            name: 'Ridgeway Sigma',
            extent: [-13635349, 6230035, -13635340, 6230035]
        },
        ET: {
            name: 'Ross Engineering Tech',
            extent: [-13635031, 6229953, -13635032, 6229953]
        },
        SL: {
            name: 'SMATE (Sci. Math',
            extent: [-13635219, 6230050, -13635210, 6230050]
        },
        SP: {
            name: 'Steam Plant',
            extent: [-13634953, 6230006, -13634954, 6230006]
        },
        VC: {
            name: 'Viking Commons',
            extent: [-13634998, 6230718, -13634999, 6230718]
        },
        VU: {
            name: 'Viking Union',
            extent: [-13635129, 6230678, -13635120, 6230678]
        },
        IC: {
            name: 'Visitor\'s Center',
            extent: [-13635513, 6228744, -13635514, 6228744]
        },
        WL: {
            name: 'Wilson Library',
            extent: [-13635055, 6230491, -13635056, 6230491]
        }
    };

    places = {
        Arboretum: {
            name: 'Arboretum',
            extent: [-13636189, 6228530, -13632410, 6231350]
        },
        Bookstore: {
            name: 'Bookstore',
            extent: [-13635094, 6230623, -13635095, 6230623]
        },
        'Carver Gym': {
            name: 'Carver Gym',
            extent: [-13635140, 6230175, -13635141, 6230175]
        },
        Fairhaven: {
            name: 'Fairhaven College',
            extent: [-13635043, 6229223, -13635044, 6229223]
        },
        'Haskell Plaza': {
            name: 'Haskell Plaza',
            extent: [-13635151, 6229877, -13635056, 6229780]
        },
        'Health Center': {
            name: 'Health Center',
            extent: [-13635513, 6228744, -13635514, 6228744]
        },
        Huxley: {
            name: 'Huxley College',
            extent: [-13635022, 6229750, -13635023, 6229750]
        },
        Library: {
            name: 'Library',
            extent: [-13635075, 6230454, -13635076, 6230454]
        },
        'Old Main': {
            name: 'Old Main',
            extent: [-13634864, 6230503, -13634865, 6230503]
        },
        'Outback Farm': {
            name: 'Outback Farm',
            extent: [-13635109, 6228500, -13635223, 6229200]
        },
        PAC: {
            name: 'PAC (Performing Arts Center)',
            extent: [-13635184, 6230526, -13635185, 6230526]
        },
        Planetarium: {
            name: 'Planetarium',
            extent: [-13635112, 6230419, -13635113, 6230419]
        },
        'Rec Center': {
            name: 'Rec Center',
            extent: [-13635422, 6229438, -13635423, 6229438]
        },
        'Red Square': {
            name: 'Red Square',
            extent: [-13635011, 6230343, -13635012, 6230343]
        },
        'Sehome Hill Lookout': {
            name: 'Sehome Hill Lookout',
            extent: [-13634468, 6230537, -13634469, 6230537]
        },
        'Viking Union Gallery': {
            name: 'Viking Union Gallery',
            extent: [-13635129, 6230678, -13635120, 6230678]
        },
        'Viking Union': {
            name: 'Viking Union',
            extent: [-13635129, 6230678, -13635120, 6230678]
        },
        'Visitor Center': {
            name: 'Visitor\'s Center',
            extent: [-13635513, 6228744, -13635514, 6228744]
        },
        'Western Gallery': {
            name: 'Western Gallery',
            extent: [-13634996, 6230087, -13634997, 6230087]
        },
        WWU: {
            name: 'WWU',
            extent: [-13636889, 6228440, -13633110, 6231260]
        }
    };

    departments = {
        ACCT: {
            name: 'Accounting',
            extent: [-13635142, 6229762, -13635143, 6229764]
        },
        AMST: {
            name: 'American Cultural Studies',
            extent: [-13635185, 6230352, -13635186, 6230352]
        },
        ANTH: {
            name: 'Anthropology',
            extent: [-13635038, 6229828, -13635039, 6229828]
        },
        AHI: {
            name: 'Art/Art History',
            extent: [-13634996, 6230087, -13634997, 6230087]
        },
        BIOL: {
            name: 'Biology',
            extent: [-13635190, 6229844, -13635191, 6229844]
        },
        BUSS: {
            name: 'Business & Econ.',
            extent: [-13635140, 6229763, -13635141, 6229763]
        }, //Not sure what the abbrev for Business is
        CAM: {
            name: 'Can/Am Studies',
            extent: [-13635298, 6230510, -13635299, 6230510]
        },
        CHEM: {
            name: 'Chemistry',
            extent: [-13635152, 6229956, -13635153, 6229956]
        },
        CHIN: {
            name: 'Chinese',
            extent: [-13634963, 6230417, -13634964, 6230417]
        },
        COMM: {
            name: 'Communication',
            extent: [-13634990, 6229632, -13634991, 6229632]
        },
        CSD: {
            name: 'Communication Sciences and Disorders',
            extent: [-13635054, 6229519, -13635055, 6229519]
        },
        CSCI: {
            name: 'Computer Science',
            extent: [-13634990, 6229632, -13634991, 6229632]
        },
        DNC: {
            name: 'Dance',
            extent: [-13635140, 6230175, -13635141, 6230175]
        },
        EAST: {
            name: 'East Asian Studies',
            extent: [-13634963, 6230417, -13634964, 6230417]
        },
        ECON: {
            name: 'Economics',
            extent: [-13635140, 6229763, -13635141, 6229763]
        },
        EDUC: {
            name: 'Education',
            extent: [-13634981, 6230231, -13634982, 6230231]
        },
        ETEC: {
            name: 'Engineering Tech.',
            extent: [-13635031, 6229953, -13635032, 6229953]
        },
        ENG: {
            name: 'English',
            extent: [-13634963, 6230417, -13634964, 6230417]
        },
        ESCI: {
            name: 'Environmental Sciences',
            extent: [-13635022, 6229750, -13635023, 6229750]
        },
        ENVS: {
            name: 'Environmental Studies',
            extent: [-13635038, 6229828, -13635039, 6229828]
        },
        FAIR: {
            name: 'Fairhaven College',
            extent: [-13635043, 6229223, -13635044, 6229223]
        },
        FIN: {
            name: 'Finance & Marketing',
            extent: [-13635140, 6229763, -13635141, 6229763]
        },
        FINE: {
            name: 'Fine & Performing Arts',
            extent: [-13635184, 6230526, -13635185, 6230526]
        }, //Not sure what the abbrev is
        FREN: {
            name: 'French',
            extent: [-13634963, 6230417, -13634964, 6230417]
        },
        EGEO: {
            name: 'Geography',
            extent: [-13635038, 6229828, -13635039, 6229828]
        }, // Do we include this, or is it part of ENVS
        GEOl: {
            name: 'Geology',
            extent: [-13635022, 6229750, -13635023, 6229750]
        },
        GERM: {
            name: 'German',
            extent: [-13634963, 6230417, -13634964, 6230417]
        },
        GREK: {
            name: 'Greek',
            extent: [-13634963, 6230417, -13634964, 6230417]
        },
        HIST: {
            name: 'History',
            extent: [-13635074, 6230292, -13635075, 6230292]
        },
        HNRS: {
            name: 'Honors Program',
            extent: [-13635185, 6230352, -13635186, 6230352]
        },
        HSP: {
            name: 'Human Services & Rehabilitation',
            extent: [-13634981, 6230231, -13634982, 6230231]
        },
        HUM: {
            name: 'Humanities/Social Sciences',
            extent: [-13635022, 6229750, -13635023, 6229750]
        },
        HUX: {
            name: 'Huxley College of the Environment',
            extent: [-13635022, 6229750, -13635023, 6229750]
        },
        JAPN: {
            name: 'Japanese',
            extent: [-13634963, 6230417, -13634964, 6230417]
        },
        JOUR: {
            name: 'Journalism',
            extent: [-13634990, 6229632, -13634991, 6229632]
        },
        LAT: {
            name: 'Latin',
            extent: [-13634963, 6230417, -13634964, 6230417]
        },
        LIBR: {
            name: 'Liberal Studies',
            extent: [-13635074, 6230292, -13635075, 6230292]
        },
        LING: {
            name: 'Linguistics',
            extent: [-13634963, 6230417, -13634964, 6230417]
        },
        MGMT: {
            name: 'Management',
            extent: [-13635140, 6229763, -13635141, 6229763]
        },
        MATH: {
            name: 'Math',
            extent: [-13635074, 6230292, -13635075, 6230292]
        },
        LANG: {
            name: 'Modern/Classical Languages',
            extent: [-13634963, 6230417, -13634964, 6230417]
        },
        MUS: {
            name: 'Music',
            extent: [-13635184, 6230526, -13635185, 6230526]
        },
        PHIL: {
            name: 'Philosophy',
            extent: [-13635074, 6230292, -13635075, 6230292]
        },
        PE: {
            name: 'Phys Ed., Health & Rec.',
            extent: [-13635140, 6230175, -13635141, 6230175]
        },
        PHYS: {
            name: 'Physics/Astronomy',
            extent: [-13634990, 6229632, -13634991, 6229632]
        },
        PLSC: {
            name: 'Political Science',
            extent: [-13635038, 6229828, -13635039, 6229828]
        },
        PHLT: {
            name: 'Pre-Health Care',
            extent: [-13634864, 6230503, -13634865, 6230503]
        }, // Not sure the abbrev
        PSY: {
            name: 'Psychology',
            extent: [-13634981, 6230231, -13634982, 6230231]
        },
        RUSS: {
            name: 'Russian',
            extent: [-13634963, 6230417, -13634964, 6230417]
        },
        SCTH: {
            name: 'Science and Tech',
            extent: [-13635074, 6230292, -13635075, 6230292]
        }, //Not sure the abbrev
        SOC: {
            name: 'Sociology',
            extent: [-13635038, 6229828, -13635039, 6229828]
        },
        SPAN: {
            name: 'Spanish',
            extent: [-13634963, 6230417, -13634964, 6230417]
        },
        THTR: {
            name: 'Theatre Arts',
            extent: [-13635184, 6230526, -13635185, 6230526]
        },
        WMNS: {
            name: 'Women\'s Studies',
            extent: [-13634981, 6230231, -13634982, 6230231]
        },
        WWU: {
            name: 'WWU',
            extent: [-13636880, 6228440, -13633110, 6231260]
        }
    };

    services = {
        "Academic Advising": {
            name: 'Academic Advising',
            extent: [-13634864, 6230503, -13634865, 6230503]
        },
        "Associated Students": {
            name: 'Associated Students',
            extent: [-13635119, 6230678, -13635120, 6230678]
        },
        "Athletic Department": {
            name: 'Athletic Department',
            extent: [-13635140, 6230175, -13635141, 6230175]
        },
        "ATUS Academic": {
            name: 'ATUS Help Desk (Academic)',
            extent: [-13635054, 6229519, -13635055, 6229519]
        },
        "ATUS Haggard": {
            name: 'ATUS Help Desk (Haggard)',
            extent: [-13635112, 6230419, -13635113, 6230419]
        },
        Bookstore: {
            name: 'Bookstore',
            extent: [-13635094, 6230623, -13635095, 6230623]
        },
        "Campus Recreation": {
            name: 'Campus Recreation',
            extent: [-13635422, 6229438, -13635423, 6229438]
        },
        "Career Services": {
            name: 'Career Services',
            extent: [-13634864, 6230503, -13634865, 6230503]
        },
        "Service Learning": {
            name: 'Center for Service Learning',
            extent: [-13635075, 6230454, -13635076, 6230454]
        },
        "Copy Services": {
            name: 'Copy Services',
            extent: [-13635112, 6230419, -13635113, 6230419]
        },
        Daycare: {
            name: 'Daycare',
            extent: [-13635117, 6229073, -13635118, 6229073]
        },
        Dining: {
            name: 'Dining/Food Services',
            extent: [-13634796, 6230704, -13634797, 6230704]
        },
        "Disability Resources": {
            name: 'Disability Resources',
            extent: [-13634864, 6230503, -13634865, 6230503]
        },
        "Ethnic Student Center": {
            name: 'Ethnic Student Center',
            extent: [-13635119, 6230678, -13635120, 6230678]
        },
        "Extended Ed": {
            name: 'Extended Ed.',
            extent: [-13635185, 6230352, -13635186, 6230352]
        },
        "Financial Aid": {
            name: 'Financial Aid',
            extent: [-13634864, 6230503, -13634865, 6230503]
        },
        "Graduate School": {
            name: 'Graduate School',
            extent: [-13634864, 6230503, -13634865, 6230503]
        },
        "Health Center": {
            name: 'Health Center',
            extent: [-13635513, 6228744, -13635514, 6228744]
        },
        "Intl Prgrms": {
            name: 'Int\'l Prgrms & Exchanges',
            extent: [-13635185, 6230352, -13635186, 6230352]
        },
        "Intramural Sports": {
            name: 'Intramural Sports',
            extent: [-13635422, 6229438, -13635423, 6229438]
        },
        KUGS: {
            name: 'KUGS 89.3FM',
            extent: [-13635119, 6230678, -13635120, 6230678]
        },
        LGBTA: {
            name: 'LGBTA',
            extent: [-13635119, 6230678, -13635120, 6230678]
        },
        Library: {
            name: 'Library',
            extent: [-13635055, 6230491, -13635056, 6230491]
        },
        "New Student Fam Outreach": {
            name: 'New Student/Fam Outreach',
            extent: [-13634864, 6230503, -13634865, 6230503]
        },
        "Off-Campus Housing": {
            name: 'Off-Campus Housing',
            extent: [-13635119, 6230678, -13635120, 6230678]
        },
        "Outdoor Center": {
            name: 'Outdoor Center',
            extent: [-13635119, 6230678, -13635120, 6230678]
        },
        "Parking Office": {
            name: 'Parking Office',
            extent: [-13635513, 6228744, -13635514, 6228744]
        },
        Registrar: {
            name: 'Registrar',
            extent: [-13634863, 6230503, -13634865, 6230503]
        },
        "Scholarship Center": {
            name: 'Scholarship Center',
            extent: [-13634864, 6230503, -13634865, 6230503]
        },
        SPAN: {
            name: 'SPAN',
            extent: [-13634864, 6230503, -13634865, 6230503]
        },
        "Student Employment": {
            name: 'Student Employment',
            extent: [-13634864, 6230503, -13634865, 6230503]
        },
        "Summer Session": {
            name: 'Summer Session',
            extent: [-13635185, 6230352, -13635186, 6230352]
        },
        "Testing Center": {
            name: 'Testing Center',
            extent: [-13634864, 6230503, -13634865, 6230503]
        },
        "Tutorial Center": {
            name: 'Tutorial Center',
            extent: [-13634864, 6230503, -13634865, 6230503]
        },
        "University Residences": {
            name: 'University Residences',
            extent: [-13634796, 6230704, -13634797, 6230704]
        },
        "Veterans Affairs": {
            name: 'Veteran\'s Affairs',
            extent: [-13635119, 6230678, -13635120, 6230678]
        },
        "Visitor Information": {
            name: 'Visitor Information',
            extent: [-13635513, 6228744, -13635514, 6228744]
        },
        "Western Front": {
            name: 'Western Front',
            extent: [-13634990, 6229632, -13634991, 6229632]
        },
        "Womens Center": {
            name: 'Women\'s Center',
            extent: [-13635119, 6230678, -13635120, 6230678]
        }
    };

    function addStaticFeatures() {
        var weatherLayer = new esri.layers.GraphicsLayer();
        var weather_point = new esri.geometry.Point(-13635065, 6229757, map.spatialReference);
        var weather_symbol = new esri.symbol.PictureMarkerSymbol({
            "url": 'assets/images/icons/weather_orange30.png',
            "width": 20,
            "height": 20
        });
        var weather_graphic = new esri.Graphic(weather_point, weather_symbol);
        map.addLayer(weatherLayer);
        weatherLayer.setInfoTemplate(new esri.InfoTemplate('Huxley Weather Station', '<img src="http://weather.huxley.wwu.edu/webfiles/summary.jpg"/><br /> <a href="http://weather.huxley.wwu.edu/webfiles/Env_Studies_WWU.htm">Huxley Weather Dashboard</a>'));
        weatherLayer.hide();
        weatherLayer.add(weather_graphic);

        var cameraLayer = new esri.layers.GraphicsLayer();
        var camera_point = new esri.geometry.Point(-13635034, 6230273, map.spatialReference);
        var camera_symbol = new esri.symbol.PictureMarkerSymbol({
            "url": 'assets/images/icons/camera_black_30.png',
            "width": 18,
            "height": 18
        });
        var camera_graphic = new esri.Graphic(camera_point, camera_symbol);
        cameraLayer.hide();
        map.addLayer(cameraLayer);

        // Still need ie method + stop stream when hidden
        var theDate = new Date(),
			webcam_ie = '<img src="http://140.160.161.198/jpg/image.jpg?resolution=320x240"/></br>At this time, Internet Explorer only supports still images.  If you would like to see the streaming video, try a different browser.',
			webcam_other = '<img id="webcam_image" src="http://140.160.161.198/axis-cgi/mjpg/video.cgi?resolution=320x240&dummy=' + theDate.getTime().toString(10) + '" height="240" width="320" alt="Camera Image">';
        if ("ActiveXObject" in window) {
			cameraLayer.setInfoTemplate(new esri.InfoTemplate("Viking View Webcam", webcam_ie));
		} else {
			cameraLayer.setInfoTemplate(new esri.InfoTemplate("Viking View Webcam", webcam_other));
		}
        cameraLayer.add(camera_graphic);

        var sehomeLayer = new esri.layers.GraphicsLayer();
        var sehome_point = new esri.geometry.Point(-13634469, 6230537, map.spatialReference);
        var sehome_symbol = new esri.symbol.PictureMarkerSymbol({
            "url": 'assets/images/icons/Lookout-Tower-48.png',
            "width": 20,
            "height": 20
        });
        var sehome_graphic = new esri.Graphic(sehome_point, sehome_symbol);
        sehomeLayer.hide();
        map.addLayer(sehomeLayer);
        sehomeLayer.setInfoTemplate(new esri.InfoTemplate('Sehome Hill Lookout', '<img src="http://www.wwu.edu/map/assets/images/buildings/thumbs/sehometower.jpg">'));
        sehomeLayer.add(sehome_graphic);

        dojo.connect(map, 'onZoomEnd', function (extent, zoomFactor, anchor, level) {
            if (level === 0) {
                sehomeLayer.hide();
                cameraLayer.hide();
                weatherLayer.hide();
            } else {
                sehomeLayer.show();
                cameraLayer.show();
                weatherLayer.show();
            }
        });

        dojo.connect(weatherLayer, "onClick", function () {
            map.infoWindow.resize(405, 320);
        });

        dojo.connect(cameraLayer, "onClick", function () {
            map.infoWindow.resize(335, 330);
        });

        dojo.connect(sehomeLayer, "onClick", function () {
            map.infoWindow.resize(318, 380);
        });

    }

    //Populate Menus
    function populateMenus() {
        var building_menu = dojo.byId('buildings_select_box'),
            places_menu = dojo.byId('places_select_box'),
            services_menu = dojo.byId('services_select_box'),
            departments_menu = dojo.byId('departments_select_box'),
            key, div;

        function zoom_to(key, collection) {
            var extentListener = dojo.connect(map, "onExtentChange", function () {
                map.setLevel(4);
                dojo.disconnect(extentListener);
            });
            map.setExtent(new esri.geometry.Extent({
                "xmin": collection[key].extent[0],
                "ymin": collection[key].extent[1],
                "xmax": collection[key].extent[2],
                "ymax": collection[key].extent[3],
                "spatialReference": {
                    "wkid": 102100
                }
            }), false);
        }

        for (key in buildings) {
            if (buildings.hasOwnProperty(key)) {
				div = dojo.create('div', {
					innerHTML: buildings[key].name,
					className: "menu_item"
				}, building_menu);
				dojo.connect(div, 'onclick', dojo.partial(zoom_to, key, buildings));
			}
        }
        for (key in places) {
            if (places.hasOwnProperty(key)) {
				div = dojo.create('div', {
					innerHTML: places[key].name,
					className: "menu_item"
				}, places_menu);
				dojo.connect(div, 'onclick', dojo.partial(zoom_to, key, places));
			}
        }
        for (key in services) {
			if (services.hasOwnProperty(key)) {
				div = dojo.create('div', {
					innerHTML: services[key].name,
					className: "menu_item"
				}, services_menu);
				dojo.connect(div, 'onclick', dojo.partial(zoom_to, key, services));
			}
        }
        for (key in departments) {
			if (departments.hasOwnProperty(key)) {
				div = dojo.create('div', {
					innerHTML: departments[key].name,
					className: "menu_item"
				}, departments_menu);
				dojo.connect(div, 'onclick', dojo.partial(zoom_to, key, departments));
			}
		}
    }

    function getURLParameter(name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)')
            .exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
    }

    function initURL() {
        // Load building extent arrays
        var extent,
        building,
        extentParts,
		features,
		feature_list,
        url = window.location.search.slice(1);

        params = dojo.map(url.split('&'), function (param) {
            return param.split('=');
        });

        dojo.some(params, function (param, i) {
            if (param[0] === "param2") {
                params.splice(i, 1);
                return true;
            }
        });

        // Get building parameter
        building = getURLParameter('building');

        // Get extent parameter
        extent = getURLParameter('extent');
        if (extent) {
            extentParts = extent.split(',');
        }
		
		features = getURLParameter('features');
		if (features) {
            feature_list = features.split(',');
			for (var i=0; i<feature_list.length; i++) {
				if (feature_list[i].toLowerCase() === 'accessibility') {
					dojo.byId('chk_accessibility').checked = true;
					turnLayersOn(groupLayers.accessibility);
				} 
				else if (feature_list[i].toLowerCase() === 'tour') {
					dojo.byId('chk_artwalk').checked = true;
					turnLayersOn(groupLayers.tour);
				}
				else if (feature_list[i].toLowerCase() === 'transportation') {
					dojo.byId('chk_transportation').checked = true;
					turnLayersOn(groupLayers.transportation);
				}
				else if (feature_list[i].toLowerCase() === 'computers') {
					dojo.byId('chk_computerlabs').checked = true;
					turnLayersOn(groupLayers.atus);
				}
				else if (feature_list[i].toLowerCase() === 'construction') {
					dojo.byId('chk_construction').checked = true;
					turnLayersOn(groupLayers.construction);
				}
				else if (feature_list[i].toLowerCase() === 'emergency') {
					dojo.byId('chk_emergency').checked = true;
					turnLayersOn(groupLayers.emergency);
				}
				else if (feature_list[i].toLowerCase() === 'dining') {
					dojo.byId('chk_food').checked = true;
					turnLayersOn(groupLayers.dining);
				}
				else if (feature_list[i].toLowerCase() === 'parking') {
					dojo.byId('chk_parking').checked = true;
					turnLayersOn(groupLayers.parking);
				}
				else if (feature_list[i].toLowerCase() === 'sustainability') {
					turnLayersOn(groupLayers.sustainability);
				}
			}
        }
		
		

        if (extent) {
            for (var key in buildings) {
                if (buildings[key].extent[0] == extentParts[0] && buildings[key].extent[1] == extentParts[1] && buildings[key].extent[2] == extentParts[2] && buildings[key].extent[3] == extentParts[3]) {
                    var extentListener = dojo.connect(map, "onExtentChange", function () {
                        map.setLevel(4);
                        dojo.disconnect(extentListener);
                    });
                    map.setExtent(new esri.geometry.Extent({
                        "xmin": extentParts[0],
                        "ymin": extentParts[1],
                        "xmax": extentParts[2],
                        "ymax": extentParts[3],
                        "spatialReference": {
                            "wkid": 102100
                        }
                    }), false);


                    //change url if extent matches building extent
                    if (window.history.pushState) {
                        var params = window.history.pushState(null, null, "?building=" + key);
                    }

                }
            }

        } else if (building) {
            if (buildings[building]) {
                var extentListener = dojo.connect(map, "onExtentChange", function () {
                    map.setLevel(4);
                    dojo.disconnect(extentListener);
                });
                map.setExtent(new esri.geometry.Extent({
                    "xmin": buildings[building].extent[0],
                    "ymin": buildings[building].extent[1],
                    "xmax": buildings[building].extent[2],
                    "ymax": buildings[building].extent[3],
                    "spatialReference": {
                        "wkid": 102100
                    }
                }), false);
            }
        }
    }

    function initOperationalLayer() {

        var parking_annotation = new esri.layers.ArcGISTiledMapServiceLayer("http://140.160.114.190/arcgis/rest/services/WWU/Parking/MapServer", {
            id: "parking annotation",
            visible: false
        });
		
		function addConstructionPoints() {
			dojo.xhrGet({
				url:"//www.wwu.edu/construction/feed",
				handleAs:"json",
				load: function(data){
					var projects = data.alerts;
					for (var project in projects){
						if (projects.hasOwnProperty(project)){
							var prj = projects[project];
							
							// Parse geometry
							if (typeof prj.drawn_geometry[0] != 'undefined' && prj.drawn_geometry[0] != null) {
								var geom = prj.drawn_geometry[0].split(', ');
								var lat = geom[0];
								var lng = geom[1];
							} else if (typeof prj.building_geometry[0] != 'undefined' && prj.building_geometry[0] != null) {
								var geom = prj.building_geometry[0].split(', ');
								var lat = geom[0];
								var lng = geom[1];
							} else {
								//No geometry, so we skip this one.
								continue
							}
							
							// Convert array of strings to array of ints and get the maximum value
							var size = Math.max.apply(null, prj.significance.map(function(e) { return parseInt(e, 10)}));
							var symbol_size;
							switch(size)
								{
								case 1:
									symbol_size = 12
									break;
								case 2:
									symbol_size = 16
									break;
								case 3:
									symbol_size = 20
									break;
								default:
									symbol_size = 12
								}
							
							// Build content from name and description
							var html = "";
							for (var i=0; i < prj.name.length; i++) {
								html += "<p>";
								html += prj.name[i];
								html += "<br />";
								html += prj.description[i];
								html += "</p>";
							}
							
							//Add to map here
							var wgs_point = new esri.geometry.Point(lng, lat, new esri.SpatialReference({ wkid: 4326 }));
							var construction_point = esri.geometry.geographicToWebMercator(wgs_point);
							var construction_symbol = new esri.symbol.SimpleMarkerSymbol(
									esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE,
									symbol_size, 
									new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255,170,0]), 1),
									new dojo.Color([255,170,0])
							);	
							var point = new esri.Graphic(construction_point, construction_symbol, {"title" : project, "content" : html});
							construction.add(point);
						}
					}
				}
			});
		}
			
		var construction = new esri.layers.GraphicsLayer({
				id: "Construction Sites",
				visible: false
		});
		construction.setInfoTemplate(new esri.InfoTemplate("${title} Construction","${content}"));
		
		dojo.connect(map, 'onZoomEnd', function (extent, zoomFactor, anchor, level) {
            if (level === 0) {
                construction.hide();
            } else {
                construction.show();
            }
        });
		
		addConstructionPoints();

        var atus = new esri.layers.FeatureLayer("http://140.160.114.190/arcgis/rest/services/WWU/Features/MapServer/9", {
            id: "Computer Labs",
            mode: esri.layers.FeatureLayer.MODE_SNAPSHOT,
            outFields: ['building', 'room', 'seats', 'lab_locati'],
            visible: false,
            infoTemplate: new esri.InfoTemplate('${building}: Computer Lab', '<strong>Room Number: </strong>${room}<br /><strong>Seats: </strong>${seats}<br /><strong><br /> <a href="http://www.wwu.edu/atus">ATUS</a></strong>')
        });
		atus.setRenderer(new esri.renderer.SimpleRenderer(new esri.symbol.PictureMarkerSymbol({
            "url": 'assets/images/icons/computer_purple30.png',
            "width": 10,
            "height": 10})
		));

        var sculptures = new esri.layers.FeatureLayer("http://140.160.114.190/arcgis/rest/services/WWU/Features/MapServer/6", {
            id: "Campus Sculptures",
            mode: esri.layers.FeatureLayer.MODE_SNAPSHOT,
            outFields: ['name', 'artist', 'year', 'combo'],
            visible: false,
            infoTemplate: new esri.InfoTemplate('${name}', 'Created by ${artist} in ${year}<br /> <br /><div class="popup_photo" style="text-align:center"><img style="max-width: 100%" width="280px" src="${combo}"/></div>')
        });
		
		sculptures.setRenderer(new esri.renderer.SimpleRenderer(new esri.symbol.PictureMarkerSymbol({
            "url": 'assets/images/icons/star_yellow-black30.png',
            "width": 10,
            "height": 10})
		));

        var artWalkSymbol = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_DASH, new dojo.Color([255, 0, 0]), 1);
        var artWalkRenderer = new esri.renderer.SimpleRenderer(artWalkSymbol);

        var artWalk = new esri.layers.FeatureLayer("http://140.160.114.190/arcgis/rest/services/WWU/Features/MapServer/7", {
            id: "Campus Sculpture Tour",
            mode: esri.layers.FeatureLayer.MODE_SNAPSHOT,
            visible: false
        });
        artWalk.setRenderer(artWalkRenderer);

        var bus_stops = new esri.layers.FeatureLayer("http://140.160.114.190/arcgis/rest/services/WWU/Features/MapServer/23", {
            id: "Bus Stops",
            mode: esri.layers.FeatureLayer.MODE_SNAPSHOT,
            outFields: ['point_name', 'shelter', 'bench'],
            visible: false,
            infoTemplate: new esri.InfoTemplate('WTA Bus Stop', '<a href="http://www.ridewta.com/">Bus Schedule Information</a>')
        });
		
		bus_stops.setRenderer(new esri.renderer.SimpleRenderer(new esri.symbol.PictureMarkerSymbol({
            "url": 'assets/images/icons/bus_brown30.png',
            "width": 10,
            "height": 10})
		));

        var bike_racks = new esri.layers.FeatureLayer("http://140.160.114.190/arcgis/rest/services/WWU/Features/MapServer/24", {
            id: "Bike Racks",
            mode: esri.layers.FeatureLayer.MODE_SNAPSHOT,
            outFields: ['cover', 'spots'],
            visible: false,
            infoTemplate: new esri.InfoTemplate('Bike Rack', '<a href="http://www.wwu.edu/transportation/docs/2011BikeMap_Poster_HiResolution.pdf">Campus Bike Routes</a><br />')
        });

        bike_racks.setRenderer(new esri.renderer.SimpleRenderer(new esri.symbol.PictureMarkerSymbol({
            "url": 'assets/images/icons/parking_bike_green30.png',
            "width": 10,
            "height": 10})
		));

        // Accessibility

        var accessible_doors = new esri.layers.FeatureLayer("http://140.160.114.190/arcgis/rest/services/WWU/Features/MapServer/1", {
            id: "Automatic Doors",
            mode: esri.layers.FeatureLayer.MODE_SNAPSHOT,
            outFields: ['building', 'floor'],
            visible: false
        });
		
		accessible_doors.setRenderer(new esri.renderer.SimpleRenderer(new esri.symbol.PictureMarkerSymbol({
            "url": 'assets/images/icons/acc_door_blue-white30.png',
            "width": 10,
            "height": 10
        })));

        var accessible_parking = new esri.layers.FeatureLayer("http://140.160.114.190/arcgis/rest/services/WWU/Features/MapServer/2", {
            id: "Accessible Parking",
            mode: esri.layers.FeatureLayer.MODE_SNAPSHOT,
            outFields: ['*'],
            visible: false
        });

        accessible_parking.setRenderer(new esri.renderer.SimpleRenderer(new esri.symbol.PictureMarkerSymbol({
            "url": 'assets/images/icons/parking_acc_blue30.png',
            "width": 10,
            "height": 10
        })));

        var accessible_restrooms = new esri.layers.FeatureLayer("http://140.160.114.190/arcgis/rest/services/WWU/Features/MapServer/3", {
            id: "Accessible Restrooms",
            mode: esri.layers.FeatureLayer.MODE_SNAPSHOT,
            outFields: ['*'],
            visible: false
        });
		
		accessible_restrooms.setRenderer(new esri.renderer.SimpleRenderer(new esri.symbol.PictureMarkerSymbol({
            "url": 'assets/images/icons/acc_bath_teal30.png',
            "width": 10,
            "height": 10
        })));

        var emergency_phones = new esri.layers.FeatureLayer("http://140.160.114.190/arcgis/rest/services/WWU/Features/MapServer/14", {
            id: "Emergency Phones",
            mode: esri.layers.FeatureLayer.MODE_SNAPSHOT,
            outFields: ['latitude', 'longitude', 'type', 'location'],
            visible: false,
            infoTemplate: new esri.InfoTemplate('Emergency Phone', '${latitude} ${longitude}</br>${location}')
        });
		
		emergency_phones.setRenderer(new esri.renderer.SimpleRenderer(new esri.symbol.PictureMarkerSymbol({
            "url": 'assets/images/icons/phone_1_red30.png',
            "width": 10,
            "height": 10
        })));


        var routesSymbol = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_DASH, new dojo.Color([0, 0, 255]), 1);
        var routesRenderer = new esri.renderer.SimpleRenderer(routesSymbol);

        var accessible_routes = new esri.layers.FeatureLayer("http://140.160.114.190/arcgis/rest/services/WWU/Features/MapServer/4", {
            id: "Accessible Routes",
            mode: esri.layers.FeatureLayer.MODE_SNAPSHOT,
            outFields: ['name'],
            visible: false
        });
        accessible_routes.setRenderer(routesRenderer);

        // Food

        var residential_dining = new esri.layers.FeatureLayer("http://140.160.114.190/arcgis/rest/services/WWU/Features/MapServer/16", {
            id: "Resident Dining",
            mode: esri.layers.FeatureLayer.MODE_SNAPSHOT,
            outFields: ['name', 'building', 'name', 'wwu_link', 'todaysmenu'],
            visible: false,
            infoTemplate: new esri.InfoTemplate("${name}", '<a href="${todaysmenu}">Today\'s Menu</a><br /><a href="${wwu_link}">Dining Information</a>')
        });
		
		residential_dining.setRenderer(new esri.renderer.SimpleRenderer(new esri.symbol.PictureMarkerSymbol({
            "url": 'assets/images/icons/food_fork_tan30.png',
            "width": 10,
            "height": 10
        })));

        var retail_dining = new esri.layers.FeatureLayer("http://140.160.114.190/arcgis/rest/services/WWU/Features/MapServer/17", {
            id: "Retail Dining",
            mode: esri.layers.FeatureLayer.MODE_SNAPSHOT,
            outFields: ['name', 'building', 'open', 'goods', 'locations', 'abbrev', 'wwu_link'],
            visible: false,
            infoTemplate: new esri.InfoTemplate("${name}", '${locations}</br>${goods}</br><a href="${wwu_link}">Dining Information</a>')
        });
		
		retail_dining.setRenderer(new esri.renderer.SimpleRenderer(new esri.symbol.PictureMarkerSymbol({
            "url": 'assets/images/icons/food_coffee_tan30.png',
            "width": 10,
            "height": 10
        })));

        // Parking

        var motorcycle_parking = new esri.layers.FeatureLayer("http://140.160.114.190/arcgis/rest/services/WWU/Features/MapServer/20", {
            id: "Motorcycle Parking",
            mode: esri.layers.FeatureLayer.MODE_SNAPSHOT,
            outFields: ['objectid'],
            visible: false
        });

        motorcycle_parking.setRenderer(new esri.renderer.SimpleRenderer(new esri.symbol.PictureMarkerSymbol({
            "url": 'assets/images/icons/parking_scooter_purple30.png',
            "width": 10,
            "height": 10
        })));

        var parking_paystations = new esri.layers.FeatureLayer("http://140.160.114.190/arcgis/rest/services/WWU/Features/MapServer/21", {
            id: "Parking Paystations",
            mode: esri.layers.FeatureLayer.MODE_SNAPSHOT,
            outFields: ['objectid'],
            visible: false
        });
		
		parking_paystations.setRenderer(new esri.renderer.SimpleRenderer(new esri.symbol.PictureMarkerSymbol({
            "url": 'assets/images/icons/parking_pay_green30.png',
            "width": 10,
            "height": 10
        })));
		
		function prepareSustainabilityTemplate(data) {
            var content = "";
			map.infoWindow.resize(315, 400);
			if (data.attributes.photo_url) {
				content += '<img width="285px" img src="' + data.attributes.photo_url + '"/><br />';
			}
			if (data.attributes.description) {
				dojo.forEach(data.attributes.description.split('|'), function (description_part) {
                    content += description_part + "<br />";
                });
			}
			if (data.attributes.link_url_1) {
				content += '<br /><a href="' + data.attributes.link_url_1 + '">' + data.attributes.link_url_1 + '</a><br /><br />';
			}
			if (data.attributes.link_url_2) {
				content += '<a href="' + data.attributes.link_url_2 + '">' + data.attributes.link_url_2 + '</a><br /><br />';
			}
			if (data.attributes.link_url_3) {
				content += '<a href="' + data.attributes.link_url_3 + '">' + data.attributes.link_url_3 + '</a><br /><br />';
			}
            
            return content;
        }
		
		//Sustainability
		var sustainability = new esri.layers.FeatureLayer("http://140.160.114.190/arcgis/rest/services/WWU/Features/MapServer/26", {
            id: "Sustainability",
            mode: esri.layers.FeatureLayer.MODE_SNAPSHOT,
            outFields: ['*'],
            visible: false,
			infoTemplate: new esri.InfoTemplate("${featurename}", prepareSustainabilityTemplate)
        });

        function prepareParkingTemplate(data) {
            var content = "Use Type: " + data.attributes.use_type + "<br />";
            map.infoWindow.resize(250, 150);
            content += "Lot Number: " + data.attributes.lot_num + "<br />";
            content += "Pay Station: " + (data.attributes.pay_station === 'Y' ? "Yes" : "No") + "<br />";
            content += "Motorcycle Spots: " + (data.attributes.motorcycle === 'Y' ? "Yes" : "No") + "<br />";
            content += "Carpool Spots: " + (data.attributes.carpool === 'Y' ? "Yes" : "No") + "<br />";
            content += "More Info: <a href='https://www.ps.wwu.edu/parking'>Parking Services</a>";
            return content;
        }


        var parking_lots = new esri.layers.FeatureLayer("http://140.160.114.190/arcgis/rest/services/WWU/Parking/MapServer/8", {
            id: "Parking Lots",
            mode: esri.layers.FeatureLayer.MODE_SNAPSHOT,
            outFields: ['lot_num', 'meters', 'carpool', 'pay_statio', 'motorcycle', 'use_num', 'use_type', 'main_use'],
            visible: false,
            opacity: 0,
            infoTemplate: new esri.InfoTemplate("Parking: ${lot_num} Lot", prepareParkingTemplate)
        });
        parking_lots.setMaxAllowableOffset(6);

        function prepareBuildingTemplate(data) {
            var content = '<div class="popup_photo" style="text-align:center"><a href="' + data.attributes.web_page + '"><img width="285px" img src="' + data.attributes.thumbs + '"/></a></div> <br />';
            if (data.attributes.name.length <= 1) {
				map.infoWindow.resize(200, 125);
				return "No Building Information Available";
			}
			map.infoWindow.resize(315, 400);
            if (data.attributes.services2) {
                content += "<strong>Services:</strong><br />";
                dojo.forEach(data.attributes.services2.split(';'), function (service) {
                    content += service + "<br />";
                });
            }

            if (data.attributes.depts2) {
                content += "<strong>Departments:</strong><br />";
                dojo.forEach(data.attributes.depts2.split(';'), function (dept) {
                    content += dept + "<br />";
                });
            }
            if (data.attributes.food.length > 1) {
				content += "<strong>Food:</strong><br />" + data.attributes.food + "<br />";
            }
            content += '<a href="' + data.attributes.web_page + '">More Info</a>';
            return content;
        }


        var building_feature = new esri.layers.FeatureLayer("http://140.160.114.190/arcgis/rest/services/WWU/Basemap_Summer13/MapServer/35", {
            id: "Building Features",
            mode: esri.layers.FeatureLayer.MODE_SNAPSHOT,
            outFields: ['depts2', 'abbrev', 'name', 'thumbs', 'services2', 'food', 'web_page'],
            visible: true,
            opacity: 0,
            infoTemplate: new esri.InfoTemplate("${name} (${abbrev})", prepareBuildingTemplate)
        });
        building_feature.setMaxAllowableOffset(6);

        dojo.connect(sculptures, "onClick", function () {
            map.infoWindow.resize(325, 375);
        });
		
		dojo.connect(construction, "onClick", function () {
			map.infoWindow.resize(450, 375);
        });
        
		dojo.connect(map, 'onLayersAddResult', function() {
			//If checkboxes are checked at load, because of the back/forward buttons, make sure to turn the layers on
			var checkboxes = document.getElementById('features_select_box').getElementsByTagName('input');
			for (var i=0; i < checkboxes.length; i++) {
				if (checkboxes[i].checked) {
					turnLayersOn(groupLayers[checkboxes[i].value]);
				}
			}
		});
		
		//Order matters for infoWindow popup priority.  For example, if a construction point sits on top of the building, we want the construction popup to show up instead of the building popup, so, construction needs to go after building_feature.
		map.addLayers([parking_lots,building_feature,construction,parking_annotation,parking_paystations,motorcycle_parking,artWalk,sculptures,atus,residential_dining,retail_dining,bus_stops,bike_racks,accessible_routes,accessible_doors,accessible_restrooms,emergency_phones,accessible_parking,sustainability]);

        //Layer checkbox listeners
		var checkboxes = document.getElementById('features_select_box').getElementsByTagName('input');
		for (var i=0; i < checkboxes.length; i++) {
			dojo.connect(checkboxes[i], 'onchange', toggleCheckBoxes);
		}
		
		function toggleCheckBoxes(){
			var onLayers = [];
			var toggleLayers = groupLayers[this.value].slice(0);
			
			if (this.checked === true) {
					turnLayersOn(toggleLayers);
			} else {
				for (var i=0; i < checkboxes.length; i++) {
					if (checkboxes[i].checked === true && checkboxes[i].value !== this.value) {
						onLayers = onLayers.concat(groupLayers[checkboxes[i].value]);
					}
				}
				
				var j = checkboxes.length;
				while (j--) {
					if (dojo.indexOf(onLayers, toggleLayers[j]) > -1){
						toggleLayers.splice(j,1);
					}
				}
				turnLayersOff(toggleLayers);
			}
		}
		
	}
	
	function turnLayersOn(layers){
		if (map.getLevel() === 0) {
			var zoomend = dojo.connect(map, 'onZoomEnd', function () {
				for (var i=0; i < layers.length; i++) {
					map.getLayer(layers[i]).show();
				}
				dojo.disconnect(zoomend);
			});
			map.setLevel(1);
		} else {
			for (var i=0; i < layers.length; i++) {
				map.getLayer(layers[i]).show();
			}
		}
	}
	
	function turnLayersOff(layers){
		for (var i=0; i < layers.length; i++) {
			map.getLayer(layers[i]).hide();
		}
	}
	

    function init() {
        var initExtent = new esri.geometry.Extent({
            "xmin": -13639724,
            "ymin": 6228485,
            "xmax": -13630515,
            "ymax": 6230961,
            "spatialReference": {
                "wkid": 102100
            }
        }),
            lods = [{
                "level": 15,
                "resolution": 4.77731426794937,
                "scale": 18055.954822
            }, {
                "level": 16,
                "resolution": 2.38865713397468,
                "scale": 9027.977411
            }, {
                "level": 17,
                "resolution": 1.19432856685505,
                "scale": 4513.988705
            }, {
                "level": 18,
                "resolution": 0.597164283559817,
                "scale": 2256.994353
            }, {
                "level": 19,
                "resolution": 0.298582141647617,
                "scale": 1128.497176
            }],
            basemap_streets = new esri.layers.ArcGISTiledMapServiceLayer("http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer", {
                displayLevels: [17, 18, 19]
            }),
            basemap_nat_geo = new esri.layers.ArcGISTiledMapServiceLayer("http://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer", {
                displayLevels: [15, 16]
            }),
            basemap_wwu = new esri.layers.ArcGISTiledMapServiceLayer("http://140.160.114.190/arcgis/rest/services/WWU/Basemap_Summer13/MapServer"),
            symbol_zoom = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 198, 30]), 2), new dojo.Color([0, 131, 214, 0.58]));

        esri.config.defaults.map.zoomSymbol = symbol_zoom.toJson();
        
        map = new esri.Map("map", {
            wrapAround180: true,
            logo: false,
			sliderStyle: 'small',
            showAttribution: false,
            lods: lods,
            extent: initExtent,
            "fadeOnZoom": true,
            "force3DTransforms": true,
            "navigationMode": "css-transforms"
        });

        map.addLayer(basemap_streets);
        map.addLayer(basemap_nat_geo);
        map.addLayer(basemap_wwu);
        dojo.connect(map, 'onLoad', function (theMap) {
            //resize the map when the browser resizes
            dojo.connect(window, 'resize', map, map.resize);
        });
		dojo.connect(window, 'resize', map, function(){
			dojo.byId('legend').style.maxHeight = dojo.contentBox(dojo.byId('map')).h -15 + 'px';
		});

        dojo.connect(map, 'onLoad', function () {
            var scalebar = new esri.dijit.Scalebar({
                map: map,
                Unit: 'english'
            });
        });
		
		//Change webcam source to null to prevent downloading in the background
		dojo.connect(map.infoWindow, 'onHide', function(){
			if (dojo.byId('webcam_image')){
				var web_img = dojo.byId('webcam_image');
				dojo.attr(web_img, 'src', '');
			};
        });

        populateMenus();
        dojo.connect(map, "onLoad", initOperationalLayer);
        dojo.connect(map, "onLoad", addStaticFeatures);
        dojo.connect(map, "onLoad", initURL);
		
        //Setup listeners for map controls/*
		
		dojo.connect(dojo.byId('button_features'), 'onclick', function(event) {
			var menu = dojo.byId('features_select_box'),
				arrow = dojo.query("> span", 'button_features');	
			if (menu.style.display === 'block') {
				arrow.removeClass('arrow-up').addClass('arrow-down');
				menu.style.display = 'none';
			} else {
				arrow.removeClass('arrow-down').addClass('arrow-up');
				menu.style.display = 'block';
			}
		});
		
		dojo.connect(dojo.byId('button_buildings'), 'onclick', function(event) {
			var menu = dojo.byId('buildings_select_box'),
				arrow = dojo.query("> span", 'button_buildings');	
			if (menu.style.display === 'block') {
				arrow.removeClass('arrow-up').addClass('arrow-down');
				menu.style.display = 'none';
			} else {
				arrow.removeClass('arrow-down').addClass('arrow-up');
				menu.style.display = 'block';
			}
		});
		
		dojo.connect(dojo.byId('button_services'), 'onclick', function(event) {
			var menu = dojo.byId('services_select_box'),
				arrow = dojo.query("> span", 'button_services');	
			if (menu.style.display === 'block') {
				arrow.removeClass('arrow-up').addClass('arrow-down');
				menu.style.display = 'none';
			} else {
				arrow.removeClass('arrow-down').addClass('arrow-up');
				menu.style.display = 'block';
			}
		});
		
		dojo.connect(dojo.byId('button_places'), 'onclick', function(event) {
			var menu = dojo.byId('places_select_box'),
				arrow = dojo.query("> span", 'button_places');	
			if (menu.style.display === 'block') {
				arrow.removeClass('arrow-up').addClass('arrow-down');
				menu.style.display = 'none';
			} else {
				arrow.removeClass('arrow-down').addClass('arrow-up');
				menu.style.display = 'block';
			}
		});
		
		dojo.connect(dojo.byId('button_departments'), 'onclick', function(event) {
			var menu = dojo.byId('departments_select_box'),
				arrow = dojo.query("> span", 'button_departments');	
			if (menu.style.display === 'block') {
				arrow.removeClass('arrow-up').addClass('arrow-down');
				menu.style.display = 'none';
			} else {
				arrow.removeClass('arrow-down').addClass('arrow-up');
				menu.style.display = 'block';
			}
		});
		
		dojo.connect(dojo.byId('button_legend'), 'onclick', function(event) {
			var menu = dojo.byId('legend'),
				button = dojo.byId('button_legend'),
				arrow = dojo.query("> span", 'button_legend');	
			if (menu.style.display === 'block') {
				menu.style.display = 'none';
				button.innerHTML = "Legend<span class='arrow-down'></span>";
			} else {
				menu.style.display = 'block';
				menu.style.maxHeight = dojo.contentBox(dojo.byId('map')).h -15 + 'px';
				button.innerHTML = "Close Legend<span class='arrow-up'></span>";
			}
		});
		
		dojo.connect(map.infoWindow,"onShow",function() {
			dojo.query("> span", 'button_features').removeClass('arrow-up').addClass('arrow-down');
			dojo.byId('features_select_box').style.display = 'none';
			dojo.query("> span", 'button_buildings').removeClass('arrow-up').addClass('arrow-down');
			dojo.byId('buildings_select_box').style.display = 'none';
			dojo.query("> span", 'button_services').removeClass('arrow-up').addClass('arrow-down');
			dojo.byId('services_select_box').style.display = 'none';
			dojo.query("> span", 'button_places').removeClass('arrow-up').addClass('arrow-down');
			dojo.byId('places_select_box').style.display = 'none';
			dojo.query("> span", 'button_departments').removeClass('arrow-up').addClass('arrow-down');
			dojo.byId('departments_select_box').style.display = 'none';
			dojo.query("> span", 'button_legend').removeClass('arrow-up').addClass('arrow-down');
			dojo.byId('legend').style.display = 'none';
		});
		
		dojo.connect(document, 'onclick', function(event) {
			if (event.target.id !== 'button_features' && event.target.id !== '' && event.target.id.substring(0,3) !== 'chk') {
				dojo.query("> span", 'button_features').removeClass('arrow-up').addClass('arrow-down');
				dojo.byId('features_select_box').style.display = 'none';
			}
			if (event.target.id !== 'button_buildings') {
				dojo.query("> span", 'button_buildings').removeClass('arrow-up').addClass('arrow-down');
				dojo.byId('buildings_select_box').style.display = 'none';
			}
			if (event.target.id !== 'button_services') {
				dojo.query("> span", 'button_services').removeClass('arrow-up').addClass('arrow-down');
				dojo.byId('services_select_box').style.display = 'none';
			}
			if (event.target.id !== 'button_places') {
				dojo.query("> span", 'button_places').removeClass('arrow-up').addClass('arrow-down');
				dojo.byId('places_select_box').style.display = 'none';
			}
			if (event.target.id !== 'button_departments') {
				dojo.query("> span", 'button_departments').removeClass('arrow-up').addClass('arrow-down');
				dojo.byId('departments_select_box').style.display = 'none';
			}
			if (event.target.id !== 'button_legend') {
				dojo.byId('legend').style.display = 'none';
				dojo.byId('button_legend').innerHTML = "Legend<span class='arrow-down'></span>";
			}
		});
		
    } // End Init


    dojo.addOnLoad(init);
}());