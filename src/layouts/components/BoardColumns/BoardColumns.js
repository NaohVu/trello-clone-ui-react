import React, { useState, useEffect, useRef } from 'react';
import { flushSync } from 'react-dom';
import { isEmpty, cloneDeep } from 'lodash';
import { Container, Draggable } from 'react-smooth-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft, faPlus } from '@fortawesome/free-solid-svg-icons';

import Column from './Column/Column';
import { mapOder } from '~/utilities/sorts';
import { applyDrag } from '~/utilities/dragDrop';
import Button from '~/components/Button/Button';
import { fetchBoardDetails, createNewColumn, updateBoard, updateColumn, updateCard } from '~/actions/ApiCall';

import classNames from 'classnames/bind';
import styles from './BoardColumns.module.scss';

const cx = classNames.bind(styles);

function BoardColumns() {
    const [board, setBoard] = useState({});
    const [columns, setColumns] = useState([]);

    const [openNewColumn, setOpenNewColumn] = useState(false);
    const openAddList = () => setOpenNewColumn(!openNewColumn);

    const [newColumnTitle, setNewColumnTitle] = useState('');
    const newColumnRef = useRef(null);

    useEffect(() => {
        const boardId = '631b3b34cd66e30dfbeb84e6';
        fetchBoardDetails(boardId).then((board) => {
            setBoard(board);
            setColumns(mapOder(board.columns, board.columnOder, '_id'));
        });
    }, []);

    useEffect(() => {
        if (newColumnRef && newColumnRef.current) {
            newColumnRef.current.focus();
            newColumnRef.current.select();
        }
    }, [openNewColumn]);

    if (isEmpty(board)) {
        return <div className={cx('not-found')}>Board not found</div>;
    }

    const onColumnDrop = (dropResult) => {
        let newColumns = cloneDeep(columns);
        newColumns = applyDrag(newColumns, dropResult);

        let newBoard = cloneDeep(board);
        newBoard.columnOder = newColumns.map((c) => c._id);
        newBoard.columns = newColumns;

        setColumns(newColumns);
        setBoard(newBoard);

        // Call API update columnOder
        updateBoard(newBoard._id, newBoard).catch(() => {
            setColumns(columns);
            setBoard(board);
        });
    };

    const onCardDrop = (columnId, dropResult) => {
        if (dropResult.addedIndex !== null || dropResult.removedIndex !== null) {
            let newColumns = cloneDeep(columns);
            let currentColumn = newColumns.find((c) => c._id === columnId);

            currentColumn.cards = applyDrag(currentColumn.cards, dropResult);
            currentColumn.cardOder = currentColumn.cards.map((i) => i._id);

            // Automatic batching
            flushSync(() => setColumns(newColumns));

            if (dropResult.addedIndex !== null && dropResult.removedIndex !== null) {
                // Move card inside its column
                updateColumn(currentColumn._id, currentColumn).catch(() => {
                    setColumns(columns);
                });
            } else {
                // Move card between two columns
                updateColumn(currentColumn._id, currentColumn).catch(() => {
                    setColumns(columns);
                });

                if (dropResult.addedIndex !== null) {
                    let currentCard = cloneDeep(dropResult.payload);
                    currentCard.columnId = currentColumn._id;

                    updateCard(currentCard._id, currentCard);
                }
            }
        }
    };

    const onNewTitleChange = (e) => {
        const newColumnTitle = e.target.value;
        if (!newColumnTitle.startsWith(' ')) {
            setNewColumnTitle(newColumnTitle);
        }
    };

    const addNewColumnTitle = () => {
        if (!newColumnTitle) {
            newColumnRef.current.focus();
            return;
        }

        const newAddColumn = {
            boardId: board._id,
            title: newColumnTitle.trim(),
        };

        createNewColumn(newAddColumn).then((column) => {
            let newColumns = [...columns];
            newColumns.push(column);

            let newBoard = { ...board };
            newBoard.columnOder = newColumns.map((c) => c._id);
            newBoard.columns = newColumns;

            setColumns(newColumns);
            setBoard(newBoard);

            setNewColumnTitle('');
            openAddList();
        });
    };

    const onUpdateColumn = (newColumnToUpDate) => {
        const columnIdToUpDate = newColumnToUpDate._id;

        let newColumns = [...columns];

        const columnIndexToUpDate = newColumns.findIndex((i) => i._id === columnIdToUpDate);

        if (newColumnToUpDate._destroy) {
            newColumns.splice(columnIndexToUpDate, 1);
        } else {
            newColumns.splice(columnIndexToUpDate, 1, newColumnToUpDate);
        }

        let newBoard = { ...board };
        newBoard.columnOder = newColumns.map((c) => c._id);
        newBoard.columns = newColumns;

        setColumns(newColumns);
        setBoard(newBoard);
    };

    return (
        <div className={cx('board-columns')}>
            <Container
                orientation="horizontal"
                getChildPayload={(index) => columns[index]}
                onDrop={onColumnDrop}
                dragHandleSelector=".column-drag-handle"
                dropPlaceholder={{
                    animationDuration: 150,
                    showOnTop: true,
                    className: 'column-drop-preview',
                }}
            >
                {columns.map((column, index) => (
                    <Draggable key={index}>
                        <Column column={column} onCardDrop={onCardDrop} onUpdateColumn={onUpdateColumn} />
                    </Draggable>
                ))}
            </Container>
            <div className={cx('wrapper')}>
                <form>
                    {!openNewColumn && (
                        <div className={cx('add-list')} onClick={openAddList}>
                            <FontAwesomeIcon className={cx('add-list_icon-add')} icon={faPlus} fixedWidth />
                            Thêm danh sách khác
                        </div>
                    )}
                    {openNewColumn && (
                        <div className={cx('add-list_open')}>
                            <input
                                placeholder="Nhập tiêu đề danh sách"
                                ref={newColumnRef}
                                value={newColumnTitle}
                                onChange={onNewTitleChange}
                                onKeyDown={(e) => e.key === 'Enter' && addNewColumnTitle()}
                            />
                            <div className={cx('add-list_open-wrapper')}>
                                <Button primary small onClick={addNewColumnTitle}>
                                    Thêm danh sách
                                </Button>
                                <FontAwesomeIcon
                                    className={cx('add-list_open-icon-delete')}
                                    icon={faDeleteLeft}
                                    fixedWidth
                                    onClick={openAddList}
                                />
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}

export default BoardColumns;
