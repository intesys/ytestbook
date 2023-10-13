import { useDynamicSvgImport } from "../../../lib/image/useDynamicSvgImport";

interface IProps {
  iconName: string;
  wrapperStyle?: string;
  svgProp?: React.SVGProps<SVGSVGElement>;
}

const SvgIcon = (props: IProps) => {
  const { iconName, wrapperStyle, svgProp } = props;
  const { SvgIcon } = useDynamicSvgImport(iconName);

  return (
    <>
      {SvgIcon && (
        <div className={wrapperStyle}>
          <SvgIcon {...svgProp} />
        </div>
      )}
    </>
  );
};

export default SvgIcon;
