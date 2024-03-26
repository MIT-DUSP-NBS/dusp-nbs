import { useState, forwardRef, ForwardedRef, useEffect, useMemo, ReactElement } from 'react';
import { Paper, Checkbox, Switch, Space, Select, ComboboxItem, Text } from '@mantine/core';
import { RMap, RLayerTile, RLayerVector, RStyle } from 'rlayers';
import { Feature } from 'ol';
import { Geometry } from 'ol/geom';
import { fromLonLat } from 'ol/proj';
import GeoJSON from 'ol/format/GeoJSON';
import {
  RDoubleClickZoom,
  RDragPan,
  RMouseWheelZoom,
  RPinchRotate,
  RPinchZoom,
} from 'rlayers/interaction';

import 'ol/ol.css';
import { Coordinate } from 'ol/coordinate';

const map_layers = import.meta.glob('../../assets/map_layers/*/*.json');
const boundaries = import.meta.glob('../../assets/boundaries/*.json', { eager: true });

const boundaryFeatures: Record<string, Feature<Geometry>[]> = {};
Object.keys(boundaries).forEach((key) => {
  boundaryFeatures[key] = new GeoJSON({
    dataProjection: 'EPSG:3857',
    featureProjection: 'EPSG:3857',
  }).readFeatures(boundaries[key]);
});

const data = [
  {
    color: 'lime',
    value: 'GBI',
    title: 'Green Infrastructure (GBI)',
    id: 0,
  },
  {
    color: 'cyan',
    value: 'green_roof',
    title: 'Green Roof',
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
    value: 'urban_green_areas',
    title: 'Urban Green Areas',
    id: 4,
  },
];

interface CitiesType extends ComboboxItem {
  newView?: { center: Coordinate; zoom: number };
  nbsData?: {
    average: `${number}%` | number;
    residential: `${number}%` | number;
    industrial: `${number}%` | number;
    transporation: `${number}%` | number;
  };
}

const cities: CitiesType[] = [
  {
    label: 'Stockholm',
    value: 'stockholm',
    newView: { center: fromLonLat([18.0686, 59.3293]), zoom: 9 },
    nbsData: { average: '17.4%', residential: '8.1%', industrial: '14.0%', transporation: '9.6%' },
  },
  {
    label: 'Vienna',
    value: 'vienna',
    disabled: false,
    newView: { center: fromLonLat([16.3719, 48.2082]), zoom: 9 },
  },
  {
    label: 'Madrid',
    value: 'madrid',
    disabled: false,
    newView: { center: fromLonLat([-3.70379, 40.416775]), zoom: 9 },
  },
];

const colors = {
  GBI: 'lime',
  green_roof: 'cyan',
  greenbelt: 'pink',
  street_trees: 'violet',
  urban_green_areas: 'orange',
};

const initial = { center: fromLonLat([7, 50]), zoom: 5 };

const VisualizationLayers = ({ layers, city }: { layers: string[]; city: string }) => {
  const [imports, setImports] = useState(new Map<string, [unknown, string]>());

  useEffect(() => {
    const fetchImports = () =>
      Promise.all(
        layers
          .filter((layer) => !(`../../assets/map_layers/${city}/${layer}.json` in imports))
          .map((value) =>
            map_layers[`../../assets/map_layers/${city}/${value}.json`]().then((importVal) => {
              const returnObj = [
                `../../assets/map_layers/${city}/${value}.json`,
                [importVal, colors[value as keyof typeof colors]],
              ];
              return returnObj;
            })
          )
      );

    fetchImports()
      .then((result) => {
        result.forEach((result_obj) => {
          setImports(
            new Map(imports.set(result_obj[0] as string, result_obj[1] as [unknown, string]))
          );
        });
      })
      .catch(() => {
        throw Error('Failed to fetch map layers');
      });
  }, [city, imports, layers]);

  return useMemo(() => {
    const layers_to_return: ReactElement[] = [];
    imports.forEach(
      ([mapLayer, color], layerPath) =>
        layers
          .map((stringLayer) => `../../assets/map_layers/${city}/${stringLayer}.json`)
          .includes(layerPath) &&
        layers_to_return.push(
          <RLayerVector<Feature<Geometry>>
            zIndex={15}
            key={`layer_${layerPath}`}
            features={new GeoJSON({
              dataProjection: 'EPSG:3857',
              featureProjection: 'EPSG:3857',
            }).readFeatures(mapLayer)}
          >
            <RStyle.RStyle key={`style_${layerPath}`}>
              <RStyle.RFill color={color} key={`fill_${layerPath}`} />
            </RStyle.RStyle>
          </RLayerVector>
        )
    );
    return layers_to_return;
  }, [city, imports, layers]);
};

