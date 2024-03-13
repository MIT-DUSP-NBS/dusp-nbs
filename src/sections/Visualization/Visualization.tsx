import { useState, forwardRef, ForwardedRef, useEffect } from 'react';
import { Paper, Checkbox, Switch, Space } from '@mantine/core';
import { RMap, RLayerTile, RLayerVector, RStyle } from 'rlayers';
import { Feature } from 'ol';
import { Geometry } from 'ol/geom';
import { fromLonLat } from 'ol/proj';
import GeoJSON from 'ol/format/GeoJSON';
import features from '../../assets/county.json';
import 'ol/ol.css';

const map_layers = import.meta.glob('../../assets/map_layers/*.json');

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

const VisualizationLayers = ({ layers }: { layers: string[] }) => {
  const [imports, setImports] = useState<Record<string, unknown>>({});

  useEffect(() => {
    const fetchImports = () =>
      Promise.all(
        layers
          .filter((layer) => !Object.keys(imports).includes(layer))
          .map((value) =>
            map_layers[`../../assets/map_layers/${value}.json`]().then((importVal) => {
              const returnObj: Record<string, unknown> = {};
              returnObj[value] = importVal;
              return returnObj;
            })
          )
      );

    fetchImports()
      .then((result) => {
        result.forEach((result_obj) => {
          setImports({ ...imports, ...result_obj });
        });
      })
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layers]);

  return Object.keys(imports)
    .filter((layer) => layers.includes(layer))
    .map((value, index) => (
      <RLayerVector<Feature<Geometry>>
        zIndex={15}
        key={`layer_${layers[index]}`}
        features={
          new GeoJSON({
            dataProjection: 'EPSG:3857',
            featureProjection: 'EPSG:3857',
          }).readFeatures(imports[value]) as Feature<Geometry>[]
        }
      >
        <RStyle.RStyle key={`style_${layers[index]}`}>
          <RStyle.RFill
            color={colors[layers[index] as keyof typeof colors]}
            key={`fill_${layers[index]}`}
          />
        </RStyle.RStyle>
      </RLayerVector>
    ));
};

const Visualization = forwardRef((_props, ref: ForwardedRef<HTMLDivElement>) => {
  const [layers, setLayers] = useState<string[]>([]);
  const [boundaryShowing, setBoundaryShowing] = useState(true);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <div style={{ width: '100%', height: 'calc(100vh - 60px)', marginTop: 60 }}>
        <RMap initial={{ center: fromLonLat([18.0686, 59.3293]), zoom: 9 }} height="100%">
          <RLayerTile
            zIndex={5}
            url="https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attributions="Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community"
            projection="EPSG:3857"
          />
          {boundaryShowing && (
            <RLayerVector<Feature<Geometry>>
              zIndex={10}
              features={
                new GeoJSON({
                  dataProjection: 'EPSG:3857',
                  featureProjection: 'EPSG:3857',
                }).readFeatures(features) as Feature<Geometry>[]
              }
            >
              <RStyle.RStyle>
                <RStyle.RStroke color="white" width={3} />
                <RStyle.RFill color="transparent" />
              </RStyle.RStyle>
            </RLayerVector>
          )}
          <VisualizationLayers layers={layers} />
        </RMap>
      </div>
      <div style={{ bottom: 20, left: 20, position: 'absolute' }}>
        <Paper
          shadow="xs"
          withBorder
          p="xl"
          style={{ width: '22em', maxWidth: 'calc(100vw - 40px)' }}
        >
          <Checkbox.Group
            label="Locate NbS in Stockholm"
            description="Taking Stockholm as our study site, we identify the demands, locations, and types of NbS interventions that could maximize carbon reduction benefits."
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
      </div>
    </div>
  );
});
Visualization.displayName = 'Visualization';

export default Visualization;
