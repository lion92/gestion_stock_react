import React, {useCallback, useEffect, useState} from 'react';
import '../css/form.css'
import Calendar from 'react-calendar';
import lien from "../Lien";


function Article(props) {
    const [nom, setNom] = useState('');
    const [description, setDescription] = useState('');
    const [prix, setPrix] = useState(0);

    const [dateCalendar, setDateCalendar] = useState(new Date());
    const [article, setArticle]=useState([])
    const [idArticle, setIdArticle]=useState(-1)


    useEffect( ()=>{
        fetchAPI()

    }, [])
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

        const resbis = await response;
    });
    const fetchAPI = useCallback(async () => {
        let str = "" + localStorage.getItem('jwt2')
        let idUser = parseInt("" + localStorage.getItem("utilisateur"))
        const response = await fetch(lien.url + "article/byuser/" + idUser,{headers:{Authorization: `Bearer ${str}`}});
        const resbis = await response.json();
        await setArticle(resbis);

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
    });





    return (
        <div>

            <form className="form">
                <label htmlFor="id">idArticle</label>

                <select value={idArticle} onChange={(e) => {console.log(e.target.value);setIdArticle(parseInt(e.target.value))}}>
                    <option value="-1">selectionner une valeur</option>
                    {article.map(value => {
                            return <option value={""+value.id}>{value.nom}</option>
                        }
                    )}
                </select>
                <label htmlFor="nom">Nom</label>
                <input value={nom} onChange={(e) => setNom(e.target.value)}/>
                <label htmlFor="description">Description</label>
                <input value={description} onChange={(e) => setDescription(e.target.value)}/>
                <label htmlFor="prix">Prix</label>
                <input type="number" value={prix} onChange={(e) => setPrix(parseFloat(e.target.value))}/>
                <div className="calendrier">
                    <label htmlFor="calendar">Calendrier</label>
                    <Calendar value={dateCalendar} onChange={setDateCalendar}/>
                </div>
                <button onClick={fetchCreer}>Ajouter</button>
                <button onClick={fetchAPIupdate}>Modifier</button>
                <button onClick={fetchdelete}>Supprimer</button>
            </form>
        </div>
    );
}

export default Article;