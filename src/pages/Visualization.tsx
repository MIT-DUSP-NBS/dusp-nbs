import { useState } from 'react';
import { Affix, Paper, Checkbox, Switch, Space } from '@mantine/core';
import { RMap, RLayerTile, RLayerVector, RStyle } from 'rlayers';
import { fromLonLat } from 'ol/proj';
import GeoJSON from 'ol/format/GeoJSON';
import features from '../assets/county.json';
import 'ol/ol.css';

import GBI from '../assets/map_layers/GBI.json';
import green_buildings from '../assets/map_layers/green_buildings.json';
import greenbelt from '../assets/map_layers/greenbelt.json';
import street_trees from '../assets/map_layers/street_trees.json';
import urban_green from '../assets/map_layers/urban_green.json';

// import RLayerGeoTIFF from '../components/RLayerGeoTIFF';

function Visualization() {
  const [layers, setLayers] = useState<string[]>([]);
  const [boundaryShowing, setBoundaryShowing] = useState(true);
  return (
    <>
      <Affix position={{ bottom: 20, left: 20 }}>
        <Paper shadow="xs" withBorder p="xl">
          <Checkbox.Group
            label="Green Infrastructure Visualization"
            description="Select the desired green infrastructure implementations"
            value={layers}
            onChange={setLayers}
          >
            <Space h="xs" />
            <Checkbox label="Green Infrastructure (GBI)" value={'GBI'} />
            <Space h="xs" />
            <Checkbox label="Green Buildings" value={'green_buildings'} />
            <Space h="xs" />
            <Checkbox label="Greenbelt" value={'greenbelt'} />
            <Space h="xs" />
            <Checkbox label="Street Trees" value={'street_trees'} />
            <Space h="xs" />
            <Checkbox label="Urban Green Areas" value={'urban_green'} />
            <Space h="xs" />
          </Checkbox.Group>
          <Space h="xs" />
          <Switch
            checked={boundaryShowing}
            onChange={(event) =>
              setBoundaryShowing(event.currentTarget.checked)
            }
            label="Show Stockholm county boundary"
          />
        </Paper>
      </Affix>

      <RMap
        initial={{ center: fromLonLat([18.0686, 59.3293]), zoom: 9 }}
        width={'100%'}
        height={'calc(100vh - 3.75rem * var(--mantine-scale))'}
      >
        <RLayerTile
          zIndex={5}
          url="https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attributions="Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community"
          projection={'EPSG:3857'}
        />
        {boundaryShowing && (
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
        )}
        {layers.includes('GBI') && (
          <RLayerVector
            zIndex={15}
            features={new GeoJSON({
              dataProjection: 'EPSG:3857',
              featureProjection: 'EPSG:3857',
            }).readFeatures(GBI)}
          >
            <RStyle.RStyle>
              <RStyle.RFill color="white" />
            </RStyle.RStyle>
          </RLayerVector>
        )}
        {layers.includes('green_buildings') && (
          <RLayerVector
            zIndex={15}
            features={new GeoJSON({
              dataProjection: 'EPSG:3857',
              featureProjection: 'EPSG:3857',
            }).readFeatures(green_buildings)}
          >
            <RStyle.RStyle>
              <RStyle.RFill color="white" />
            </RStyle.RStyle>
          </RLayerVector>
        )}
        {layers.includes('greenbelt') && (
          <RLayerVector
            zIndex={15}
            features={new GeoJSON({
              dataProjection: 'EPSG:3857',
              featureProjection: 'EPSG:3857',
            }).readFeatures(greenbelt)}
          >
            <RStyle.RStyle>
              <RStyle.RFill color="white" />
            </RStyle.RStyle>
          </RLayerVector>
        )}
        {layers.includes('street_trees') && (
          <RLayerVector
            zIndex={10}
            features={new GeoJSON({
              dataProjection: 'EPSG:3857',
              featureProjection: 'EPSG:3857',
            }).readFeatures(street_trees)}
          >
            <RStyle.RStyle>
              <RStyle.RFill color="white" />
            </RStyle.RStyle>
          </RLayerVector>
        )}
        {layers.includes('urban_green') && (
          <RLayerVector
            zIndex={10}
            features={new GeoJSON({
              dataProjection: 'EPSG:3857',
              featureProjection: 'EPSG:3857',
            }).readFeatures(urban_green)}
          >
            <RStyle.RStyle>
              <RStyle.RFill color="white" />
            </RStyle.RStyle>
          </RLayerVector>
        )}
      </RMap>
    </>
  );
}

export default Visualization;
