import React, { useState, useEffect, useRef } from 'react';
import { cloneDeep } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import { Container, Draggable } from 'react-smooth-dnd';
import Form from 'react-bootstrap/Form';

import { mapOder } from '~/utilities/sorts';
import Card from '../Card/Card';
import Button from '~/components/Button/Button';
import ColumnFooter from '../ColumnFooter/ColumnFooter';
import { createNewCards } from '~/actions/ApiCall';

import classNames from 'classnames/bind';
import styles from './ColumnContent.module.scss';

const cx = classNames.bind(styles);

function ColumnContent({ column, onCardDrop, onUpdateColumn }) {
    const cards = mapOder(column.cards, column.cardOder, '_id');

    const [cardText, setCardText] = useState('');
    const [openNewCard, setOpenNewCard] = useState(false);
    const openAddListCard = () => setOpenNewCard(!openNewCard);

    const newCardRef = useRef(null);

    useEffect(() => {
        if (newCardRef && newCardRef.current) {
            newCardRef.current.focus();
            newCardRef.current.select();
        }
    }, [openNewCard]);

    const onNewCardTextChange = (e) => {
        setCardText(e.target.value);
    };

    const addNewCard = () => {
        if (!cardText) {
            newCardRef.current.focus();
            return;
        }

        const newAddCard = {
            boardId: column.boardId,
            columnId: column._id,
            title: cardText.trim(),
        };

        createNewCards(newAddCard).then((card) => {
            let newColumn = cloneDeep(column);

            newColumn.cards.push(card);
            newColumn.cardOder.push(card._id);

            onUpdateColumn(newColumn);
            setCardText('');
            openAddListCard();
        });
    };

    return (
        <div>
            <div className={cx('column-content')}>
                <Container
                    // onDragStart={(e) => console.log('drag started', e)}
                    // onDragEnd={(e) => console.log('drag end', e)}
                    // onDragEnter={() => {
                    //     console.log('drag enter:', column.id);
                    // }}
                    // onDragLeave={() => {
                    //     console.log('drag leave:', column.id);
                    // }}
                    // onDropReady={(p) => console.log('Drop ready: ', p)}
                    groupName="col"
                    onDrop={(dropResult) => onCardDrop(column._id, dropResult)}
                    getChildPayload={(index) => cards[index]}
                    dragClass="card-ghost"
                    dropClass="card-ghost-drop"
                    dropPlaceholder={{
                        animationDuration: 150,
                        showOnTop: true,
                        className: 'card-drop-preview',
                    }}
                    dropPlaceholderAnimationDuration={200}
                >
                    {cards.map((card, index) => (
                        <Draggable key={index}>
                            <Card card={card} />
                        </Draggable>
                    ))}
                </Container>
                {openNewCard && (
                    <div className={cx('column-content_form')}>
                        <Form.Control
                            className={cx('column-content_form-input')}
                            placeholder="Nội dung thẻ"
                            type="text"
                            as="textarea"
                            rows="3"
                            ref={newCardRef}
                            value={cardText}
                            onChange={onNewCardTextChange}
                            onKeyDown={(e) => e.key === 'Enter' && addNewCard()}
                        />
                        <div>
                            <Button primary small onClick={addNewCard}>
                                Thêm thẻ
                            </Button>
                            <FontAwesomeIcon
                                className={cx('column-content_form-icon-delete')}
                                icon={faDeleteLeft}
                                fixedWidth
                                onClick={openAddListCard}
                            />
                        </div>
                    </div>
                )}
            </div>

            {!openNewCard && <ColumnFooter openAddListCard={openAddListCard} />}
        </div>
    );
}

export default ColumnContent;
