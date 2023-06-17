from shiny import App, render, ui
from shinywidgets import output_widget, render_widget
import shinyswatch
from ipyleaflet import Map

app_ui = ui.page_fluid(
    ui.panel_title("Nature-Based Solutions Dashboard to Support Carbon Neutrality in Major EU Cities"),
    ui.layout_sidebar(
        ui.panel_sidebar(
            ui.h2("Test!"),
            ui.p("This is where all the sliders and things to configure the map will go :)")
        ),
        ui.panel_main(
            output_widget("map")
        ),
    ),
    
)


def server(input, output, session):
    @output
    @render_widget
    def map():
        m = Map()
        return m


app = App(app_ui, server)
