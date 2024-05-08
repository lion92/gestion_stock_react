import React, {useCallback, useEffect, useState} from 'react';
import '../css/form.css'
import Calendar from 'react-calendar';
import lien from "../Lien";


function Stock(props) {
    const [idArticle, setIdArticle]=useState(-1)
    const [idStock, setIdStock] = useState(0);
    const [unite, setUnite] = useState(0);
    const [dateCalendar, setDateCalendar] = useState(new Date());
    let [listStock, setListStock] = useState([]);
    const [article, setArticle]=useState([])
    useEffect(() => {
        fetchAPI()
        fetchAPIStock()
    }, []);
    const fetchAPIStock = useCallback(async () => {
        let idUser = parseInt("" + localStorage.getItem("utilisateur"))
        const response = await fetch(lien.url + "article/stockBy/" + idUser);
        const resbis = await response.json();
        await setListStock(resbis);
        return resbis;
    }, [setListStock]);
    let fetchAPIupdate = useCallback(async (e) => {
        e.preventDefault();
        const response = await fetch(
            lien.url + "stock/" + idStock,
            {
                method: "PUT",
                body: JSON.stringify({
                    quantite: unite,
                    article:idArticle,
                    dateAjout:dateCalendar,
                    idArticle:idArticle,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        const resbis = await response;
    });
    //////////////////////insert tache
    let fetchCreer = useCallback(async (e) => {
        e.preventDefault();
        const response = await fetch(
            lien.url + "stock",
            {
                method: "POST",
                body: JSON.stringify({
                    quantite: unite,
                    article:idArticle,
                    dateAjout:dateCalendar,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    });
    const fetchAPI = useCallback(async () => {
        let str = "" + localStorage.getItem('jwt2')
        let idUser = parseInt("" + localStorage.getItem("utilisateur"))
        const response = await fetch(lien.url + "article/byuser/" + idUser,{headers:{Authorization: `Bearer ${str}`}});
        const resbis = await response.json();
        await setArticle(resbis);

        return resbis;
    }, [setArticle]);
    const ajouter = (e) => {
        e.preventDefault();

        alert(`Submitted ${idArticle} ${unite} ${dateCalendar}`);
    };

    const supprimer = (e) => {
        e.preventDefault();

        alert(`Submitted ${idArticle} ${unite} ${dateCalendar}`);
    };

    return (
        <div>
            <form className="form">
                <label htmlFor="id">idArticle</label>

                <select value={idArticle} onChange={(e) => {
                    console.log(e.target.value);
                    setIdArticle(parseInt(e.target.value))
                }}>
                    <option value="-1">selectionner une valeur</option>
                    {article.map(value => {
                            return <option value={"" + value.id}>{value.nom}</option>
                        }
                    )}
                </select>
                <label htmlFor="idstock">idStock</label>

                <select value={idStock} onChange={(e) => {
                    console.log(e.target.value);
                    setIdStock(   parseInt(e.target.value))
                }}>
                    <option value="-1">selectionner une valeur</option>
                    {listStock.map(value => {
                            return <option value={"" + value?.stockref}>{value.nom}</option>
                        }
                    )}
                </select>
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
    );
}

export default Stock;