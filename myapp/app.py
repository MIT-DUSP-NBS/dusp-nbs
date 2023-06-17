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
            output_widget("map")
        ),
    )
)


def server(input, output, session):
    map = Map(center=(51.476852, -0.000500), zoom=12, scroll_wheel_zoom=True)
    register_widget("map", map)

app = App(app_ui, server)
