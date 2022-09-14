import classNames from 'classnames/bind';
import styles from './NavbarApp.module.scss';

const cx = classNames.bind(styles);

function NavbarApp() {
    return <div className={cx('navbar-app')}>NavbarApp</div>;
}

export default NavbarApp;
