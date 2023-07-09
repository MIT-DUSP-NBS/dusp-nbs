from shiny import App, ui, reactive
from shinywidgets import output_widget, register_widget
import ipyleaflet as ipyl
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
    ui.panel_main(output_widget("map_emissions")),
)

implementation_visualization = ui.layout_sidebar(
    ui.panel_sidebar(
        ui.h2("Implementation Visualization"),
        ui.input_checkbox_group(
            "implementation",
            label="Select the desired green infrastructure implementations:",
            choices={
                "green_infrastructure": "Green Infrastructure",
                "green_buildings": "Green Buildings",
                "street_trees": "Street Trees",
                "urban_green_areas": "Urban Green Areas",
                "greenbelt": "Greenbelt",
            },
        ),
    ),
    ui.panel_main(output_widget("map_implementation")),
)

app_ui = ui.page_navbar(
    ui.nav("Emissions Map", emissions_map),
    ui.nav("Implementation Visualization", implementation_visualization),
    title="Nature-Based Solutions Dashboard",
    inverse=True,
    window_title="Nature-Based Solutions Dashboard",
)


def server(input, output, session):
    map_emissions = ipyl.Map(
        basemap=ipyl.basemaps.Esri.WorldImagery,  # type: ignore
        zoom=9,
        center=(59.3293, 18.0686),
        max_zoom=13,
    )

    map_implementation = ipyl.Map(
        basemap=ipyl.basemaps.Esri.WorldImagery,  # type: ignore
        zoom=9,
        center=(59.3293, 18.0686),
        max_zoom=13,
    )

    residential = ipyl.LocalTileLayer(path="emissions/res/{z}/{x}/{y}.png")
    industrial = ipyl.LocalTileLayer(path="emissions/ind/{z}/{x}/{y}.png")

    industrial_key = {
        "green_infrastructure": 2,
        "green_buildings": 3,
        "street_trees": 5,
        "urban_green_areas": 7,
        "greenbelt": 11,
    }

    empty_layer = ipyl.Layer()

    map_emissions.add_layer(empty_layer)
    map_implementation.add_layer(empty_layer)

    register_widget("map_emissions", map_emissions)
    register_widget("map_implementation", map_implementation)

    @reactive.Effect()
    def emmissions():
        input_emissions = input.emissions()
        layers = tuple(map_emissions.layers)  # type: ignore

        match input_emissions:
            case "Residential":
                map_emissions.substitute_layer(layers[-1], residential)
            case "Industrial":
                map_emissions.substitute_layer(layers[-1], industrial)
            case _:
                map_emissions.substitute_layer(layers[-1], empty_layer)

    @reactive.Effect()
    def implementation():
        input_implementation = input.implementation()
        layers = tuple(map_implementation.layers)  # type: ignore

        print(input_implementation)
        # TODO: Add layer implementation and stuff


app = App(app_ui, server, static_assets=assets_dir)
