from pathlib import Path
import shinyswatch
import geopandas as gpd
import ipyleaflet as ipyl
from ipywidgets import Layout
from shiny import App, experimental, reactive, ui
from shinywidgets import output_widget, register_widget

assets_dir = Path(__file__).parent / "assets"

overview = (
    ui.h1("Overview"),
    ui.p(
        "Urban areas contribute more than 60% of global greenhouse gas (GHG) emissions,"
        " through residential, commercial, and transportation activities. Nature-based "
        "solutions (NbS) are increasingly being adopted by cities worldwide to enhance "
        "carbon sequestration, offsets emissions, and promotes sustainable land "
        "management practices, thus contributing to global climate change mitigation "
        "efforts."
    ),
    ui.p(
        "Realistic NbS implementation plans toward carbon neutrality, such as "
        "restoring natural ecosystems and increasing urban green resources,  need to be"
        " both effective in mitigating carbon emissions at the global level and "
        "suitable for the socio-economic and physical conditions at the local level. "
        "Prioritizing suitable sites and solutions can enhance the long-term viability "
        "of NbS. In our research, we have explored a systematic approach to spatially "
        "prioritizing different types of NbS implementations in multiple major EU "
        "cities."
    ),
    ui.p(
        "The motivation for developing this tool is to offer the necessary flexibility "
        "for NbS planning, by enabling users to interact and iterate through our "
        "spatial allocation processes. Successful adoption of NbS and realization of "
        "their functionality requires a holistic and collaborative planning approach "
        "that incorporates stakeholders across scales and disciplines. This platform "
        "aims to serve as a point of departure to facilitate the identifying suitable "
        "interventions and enhancing the awareness of NbS opportunities in urban "
        "settings."
    ),
    ui.tags.figure(
        {"class": "figure"},
        ui.img({"class": "figure-img img-fluid"}, src="https://raw.githubusercontent.com/dtemkin1/dusp-nbs/main/assets/figures/overview.png"),
        ui.tags.figcaption(
            {"class": "figure-caption"}, "Potential pathways of NbS to reduce emissions"
        ),
    ),
)

