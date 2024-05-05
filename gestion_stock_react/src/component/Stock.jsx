import React, {useState} from 'react';
import '../css/form.css'
import Calendar from 'react-calendar';


function Stock(props) {

    const [idArticle, setIdArticle] = useState(0);
    const [unite, setUnite] = useState(0);
    const [dateCalendar, setDateCalendar] = useState(new Date());
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
                <label htmlFor="nom">idArticle</label>
                <input type="number" onChange={(e) => setIdArticle(parseInt(e.target.value))}/>
                <label htmlFor="prix">Quantite</label>
                <input type="number" value={unite} onChange={(e) => setUnite(parseInt(e.target.value))}/>
                <div className="calendrier">
                <label htmlFor="calendar">Calendrier</label>
                <Calendar value={dateCalendar} onChange={setDateCalendar} />
                </div>
                    <button onClick={ajouter}>Ajouter</button>
                    <button onClick={supprimer}>Supprimer</button>
            </form>
        </div>
    );
}

export default Stock;