export interface INavItem {
  displayName: string;
  disabled?: boolean;
  iconName?: string;
  pack?: string;
  route?: string;
  children?: INavItem[];
}
