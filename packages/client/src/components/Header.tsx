import { Link } from 'react-router-dom';
import css from './Header.module.css';


const Header = () => {
  return (
    <header className={css.header}>
      <Link to="/" className={css.logoContainer}>     
  <img src='/headerLogo.png' alt="Logo" className={css.logoImage} />
  <span className={css.title}>Forms</span>
      </Link>
      <nav className={css.nav}>
        <Link to="/" className={css.link}>My Forms</Link>
        <Link to="/forms/new" className={`${css.link} ${css.createButton} button`}>
          + Create Form
        </Link>
      </nav>
    </header>
  );
};

export default Header;