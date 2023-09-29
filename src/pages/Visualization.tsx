import { RMap, RLayerTile, RLayerVector, RStyle } from 'rlayers';
import { fromLonLat } from 'ol/proj';
import GeoJSON from 'ol/format/GeoJSON';
import classes from './Visualization.module.css';
import features from '../assets/county.json';
import 'ol/ol.css';

function Visualization() {
  return (
    <RMap
      className={classes.map}
      initial={{ center: fromLonLat([18.0686, 59.3293]), zoom: 9 }}
    >
      <RLayerTile
        zIndex={5}
        url="https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        attributions="Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community"
        projection={'EPSG:3857'}
      ></RLayerTile>
      <RLayerVector
        zIndex={10}
        features={new GeoJSON({
          dataProjection: 'EPSG:3857',
          featureProjection: 'EPSG:3857',
        }).readFeatures(features)}
      >
        <RStyle.RStyle>
          <RStyle.RStroke color="white" width={3} />
          <RStyle.RFill color="transparent" />
        </RStyle.RStyle>
      </RLayerVector>
    </RMap>
  );
}

export default Visualization;
