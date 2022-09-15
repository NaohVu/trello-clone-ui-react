import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { faCircleExclamation, faMagnifyingGlass, faChevronDown } from '@fortawesome/free-solid-svg-icons';

import User from '~/components/User/User';

import classNames from 'classnames/bind';
import styles from './NavbarApp.module.scss';

const cx = classNames.bind(styles);

function NavbarApp() {
    return (
        <div className={cx('navbar-app')}>
            <div className={cx('list')}>
                <div className={cx('logo')}></div>
                <div className={cx('item')}>
                    Các không gian làm việc
                    <FontAwesomeIcon icon={faChevronDown} className={cx('icon-arrow')} />
                </div>
                <div className={cx('item')}>
                    Gần đây
                    <FontAwesomeIcon icon={faChevronDown} className={cx('icon-arrow')} />
                </div>
                <div className={cx('item')}>
                    Đã đánh dấu sao
                    <FontAwesomeIcon icon={faChevronDown} className={cx('icon-arrow')} />
                </div>
                <div className={cx('item')}>
                    Mẫu
                    <FontAwesomeIcon icon={faChevronDown} className={cx('icon-arrow')} />
                </div>
            </div>
            <div className={cx('user-warp')}>
                <div>
                    <FontAwesomeIcon icon={faMagnifyingGlass} fixedWidth className={cx('icon-search')} />
                    <input className={cx('search')} />
                </div>
                <FontAwesomeIcon icon={faCircleExclamation} fixedWidth className={cx('icon')} />
                <FontAwesomeIcon icon={faBell} fixedWidth className={cx('icon')} />
                <User />
            </div>
        </div>
    );
}

export default NavbarApp;
