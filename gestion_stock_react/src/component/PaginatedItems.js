import React, {useCallback, useState} from 'react';
import ReactPaginate from 'react-paginate';
import Items from "./Items";
import lien from "../Lien";
import '../css/pagination.css'


export function PaginatedItems({ itemsPerPage=3}) {
    let [listArticle, setListArticle] = useState([]);
    const fetchAPI = useCallback(async () => {
        let idUser = parseInt("" + localStorage.getItem("utilisateur"))
        const response = await fetch(lien.url + "article/byuser/" + idUser);
        const resbis = await response.json();
        await setListArticle(resbis);
        return resbis;
    }, [setListArticle]);
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);

    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = listArticle.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(listArticle.length / itemsPerPage);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % listArticle.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };

    return (
        <div style={{color:"black"}}>
            <button style={{backgroundColor:"blue"}}  onClick={fetchAPI}>Actualiser Article</button>
            <Items currentItems={currentItems} />
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
            />
        </div>
    );
}