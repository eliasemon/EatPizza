import Svg, { Path, Circle } from "";

const UserIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 258.75 258.75"
    style={{
      enableBackground: "new 0 0 258.75 258.75",
    }}
    xmlSpace="preserve"
    {...props}
  >
    <Circle cx={129.375} cy={60} r={60} />
    <Path d="M129.375 150c-60.061 0-108.75 48.689-108.75 108.75h217.5c0-60.061-48.689-108.75-108.75-108.75z" />
  </Svg>
);

export default UserIcon;