nbs_allocation = (
    ui.h1("NbS Spatial Allocation"),
    ui.p(
        "We selected five types of NbS (green infrastructure (GI), street trees & green"
        " pavements, urban green spaces & agriculture, habitat preservation & "
        "remediation, and green buildings) as our study objectives. From established "
        "definitions of NbS in the literature, we identified the level of benefit of "
        "different types of NbS at different urban settings and synthesized "
        "quantitative indicators to describe the impact of NbS on sectoral carbon "
        "emissions."
    ),
    ui.tags.figure(
        {"class": "figure"},
        ui.img({"class": "figure-img img-fluid"}, src="https://raw.githubusercontent.com/dtemkin1/dusp-nbs/main/assets/figures/nbs_1.png"),
        ui.tags.figcaption(
            {"class": "figure-caption"},
            "Comparative summary of NbS impacts to sectoral emissions",
        ),
    ),
    ui.p(
        "The NbS implementations were spatially allocated based on three major factors:"
        " the sectoral carbon emission, potential NbS benefits, and the local context "
        "of each location. For example, street trees & green pavements as an NbS to "
        "promote walking and cycling should ideally be located along city roads in high"
        "-density urban areas, while preserved habitats should be located at the urban "
        "fringe where new urban developments are likely to occur. We have developed "
        "practical principles and criteria that systematically guide the spatial "
        "allocations of each type of NbS."
    ),
    ui.tags.figure(
        {"class": "figure"},
        ui.img({"class": "figure-img img-fluid"}, src="https://raw.githubusercontent.com/dtemkin1/dusp-nbs/main/assets/figures/nbs_2.png"),
    ),
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

interactive = None

about = ui.tags.table(
    {"class": "table"},
    ui.tags.caption("Key variables and data sources used in the analysis"),
    ui.tags.thead(
        ui.tags.tr(
            ui.tags.th({"scope": "col"}, "Type"),
            ui.tags.th({"scope": "col"}, "Description"),
            ui.tags.th({"scope": "col"}, "Data Source"),
            ui.tags.th({"scope": "col"}, "Year"),
            ui.tags.th({"scope": "col"}, "Available"),
        )
    ),
    ui.tags.tbody(
        ui.tags.tr(
            ui.tags.td("Emissions"),
            ui.tags.td("CO2 emissions by sector"),
            ui.tags.td("Global Carbon Grid"),
            ui.tags.td("2019"),
            ui.tags.td(
                ui.a(
                    "Click here!",
                    href="http://gidmodel.org.cn/?page_id=1425",
                    target="_blank",
                )
            ),
        ),
        ui.tags.tr(
            ui.tags.td("Residential development"),
            ui.tags.td("Urban fabric density"),
            ui.tags.td("Urban Atlas via Copernicus"),
            ui.tags.td("2018"),
            ui.tags.td(
                ui.a(
                    "Click here!",
                    href="https://land.copernicus.eu/local/urban-atlas/"
                    "urban-atlas-2018",
                    target="_blank",
                )
            ),
        ),
        ui.tags.tr(
            ui.tags.td("Population"),
            ui.tags.td("Population per cell"),
            ui.tags.td("Global Carbon Grid"),
            ui.tags.td("2019"),
            ui.tags.td(
                ui.a(
                    "Click here!",
                    href="https://ec.europa.eu/eurostat/web/gisco/geodata/"
                    "reference-data/population-distribution-demography/geostat",
                    target="_blank",
                )
            ),
        ),
        ui.tags.tr(
            ui.tags.td("Building density"),
            ui.tags.td("Urban fabric density classifications"),
            ui.tags.td("Urban Atlas via Copernicus"),
            ui.tags.td("2018"),
            ui.tags.td(
                ui.a(
                    "Click here!",
                    href="https://land.copernicus.eu/local/urban-atlas/"
                    "urban-atlas-2018",
                    target="_blank",
                )
            ),
        ),
        ui.tags.tr(
            ui.tags.td("Transportation"),
            ui.tags.td("Roadway network with classification and speed"),
            ui.tags.td("OpenStreet Map"),
            ui.tags.td("2017"),
            ui.tags.td(
                ui.a(
                    "Click here!",
                    href="https://www.openstreetmap.org/#map=5/62.994/17.637",
                    target="_blank",
                )
            ),
        ),
        ui.tags.tr(
            ui.tags.td("Industry"),
            ui.tags.td("Industrial, commercial, public, military and private units"),
            ui.tags.td("Urban Atlas via Copernicus"),
            ui.tags.td("2018"),
            ui.tags.td(
                ui.a(
                    "Click here!",
                    href="https://land.copernicus.eu/local/urban-atlas/"
                    "urban-atlas-2018",
                    target="_blank",
                )
            ),
        ),
        ui.tags.tr(
            ui.tags.td("City boundaries"),
            ui.tags.td("Functional urban area boundaries"),
            ui.tags.td("European Commission"),
            ui.tags.td("2015"),
            ui.tags.td(
                ui.a(
                    "Click here!",
                    href="https://data.jrc.ec.europa.eu/dataset/"
                    "jrc-luisa-ui-boundaries-fua",
                    target="_blank",
                )
            ),
        ),
    ),
)

app_ui = experimental.ui.page_navbar(
    shinyswatch.theme.litera(),
    ui.nav("Overview", overview),
    ui.nav("NbS Spatial Allocation", nbs_allocation),
    ui.nav("Implementation Visualization", implementation_visualization),
    ui.nav_control(ui.input_action_link("wip_notif", "Interactive NbS Planning")),
    ui.nav("About the Tool", about),
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
        "@import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/"
        "font/bootstrap-icons.css');"
    ),
    title="Nature-Based Solutions Dashboard",
    inverse=True,
    bg="#4582ec",
    fillable_mobile=True,
    lang="en",
    window_title="Nature-Based Solutions Dashboard",
)


