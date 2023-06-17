from shiny import App, render, ui
from shinywidgets import register_widget, output_widget
from ipyleaflet import Map, basemaps

app_ui = ui.page_fluid(
    ui.panel_title("Nature-Based Solutions Dashboard to Support Carbon Neutrality in Major EU Cities"),
    ui.layout_sidebar(
        ui.panel_sidebar(
            ui.h2("Test!"),
            ui.p("This is where all the sliders and things to configure the map will go :)"),
        ),
        ui.panel_main(
            output_widget("m")
        ),
    )
)


def server(input, output, session):
    center = [38.128, 2.588] # FOR TESTING
    zoom = 5 # FOR TESTING
    m = Map(
        basemap=basemaps.Gaode.Satellite,
        center=center,
        zoom=zoom,
    )
    register_widget("m", m)



app = App(app_ui, server)
