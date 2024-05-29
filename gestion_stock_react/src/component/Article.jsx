import React, {useCallback, useEffect, useState} from 'react';
import '../css/form.css'
import Calendar from 'react-calendar';
import lien from "../Lien";

import '../css/article.css'
import {Bounce, toast} from "react-toastify";

function Article(props) {
    const [nom, setNom] = useState('');
    const [description, setDescription] = useState('');
    const [prix, setPrix] = useState(0);

    const [dateCalendar, setDateCalendar] = useState(new Date());
    const [article, setArticle]=useState([])
    const [idArticle, setIdArticle]=useState(-1)
    const [modalDescription, setModalDescription] = useState(false);

    useEffect( ()=>{
        fetchAPI()

    }, [])
    const toggleDescription = (e) => {
        e.preventDefault()
        setModalDescription(!modalDescription);
    };

    if (modalDescription) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }
    ///////////////////////////appel delete
    let fetchdelete = useCallback(async (e) => {
        e.preventDefault();
        let str = "" + localStorage.getItem('jwt2')
        const response = await fetch(
            lien.url + "article/" + idArticle,
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
        toast.success("\"Article supprimé\"", {
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
    const fetchAPI = useCallback(async () => {
        let str = "" + localStorage.getItem('jwt2')
        let idUser = parseInt("" + localStorage.getItem("utilisateur"))
        const response = await fetch(lien.url + "article/byuser/" + idUser,{headers:{Authorization: `Bearer ${str}`}});
        const resbis = await response.json();
        await setArticle(resbis);

         toast.success("Actualisation des articles", {
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




    let fetchAPIupdate = useCallback(async (e) => {
        let str = "" + localStorage.getItem('jwt2')
        e.preventDefault();
        const response = await fetch(
            lien.url + "article/" + idArticle,
            {
                method: "PUT",
                body: JSON.stringify({
                    nom: nom,
                    description: description,
                    prix: prix,
                    user: parseInt("" + localStorage.getItem("utilisateur")),
                    dateAjout:dateCalendar,
                    jwt: str
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            }

        );
        const resbis = await response;
        await fetchAPI();
         toast.success("\"Article modifié\"", {
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
        let str = "" + localStorage.getItem('jwt2')
        const response = await fetch(
            lien.url + "article",
            {
                method: "POST",
                body: JSON.stringify({
                    nom: nom,
                    description: description,
                    prix: prix,
                    user: parseInt("" + localStorage.getItem("utilisateur")),
                   dateAjout:dateCalendar,
                    jwt: str
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        await fetchAPI();
         toast.success("\"Article crée\"", {
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
                <label htmlFor="nom">Nom</label>
                <input value={nom} onChange={(e) => setNom(e.target.value)}/>
                <label htmlFor="description">Description</label>
                <input value={description} onChange={(e) => setDescription(e.target.value)}/>
                <label htmlFor="prix">Prix</label>
                <input type="number" value={prix} onChange={(e) => setPrix(parseFloat(e.target.value))}/>

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

export default Article;