import React, {useCallback, useEffect, useState} from 'react';
import ReactPaginate from 'react-paginate';
import lien from "../Lien";
import '../css/pagination.css'
import Items2 from "./Items2";

export function PaginatedItems2({itemsPerPage = 3}) {

    let [listStock, setListStock] = useState([]);

    useEffect(() => {
        fetchAPIStockByName()
    }, []);

    const fetchAPIStock = useCallback(async () => {
        let idUser = parseInt("" + localStorage.getItem("utilisateur"))
        const response = await fetch(lien.url + "article/stockBy/" + idUser);
        const resbis = await response.json();
        await setListStock(resbis);
        return resbis;
    }, [setListStock]);


    const fetchAPIStockByName = useCallback(async () => {
        let idUser = parseInt("" + localStorage.getItem("utilisateur"))
        const response = await fetch(lien.url + "article/byuser-stock-name/" + idUser);
        const resbis = await response.json();
        await setListStock(resbis);
        return resbis;
    }, [setListStock]);

    const fetchAPIStockByQuantite = useCallback(async () => {
        let idUser = parseInt("" + localStorage.getItem("utilisateur"))
        const response = await fetch(lien.url + "article/byuser-stock-quantite/" + idUser);
        const resbis = await response.json();
        await setListStock(resbis);
        return resbis;
    }, [setListStock]);
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);

    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = listStock?.length>0?listStock?.slice(itemOffset, endOffset):[];
    const pageCount = Math.ceil(listStock?.length / itemsPerPage);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % listStock?.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };

    return (
        <div style={{color: "black", marginTop:"5em"}}>
            <div className="pricipale">
                <button onClick={fetchAPIStock}>Actualiser stock</button>
                <button onClick={fetchAPIStockByName}>Actualiser Nom</button>
                <button onClick={fetchAPIStockByQuantite}>Actualiser Quantite</button>
            </div>
            <div style={{fontSize:"1em"}}><Items2 currentItems={currentItems}/>
                <ReactPaginate
                    breakLabel="..."
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    renderOnZeroPageCount={null}
                /></div>

        </div>
    );
}