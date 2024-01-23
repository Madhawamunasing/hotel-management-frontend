import React from 'react';
import Pagination from 'react-bootstrap/Pagination'
// import _ from "lo"




const MessagePagination = (props) => {
    const { itemsCount, pageSize, currentPage, onPageChange } = props;

    let active = currentPage;
    let items = [];

    const pagesCount = Math.ceil(itemsCount / pageSize);
    if (pagesCount === 1) return null;
    // const pages = _.range(1, pagesCount + 1);


    for (let number = 1; number <= pagesCount; number++) {
        items.push(
            <Pagination.Item key={number} active={number === active}>
                {number}
            </Pagination.Item>,
        );
    }
    const paginationBasic = (
        <div>
            <Pagination>{items}</Pagination>
            <br />
        </div>
    );
    return (
        paginationBasic
    );
}

export default MessagePagination;
