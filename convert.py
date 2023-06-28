from osgeo import gdal
    
options_list = [
    '-ot Byte',
    '-of PNG',
    '-b 1',
    '-scale',
]           

options_string = " ".join(options_list)

warped = gdal.Warp(
    'myapp/assets/res_warp.tif',
    'myapp/assets/res.tif',
    options="-s_srs EPSG:3006 -t_srs EPSG:3857"
)

new_file = gdal.Translate(
    'myapp/assets/res.png',
    'myapp/assets/res_warp.tif',
    options=options_string
)

print(gdal.Info(new_file))