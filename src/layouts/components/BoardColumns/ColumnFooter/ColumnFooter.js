import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import styles from './ColumnFooter.module.scss';

const cx = classNames.bind(styles);

function ColumnFooter({ openAddListCard }) {
    return (
        <div className={cx('column-footer')} onClick={openAddListCard}>
            <FontAwesomeIcon className={cx('column-footer-icon')} icon={faPlus} fixedWidth />
            <footer className={cx('column-footer-text')}>Thêm thẻ</footer>
        </div>
    );
}

export default ColumnFooter;
