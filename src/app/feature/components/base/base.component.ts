import {
  ChangeDetectorRef,
  Component,
  HostBinding,
  Input,
  OnDestroy,
  AfterContentChecked,
} from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { OverlayContainer } from '@angular/cdk/overlay';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'ai-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
})
export class BaseComponent implements OnDestroy, AfterContentChecked {
  @HostBinding('class') className = '';
  @Input() theme: boolean | undefined;
  mobileQuery: MediaQueryList;

  private readonly _mobileQueryListener: () => void;

  constructor(
    media: MediaMatcher,
    public overlay: OverlayContainer,
    private change: ChangeDetectorRef,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => change.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
    this.loadIcon();
  }

  ngAfterContentChecked(): void {
    this.change.detectChanges();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }

  changeClassName(state: string): void {
    this.className = state;
  }

  loadIcon(): void {
    this.iconRegistry('push_pin', 'assets/img/svg/push_pin_outline.svg');
  }

  iconRegistry(iconName: string, url: string): void {
    this.matIconRegistry.addSvgIcon(
      iconName,
      this.domSanitizer.bypassSecurityTrustResourceUrl(url)
    );
  }
}
