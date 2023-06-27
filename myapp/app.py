from shiny import App, ui, reactive
from shinywidgets import output_widget, register_widget
from ipyleaflet import Map, basemaps, LocalTileLayer, Layer
from pathlib import Path

assets_dir = Path(__file__).parent / "assets"

emissions_map = ui.layout_sidebar(
    ui.panel_sidebar(
        ui.h2("Emission Map Visualization"),
        ui.input_radio_buttons(
            "emissions",
            label="Select the desired emission properties:",
            choices=["Residential", "Industrial"],
        ),
    ),
    ui.panel_main(output_widget("map")),
)

app_ui = ui.page_navbar(
    ui.nav("Emissions Map", emissions_map),
    title="Nature-Based Solutions Dashboard",
    inverse=True,
    window_title="Nature-Based Solutions Dashboard",
)


def server(input, output, session):
    m = Map(
        basemap=basemaps.Esri.WorldImagery,  # type: ignore
        zoom=9,
        center=(59.3293, 18.0686),
        max_zoom=13,
    )

    residential = LocalTileLayer(path="res/{z}/{x}/{y}.png")
    industrial = LocalTileLayer(path="ind/{z}/{x}/{y}.png")
    empty_layer = Layer()

    m.add_layer(empty_layer)

    register_widget("map", m)

    @reactive.Effect()
    def _():
        input_emissions = input.emissions()
        layers = tuple(m.layers)  # type: ignore

        match input_emissions:
            case "Residential":
                m.substitute_layer(layers[-1], residential)
            case "Industrial":
                m.substitute_layer(layers[-1], industrial)
            case _:
                m.substitute_layer(layers[-1], empty_layer)


app = App(app_ui, server, static_assets=assets_dir)
