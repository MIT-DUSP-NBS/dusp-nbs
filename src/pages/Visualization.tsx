import { fromLonLat } from 'ol/proj';
import { RMap, ROSM } from 'rlayers';
import 'ol/ol.css';
import classes from './Visualization.module.css';

function Visualization() {
  return (
    <RMap
      className={classes.map}
      initial={{ center: fromLonLat([59.3293, 18.0686]), zoom: 9 }}
    >
      <ROSM />
    </RMap>
  );
}

export default Visualization;