def server(input, output, session):
    map_layout = Layout(height="96%")

    gbi = ipyl.TileLayer(
        url="https://raw.githubusercontent.com/dtemkin1/dusp-nbs/main/assets/"
        "implementation/gbi/{z}/{x}/{y}.png",
        name="GBI",
    )
    gbi_greenbelt = ipyl.TileLayer(
        url="https://raw.githubusercontent.com/dtemkin1/dusp-nbs/main/assets/"
        "implementation/gbi_greenbelt/{z}/{x}/{y}.png",
        name="GBI x Greenbelt",
    )
    gbi_greenbuildings = ipyl.TileLayer(
        url="https://raw.githubusercontent.com/dtemkin1/dusp-nbs/main/assets/"
        "implementation/gbi_greenbuildings/{z}/{x}/{y}.png",
        name="GBI x Green Buildings",
    )
    gbi_streettrees = ipyl.TileLayer(
        url="https://raw.githubusercontent.com/dtemkin1/dusp-nbs/main/assets/"
        "implementation/gbi_streettrees/{z}/{x}/{y}.png",
        name="GBI x Street Trees",
    )
    gbi_urbangreenareas = ipyl.TileLayer(
        url="https://raw.githubusercontent.com/dtemkin1/dusp-nbs/main/assets/"
        "implementation/gbi_urbangreenareas/{z}/{x}/{y}.png",
        name="GBI x Urban Green Areas",
    )
    greenbelt = ipyl.TileLayer(
        url="https://raw.githubusercontent.com/dtemkin1/dusp-nbs/main/assets/"
        "implementation/greenbelt/{z}/{x}/{y}.png",
        name="Greenbelt",
    )
    greenbuildings = ipyl.TileLayer(
        url="https://raw.githubusercontent.com/dtemkin1/dusp-nbs/main/assets/"
        "implementation/greenbuildings/{z}/{x}/{y}.png",
        name="Green Buildings",
    )
    greenbuildings_greenbelt = ipyl.TileLayer(
        url="https://raw.githubusercontent.com/dtemkin1/dusp-nbs/main/assets/"
        "implementation/greenbuildings_greenbelt/{z}/{x}/{y}.png",
        name="Green Buildings x Greenbelt",
    )
    greenbuildings_streettrees = ipyl.TileLayer(
        url="https://raw.githubusercontent.com/dtemkin1/dusp-nbs/main/assets/"
        "implementation/greenbuildings_streettrees/{z}/{x}/{y}.png",
        name="Green Buildings x Street Trees",
    )
    greenbuildings_urbangreenareas = ipyl.TileLayer(
        url="https://raw.githubusercontent.com/dtemkin1/dusp-nbs/main/assets/"
        "implementation/greenbuildings_urbangreenareas/{z}/{x}/{y}.png",
        name="Green Buildings x Urban Green Areas",
    )
    greenbuildings_urbangreenareas_streettrees = ipyl.TileLayer(
        url="https://raw.githubusercontent.com/dtemkin1/dusp-nbs/main/assets/"
        "implementation/greenbuildings_urbangreenareas_streettrees/{z}/{x}/{y}.png",
        name="Green Buildings x Urban Green Areas x Street Trees",
    )
    streettrees = ipyl.TileLayer(
        url="https://raw.githubusercontent.com/dtemkin1/dusp-nbs/main/assets/"
        "implementation/streettrees/{z}/{x}/{y}.png",
        name="Street Trees",
    )
    urbangreenareas = ipyl.TileLayer(
        url="https://raw.githubusercontent.com/dtemkin1/dusp-nbs/main/assets/"
        "implementation/urbangreenareas/{z}/{x}/{y}.png",
        name="Urban Green Areas ",
    )
    urbangreenareas_streettrees = ipyl.TileLayer(
        url="https://raw.githubusercontent.com/dtemkin1/dusp-nbs/main/assets/"
        "implementation/greenbuildings_urbangreenareas_streettrees/"
        "{z}/{x}/{y}.png",
        name="Urban Green Areas x Street Trees",
    )

    geo_stockholm = ipyl.GeoData(
        geo_dataframe=gpd.read_file("https://raw.githubusercontent.com/dtemkin1/dusp-nbs/main/assets/implementation/county/county.shp"
        ).to_crs(4326),
        name="Stockholm County Boundary",
        style={"color": "white", "fillOpacity": "0.00"},
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
    map_implementation.add(empty_layer)

    register_widget("map_implementation", map_implementation)

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

        @reactive.Effect
        @reactive.event(input.wip_notif)
        def _():
            ui.notification_show("This is a work in progress. Check back later!")


app = App(app_ui, server, static_assets=assets_dir)
