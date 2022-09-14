import classNames from 'classnames/bind';
import styles from './NavbarBoard.module.scss';

const cx = classNames.bind(styles);

function NavbarBoard() {
    return <div className={cx('navbar-board')}>NavbarBoard</div>;
}

export default NavbarBoard;
