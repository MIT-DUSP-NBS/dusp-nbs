import { useState } from 'react';
import { Affix, Paper, Checkbox, Switch, Space } from '@mantine/core';
import { RMap, RLayerTile, RLayerVector, RStyle } from 'rlayers';
import { fromLonLat } from 'ol/proj';
import GeoJSON from 'ol/format/GeoJSON';
import features from '../assets/county.json';
import 'ol/ol.css';

function Visualization() {
  const [value, setValue] = useState<string[]>([]);
  const [boundaryShowing, setBoundaryShowing] = useState(true);
  return (
    <>
      <Affix position={{ bottom: 20, left: 20 }}>
        <Paper shadow="xs" withBorder p="xl">
          <Checkbox.Group
            label="Green Infrastructure Visualization"
            // description="Select the desired green infrastructure implementations"
            description="Currently a work in progress."
            value={value}
            onChange={setValue}
          >
            <Space h="xs" />
            <Checkbox
              disabled
              label="Green Infrastructure (GBI)"
              value={'gbi'}
            />
            <Space h="xs" />
            <Checkbox disabled label="Greenbelt" value={'greenbelt'} />
            <Space h="xs" />
            <Checkbox
              disabled
              label="Green Buildings"
              value={'greenbuildings'}
            ></Checkbox>
            <Space h="xs" />
            <Checkbox disabled label="Street Trees" value={'streettrees'} />
            <Space h="xs" />
            <Checkbox
              disabled
              label="Urban Green Areas"
              value={'urbangreenareas'}
            />
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
        // className={classes.map}
        initial={{ center: fromLonLat([18.0686, 59.3293]), zoom: 9 }}
        width={'100%'}
        height={'calc(100vh - 3.75rem * var(--mantine-scale))'}
      >
        <RLayerTile
          zIndex={5}
          url="https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attributions="Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community"
          projection={'EPSG:3857'}
        ></RLayerTile>
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
      </RMap>
    </>
  );
}

export default Visualization;
