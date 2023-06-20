# pyright: basic
# pyright: reportUnusedFunction=false

# from ipyleaflet import basemaps, Map, ImageOverlay
from shiny import App, ui  # , reactive
from shinywidgets import output_widget, register_widget
import shinyswatch
import leafmap.leafmap as leafmap

# import xarray_leaflet

emissions_map = ui.page_fluid(
    shinyswatch.theme.zephyr(),
    ui.layout_sidebar(
        ui.panel_sidebar(
            ui.h2("Emission map visualization"),
            ui.input_radio_buttons(
                "emissions",
                label="Select the desired emission properties",
                choices=["residential", "industrial"],
            ),
        ),
        ui.panel_main(output_widget("map")),
    ),
)

app_ui_nav = ui.page_navbar(
    ui.nav("Emissions Map", emissions_map),
    bg="#3459e6",
    inverse=True,
    title="Nature-Based Solutions Dashboard",
)


def server(input, output, session):
    m = leafmap.Map()
    m.add_basemap("Esri.WorldImagery")
    register_widget("map", m)

    # residential = "res.tif"
    # industrial = "ind.tif"

    # @reactive.Effect()
    # def _():
    #     input_emissions = input.emissions()
    #     if input_emissions == "residential":
    #         m.add_raster(residential, colormap='terrain', layer_name='Residential')
    #     elif input_emissions == "industrial":
    #         m.add_raster(industrial, colormap='terrain', layer_name='Industrial')


app = App(app_ui_nav, server)
