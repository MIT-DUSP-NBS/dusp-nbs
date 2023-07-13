from pathlib import Path

import geopandas as gpd
import ipyleaflet as ipyl
from ipywidgets import Layout
from shiny import App, experimental, reactive, ui
from shinywidgets import output_widget, register_widget

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
    ui.nav_spacer(),
    ui.nav_control(
        ui.a(
            ui.tags.i({"class": "bi bi-github"}),
            href="https://github.com/dtemkin1/dusp-nbs",
            target="_blank",
        ),
    ),
    ui.nav_control(
        ui.a(
            ui.tags.i({"class": "bi bi-mortarboard-fill"}),
            href="https://doi.org/10.21203/rs.3.rs-2399348/v1",
            target="_blank",
        ),
    ),
    header=ui.tags.style(
        "@import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css');"
    ),
    title="Nature-Based Solutions Dashboard",
    inverse=True,
    fillable_mobile=True,
    lang="en",
    window_title="Nature-Based Solutions Dashboard",
)


def server(input, output, session):
    map_layout = Layout(height="96%")

    implemetation_legend = ipyl.LegendControl(
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

    residential = ipyl.LocalTileLayer(
        path="emissions/res/{z}/{x}/{y}.png", name="Residential"
    )
    industrial = ipyl.LocalTileLayer(
        path="emissions/ind/{z}/{x}/{y}.png", name="Industrial"
    )

    gbi = ipyl.LocalTileLayer(path="implementation/gbi/{z}/{x}/{y}.png", name="GBI")
    greenbuildings = ipyl.LocalTileLayer(
        path="implementation/greenbuildings/{z}/{x}/{y}.png", name="Green Buildings"
    )
    gbi_greenbuildings = ipyl.LocalTileLayer(
        path="implementation/gbi_greenbuildings/{z}/{x}/{y}.png",
        name="GBI x Green Buildings",
    )
    streettrees = ipyl.LocalTileLayer(
        path="implementation/streettrees/{z}/{x}/{y}.png",
        name="Street Trees",
    )
    gbi_urbangreenareas = ipyl.LocalTileLayer(
        path="implementation/gbi_urbangreenareas/{z}/{x}/{y}.png",
        name="GBI x Urban Green Areas",
    )
    greenbelt = ipyl.LocalTileLayer(
        path="implementation/greenbelt/{z}/{x}/{y}.png",
        name="Greenbelt",
    )
    gbi_streettrees = ipyl.LocalTileLayer(
        path="implementation/gbi_streettrees/{z}/{x}/{y}.png", name="GBI x Street Trees"
    )
    greenbuildings_streettrees = ipyl.LocalTileLayer(
        path="implementation/greenbuildings_streettrees/{z}/{x}/{y}.png",
        name="Green Buildings x Street Trees",
    )
    gbi_greenbelt = ipyl.LocalTileLayer(
        path="implementation/gbi_greenbelt/{z}/{x}/{y}.png", name="GBI x Greenbelt"
    )
    greenbuildings_greenbelt = ipyl.LocalTileLayer(
        path="implementation/greenbuildings_greenbelt/{z}/{x}/{y}.png",
        name="Green Buildings x Greenbelt",
    )
    greenbuildings_urbangreenareas_streettrees = ipyl.LocalTileLayer(
        path="implementation/greenbuildings_urbangreenareas_streettrees/{z}/{x}/{y}.png",
        name="Green Buildings x Urban Green Areas x Street Trees",
    )

    implementation_key = {
        "green_infrastructure": (
            gbi,
            gbi_greenbuildings,
            gbi_urbangreenareas,
            gbi_streettrees,
            gbi_greenbelt,
        ),
        "green_buildings": (
            greenbuildings,
            gbi_greenbuildings,
            greenbuildings_streettrees,
            greenbuildings_greenbelt,
            greenbuildings_urbangreenareas_streettrees,
        ),
        "street_trees": (
            streettrees,
            gbi_streettrees,
            greenbuildings_streettrees,
            greenbuildings_urbangreenareas_streettrees,
        ),
        "urban_green_areas": (
            gbi_urbangreenareas,
            greenbuildings_urbangreenareas_streettrees,
        ),
        "greenbelt": (greenbelt, gbi_greenbelt, greenbuildings_greenbelt),
    }

    geo_stockholm = ipyl.GeoData(
        geo_dataframe=gpd.read_file(assets_dir / "county/county.shp").to_crs(4326),
        name="Stockholm County Boundary",
        style={"color": "white", "fillOpacity": "0.00"},
    )

    map_emissions = ipyl.Map(
        basemap=ipyl.basemaps.Esri.WorldImagery,  # type: ignore
        zoom=9,
        center=(59.3293, 18.0686),
        max_zoom=13,
        scroll_wheel_zoom=True,
        layout=map_layout,
    )

    map_implementation = ipyl.Map(
        basemap=ipyl.basemaps.Esri.WorldImagery,  # type: ignore
        zoom=9,
        center=(59.3293, 18.0686),
        max_zoom=13,
        scroll_wheel_zoom=True,
        layout=map_layout,
        controls=[implemetation_legend],
    )

    map_emissions.add(ipyl.Layer())
    map_implementation.add(geo_stockholm)

    register_widget("map_emissions", map_emissions)
    register_widget("map_implementation", map_implementation)

    start_modal = ui.modal(
        (
            "Hi there! This project is a work in progress, please contact ",
            ui.a("Diego Temkin", href="mailto:dtemkin@mit.edu"),
            " if you experience any errors or if you have any suggestions.",
        ),
        easy_close=True,
    )

    ui.modal_show(start_modal)

    @reactive.Effect()
    def emmissions():
        input_emissions = input.emissions()
        layers = tuple(map_emissions.layers)  # type: ignore

        match input_emissions:
            case "Residential":
                map_emissions.substitute(
                    layers[-1],
                    residential,
                )
            case "Industrial":
                map_emissions.substitute(
                    layers[-1],
                    industrial,
                )
            case _:
                map_emissions.substitute(layers[-1], ipyl.Layer())

    @reactive.Effect()
    def implementation():
        input_implementation = input.implementation()
        layers = tuple(map_implementation.layers)  # type: ignore

        layers_to_have = set(
            translated
            for input_layer in input_implementation
            for translated in implementation_key[input_layer]
        )

        for layer_present in layers[2:]:
            if layer_present not in layers_to_have:
                map_implementation.remove(layer_present)

        for layer_to_add in layers_to_have:
            if layer_to_add not in layers:
                map_implementation.add(layer_to_add)


app = App(app_ui, server, static_assets=assets_dir)
