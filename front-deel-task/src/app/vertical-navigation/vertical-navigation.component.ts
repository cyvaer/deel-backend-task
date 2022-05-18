import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnChanges, OnDestroy, OnInit, Output, QueryList, Renderer2, SimpleChanges, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { animate, AnimationBuilder, AnimationPlayer, style } from '@angular/animations';
import { NavigationEnd, Router } from '@angular/router';
import { ScrollStrategy, ScrollStrategyOptions } from '@angular/cdk/overlay';
import { delay, filter, merge, ReplaySubject, Subject, Subscription, takeUntil } from 'rxjs';
// import { fuseAnimations } from '@fuse/animations';
// import { FuseNavigationItem, FuseVerticalNavigationAppearance, FuseVerticalNavigationMode, FuseVerticalNavigationPosition } from '@fuse/components/navigation/navigation.types';
// import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
// import { FuseScrollbarDirective } from '@fuse/directives/scrollbar/scrollbar.directive';
// import { FuseUtilsService } from '@fuse/services/utils/utils.service';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
  selector       : 'vertical-navigation',
  templateUrl    : './vertical-navigation.component.html',
  styleUrls      : ['./vertical-navigation.component.scss'],
  // animations     : fuseAnimations,
  encapsulation  : ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs       : 'fuseVerticalNavigation'
})
export class VerticalNavigationComponent implements OnChanges, OnInit, AfterViewInit, OnDestroy
{
  /* eslint-disable @typescript-eslint/naming-convention */
  static ngAcceptInputType_inner: BooleanInput;
  static ngAcceptInputType_opened: BooleanInput;
  static ngAcceptInputType_transparentOverlay: BooleanInput;
  /* eslint-enable @typescript-eslint/naming-convention */

  // @Input() appearance: FuseVerticalNavigationAppearance = 'default';

  user: any;
  @Input() autoCollapse: boolean = true;
  @Input() inner: boolean = false;
  // @Input() mode: FuseVerticalNavigationMode = 'side';
  // @Input() name: string = this._fuseUtilsService.randomId();
  @Input() navigation: FuseNavigationItem[];
  @Input() opened: boolean = true;
  @Input() position: FuseVerticalNavigationPosition = 'left';
  @Input() transparentOverlay: boolean = false;
  // @Output() readonly appearanceChanged: EventEmitter<FuseVerticalNavigationAppearance> = new EventEmitter<FuseVerticalNavigationAppearance>();
  // @Output() readonly modeChanged: EventEmitter<FuseVerticalNavigationMode> = new EventEmitter<FuseVerticalNavigationMode>();
  @Output() readonly openedChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  // @Output() readonly positionChanged: EventEmitter<FuseVerticalNavigationPosition> = new EventEmitter<FuseVerticalNavigationPosition>();
  @ViewChild('navigationContent') private _navigationContentEl: ElementRef;

