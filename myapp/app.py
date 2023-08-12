import io
import json
from pathlib import Path

import ipyleaflet as ipyl
from faicons import icon_svg
from ipywidgets import Layout
from shiny import App, Inputs, Outputs, Session, experimental, reactive, ui
from shinywidgets import output_widget, register_widget

try:
    import osgeo
except ImportError:
    osgeo = None
    print("osgeo was not imported. Please try again.")

try:
    import rasterio
except ImportError:
    rasterio = None
    print("rasterio was not imported. Please try again.")

assets_dir = Path(__file__).parent / "assets"

app_ui = experimental.ui.page_navbar(
    ui.nav(
        "Overview",
        (
            ui.h1("Overview"),
            ui.p(
                "Urban areas contribute more than 60% of global greenhouse gas (GHG)"
                " emissions, through residential, commercial, and transportation"
                " activities. Nature-based solutions (NbS) are increasingly being"
                " adopted by cities worldwide to enhance carbon sequestration, offsets"
                " emissions, and promotes sustainable land management practices, thus"
                " contributing to global climate change mitigation efforts."
            ),
            ui.p(
                "Realistic NbS implementation plans toward carbon neutrality, such as"
                " restoring natural ecosystems and increasing urban green resources,"
                " need to be both effective in mitigating carbon emissions at the"
                " global level and suitable for the socio-economic and physical"
                " conditions at the local level. Prioritizing suitable sites and"
                " solutions can enhance the long-term viability of NbS. In our"
                " research,we have explored a systematic approach to spatially"
                " prioritizing different types of NbS implementations in multiple major"
                " EU cities."
            ),
            ui.p(
                "The motivation for developing this tool is to offer the necessary"
                " flexibility for NbS planning, by enabling users to interact and"
                " iterate through our spatial allocation processes. Successful adoption"
                " of NbS and realization of their functionality requires a holistic and"
                " collaborative planning approach that incorporates stakeholders across"
                " scales and disciplines. This platform aims to serve as a point of"
                " departure to facilitate the identifying suitable interventions and"
                " enhancing the awareness of NbS opportunities in urban settings."
            ),
            ui.tags.figure(
                {"class": "figure"},
                ui.img(
                    {"class": "figure-img img-fluid"},
                    src="figures/overview.png",
                ),
                ui.tags.figcaption(
                    {"class": "figure-caption"},
                    "Potential pathways of NbS to reduce emissions",
                ),
            ),
        ),
        value="overview",
    ),
    ui.nav(
        "NbS Spatial Allocation",
        (
            ui.h1("NbS Spatial Allocation"),
            ui.p(
                "We selected five types of NbS (green infrastructure (GI), street trees"
                " & green pavements, urban green spaces & agriculture, habitat"
                " preservation & remediation, and green buildings) as our study"
                " objectives. From established definitions of NbS in the literature, we"
                " identified the level of benefit of different types of NbS at"
                " different urban settings and synthesized quantitative indicators to"
                " describe the impact of NbS on sectoral carbon emissions."
            ),
            ui.tags.figure(
                {"class": "figure"},
                ui.img(
                    {"class": "figure-img img-fluid"},
                    src="figures/nbs_1.png",
                ),
                ui.tags.figcaption(
                    {"class": "figure-caption"},
                    "Comparative summary of NbS impacts to sectoral emissions",
                ),
            ),
            ui.p(
                "The NbS implementations were spatially allocated based on three major"
                " factors: the sectoral carbon emission, potential NbS benefits, and"
                " the local context of each location. For example, street trees & green"
                " pavements as an NbS to promote walking and cycling should ideally be"
                " located along city roads in high-density urban areas, while preserved"
                " habitats should be located at the urban fringe where new urban"
                " developments are likely to occur. We have developed practical"
                " principles and criteria that systematically guide the spatial"
                " allocations of each type of NbS."
            ),
            ui.tags.figure(
                {"class": "figure"},
                ui.img(
                    {"class": "figure-img img-fluid"},
                    src="figures/nbs_2.png",
                ),
            ),
        ),
        value="nbs_spacial_allocation",
    ),
    ui.nav(
        "Implementation Visualization",
        experimental.ui.layout_sidebar(
            experimental.ui.sidebar(
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
                ui.input_switch(
                    "boundary", label="Show Stockholm county boundary", value=True
                ),
                title="Green Infrastructure Visualization",
                open="open",
            ),
            experimental.ui.as_fill_item(output_widget("map_implementation")),
        ),
        value="implementation",
    ),
    ui.nav(
        "Interactive NbS Planning",
        experimental.ui.layout_sidebar(
            experimental.ui.sidebar(
                ui.input_slider(
                    "transport_emissions",
                    "High Transportation Emissions",
                    min=0,
                    max=100,
                    value=50,
                    post="%",
                ),
                ui.input_slider(
                    "population_density",
                    "High Population Density",
                    min=0,
                    max=100,
                    value=50,
                    post="%",
                ),
                ui.download_button(
                    "download_interactive",
                    "Download Rendered Map",
                    class_="btn-primary",
                ),
                title="Interactive NbS Planning",
            ),
            (
                "GDAL was not imported. Please try again."
                if osgeo is None
                else (
                    "Rasterio was not imported. Please try again."
                    if rasterio is None
                    else experimental.ui.as_fill_item(output_widget("map_interactive"))
                )
            ),
        ),
        value="interactive",
    ),
    ui.nav(
        "About the Tool",
        ui.tags.table(
            {"class": "table"},
            ui.tags.caption(
                "Typology: ",
                ui.a(
                    "Click here!",
                    href=(
                        "https://ec.europa.eu/eurostat/web/gisco/geodata/reference-"
                        "data/population-distribution-demography/geostat"
                    ),
                    target="_blank",
                ),
            ),
            ui.tags.thead(
                ui.tags.tr(
                    ui.tags.th({"scope": "col"}, "Infrastructure"),
                    ui.tags.th({"scope": "col"}, "Criteria"),
                )
            ),
            ui.tags.tbody(
                ui.tags.tr(
                    ui.tags.td("Street trees"),
                    ui.tags.td("High transport emissions AND High population density"),
                ),
                ui.tags.tr(
                    ui.tags.td("Green buildings"),
                    ui.tags.td(
                        "(High residential emission OR High industry emission) AND "
                        "Building rooftops"
                    ),
                ),
                ui.tags.tr(
                    ui.tags.td("Green infrastructure"),
                    ui.tags.td(
                        (
                            "(High residential emissions OR High industrial emissions)"
                            " AND Available land cover"
                        ),
                        ui.input_action_link("asterisk_one", "*"),
                        " AND (NOT existing preserved areas)",
                    ),
                ),
                ui.tags.tr(
                    ui.tags.td("Urban green areas"),
                    ui.tags.td(
                        (
                            "(High population density OR High built-up areas) AND"
                            " Available land cover"
                        ),
                        ui.input_action_link("asterisk_two", "**"),
                    ),
                ),
                ui.tags.tr(
                    ui.tags.td("Greenbelts"),
                    ui.tags.td("Low population density AND Existing preserved areas"),
                ),
            ),
        ),
        ui.tags.table(
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
                            href=(
                                "https://land.copernicus.eu/local/urban-atlas/urban-"
                                "atlas-2018"
                            ),
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
                            href=(
                                "https://ec.europa.eu/eurostat/web/gisco/geodata/"
                                "reference-data/population-distribution-demography/"
                                "geostat"
                            ),
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
                            href=(
                                "https://land.copernicus.eu/local/urban-atlas/urban-"
                                "atlas-2018"
                            ),
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
                    ui.tags.td(
                        "Industrial, commercial, public, military and private units"
                    ),
                    ui.tags.td("Urban Atlas via Copernicus"),
                    ui.tags.td("2018"),
                    ui.tags.td(
                        ui.a(
                            "Click here!",
                            href=(
                                "https://land.copernicus.eu/local/urban-atlas/urban-"
                                "atlas-2018"
                            ),
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
                            href=(
                                "https://data.jrc.ec.europa.eu/dataset/jrc-luisa-ui-"
                                "boundaries-fua"
                            ),
                            target="_blank",
                        )
                    ),
                ),
            ),
        ),
        value="about",
    ),
    ui.nav_spacer(),
    ui.nav_control(
        ui.a(
            icon_svg("github"),
            href="https://github.com/dtemkin1/dusp-nbs",
            target="_blank",
        ),
    ),
    ui.nav_control(
        ui.a(
            icon_svg("graduation-cap"),
            href="https://doi.org/10.1038/s41558-023-01737-x",
            target="_blank",
        ),
    ),
    title="Nature-Based Solutions Dashboard",
    fillable_mobile=True,
    lang="en",
    window_title="Nature-Based Solutions Dashboard",
    selected="overview",
)


