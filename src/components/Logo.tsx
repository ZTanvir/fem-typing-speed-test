import logoLarge from "../assets/images/logo-large.svg";
import logoSmall from "../assets/images/logo-small.svg";
import { Link } from "react-router";

const Logo = () => {
  return (
    <Link to="/">
      <picture>
        <source media="(min-width:425px)" srcSet={logoLarge} />
        <img src={logoSmall} alt="logo" />
      </picture>
    </Link>
  );
};
export default Logo;
