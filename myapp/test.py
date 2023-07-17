import geopandas as gpd
from pathlib import Path

assets_dir = Path(__file__).parent / "assets"

geo_dataframe = gpd.read_file(assets_dir / "county/county.shp").to_crs(4326)

geo_dataframe.to_file(assets_dir / "county.json", driver="GeoJSON")
