# pyright: basic
# pyright: reportUnusedFunction=false

from ipyleaflet import basemaps, Map, ImageOverlay
from shiny import App, ui, reactive
from shinywidgets import output_widget, register_widget
import shinyswatch

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
    map = Map(center=(40, -100), zoom=4, basemap=basemaps.Esri.WorldImagery)
    register_widget("map", map)

    residential = ImageOverlay(url="./res.tif", bounds=map.bounds)
    industrial = ImageOverlay(url="./ind.tif", bounds=map.bounds)

    @reactive.Effect()
    def _():
        input_emissions = input.emissions()
        if input_emissions == "residential":
            map.add_layer(residential)
        elif input_emissions == "industrial":
            map.add_layer(industrial)


app = App(app_ui_nav, server)
