import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

import classNames from 'classnames/bind';
import styles from './Card.module.scss';

const cx = classNames.bind(styles);

function Card({ card }) {
    return (
        // onMouseOver={'d-flex': true}
        <div className={cx('column-content-card')}>
            {card.cover && <img src={card.cover} alt={card.cover} onMouseDown={(e) => e.preventDefault()} />}
            {<div className={cx('column-content-card_text')}>{card.title}</div>}
            <FontAwesomeIcon
                className={cx('column-content-card_icon', { 'd-flex': false })}
                icon={faTrashCan}
                fixedWidth
            />
        </div>
    );
}

export default Card;
