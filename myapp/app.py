from shiny import App, ui, reactive
from shinywidgets import output_widget, register_widget
import shinyswatch
from ipyleaflet import Map, basemaps, LocalTileLayer
from pathlib import Path

# try:
#     from osgeo import gdal  # noqa: F401
# except ImportError:
#     import gdal  # noqa: F401

assets_dir = Path(__file__).parent / "assets"

emissions_map = ui.layout_sidebar(
    ui.panel_sidebar(
        ui.h2("Emission map visualization"),
        ui.input_radio_buttons(
            "emissions",
            label="Select the desired emission properties",
            choices=["residential", "industrial"],
        ),
    ),
    ui.panel_main(output_widget("map")),
)

app_ui = ui.page_navbar(
    shinyswatch.theme.zephyr(),
    ui.nav("Emissions Map", emissions_map),
    bg="#3459e6",
    inverse=True,
    title="Nature-Based Solutions Dashboard",
    window_title="Nature-Based Solutions Dashboard",
)


def server(input, output, session):
    m = Map(basemap=basemaps.Esri.WorldImagery, zoom=0)

    # residential_path = "res.tif"
    # industrial_path = "ind.tif"

    # residential_raster = gdal.Open(str(assets_dir / residential_path))
    # industrial_raster = gdal.Open(str(assets_dir / industrial_path))

    # residential_transformer = Transformer.from_crs(
    #     residential_raster.GetProjection(), "epsg:3857"
    # )
    # industrial_transformer = Transformer.from_crs(
    #     residential_raster.GetProjection(), "epsg:3857"
    # )

    # rx1, ry1 = residential_transformer.transform(
    #     residential_raster.bounds[0], residential_raster.bounds[1]
    # )
    # rx2, ry2 = residential_transformer.transform(
    #     residential_raster.bounds[2], residential_raster.bounds[3]
    # )

    # ix1, iy1 = industrial_transformer.transform(
    #     industrial_raster.bounds[0], industrial_raster.bounds[1]
    # )
    # ix2, iy2 = industrial_transformer.transform(
    #     industrial_raster.bounds[2], industrial_raster.bounds[3]
    # )

    # rbounds = ((ry1, rx1), (ry2, rx2))
    # ibounds = ((iy1, ix1), (iy2, ix2))

    # rimage_map = Image.fromarray(residential_raster.read(1))
    # rimage_map = rimage_map.convert("L")

    # iimage_map = Image.fromarray(industrial_raster.read(1))
    # iimage_map = iimage_map.convert("L")

    # rimage_map.save("%s.png" % residential_path)
    # iimage_map.save("%s.png" % industrial_path)

    # residential = ImageOverlay(
    #     url="%s.png" % residential_path, name=residential_path, bounds=rbounds
    # )

    # industrial = ImageOverlay(
    #     url="%s.png" % industrial_path, name=industrial_path, bounds=ibounds
    # )

    residential = LocalTileLayer(path="res/{z}/{x}/{y}.png")
    industrial = LocalTileLayer(path="ind/{z}/{x}/{y}.png")

    m.add_layer(residential)

    register_widget("map", m)

    @reactive.Effect()
    def _():
        input_emissions = input.emissions()
        if input_emissions == "residential":
            if m.layers[1] == industrial:
                m.substitute_layer(industrial, residential)
        elif input_emissions == "industrial":
            if m.layers[1] == residential:
                m.substitute_layer(residential, industrial)


app = App(app_ui, server, static_assets=assets_dir)
