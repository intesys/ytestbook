export interface IPrimaryMenu {
  item: IMenuItem;
}

export interface ISecondaryMenu {
  item: ISubmenuItem;
}

export interface IMenuItem {
  label: string;
  path: string;
  icon: JSX.Element;
  children?: Array<ISubmenuItem>;
}

export interface ISubmenuItem {
  label: string;
  path: string;
}
