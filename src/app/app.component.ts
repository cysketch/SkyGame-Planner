import { Component } from '@angular/core'
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ISpiritTree } from './interfaces/constellation.interface';
import { DataService } from './services/data.service';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'SkyGame-Planner';

  spiritTrees?: Array<ISpiritTree>;

  constructor(
    private readonly _dataService: DataService,
    private readonly _storageService: StorageService,
    private readonly _domSanitizer: DomSanitizer,
    private readonly _matIconRegistry: MatIconRegistry
  ) {
    this._dataService.onData.subscribe(() => { this.onData(); });
    _matIconRegistry.addSvgIconSet(_domSanitizer.bypassSecurityTrustResourceUrl('/assets/icons/icons.svg'));
  }

  onData(): void {
    this.spiritTrees = this._dataService.spiritTreeConfig.items;
  }
}
