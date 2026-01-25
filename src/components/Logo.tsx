import logoLarge from "../assets/images/logo-large.svg";
import logoSmall from "../assets/images/logo-small.svg";

const Logo = () => {
  return (
    <picture>
      <source media="(min-width:425px)" srcSet={logoLarge} />
      <img src={logoSmall} alt="logo" />
    </picture>
  );
};
export default Logo;
