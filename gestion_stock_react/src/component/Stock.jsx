import React, {useCallback, useEffect, useState} from 'react';
import '../css/form.css'
import Calendar from 'react-calendar';
import lien from "../Lien";
import {Bounce, toast} from "react-toastify";


function Stock(props) {
    const [idArticle, setIdArticle]=useState(-1)
    const [idStock, setIdStock] = useState(0);
    const [unite, setUnite] = useState(0);
    const [dateCalendar, setDateCalendar] = useState(new Date());
    const [listStock, setListStock] = useState([]);
    const [article, setArticle]=useState([])

    const [modalDescription, setModalDescription] = useState(false);


    useEffect(() => {
        fetchAPI()
        fetchAPIStock()
    }, []);
    const toggleDescription = (e) => {
        e.preventDefault()
        setModalDescription(!modalDescription);
    };

    if (modalDescription) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }
    const fetchAPIStock = useCallback(async () => {
        let idUser = parseInt("" + localStorage.getItem("utilisateur"))
        const response = await fetch(lien.url + "article/stockBy/" + idUser);
        const resbis = await response.json();
        await setListStock(resbis);

        return resbis;
         toast.success("Actualisation stock", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce
            });
    }, [setListStock]);

    let fetchdelete = useCallback(async (e) => {
        e.preventDefault();
        let str = "" + localStorage.getItem('jwt2')
        const response = await fetch(
            lien.url + "stock/" + idStock,
            {
                method: "DELETE",
                body: JSON.stringify({
                    jwt: str
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        await fetchAPI();
        await fetchAPIStock();

         toast.success("Element supprimé", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce
            });

        const resbis = await response;
    });

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
        await fetchAPI();
        await fetchAPIStock();

         toast.success("Element modifié", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce
            });
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
        await fetchAPI();
        await fetchAPIStock();

         toast.success("Element crée", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce
            });

    });
    const fetchAPI = useCallback(async () => {
        let str = "" + localStorage.getItem('jwt2')
        let idUser = parseInt("" + localStorage.getItem("utilisateur"))
        const response = await fetch(lien.url + "article/byuser/" + idUser,{headers:{Authorization: `Bearer ${str}`}});
        const resbis = await response.json();
        await setArticle(resbis);

         toast.success("Actualisation", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce
            });
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
                    {article.length > 0 ? article?.map(value => {
                            return <option value={"" + value.id}>{value.nom}</option>
                        }
                    ) : []}
                </select>
                <label htmlFor="idstock">idStock</label>

                <select value={idStock} onChange={(e) => {
                    console.log(e.target.value);
                    setIdStock(parseInt(e.target.value))
                }}>
                    <option value="-1">selectionner une valeur</option>
                    {listStock?.length > 0 ? listStock?.map(value => {
                            return <option value={"" + value?.stockref}>{value.nom}</option>
                        }
                    ) : []}
                </select>
                <label htmlFor="quantite">Quantite</label>
                <input type="number" value={unite} onChange={(e) => setUnite(parseInt(e.target.value))}/>
                {modalDescription && <div className="modal">
                    <div onClick={toggleDescription} className="overlay"></div>
                    <div className="modal-content containerButton">

                        <div className="calendrier">
                            <label htmlFor="calendar">Calendrier</label>
                            <Calendar value={dateCalendar} onChange={setDateCalendar}/>
                        </div>
                        <div>

                        </div>

                    </div>
                </div>}


                <button onClick={fetchCreer}>Ajouter</button>
                <button onClick={fetchAPIupdate}>Modifier</button>
                <button onClick={fetchdelete}>Supprimer</button>
                <button onClick={toggleDescription}>Calendrier</button>
            </form>

        </div>
    );
}

export default Stock;