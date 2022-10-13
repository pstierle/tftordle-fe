import { BehaviorSubject } from 'rxjs';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import {
  ComponentPortal,
  PortalInjector,
  ComponentType,
} from '@angular/cdk/portal';
import {
  ComponentRef,
  Injectable,
  InjectionToken,
  Injector,
} from '@angular/core';

export class FormModalOverlayRef {
  event$ = new BehaviorSubject<any>(null);

  constructor(private overlayRef: OverlayRef) {
    this.overlayRef._outsidePointerEvents.subscribe((evt) => {
      this.close();
    });
  }

  close(): void {
    this.overlayRef.dispose();
  }
}

export const MODAL_DATA = new InjectionToken<any>('MODAL_DATA');

interface FormModalConfig {
  panelClass?: string;
  hasBackdrop?: boolean;
  backdropClass?: string;
  position?: 'center' | 'right';
}

const DEFAULT_CONFIG: FormModalConfig = {
  hasBackdrop: true,
  backdropClass: 'modal-backdrop',
  panelClass: 'min-h-full',
  position: 'center',
};

@Injectable()
export class ModalService {
  public dialogRef!: FormModalOverlayRef;
  constructor(private injector: Injector, private overlay: Overlay) {}

  open<T>(component: ComponentType<T>) {
    const modalConfig = { ...DEFAULT_CONFIG };
    const overlayRef = this.createOverlay(modalConfig);
    const dialogRef = new FormModalOverlayRef(overlayRef);

    const overlayComponent = this.attachModalContainer<T>(
      overlayRef,
      modalConfig,
      dialogRef,
      component
    );

    this.dialogRef = dialogRef;
    return dialogRef;
  }

  // tslint:disable-next-line:max-line-length
  private attachModalContainer<T>(
    overlayRef: OverlayRef,
    config: FormModalConfig,
    dialogRef: FormModalOverlayRef,
    component: ComponentType<T>
  ) {
    const injector = this.createInjector(config, dialogRef);

    const containerPortal = new ComponentPortal(component, null, injector);
    const containerRef: ComponentRef<T> = overlayRef.attach(containerPortal);
    return containerRef.instance;
  }

  private createInjector(
    config: FormModalConfig,
    dialogRef: FormModalOverlayRef
  ) {
    const injectionTokens = new WeakMap();

    injectionTokens.set(FormModalOverlayRef, dialogRef);
    injectionTokens.set(MODAL_DATA, config);

    return new PortalInjector(this.injector, injectionTokens);
  }

  private getOverlayConfig<D>(config: FormModalConfig): OverlayConfig {
    const positionStrategy =
      config.position === 'right'
        ? this.overlay.position().global().end()
        : this.overlay
            .position()
            .global()
            .centerHorizontally()
            .centerVertically();

    const overlayConfig = new OverlayConfig({
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass,
      panelClass: config.panelClass,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy,
    });

    return overlayConfig;
  }

  private createOverlay(config: FormModalConfig) {
    // Returns an OverlayConfig
    const overlayConfig = this.getOverlayConfig(config);

    // Returns an OverlayRef
    return this.overlay.create(overlayConfig);
  }
}