const Visualization = forwardRef((_props, ref: ForwardedRef<HTMLDivElement>) => {
  const [layers, setLayers] = useState<string[]>([]);
  const [boundaryShowing, setBoundaryShowing] = useState(true);
  const [ctrlHeld, setCTRLHeld] = useState(false);
  const [city, setCity] = useState<CitiesType | null>(null);
  const [view, setView] = useState(initial);

  const BounadryLayer = () => (
    <RLayerVector<Feature<Geometry>>
      zIndex={10}
      features={boundaryFeatures[`../../assets/boundaries/${city?.value}.json`]}
    >
      <RStyle.RStyle>
        <RStyle.RStroke color="white" width={3} />
        <RStyle.RFill color="transparent" />
      </RStyle.RStyle>
    </RLayerVector>
  );

  function downHandler({ key }: KeyboardEvent) {
    if (key === 'Control') {
      setCTRLHeld(true);
    }
  }

  function upHandler({ key }: KeyboardEvent) {
    if (key === 'Control') {
      setCTRLHeld(false);
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);
    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <div style={{ width: '100%', height: 'calc(100vh - 60px)', marginTop: 60 }}>
        <RMap
          initial={initial}
          height="100%"
          noDefaultInteractions
          noDefaultControls
          view={[view, setView]}
        >
          <RDoubleClickZoom />
          <RDragPan />
          <RPinchRotate />
          <RPinchZoom />
          {ctrlHeld ? <RMouseWheelZoom /> : null}
          <RLayerTile
            zIndex={5}
            url="https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attributions="Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community"
            projection="EPSG:3857"
          />
          {boundaryShowing && city && <BounadryLayer />}
          {city && <VisualizationLayers layers={layers} city={city.value} />}
        </RMap>
      </div>
      <div style={{ bottom: 20, left: 20, position: 'absolute' }}>
        {city && (
          <Paper
            shadow="xs"
            withBorder
            p="xl"
            style={{ width: '22em', maxWidth: 'calc(100vw - 40px)' }}
          >
            <Checkbox.Group
              label={`Locate NbS in ${city.label}`}
              description={`Taking ${city.label} as our study site, we identify the demands, locations, and types of NbS interventions that could maximize carbon reduction benefits.`}
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
            {`../../assets/boundaries/${city.value}.json` in boundaries && (
              <>
                <Space h="lg" />
                <Switch
                  checked={boundaryShowing}
                  onChange={(event) => setBoundaryShowing(event.currentTarget.checked)}
                  label={`Show ${city.label} county boundary`}
                />
              </>
            )}
          </Paper>
        )}
      </div>
      <div style={{ top: 20, left: 20, position: 'absolute' }}>
        <Paper
          shadow="xs"
          withBorder
          p="xl"
          style={{ width: '22em', maxWidth: 'calc(100vw - 40px)' }}
        >
          <Select
            data={cities}
            placeholder="Pick a city!"
            value={city ? city.value : null}
            onChange={(_value, option: CitiesType) => {
              setCity(option);
              setLayers([]);
              if (option.newView) {
                setView({ center: option.newView.center, zoom: option.newView.zoom });
              }
            }}
            allowDeselect={false}
          />
          {city?.nbsData && (
            <>
              <Space h="lg" />
              <Text size="sm">
                Implementing NBS in {city.label} can reduce total carbon emissions by, on average,{' '}
                {city?.nbsData?.average}, with {city?.nbsData?.residential} in the residential
                sector, {city?.nbsData?.industrial} in the industrial sector, and{' '}
                {city?.nbsData?.transporation} in the transportation sector.
              </Text>
            </>
          )}
        </Paper>
      </div>
    </div>
  );
});
Visualization.displayName = 'Visualization';

export default Visualization;
