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
                "gbi": "Green Infrastructure (GBI)",
                "greenbelt": "Greenbelt",
                "greenbuildings": "Green Buildings",
                "streettrees": "Street Trees",
                "urbangreenareas": "Urban Green Areas",
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

    residential = ipyl.LocalTileLayer(
        path="emissions/res/{z}/{x}/{y}.png", name="Residential"
    )
    industrial = ipyl.LocalTileLayer(
        path="emissions/ind/{z}/{x}/{y}.png", name="Industrial"
    )

    gbi = ipyl.LocalTileLayer(path="implementation/gbi/{z}/{x}/{y}.png", name="GBI")
    gbi_greenbelt = ipyl.LocalTileLayer(
        path="implementation/gbi_greenbelt/{z}/{x}/{y}.png", name="GBI x Greenbelt"
    )
    gbi_greenbuildings = ipyl.LocalTileLayer(
        path="implementation/gbi_greenbuildings/{z}/{x}/{y}.png",
        name="GBI x Green Buildings",
    )
    gbi_streettrees = ipyl.LocalTileLayer(
        path="implementation/gbi_streettrees/{z}/{x}/{y}.png", name="GBI x Street Trees"
    )
    gbi_urbangreenareas = ipyl.LocalTileLayer(
        path="implementation/gbi_urbangreenareas/{z}/{x}/{y}.png",
        name="GBI x Urban Green Areas",
    )
    greenbelt = ipyl.LocalTileLayer(
        path="implementation/greenbelt/{z}/{x}/{y}.png",
        name="Greenbelt",
    )
    greenbuildings = ipyl.LocalTileLayer(
        path="implementation/greenbuildings/{z}/{x}/{y}.png", name="Green Buildings"
    )
    greenbuildings_greenbelt = ipyl.LocalTileLayer(
        path="implementation/greenbuildings_greenbelt/{z}/{x}/{y}.png",
        name="Green Buildings x Greenbelt",
    )
    greenbuildings_streettrees = ipyl.LocalTileLayer(
        path="implementation/greenbuildings_streettrees/{z}/{x}/{y}.png",
        name="Green Buildings x Street Trees",
    )
    greenbuildings_urbangreenareas = ipyl.LocalTileLayer(
        path="implementation/greenbuildings_urbangreenareas/{z}/{x}/{y}.png",
        name="Green Buildings x Urban Green Areas",
    )
    greenbuildings_urbangreenareas_streettrees = ipyl.LocalTileLayer(
        path="implementation/greenbuildings_urbangreenareas_streettrees/{z}/{x}/{y}.png",
        name="Green Buildings x Urban Green Areas x Street Trees",
    )
    streettrees = ipyl.LocalTileLayer(
        path="implementation/streettrees/{z}/{x}/{y}.png",
        name="Street Trees",
    )
    urbangreenareas = ipyl.LocalTileLayer(
        path="implementation/urbangreenareas/{z}/{x}/{y}.png",
        name="Urban Green Areas ",
    )
    urbangreenareas_streettrees = ipyl.LocalTileLayer(
        path="implementation/greenbuildings_urbangreenareas_streettrees/{z}/{x}/{y}.png",
        name="Urban Green Areas x Street Trees",
    )

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
    )

    empty_layer = ipyl.Layer()

    map_implementation.add(geo_stockholm)

    map_emissions.add(empty_layer)
    map_implementation.add(empty_layer)

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
                map_emissions.substitute(layers[-1], residential)
            case "Industrial":
                map_emissions.substitute(layers[-1], industrial)
            case _:
                map_emissions.substitute(layers[-1], empty_layer)

    @reactive.Effect()
    def implementation():
        input_implementation = input.implementation()
        layers = tuple(map_implementation.layers)  # type: ignore

        match input_implementation:
            case ("gbi",):
                map_implementation.substitute(layers[-1], gbi)
            case ("gbi", "greenbelt"):
                map_implementation.substitute(layers[-1], gbi_greenbelt)
            case ("gbi", "greenbuildings"):
                map_implementation.substitute(layers[-1], gbi_greenbuildings)
            case ("gbi", "streettrees"):
                map_implementation.substitute(layers[-1], gbi_streettrees)
            case ("gbi", "urbangreenareas"):
                map_implementation.substitute(layers[-1], gbi_urbangreenareas)
            case ("greenbelt",):
                map_implementation.substitute(layers[-1], greenbelt)
            case ("greenbuildings",):
                map_implementation.substitute(layers[-1], greenbuildings)
            case ("greenbuildings", "greenbelt"):
                map_implementation.substitute(layers[-1], greenbuildings_greenbelt)
            case ("greenbuildings", "streettrees"):
                map_implementation.substitute(layers[-1], greenbuildings_streettrees)
            case ("greenbuildings", "urbangreenareas"):
                map_implementation.substitute(
                    layers[-1], greenbuildings_urbangreenareas
                )
            case ("greenbuildings", "urbangreenareas", "streettrees"):
                map_implementation.substitute(
                    layers[-1], greenbuildings_urbangreenareas_streettrees
                )
            case ("streettrees",):
                map_implementation.substitute(layers[-1], streettrees)
            case ("urbangreenareas",):
                map_implementation.substitute(layers[-1], urbangreenareas)
            case ("urbangreenareas", "streettrees"):
                map_implementation.substitute(layers[-1], urbangreenareas_streettrees)
            case _:
                map_implementation.substitute(layers[-1], empty_layer)


app = App(app_ui, server, static_assets=assets_dir)
