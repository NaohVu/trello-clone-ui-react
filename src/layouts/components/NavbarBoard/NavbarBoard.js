import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

import User from '~/components/User/User';

import classNames from 'classnames/bind';
import styles from './NavbarBoard.module.scss';

const cx = classNames.bind(styles);

function NavbarBoard() {
    return (
        <div className={cx('navbar-board')}>
            <div className={cx('item')}>
                Bảng
                <FontAwesomeIcon icon={faChevronDown} className={cx('icon-arrow')} />
            </div>
            <div className={cx('item')}>Trell không gian làm việc</div>
            <div className={cx('item')}>Hiển thị trong không gian làm việc</div>
            <User />
        </div>
    );
}

export default NavbarBoard;
