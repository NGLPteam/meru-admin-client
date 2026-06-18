import * as Icons from "components/svgs/icons";

export const ICON_MAP = {
  arrow: Icons.Arrow,
  checkbox: Icons.Checkbox,
  chevron: Icons.Chevron,
  close: Icons.Close,
  clear: Icons.Clear,
  delete: Icons.Delete,
  edit: Icons.Edit,
  ellipses: Icons.Ellipses,
  empty: Icons.Empty,
  filters: Icons.Filters,
  linkChain: Icons.LinkChain,
  linkExternal: Icons.LinkExternal,
  menu: Icons.Menu,
  plus: Icons.Plus,
  search: Icons.Search,
  sortable: Icons.Sortable,
  viewGrid: Icons.ViewGrid,
  viewList: Icons.ViewList,
  user: Icons.User,
  warning: Icons.Warning,
  upload: Icons.Upload,
  toggle: Icons.Toggle,
  file: Icons.File,
  statusCheck: Icons.StatusCheck,
  statusAlert: Icons.StatusAlert,
  statusWarning: Icons.StatusWarning,
  avatar32: Icons.Avatar32,
  grabHandle: Icons.GrabHandle,
  settings: Icons.Settings,
  check: Icons.Check,
};

export const ICON_KEYS = Object.keys(ICON_MAP);

export const SIZE_MAP = {
  xs: 14,
  sm: 16,
  md: 24,
  lg: 32,
  xlg: 48,
};

export type IconKeys = keyof typeof ICON_MAP;
export type SizeKeys = keyof typeof SIZE_MAP;

export const SIZE_KEYS = Object.keys(SIZE_MAP);

function IconFactory({ icon, size = "sm", rotate, ...props }: Props) {
  const Icon = ICON_MAP[icon];
  if (!Icon) return null;

  const width = SIZE_MAP[size] || 16;
  const height = SIZE_MAP[size] || 16;
  const style = rotate
    ? {
        transform: `rotate(${rotate}deg)`,
      }
    : undefined;

  return <Icon width={width} height={height} style={style} {...props} />;
}

interface Props extends Omit<React.HTMLProps<SVGSVGElement>, "size"> {
  icon: IconKeys;
  size?: SizeKeys;
  rotate?: number;
  crossOrigin?: "" | "anonymous" | "use-credentials" | undefined;
}

export default IconFactory;
