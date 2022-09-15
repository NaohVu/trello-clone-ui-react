import classNames from 'classnames/bind';
import styles from './User.module.scss';

const cx = classNames.bind(styles);

function User() {
    return (
        <div className={cx('btn-user')}>
            <div className={cx('information')}></div>
        </div>
    );
}

export default User;
