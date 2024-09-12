export class MenuItem {
  id: number;
  label: string;
  icon: string;
  routerLink: string;

  constructor(
    id: number,
    label: string,
    icon: string,
    routerLink: string
  ) {
    this.id = id;
    this.label = label;
    this.icon = icon;
    this.routerLink = routerLink;
  }
}
