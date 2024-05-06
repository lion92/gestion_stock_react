import React, {useCallback, useEffect, useState} from 'react';
import '../css/form.css'
import Calendar from 'react-calendar';
import lien from "../Lien";


function Stock(props) {
    const [listStock, setListStock] = useState([]);
    const [idArticle, setIdArticle] = useState(0);
    const [idStock, setIdStock] = useState(0);
    const [unite, setUnite] = useState(0);
    const [dateCalendar, setDateCalendar] = useState(new Date());
    const [article, setArticle] = useState([])

    let fetchAPIupdate = useCallback(async (e) => {
        e.preventDefault();
        const response = await fetch(
            lien.url + "stock/" + idStock,
            {
                method: "PUT",
                body: JSON.stringify({
                    quantite: unite,
                    article: idArticle,
                    dateAjout: dateCalendar,
                    idArticle: idArticle,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        const resbis = await response;
    });



    const fetchAPIStock = useCallback(async () => {
        let idUser = parseInt("" + localStorage.getItem("utilisateur"))
        const response = await fetch(lien.url + "article/stockBy/" + idUser);
        const resbis = await response.json();
        await setListStock(resbis);
        return resbis;
    }, [setListStock]);
    const fetchAPIArticle = useCallback(async () => {
        let str = "" + localStorage.getItem('jwt2')
        let idUser = parseInt("" + localStorage.getItem("utilisateur"))
        const response = await fetch(lien.url + "article/byuser/" + idUser, {headers: {Authorization: `Bearer ${str}`}});
        const resbis = await response.json();
        await setArticle(resbis);

        return resbis;
    }, [setArticle]);
    //////////////////////insert tache
    let fetchCreer = useCallback(async (e) => {
        e.preventDefault();
        const response = await fetch(
            lien.url + "stock",
            {
                method: "POST",
                body: JSON.stringify({
                    quantite: unite,
                    article: idArticle,
                    dateAjout: dateCalendar,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    });
    return (
        <div>
            <form className="form">
                <label htmlFor="id">idStock</label>
                <input type="number" onChange={(e) => setIdStock(parseInt(e.target.value))}/>
                <label htmlFor="id">idArticle</label>
                <input type="number" onChange={(e) => setIdArticle(parseInt(e.target.value))}/>
                <label htmlFor="quantite">Quantite</label>
                <input type="number" value={unite} onChange={(e) => setUnite(parseInt(e.target.value))}/>
                <div className="calendrier">
                    <label htmlFor="calendar">Calendrier</label>
                    <Calendar value={dateCalendar} onChange={setDateCalendar}/>
                </div>
                <button onClick={fetchCreer}>Ajouter</button>
                <button onClick={fetchAPIupdate}>Modifier</button>
            </form>
        </div>
    )
        ;
}

export default Stock;