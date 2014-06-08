import math
import ogr
import osr

#Standard stall dimensions in meters
STALL_WIDTH = 2.74 #9ft
STALL_LENGTH = 5.48 #18ft

def distanceOfLine(x1,y1,x2,y2):
	return math.sqrt((x2-x1)**2 + (y2-y1)**2)

	
def pointOnLine(x1,y1,x2,y2,d):
	vx = x2-x1
	vy = y2-y1
	
	#Magnitude of vector
	mag = math.sqrt(vx*vx + vy*vy)

	#Direction Vectors
	vx = (vx / mag)
	vy = (vy / mag)
	
	x1 = (x1 + (vx * d))
	y1 = (y1 + (vy * d))
	
	return (x1,y1)
	
	
def slope(x1,y1,x2,y2):
	return (y2-y1) / (x2-x1)









driver = ogr.GetDriverByName("ESRI Shapefile")
path = r'C:\Temp\Campus\Parking\parking_lines.shp'
output_path = r"C:\temp\Campus\Parking\stall3.shp"

datasource = driver.Open(path, 0)
layer = datasource.GetLayer()


out_ds = driver.CreateDataSource(output_path)



spatialReference = osr.SpatialReference()
spatialReference.ImportFromProj4("+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs")

layerName = 'stalls'
layerout = out_ds.CreateLayer(layerName, spatialReference, ogr.wkbLineString)
layerDefinition = layerout.GetLayerDefn()


feature = layer.GetNextFeature()

while feature:
	#Get Geometry
	geom = feature.GetGeometryRef()
	
	#Get start point and end point
	p1 = geom.GetPoint(0)
	p2 = geom.GetPoint(1)
	
	
	
	
	#Get length of line
	length = distanceOfLine(p1[0],p1[1],p2[0],p2[1])
	
	for i in xrange(0,int(length/STALL_WIDTH)):
		i = i*STALL_WIDTH
		pt = pointOnLine(p2[0],p2[1],p1[0],p1[1], i)
	
		
		if p1[1] == p2[1] or p1[0]==p2[0]:
			
			if p1[0] == p1[1]:
				y1 = pt[1] + distance
				y2 = pt[1] - distance
				x1 = pt[1]
				x2 = pt[1]
    
			if p2[0]==p2[1]:
				y1 = pt[1]
				y2 = pt[1] 
				x1 = pt[1] + distance
				x2 = pt[1] - distance
		
		else:
			m = slope(p1[0],p1[1],p2[0],p2[1])
			negativereciprocal = -1*(1/m)
		
			if m > 0:
				#increase x values, find y
				if m >= 1:
					y1 = negativereciprocal*(STALL_LENGTH)  + pt[1]
					y2 = negativereciprocal*(-STALL_LENGTH) + pt[1]
					x1 = pt[0] + STALL_LENGTH
					x2 = pt[0] - STALL_LENGTH
				#increase y find x
				if m < 1:
					y1 = pt[1] + STALL_LENGTH
					y2 = pt[1] - STALL_LENGTH
					x1 = (STALL_LENGTH/negativereciprocal)  + pt[0]
					x2 = (-STALL_LENGTH/negativereciprocal) + pt[0]
					
			if m < 0:
				#add to x find y
				if m >= -1:
				#add to y find x
					y1 = pt[1] + STALL_LENGTH
					y2 = pt[1] - STALL_LENGTH
					x1 = (STALL_LENGTH/negativereciprocal)  + pt[0]
					x2 = (-STALL_LENGTH/negativereciprocal) + pt[0]  
				
				if m < -1:
					y1 = negativereciprocal*(STALL_LENGTH)  + pt[1]
					y2 = negativereciprocal*(-STALL_LENGTH) + pt[1]
					x1 = pt[0] + STALL_LENGTH
					x2 = pt[0] - STALL_LENGTH
				
				
				
		

		geometry = ogr.Geometry(ogr.wkbLineString)
		geometry.AddPoint_2D(pt[0], pt[1])
		geometry.AddPoint_2D(x2,y2)

		# Create feature
		outfeature = ogr.Feature(layerDefinition)
		outfeature.SetGeometry(geometry)
        # Save feature
		layerout.CreateFeature(outfeature)
        # Cleanup
		geometry.Destroy()
		outfeature.Destroy()
		
		geometry = ogr.Geometry(ogr.wkbLineString)
		geometry.AddPoint_2D(pt[0], pt[1])
		geometry.AddPoint_2D(x1,y1)

		# Create feature
		outfeature = ogr.Feature(layerDefinition)
		outfeature.SetGeometry(geometry)
        # Save feature
		layerout.CreateFeature(outfeature)
        # Cleanup
		geometry.Destroy()
		outfeature.Destroy()
		
		
		
		
		
		
		
		
		
		
		
		
		
		
	#raise SystemExit
	feature = layer.GetNextFeature()
		

out_ds.Destroy()
	
	
	
	
	
	
	


	
#pointOnLine(-13635184,6229152,-13635180,6229295,2.74)
#pointOnLine(-13635180.01505628, 6229295.761303002,-13635184.43054352, 6229152.972934057,2.74)
	
#(point2, point1, distance)
	
	 