import { Component } from '@angular/core'
import { MatIconRegistry, MatIcon } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { DateHelper } from './helpers/date-helper';
import { EventService } from './services/event.service';
import { DateTime } from 'luxon';
import { filter } from 'rxjs';
import { BroadcastService } from './services/broadcast.service';
import { NavigationEnd, Router, RouterOutlet, RouterLink } from '@angular/router';
import { CanonicalService } from './services/canonical.service';
import { OverlayComponent } from "./components/layout/overlay/overlay.component";
import { KeyboardShortcutsComponent } from "./components/settings/keyboard-shortcuts/keyboard-shortcuts.component";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less'],
    standalone: true,
    imports: [MatIcon, RouterOutlet, RouterLink, OverlayComponent, KeyboardShortcutsComponent]
})
export class AppComponent {
  showDataLoss = false;
  showKeyboardShortcuts = false;
  isPagesDev = location.host === 'sky-planner.pages.dev'; // only target main deployment.
  pagesRedirectUrl?: URL;

  constructor(
    private readonly _broadcastService: BroadcastService,
    private readonly _canonicalService: CanonicalService,
    private readonly _eventService: EventService,
    private readonly _domSanitizer: DomSanitizer,
    private readonly _matIconRegistry: MatIconRegistry,
    private readonly _router: Router
  ) {
    this.initDisplayDate();
    _matIconRegistry.setDefaultFontSetClass('material-symbols-outlined');
    _matIconRegistry.addSvgIconSet(_domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/icons.svg'));

    _eventService.keydown.subscribe(evt => { this.onKeydown(evt); });

    _eventService.storageChanged.pipe(filter(e => e.key === 'date.format')).subscribe(() => {
      this.initDisplayDate();
    });

    _broadcastService.subject.pipe(filter(m => m.type === 'storage.changed')).subscribe(message => {
      this.showDataLoss = true;
    });

    if (this.isPagesDev) {
      this.subscribePagesDev();
    }

    (window as any).DateTime = DateTime;
  }

  initDisplayDate(): void {
    DateHelper.displayFormat = localStorage.getItem('date.format') || '';
    if (!DateHelper.displayFormat || !DateHelper.displayFormats.includes(DateHelper.displayFormat)) {
      DateHelper.displayFormat = DateHelper.displayFormats[0];
    }
  }

  private onKeydown(evt: KeyboardEvent): void {
    if (evt.ctrlKey && evt.shiftKey && evt.key.toUpperCase() === 'F') {
      if ((this._router.url.split('?')[0] || '/') === '/') { return; }
      void this._router.navigate(['/'], { skipLocationChange: false, queryParams: { focus: '1' } });
      return;
    }

    if (evt.key === '?' && false) {
      this.showKeyboardShortcuts = !this.showKeyboardShortcuts;
    }
  }

  private subscribePagesDev(): void {
    this.pagesRedirectUrl = new URL('https://sky-planner.com');
    this._router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(e => {
      this.pagesRedirectUrl = new URL('https://sky-planner.com');
      this.pagesRedirectUrl.pathname = location.pathname;
    });
  }
}
