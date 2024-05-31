import { useState, forwardRef, ForwardedRef, useEffect, useMemo, ReactElement } from 'react';
import {
  Paper,
  Checkbox,
  Switch,
  Space,
  Select,
  ComboboxItem,
  Text,
  Overlay,
  Flex,
  Kbd,
  Transition,
  Group,
  ActionIcon,
  Popover,
  Radio,
  Stack,
  Grid,
  SimpleGrid,
  Image,
  rem,
  NumberFormatter,
} from '@mantine/core';
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
import { platformModifierKeyOnly } from 'ol/events/condition';
import { Coordinate } from 'ol/coordinate';
import { useHover, useInterval, useOs } from '@mantine/hooks';

import 'ol/ol.css';
import 'rlayers/control/layers.css';
import { IconAdjustmentsHorizontal } from '@tabler/icons-react';

const map_layers = import.meta.glob('../../assets/map_layers/*/*.json');
const boundaries = import.meta.glob('../../assets/boundaries/*.json', { eager: true });

const boundaryFeatures: Record<string, Feature<Geometry>[]> = {};
Object.keys(boundaries).forEach((key) => {
  boundaryFeatures[key] = new GeoJSON({
    dataProjection: 'EPSG:3857',
    featureProjection: 'EPSG:3857',
  }).readFeatures(boundaries[key]);
});

const data: {
  color: string;
  value: string;
  title: string;
  image: string;
  cityData?: { perYear: Record<string, number>; reductionShare: Record<string, `${number}%`> };
}[] = [
  {
    color: 'lime',
    value: 'GBI',
    title: 'Green Infrastructure (GI)',
    image:
      'https://ddot.dc.gov/sites/default/files/dc/sites/ddot/page_content/images/DDOT-GI-Main.jpg?itok=e4yJgI9_',
    cityData: {
      perYear: { stockholm: 0.93, vienna: 0.56, madrid: 1.58 },
      reductionShare: { stockholm: '23.5%', vienna: '5.0%', madrid: '9.7%' },
    },
  },
  {
    color: 'cyan',
    value: 'green_roof',
    title: 'Green Roof',
    image:
      'https://images.squarespace-cdn.com/content/v1/5ac3c68055b02ce8b735f455/1590887451253-0688F2DV0JE3R4LLUDOV/GreenHouse.jpg',
    cityData: {
      perYear: { stockholm: 0.34, vienna: 0.71, madrid: 0.43 },
      reductionShare: { stockholm: '8.5%', vienna: '6.3%', madrid: '2.7%' },
    },
  },
  {
    color: 'pink',
    value: 'greenbelt',
    title: 'Greenbelt',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/2/2b/Tochal_from_Modarres_Expressway.jpg',
    cityData: {
      perYear: { stockholm: 0.79, vienna: 1.09, madrid: 1.93 },
      reductionShare: { stockholm: '19.8%', vienna: '9.7%', madrid: '11.8%' },
    },
  },
  {
    color: 'violet',
    value: 'street_trees',
    title: 'Street Trees',
    image:
      'https://images.squarespace-cdn.com/content/v1/53dd6676e4b0fedfbc26ea91/03c8acef-e91e-49a4-8513-1fa6188e1382/faith-crabtree-6ROWaq9mdew-unsplash.jpg',
    cityData: {
      perYear: { stockholm: 0.3, vienna: 0.92, madrid: 1.27 },
      reductionShare: { stockholm: '7.6%', vienna: '8.2%', madrid: '7.8%' },
    },
  },
  {
    color: 'orange',
    value: 'urban_green_areas',
    title: 'Urban Parks',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/c/ca/20170721_Gotham_Shield_NYC_Aerials-225_medium_%28cropped%29.jpg',
    cityData: {
      perYear: { stockholm: 0.53, vienna: 1.41, madrid: 1.47 },
      reductionShare: { stockholm: '13.4%', vienna: '12.6%', madrid: '9.0%' },
    },
  },
];

