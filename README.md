# Western Washington University Interactive Map

## Data collection, standardization, and cleanup

## Cartography

Map tiles are generated using Mapbox's Tilemill.  Tilemill can be downloaded at [https://www.mapbox.com/tilemill/](https://www.mapbox.com/tilemill/).

Stylesheets are written in CartoCSS.  CartoCSS is a A CSS like language used to generate map styles.  A reference guide to CartoCSS can be found at [https://www.mapbox.com/carto/api/2.3.0/](https://www.mapbox.com/carto/api/2.3.0/).

## Map

The map functionality is built on top of the [Leaflet API](http://leafletjs.com/).

## Getting started

Data and styles for this project are stored on GitHub and use the git revision control system.  To get started, you need to install the following software:
1. Git http://git-scm.com/
2. Tilemill https://www.mapbox.com/tilemill/
3. GIS editing software such as ArcMap or qGIS

From a command prompt, navigate to the tilemill projects folder.  On Windows this is located by default in your Documents folder:

	C:\Users\{username}\Documents\MapBox\project
	
Using git, clone the campus-map repository into your Tilemill projects folder:

	git clone https://github.com/WWU-Spatial/Campus-Map
	
This will download the master version of the campus map to your local machine.  Launch Tilemill and you should see the Campus-Map project.

## Making changes

In general, every change should have a commit.  That isn't to say every new or modified line of code is a "change", but rather a set of related changes.  For example, if you modify the styles for parking lines, making the lines thicker, changing the color, and modifying the zooms at which the parking lines are available, that would be one change and thus should be it's own commit.

This simplest way to make a commit is to go back to your command prompt and navigate to the campus-map project folder.  The following command will add all changed files and all new files to your commit:

	git add -A
	
Additionally, if you've changed multiple files but only want to add the changes in one file or a subset of files, you can use the following command:

	git add /path/to/file

Next, make a commit and add a comment to your commit so other contributors know what changes you made and why.  The following command will add your commit with a comment:

	git commit -m "A descriptive comment about your commit that will help other contributors understand what you did and why"
	
Finally, after you have made one or more commits, you can push those commits back to github for other contributors to share and incorporate into their local versions of the project:

	git push
	
If other contributors have made changes, you can download and merge those changes by running the following command from the campus-map project folder:

	git pull
	
This was just a very brief introduction to Git.  It is a very powerful and sometimes complex set of tools.  For a more in depth primer, take a look at this resource: http://danielmiessler.com/study/git/