import { useState, useEffect } from 'react';
import { Affix, Paper, Checkbox, Switch, Space } from '@mantine/core';
import { RMap, RLayerTile, RLayerVector, RStyle } from 'rlayers';
import { fromLonLat } from 'ol/proj';
import GeoJSON from 'ol/format/GeoJSON';
import features from '../assets/county.json';
import 'ol/ol.css';

const map_layers = import.meta.glob('../assets/map_layers/*.json');

const data = [
  {
    color: 'lime',
    value: 'GBI',
    title: 'Green Infrastructure (GBI)',
    id: 0,
  },
  {
    color: 'cyan',
    value: 'green_buildings',
    title: 'Green Buildings',
    id: 1,
  },
  {
    color: 'pink',
    value: 'greenbelt',
    title: 'Greenbelt',
    id: 2,
  },
  {
    color: 'violet',
    value: 'street_trees',
    title: 'Street Trees',
    id: 3,
  },
  {
    color: 'orange',
    value: 'urban_green',
    title: 'Urban Green Areas',
    id: 4,
  },
];

const colors = {
  GBI: 'lime',
  green_buildings: 'cyan',
  greenbelt: 'pink',
  street_trees: 'violet',
  urban_green: 'orange',
};

function Visualization() {
  const [layers, setLayers] = useState<string[]>([]);
  const [boundaryShowing, setBoundaryShowing] = useState(true);
  const [rendered_layers, setRenderedLayers] = useState<JSX.Element[]>([]); // [] as JSX.Element[];

  useEffect(() => {
    async function get_rendered_layers() {
      const imports = await Promise.all(
        layers.map((value) => map_layers[`../assets/map_layers/${value}.json`]())
      );
      setRenderedLayers(
        imports.map((value, index) => (
          <RLayerVector
            zIndex={15}
            key={`layer_${layers[index]}`}
            features={new GeoJSON({
              dataProjection: 'EPSG:3857',
              featureProjection: 'EPSG:3857',
            }).readFeatures(value)}
          >
            <RStyle.RStyle key={`style_${layers[index]}`}>
              <RStyle.RFill
                color={colors[layers[index] as keyof typeof colors]}
                key={`fill_${layers[index]}`}
              />
            </RStyle.RStyle>
          </RLayerVector>
        ))
      );
    }

    get_rendered_layers().catch(() => {});
  }, [layers]);
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
            {data.map((value) => (
              <>
                <Space h="xs" key={`space_${value.value}`} />
                <Checkbox
                  label={value.title}
                  color={value.color}
                  value={value.value}
                  key={`checkbox_${value.value}`}
                />
              </>
            ))}
          </Checkbox.Group>
          <Space h="xs" />
          <Space h="xs" />
          <Switch
            checked={boundaryShowing}
            onChange={(event) => setBoundaryShowing(event.currentTarget.checked)}
            label="Show Stockholm county boundary"
          />
        </Paper>
      </Affix>

      <RMap
        initial={{ center: fromLonLat([18.0686, 59.3293]), zoom: 9 }}
        width="100%"
        height="calc(100vh - 3.75rem * var(--mantine-scale))"
      >
        <RLayerTile
          zIndex={5}
          url="https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attributions="Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community"
          projection="EPSG:3857"
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
        {rendered_layers}
      </RMap>
    </>
  );
}

export default Visualization;