  activeAsideItemId: string | null = null;
  // onCollapsableItemCollapsed: ReplaySubject<FuseNavigationItem> = new ReplaySubject<FuseNavigationItem>(1);
  // onCollapsableItemExpanded: ReplaySubject<FuseNavigationItem> = new ReplaySubject<FuseNavigationItem>(1);
  onRefreshed: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  private _animationsEnabled: boolean = false;
  private _asideOverlay: HTMLElement;
  private readonly _handleAsideOverlayClick: any;
  private readonly _handleOverlayClick: any;
  private _hovered: boolean = false;
  private _overlay: HTMLElement;
  private _player: AnimationPlayer;
  private _scrollStrategy: ScrollStrategy = this._scrollStrategyOptions.block();
  // private _fuseScrollbarDirectives!: QueryList<FuseScrollbarDirective>;
  private _fuseScrollbarDirectivesSubscription: Subscription;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(
    private _animationBuilder: AnimationBuilder,
    private _changeDetectorRef: ChangeDetectorRef,
    private _elementRef: ElementRef,
    private _renderer2: Renderer2,
    private _router: Router,
    private _scrollStrategyOptions: ScrollStrategyOptions,
    // private _fuseNavigationService: FuseNavigationService,
    // private _fuseUtilsService: FuseUtilsService
  )
  {
    this._handleAsideOverlayClick = (): void => {
      this.closeAside();
    };
    this._handleOverlayClick = (): void => {
      this.close();
    };
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------



  /**
   * Host binding for component inline styles
   */
  @HostBinding('style') get styleList(): any
  {
    return {
      'visibility': this.opened ? 'visible' : 'hidden'
    };
  }



  // -----------------------------------------------------------------------------------------------------
  // @ Decorated methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * On mouseenter
   *
   * @private
   */
  @HostListener('mouseenter')
  private _onMouseenter(): void
  {
    // Enable the animations
    this._enableAnimations();

    // Set the hovered
    this._hovered = true;
  }

  /**
   * On mouseleave
   *
   * @private
   */
  @HostListener('mouseleave')
  private _onMouseleave(): void
  {
    // Enable the animations
    this._enableAnimations();

    // Set the hovered
    this._hovered = false;
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On changes
   *
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges): void
  {


  }

  /**
   * On init
   */
  ngOnInit(): void
  {

  }

  /**
   * After view init
   */
  ngAfterViewInit(): void
  {

  }

  /**
   * On destroy
   */
  ngOnDestroy(): void
  {
    // Forcefully close the navigation and aside in case they are opened
    this.close();
    this.closeAside();

    // Deregister the navigation component from the registry
    // this._fuseNavigationService.deregisterComponent(this.name);

    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Refresh the component to apply the changes
   */
  refresh(): void
  {
    // Mark for check
    this._changeDetectorRef.markForCheck();

    // Execute the observable
    this.onRefreshed.next(true);
  }

  /**
   * Open the navigation
   */
  open(): void
  {
    // Return if the navigation is already open
    if ( this.opened )
    {
      return;
    }

    // Set the opened
    this._toggleOpened(true);
  }

  /**
   * Close the navigation
   */
  close(): void
  {
    // Return if the navigation is already closed
    if ( !this.opened )
    {
      return;
    }

    // Close the aside
    this.closeAside();

    // Set the opened
    this._toggleOpened(false);
  }

  /**
   * Toggle the navigation
   */
  toggle(): void
  {
    // Toggle
    if ( this.opened )
    {
      this.close();
    }
    else
    {
      this.open();
    }
  }

  /**
   * Open the aside
   *
   * @param item
   */
  openAside(item: any): void
  {

  }

  /**
   * Close the aside
   */
  closeAside(): void
  {

  }

  /**
   * Toggle the aside
   *
   * @param item
   */
  toggleAside(item: any): void
  {

  }

  /**
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
   */
  trackByFn(index: number, item: any): any
  {
    return item.id || index;
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Enable the animations
   *
   * @private
   */
  private _enableAnimations(): void
  {

  }

  /**
   * Disable the animations
   *
   * @private
   */
  private _disableAnimations(): void
  {

  }

  /**
   * Show the overlay
   *
   * @private
   */
  private _showOverlay(): void
  {

  }

  /**
   * Hide the overlay
   *
   * @private
   */
  private _hideOverlay(): void
  {

  }

  /**
   * Show the aside overlay
   *
   * @private
   */
  private _showAsideOverlay(): void
  {

  }

  /**
   * Hide the aside overlay
   *
   * @private
   */
  private _hideAsideOverlay(): void
  {

  }

  /**
   * Open/close the navigation
   *
   * @param open
   * @private
   */
  private _toggleOpened(open: boolean): void
  {

  }
}

export interface FuseNavigationItem
{
  id?: string;
  title?: string;
  subtitle?: string;
  type:
    | 'aside'
    | 'basic'
    | 'collapsable'
    | 'divider'
    | 'group'
    | 'spacer';
  hidden?: (item: FuseNavigationItem) => boolean;
  active?: boolean;
  disabled?: boolean;
  tooltip?: string;
  link?: string;
  externalLink?: boolean;
  target?:
    | '_blank'
    | '_self'
    | '_parent'
    | '_top'
    | string;
  exactMatch?: boolean;
  // isActiveMatchOptions?: IsActiveMatchOptions;
  function?: (item: FuseNavigationItem) => void;
  classes?: {
    title?: string;
    subtitle?: string;
    icon?: string;
    wrapper?: string;
  };
  icon?: string;
  badge?: {
    title?: string;
    classes?: string;
  };
  children?: FuseNavigationItem[];
  meta?: any;
}

export type FuseVerticalNavigationPosition =
  | 'left'
  | 'right';