def server(input: Inputs, output: Outputs, session: Session):
    gbi = ipyl.LocalTileLayer(
        path="implementation/gbi/{z}/{x}/{y}.png",
        name="GBI",
    )
    gbi_greenbelt = ipyl.LocalTileLayer(
        path="implementation/gbi_greenbelt/{z}/{x}/{y}.png",
        name="GBI x Greenbelt",
    )
    gbi_greenbuildings = ipyl.LocalTileLayer(
        path="implementation/gbi_greenbuildings/{z}/{x}/{y}.png",
        name="GBI x Green Buildings",
    )
    gbi_streettrees = ipyl.LocalTileLayer(
        path="implementation/gbi_streettrees/{z}/{x}/{y}.png",
        name="GBI x Street Trees",
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
        path="implementation/greenbuildings/{z}/{x}/{y}.png",
        name="Green Buildings",
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
        path=(
            "implementation/greenbuildings_urbangreenareas_streettrees/{z}/{x}/{y}.png"
        ),
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
        path=(
            "implementation/greenbuildings_urbangreenareas_streettrees/{z}/{x}/{y}.png"
        ),
        name="Urban Green Areas x Street Trees",
    )

    with open(assets_dir / "county.json", "r") as f:
        boundary_data = json.load(f)

    boundary_geojson = ipyl.GeoJSON(
        data=boundary_data,
        name="Stockholm County Boundary",
        style={"color": "white", "fillOpacity": "0.00"},
    )

    map_implementation = ipyl.Map(
        basemap=ipyl.basemaps.Esri.WorldImagery,  # type: ignore
        zoom=9,
        center=(59.3293, 18.0686),
        max_zoom=13,
        scroll_wheel_zoom=True,
        layout=Layout(height="96%"),
    )

    empty_boundary = ipyl.Layer()
    empty_overlay = ipyl.Layer()

    map_implementation.add(empty_boundary)
    map_implementation.add(empty_overlay)

    @reactive.Effect()
    @reactive.event(input.implementation)
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
                map_implementation.substitute(layers[-1], empty_overlay)

    @reactive.Effect
    @reactive.event(input.boundary)
    async def boundary():
        input_boundary = input.boundary()
        layers = tuple(map_implementation.layers)  # type: ignore

        if input_boundary:
            map_implementation.substitute(
                layers[1],
                boundary_geojson,
            )
        else:
            map_implementation.substitute(layers[1], empty_boundary)

    @reactive.Effect
    @reactive.event(input.asterisk_one)
    def _():
        m = ui.modal(
            (
                "Fairly broad category that includes parks, forests, wetlands,"
                " bioswales, permeable pavements, green corridors, and other natural or"
                " nature-based elements"
            ),
            ui.tags.ul(
                ui.tags.li("13400 Land without current use"),
                ui.tags.li("14100 Green urban areas"),
                ui.tags.li("23000 Pastures"),
                ui.tags.li("31000 Forests"),
                ui.tags.li(
                    "32000 Herbaceous vegetation associations (natural grassland,"
                    " moors...)"
                ),
                ui.tags.li("40000 Wetland"),
            ),
            title="Available land cover for GI",
            easy_close=True,
            footer=None,
        )
        ui.modal_show(m)

    @reactive.Effect
    @reactive.event(input.asterisk_two)
    def _():
        m = ui.modal(
            ui.tags.ul(
                ui.tags.li(
                    "11230 Discontinuous Low-Density Urban Fabric (S.L.: 10% "
                    "\u2013 30%)"
                ),
                ui.tags.li(
                    "11240 Discontinuous Very Low-Density Urban Fabric (S.L.: < 10%)"
                ),
                ui.tags.li("14100 Green urban areas"),
            ),
            title="Available land cover for Urban green areas",
            easy_close=True,
            footer=None,
        )
        ui.modal_show(m)

    register_widget("map_implementation", map_implementation)

    if osgeo is not None and rasterio is not None:
        map_interactive = ipyl.Map(
            basemap=ipyl.basemaps.Esri.WorldImagery,  # type: ignore
            zoom=9,
            center=(59.3293, 18.0686),
            max_zoom=13,
            scroll_wheel_zoom=True,
            layout=Layout(height="96%"),
        )

        empty_interactive = ipyl.Layer()
        map_interactive.add(empty_interactive)

        transport_tif = rasterio.open(
            assets_dir / "interactive" / "transport_emission.tif"
        )
        population_tif = rasterio.open(
            assets_dir / "interactive" / "pop_tot_stock_corine.tif"
        )

        print(transport_tif.name, population_tif.name)

        @reactive.Effect()
        @reactive.event(input.transport_emissions, input.population_density)
        def sliders():
            transport_slider = input.transport_emissions()
            population_slider = input.population_density()

            print(transport_slider, population_slider)

        @session.download(filename="map.tif")
        async def download_interactive():
            with io.BytesIO() as buf:
                yield buf.getvalue()

        register_widget("map_interactive", map_interactive)


app = App(app_ui, server, static_assets=assets_dir)
