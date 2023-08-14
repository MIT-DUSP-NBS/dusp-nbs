import pickle
from pathlib import Path

import blosc
import numpy as np
import rasterio
import rasterio.enums
from matplotlib import pyplot as plt

assets_dir = Path(__file__).parent / "assets"

transport_tif = assets_dir / "interactive" / "transportation.tif"
population_tif = assets_dir / "interactive" / "population.tif"
landcover_tif = assets_dir / "interactive" / "landcover.tif"

with rasterio.open(landcover_tif) as benchmark_dataset:
    tif_height = int(benchmark_dataset.height)
    tif_width = int(benchmark_dataset.width)
    tif_crs = benchmark_dataset.crs
    tif_transform = benchmark_dataset.transform

with rasterio.open(transport_tif) as transport_dataset:
    transport_array = transport_dataset.read(
        1,
        out_shape=(
            transport_dataset.count,
            tif_height,
            tif_width,
        ),
        resampling=rasterio.enums.Resampling.bilinear,
    )

with rasterio.open(population_tif) as population_dataset:
    population_array = population_dataset.read(
        1,
        out_shape=(
            population_dataset.count,
            tif_height,
            tif_width,
        ),
        resampling=rasterio.enums.Resampling.bilinear,
    )


def calculate_new_interactive(
    transport_prob: float,
    population_prob: float,
):
    transport = np.copy(transport_array)
    population = np.copy(population_array)

    transport_bar = np.nanquantile(transport, transport_prob)
    population_bar = np.nanquantile(population, population_prob)

    transport[transport < transport_bar] = 0
    transport[transport >= transport_bar] = 1
    population[population <= population_bar] = 0
    population[population > population_bar] = 1

    added = transport + population
    added[added < 2] = 0
    added[added == 2] = 1
    return added


for transport_prob in range(0, 101, 10):
    for population_prob in range(0, 101, 10):
        print(f"Generating {transport_prob}_{population_prob}.pkl.dat...")
        new_interactive = calculate_new_interactive(
            transport_prob / 100,
            population_prob / 100,
        )
        plot = plt.imshow(new_interactive, cmap="gray", vmin=0, vmax=1)
        plot_data = pickle.dumps(plot)
        compressed_plot = blosc.compress(plot_data)
        with open(
            assets_dir
            / "interactive"
            / "plots"
            / f"{transport_prob}_{population_prob}.pkl.dat",
            "wb",
        ) as f:
            f.write(
                compressed_plot,
            )
        plt.close()
        print(f"Done generating {transport_prob}_{population_prob}.pkl.dat!")
        # plt.savefig(
        #     assets_dir
        #     / "interactive"
        #     / "plots"
        #     / f"{transport_prob}_{population_prob}.png"
        # )

print("Done!")
