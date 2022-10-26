import { transition, style, animate } from "@angular/animations";

export const inOut = [
  transition(":enter", [
    style({ opacity: 0 }),
    animate("100ms ease-out", style({ opacity: 1 })),
  ]),
  transition(":leave", [
    style({ opacity: 1 }),
    animate("100ms ease-in", style({ opacity: 0 })),
  ]),
];
