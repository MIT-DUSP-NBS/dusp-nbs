import React from 'react';
import { RContextType } from 'rlayers';
import {
  default as RLayer,
  RLayerProps,
} from '../../node_modules/rlayers/src/layer/RLayer';

import LayerTile from 'ol/layer/WebGLTile.js';
import { GeoTIFF } from 'ol/source';
import 'ol/ol.css';

/**
 * @propsfor RLayerGeoTIFF
 */
export interface RLayerGeoTIFFProps extends RLayerProps {
  /** URLs of the GeoTIFFs, there must be at least one */
  urls: string[];
}

/**
 * This example shows how to extend RLayers with a component
 * that renders a layer from a COG (Cloud-Optimized GeoTIFF)
 *
 * It implements the Openlayers example from
 * https://openlayers.org/en/latest/examples/cog.html
 *
 * Requires an `RMap` context
 */
class RLayerGeoTIFF extends RLayer<RLayerGeoTIFFProps> {
  declare ol: LayerTile;
  declare source: GeoTIFF;

  constructor(
    props: Readonly<RLayerGeoTIFFProps>,
    context?: React.Context<RContextType>,
  ) {
    super(props, context);
    this.createSource();
    this.ol = new LayerTile({ source: this.source });
    this.eventSources = [this.ol, this.source];
  }

  createSource(): void {
    this.source = new GeoTIFF({
      sources: this.props.urls.map((u) => ({ url: u })),
    });
    this.eventSources = [this.ol, this.source];
  }

  // This is needed only if you want to automatically import
  // the GeoTIFF metadata into a View
  componentDidMount(): void {
    super.componentDidMount();
    this.context.map.setView(this.source.getView());
  }

  refresh(prevProps?: RLayerGeoTIFFProps): void {
    super.refresh(prevProps);
    if (
      prevProps?.urls?.length === this.props.urls.length &&
      this.props.urls.every((e, i) => e === prevProps?.urls?.[i])
    )
      return;

    this.createSource();
    this.ol.setSource(this.source);
    // Call this after replacing a source
    this.attachOldEventHandlers(this.source);
  }
}

export default RLayerGeoTIFF;
