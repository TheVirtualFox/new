import React, { useState } from "react";

const CELL_COUNT = 8;

function pagingCells(n, pos, maxCells = CELL_COUNT) {
    const offset = n - pos;
    const pivot = ~~(maxCells / 2);

    let cells = [];

    if (n > maxCells) {
        cells[0] = { nr: 1 };
        cells[1] = { nr: 2 };
        cells[maxCells - 2] = { nr: n - 1 };
        cells[maxCells - 1] = { nr: n };

        if (pos <= pivot) {
            cells[maxCells - 2].ellipsis = true;
            for (let i = 2; i < maxCells - 2; i++) {
                cells[i] = { nr: i + 1 };
            }
        } else if (offset < pivot) {
            cells[1].ellipsis = true;
            for (let i = 2; i < maxCells - 2; i++) {
                cells[i] = { nr: n - maxCells + i + 1 };
            }
        } else {
            cells[pivot] = { nr: pos };
            for (let i = 1; i < maxCells - 5; i++) {
                cells[pivot + i] = { nr: pos + i };
                cells[pivot - i] = { nr: pos - i };
            }

            cells[1].ellipsis = true;
            cells[maxCells - 2].ellipsis = true;
        }
    } else {
        for (let i = 0; i < n; i++) {
            cells[i] = { nr: i + 1, ellipsis: false };
        }
    }
    return cells;
}

export const Pagination = ({
                               current,
                               totalPages,
                               onChange,
                               maxCellsProp = CELL_COUNT,
                           }) => {

    const [maxCells, setMaxCells] = useState(maxCellsProp);

    const PrevPage = (
        <button
            disabled={current === 1}
            onClick={() => onChange(current - 1)}
        >{maxCells > 5 ? "Prev" : ''}</button>
    );

    const NextPage = (
        <button
            disabled={current >= totalPages + 1}
            onClick={() => onChange(current + 1)}
        >{maxCells > 5 ? "Next" : ''}</button>
    );

    function handleResize(entries) {
        if (entries[0].contentRect.width < 450) {
            setMaxCells(5);
        } else {
            setMaxCells(maxCellsProp);
        }
    }

    return (
        <div className="pagination">
            {PrevPage}
            {pagingCells(totalPages + 1, current, maxCells).map(
                ({ nr, ellipsis }) => (
                    <button
                        className={`no-outline ${nr === current ? 'active' : ''}`}
                        disabled={ellipsis || nr === current}
                        key={nr}
                        onClick={() => onChange(nr)}
                    >{ellipsis ? '...' : nr}</button>
                )
            )}
            {NextPage}
        </div>
    );
};
