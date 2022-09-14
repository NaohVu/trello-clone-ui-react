import React, { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

import ModalConfirm from '~/components/Modal/ModalConfirm';
import { MODAL_ACTION_CONFIRM } from '~/utilities/constants';
import { updateColumn } from '~/actions/ApiCall';

import classNames from 'classnames/bind';
import styles from './ColumnTitle.module.scss';

const cx = classNames.bind(styles);

function ColumnTitle({ column, onUpdateColumn }) {
    const [title, setTitle] = useState('');
    useEffect(() => {
        setTitle([column.title]);
    }, [column.title]);

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const toggleShowConfirmModal = () => setShowConfirmModal(!showConfirmModal);

    const onConfirmModalAction = (type) => {
        if ((type = MODAL_ACTION_CONFIRM)) {
            const newColumn = {
                ...column,
                _destroy: true,
            };
            updateColumn(newColumn._id, newColumn).then((updatedColumn) => {
                onUpdateColumn(updatedColumn);
            });
        }
        toggleShowConfirmModal();
    };
    const saveContentAfterPressEnter = (e) => {
        if (e.key === 'Enter') {
            e.target.blur();
        }
    };

    const selectAllText = (e) => {
        e.target.focus();
        e.target.select();
    };

    const onUpDateTitle = (e) => {
        setTitle(e.target.value);
    };

    const onUpDateTitleBlur = () => {
        if (column.title !== title.toString()) {
            const newColumn = {
                ...column,
                title: title,
            };

            updateColumn(newColumn._id, newColumn).then((updatedColumn) => {
                updatedColumn.cards = column.cards;
                onUpdateColumn(updatedColumn);
            });
        }
    };
    return (
        <div className={cx('column-header', 'column-drag-handle')}>
            <input
                className={cx('column-header_title')}
                value={title}
                onChange={onUpDateTitle}
                onBlur={onUpDateTitleBlur}
                onMouseDown={(e) => e.preventDefault()}
                onKeyDown={saveContentAfterPressEnter}
                spellCheck={false}
                onClick={selectAllText}
            />

            <Dropdown>
                <Dropdown.Toggle id="dropdown-basic" size="lg" className={cx('dropdown-btn')} />

                <Dropdown.Menu className={cx('dropdown-menu')}>
                    <Dropdown.Item href="#/action-1" className={cx('dropdown-item')} onClick={toggleShowConfirmModal}>
                        Xoá cột
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-2" className={cx('dropdown-item')}>
                        Xoá tất cả thẻ trong cột
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-3" className={cx('dropdown-item')}>
                        Sao chép cột
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <ModalConfirm
                show={showConfirmModal}
                onAction={onConfirmModalAction}
                title="Xoá cột"
                content={`Bạn có chắc chắn xoá cột ${column.title}`}
            />
        </div>
    );
}

export default ColumnTitle;
