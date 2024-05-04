import React, {useState} from 'react';
import '../css/form.css'
import Calendar from 'react-calendar';


function Connexion(props) {

    const [nom, setNom] = useState('');
    const [description, setDescription] = useState('');
    const [prix, setPrix] = useState(0);
    const [dateCalendar, setDateCalendar] = useState(new Date());
    const ajouter = (e) => {
        e.preventDefault();

        alert(`Submitted ${nom} ${description} ${prix} ${dateCalendar}`);
    };

    const modifier = (e) => {
        e.preventDefault();

        alert(`Submitted ${nom} ${description} ${prix} ${dateCalendar}`);
    };

    const supprimer = (e) => {
        e.preventDefault();

        alert(`Submitted ${nom} ${description} ${prix} ${dateCalendar}`);
    };

    return (
        <div>
            <form className="form">
                <label htmlFor="nom">Nom</label>
                <input onChange={(e) => setNom(e.target.value)}/>
                <label htmlFor="description">Description</label>
                <input value={description} onChange={(e) => setDescription(e.target.value)}/>
                <label htmlFor="prix">Prix</label>
                <input type="number" value={prix} onChange={(e) => setPrix(parseFloat(e.target.value))}/>
                <div className="calendrier">
                <label htmlFor="calendar">Calendrier</label>
                <Calendar value={dateCalendar} onChange={setDateCalendar} />
                </div>
                    <button onClick={ajouter}>Ajouter</button>
                    <button onClick={modifier}>Modifier</button>
                    <button onClick={supprimer}>Supprimer</button>
            </form>
        </div>
    );
}

export default Connexion;