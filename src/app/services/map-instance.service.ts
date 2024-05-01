import { Injectable, OnDestroy } from '@angular/core';
import { IMapInit, MapService } from './map.service';
import L from 'leaflet';
import { IRealm } from '../interfaces/realm.interface';
import { EventService } from './event.service';
import { SubscriptionBag } from '../helpers/subscription-bag';

@Injectable()
export class MapInstanceService implements OnDestroy {
  _map?: L.Map;
  _subs = new SubscriptionBag();

  get map(): L.Map {
    if (!this._map) { throw new Error('Map not initialized.'); }
    return this._map;
  }

  constructor(
    private readonly _eventService: EventService,
    private readonly _mapService: MapService
  ) {
    this._subs.add(_eventService.menuFolded.subscribe(() => { this.invalidate(); }));
  }

  initialize(htmlElement: HTMLElement, options?: IMapInit): L.Map {
    if (this._map) { throw new Error('Map already initialized.'); }
    if (options?.fromQuery) { options = this.loadParamsFromQuery(); }
    this._map = this._mapService.createMap(htmlElement, options);
    return this._map;
  }

  isInitialized(): boolean {
    return !!this._map;
  }

  on(event: string, func: any): void {
    this.map.on(event, func);
  }

  enable(): void {
    const map = this.map;
    map.scrollWheelZoom.enable();
    map.doubleClickZoom.enable();
    map.boxZoom.enable();
    map.keyboard.enable();
    map.touchZoom.enable();
    map.dragging.enable();
  }

  disable(): void {
    const map = this.map;
    map.zoomControl?.remove();
    map.scrollWheelZoom.disable();
    map.doubleClickZoom.disable();
    map.boxZoom.disable();
    map.keyboard.disable();
    map.touchZoom.disable();
    map.dragging.disable();
  }

  // #region Map state

  invalidate(): void {
    this.map.invalidateSize();
  }

  loadParamsFromQuery(): IMapInit {
    const searchParams = new URL(location.href).searchParams;
    const x = +(searchParams.get('x') || 270);
    const y = +(searchParams.get('y') || -270);
    const z = +(searchParams.get('z') || 0);
    return {
      view: [y, x],
      zoom: z,
      zoomPanOptions: { animate: false, duration: 0 }
    };
  }

  saveParamsToQuery(): void {
    const url = new URL(location.href);
    const c = this._map?.getCenter();
    if (!c) { return; }
    url.searchParams.set('x', `${Math.floor(c.lng)}`);
    url.searchParams.set('y', `${Math.floor(c.lat)}`);
    url.searchParams.set('z', `${this._map!.getZoom()}`);
    window.history.replaceState(window.history.state, '', url.pathname + url.search);
  }

  saveParamsToQueryOnMove(): void {
    this.on('moveend', () => this.saveParamsToQuery());
  }

  // #endregion

  // #region Realms

  showRealm(realm: IRealm, options: { showBoundary?: boolean, showLabel?: boolean, onClick?: (evt: L.LeafletMouseEvent) => void }): L.LayerGroup {
    const map = this.map;
    const layer = L.layerGroup().addTo(map);

    const mapData = realm.mapData;
    if (!mapData) { return layer; }

    if (options.showBoundary && mapData.boundary) {
      // Add boundary
      const poly = L.polygon(mapData.boundary, { color: mapData.boundaryColor || '#ff8a00', weight: 1, fillOpacity: 0 });
      poly.addTo(layer);

      // Add click event.
      options.onClick && poly.addEventListener('click', evt => { options.onClick!(evt); });

      // Add label
      if (options.showLabel) {
        const className = `map-label-realm map-label-realm-${mapData.boundaryLabelAlign || 'center'}`;
        L.marker(mapData.boundary[0], {
          icon: L.divIcon({
            className,
            html: `<span>${realm.name}</span>`
          })
        }).addTo(layer);
      }
    }

    return layer;
  }

  // #endregion

  ngOnDestroy(): void {
    this._subs.unsubscribe();
    this._map?.off();
    this._map?.remove();
    this._map = undefined;
  }
}
