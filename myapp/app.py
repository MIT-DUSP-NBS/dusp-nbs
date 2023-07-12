from shiny import App, ui, reactive, experimental
from shinywidgets import output_widget, register_widget
import ipyleaflet as ipyl
from pathlib import Path

assets_dir = Path(__file__).parent / "assets"

emissions_map = experimental.ui.layout_sidebar(
    experimental.ui.sidebar(
        ui.h2("Emission Map Visualization"),
        ui.input_radio_buttons(
            "emissions",
            label="Select the desired emission properties:",
            choices=["Residential", "Industrial"],
        ),
    ),
    experimental.ui.as_fill_item(output_widget("map_emissions")),
)

implementation_visualization = experimental.ui.layout_sidebar(
    experimental.ui.sidebar(
        ui.h2("Green Infrastructure Visualization"),
        ui.input_checkbox_group(
            "implementation",
            label="Select the desired green infrastructure implementations:",
            choices={
                "green_infrastructure": "Green Infrastructure (GBI)",
                "green_buildings": "Green Buildings",
                "street_trees": "Street Trees",
                "urban_green_areas": "Urban Green Areas",
                "greenbelt": "Greenbelt",
            },
        ),
    ),
    experimental.ui.as_fill_item(output_widget("map_implementation")),
)

app_ui = experimental.ui.page_navbar(
    ui.nav("Emissions Map", emissions_map),
    ui.nav("Implementation Visualization", implementation_visualization),
    title="Nature-Based Solutions Dashboard",
    inverse=True,
    fillable_mobile=True,
    footer=ui.div(
        "This is a work in progress, please contact ",
        ui.a("Diego Temkin", href="mailto:dtemkin@mit.edu"),
        " with any errors or suggestions!",
    ),
    lang="en",
    window_title="Nature-Based Solutions Dashboard",
)


def server(input, output, session):
    map_emissions = ipyl.Map(
        basemap=ipyl.basemaps.Esri.WorldImagery,  # type: ignore
        zoom=9,
        center=(59.3293, 18.0686),
        max_zoom=13,
        scroll_wheel_zoom=True,
    )

    map_implementation = ipyl.Map(
        basemap=ipyl.basemaps.Esri.WorldImagery,  # type: ignore
        zoom=9,
        center=(59.3293, 18.0686),
        max_zoom=13,
        scroll_wheel_zoom=True,
        controls=[
            ipyl.LegendControl(
                title="Layer Key",
                legend={
                    "GBI": "#a8e16e",
                    "Green Buildings": "#64efef",
                    "GBI x Green Buildings": "#efef4d",
                    "Street Trees": "#f01fcd",
                    "GBI x Urban Green Areas": "#4587ca",
                    "Greenbelt": "#cd73a0",
                    "GBI x Street Trees": "#de7913",
                    "Green Buildings x Street Trees": "#833dc9",
                    "GBI x Greenbelt": "#dc1010",
                    "Green Buildings x Greenbelt": "#3fea95",
                    "GBI x Urban Green Areas x Street Trees": "#3333e6",
                },
                position="topright",
            )
        ],
    )

    residential = ipyl.LocalTileLayer(path="emissions/res/{z}/{x}/{y}.png")
    industrial = ipyl.LocalTileLayer(path="emissions/ind/{z}/{x}/{y}.png")

    gi = ipyl.LocalTileLayer(path="implementation/gi/{z}/{x}/{y}.png")
    greenbuildings = ipyl.LocalTileLayer(
        path="implementation/greenbuildings/{z}/{x}/{y}.png"
    )
    gi_greenbuildings = ipyl.LocalTileLayer(
        path="implementation/gi_greenbuildings/{z}/{x}/{y}.png"
    )
    streettrees = ipyl.LocalTileLayer(path="implementation/streettrees/{z}/{x}/{y}.png")
    gi_urbangreenareas = ipyl.LocalTileLayer(
        path="implementation/gi_urbangreenareas/{z}/{x}/{y}.png"
    )
    greenbelt = ipyl.LocalTileLayer(path="implementation/greenbelt/{z}/{x}/{y}.png")
    gi_streettrees = ipyl.LocalTileLayer(
        path="implementation/gi_streettrees/{z}/{x}/{y}.png"
    )
    greenbuildings_streettrees = ipyl.LocalTileLayer(
        path="implementation/greenbuildings_streettrees/{z}/{x}/{y}.png"
    )
    gi_greenbelt = ipyl.LocalTileLayer(
        path="implementation/gi_greenbelt/{z}/{x}/{y}.png"
    )
    greenbuildings_greenbelt = ipyl.LocalTileLayer(
        path="implementation/greenbuildings_greenbelt/{z}/{x}/{y}.png"
    )
    greenbuildings_urbangreenareas_streettrees = ipyl.LocalTileLayer(
        path="implementation/greenbuildings_urbangreenareas_streettrees/{z}/{x}/{y}.png"
    )

    implementation_key = {
        "green_infrastructure": (
            gi,
            gi_greenbuildings,
            gi_urbangreenareas,
            gi_streettrees,
            gi_greenbelt,
        ),
        "green_buildings": (
            greenbuildings,
            gi_greenbuildings,
            greenbuildings_streettrees,
            greenbuildings_greenbelt,
            greenbuildings_urbangreenareas_streettrees,
        ),
        "street_trees": (
            streettrees,
            gi_streettrees,
            greenbuildings_streettrees,
            greenbuildings_urbangreenareas_streettrees,
        ),
        "urban_green_areas": (
            gi_urbangreenareas,
            greenbuildings_urbangreenareas_streettrees,
        ),
        "greenbelt": (greenbelt, gi_greenbelt, greenbuildings_greenbelt),
    }

    empty_layer = ipyl.Layer()

    map_emissions.add_layer(empty_layer)
    map_implementation.add_layer(empty_layer)

    map_emissions.layout.height = "99%"
    map_implementation.layout.height = "99%"

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

        layers_to_have = set()
        for input_layer in input_implementation:
            translation = implementation_key[input_layer]
            for translated in translation:
                layers_to_have.add(translated)

        for layer_present in layers[1:]:
            if layer_present not in layers_to_have:
                map_implementation.remove_layer(layer_present)

        for layer_to_add in layers_to_have:
            if layer_to_add not in layers:
                map_implementation.add_layer(layer_to_add)


app = App(app_ui, server, static_assets=assets_dir)
