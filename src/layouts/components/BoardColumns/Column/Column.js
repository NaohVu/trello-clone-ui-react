import ColumnContent from '../ColumnContent/ColumnContent';
import ColumnTitle from '../ColumnTitle/ColumnTitle';

import classNames from 'classnames/bind';
import styles from './Column.module.scss';

const cx = classNames.bind(styles);

function Column({ column, onCardDrop, onUpdateColumn }) {
    return (
        <div className={cx('column')}>
            <ColumnTitle column={column} onUpdateColumn={onUpdateColumn} />
            <ColumnContent column={column} onCardDrop={onCardDrop} onUpdateColumn={onUpdateColumn} />
        </div>
    );
}

export default Column;