interface CitiesType extends ComboboxItem {
  newView?: { center: Coordinate; zoom: number };
  // nbsData?: {
  //   average: `${number}%` | number;
  //   residential: `${number}%` | number;
  //   industrial: `${number}%` | number;
  //   transporation: `${number}%` | number;
  // };
}

const basemaps = [
  {
    label: 'ESRI World Imagery',
    url: 'https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attributions: 'Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community',
  },
  {
    label: 'OpenStreetMap',
    url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attributions: '© OpenStreetMap contributors',
  },
];

const cities: CitiesType[] = [
  {
    label: 'Stockholm',
    value: 'stockholm',
    newView: { center: fromLonLat([18.0686, 59.3293]), zoom: 9 },
    // nbsData: { average: '17.4%', residential: '8.1%', industrial: '14.0%', transporation: '9.6%' },
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
  const [isScrolling, setIsScrolling] = useState(false);
  const [lastScroll, setLastScroll] = useState(Date.now());
  const [city, setCity] = useState<CitiesType | null>(null);
  const [view, setView] = useState(initial);
  const { hovered: mapHovered, ref: mapHoveredRef } = useHover();
  const [basemap, setBasemap] = useState(basemaps[0]);
  const [basemapOpened, setBasemapOpened] = useState(false);

  const os = useOs();

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

  function scrollHandler() {
    setIsScrolling(true);
    setLastScroll(Date.now());
  }

  useEffect(() => {
    window.addEventListener('keydown', downHandler, true);
    window.addEventListener('keyup', upHandler, true);
    window.addEventListener('scroll', scrollHandler, true);

    return () => {
      window.removeEventListener('keydown', downHandler, true);
      window.removeEventListener('keyup', upHandler, true);
      window.removeEventListener('scroll', scrollHandler, true);
    };
  }, []);

  const interval = useInterval(() => {
    if (isScrolling && Date.now() - lastScroll > 500) {
      setIsScrolling(false);
    }
  }, 500);
  useEffect(() => {
    if (isScrolling) {
      interval.start();
      return interval.stop();
    }
    return undefined;
  }, [interval, isScrolling]);

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

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <div
        style={{ width: '100%', height: 'calc(100vh - 60px)', marginTop: 60 }}
        ref={mapHoveredRef}
      >
        <Transition mounted={mapHovered && !ctrlHeld && isScrolling} transition="fade">
          {(styles) => (
            <Overlay color="#000" backgroundOpacity={0.35} blur={5} zIndex={100} style={styles}>
              <Flex justify="center" align="center" h="100%">
                <Text size="xl" c="white">
                  Use <Kbd>{os === 'windows' ? 'Ctrl' : os === 'macos' ? '⌘' : 'Super'}</Kbd> +
                  scroll to zoom the map
                </Text>
              </Flex>
            </Overlay>
          )}
        </Transition>
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
          <RMouseWheelZoom condition={platformModifierKeyOnly} />
          <RLayerTile
            zIndex={5}
            url={basemap.url}
            attributions={basemap.attributions}
            projection="EPSG:3857"
            properties={{ label: basemap.label }}
          />

          {boundaryShowing && city && <BounadryLayer />}
          {city && <VisualizationLayers layers={layers} city={city.value} />}
        </RMap>
      </div>
      <div style={{ top: 20, left: 20, position: 'absolute', zIndex: 200 }}>
        <Paper
          shadow="xs"
          withBorder
          p="xl"
          style={{ maxWidth: 'min(calc(100vw - 40px), 20.5em)' }}
        >
          <Group>
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
            <Popover
              width={280}
              shadow="md"
              withArrow
              opened={basemapOpened}
              onChange={setBasemapOpened}
            >
              <Popover.Target>
                <ActionIcon
                  variant="default"
                  aria-label="Settings"
                  size="input-sm"
                  onClick={() => setBasemapOpened((o) => !o)}
                >
                  <IconAdjustmentsHorizontal style={{ width: '70%', height: '70%' }} stroke={1.5} />
                </ActionIcon>
              </Popover.Target>
              <Popover.Dropdown>
                <Radio.Group
                  value={basemap.url}
                  onChange={(value) => {
                    setBasemap(basemaps.find((b) => b.url === value) ?? basemaps[0]);
                    setBasemapOpened((o) => !o);
                  }}
                  name="basemap"
                  label="Basemap"
                  description="Select the appropriate basemap to use"
                >
                  <Stack mt="xs">
                    {basemaps.map((radioBasemap) => (
                      <Radio
                        key={radioBasemap.label}
                        label={radioBasemap.label}
                        value={radioBasemap.url}
                      />
                    ))}
                  </Stack>
                </Radio.Group>
              </Popover.Dropdown>
            </Popover>
          </Group>
        </Paper>
      </div>
      <div style={{ bottom: 20, left: 20, position: 'absolute', zIndex: 200 }}>
        {city && (
          <Paper
            shadow="xs"
            withBorder
            p="xl"
            style={{ maxWidth: 'min(calc(100vw - 40px), 22em)' }}
          >
            <Checkbox.Group
              label={`Locate NbS in ${city.label}`}
              description="Emissions statistics are calculated based on 2019 emissions and application of the NbS on all available land parcels"
              value={layers}
              onChange={setLayers}
            >
              {data.map((value) => (
                <div key={`checkbox_${value.value}`}>
                  <Space h="xs" key={`space_${value.value}`} />
                  <Checkbox
                    label={value.title}
                    color={value.color}
                    value={value.value}
                    description={
                      layers.includes(value.value) && value.cityData?.perYear[city.value] && `` // `Reduces emissions by up to ${value.cityData.perYear[city.value]} MtCO2/year${value.cityData?.reductionShare[city.value] && ` (${value.cityData.reductionShare[city.value]} of 2019 emissions)`}`
                    }
                  />
                </div>
              ))}
            </Checkbox.Group>
            {`../../assets/boundaries/${city.value}.json` in boundaries && (
              <>
                <Space h="lg" />
                <Switch
                  checked={boundaryShowing}
                  onChange={(event) => setBoundaryShowing(event.currentTarget.checked)}
                  label={`Show ${city.label} boundary`}
                />
              </>
            )}
          </Paper>
        )}
      </div>
      <div
        style={{
          bottom: 20,
          right: 20,
          height: 'calc(100vh - 60px)',
          position: 'absolute',
          zIndex: 200,
        }}
      >
        {city && layers.length > 0 && (
          <Paper p="xl" h={'96%'} m="xl" w={450}>
            <Flex direction="column" h={'100%'}>
              <SimpleGrid cols={2}>
                {layers.map((layer) => {
                  const layerData = data.find((value) => value.value === layer);
                  return (
                    <div style={{ position: 'relative', textAlign: 'center' }}>
                      <Image src={layerData?.image} h={175} w={175} radius="md" />
                      <Text
                        fw={500}
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-60%, -50%)',
                          color: 'white',
                        }}
                      >
                        1m<sup>2</sup> of {layerData?.title}
                        <br />
                        {layerData?.cityData?.perYear[city?.value]} MtCO<sub>2</sub>/year
                      </Text>
                    </div>
                  );
                })}
              </SimpleGrid>
              <div style={{ flexGrow: 2 }} />
              <div>
                <Text style={{ fontSize: rem(28), fontWeight: 700, lineHeight: 1.25 }}>
                  When fully implemented, reduces emissions up to
                </Text>
                <Text style={{ fontSize: rem(36), fontWeight: 900, lineHeight: 1.5 }}>
                  <NumberFormatter
                    value={layers
                      .map((layer) => {
                        const layerData = data.find((value) => value.value === layer);
                        return layerData
                          ? layerData.cityData
                            ? layerData.cityData.perYear[city?.value]
                            : 0
                          : 0;
                      })
                      .reduce((a, b) => a + b, 0)}
                    decimalScale={2}
                  />
                  MT per year
                </Text>
              </div>
            </Flex>
          </Paper>
        )}
      </div>
    </div>
  );
});
Visualization.displayName = 'Visualization';

export default Visualization;
