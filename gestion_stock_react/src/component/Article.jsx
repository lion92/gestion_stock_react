import React, {useState} from 'react';
import '../css/form.css'
import Calendar from 'react-calendar';


function Connexion(props) {

    const [nom, setNom] = useState('');
    const [description, setDescription] = useState('');
    const [value, onChange] = useState(new Date());
    const [prix, setPrix] = useState(0);
    const onSubmit = (e) => {
        e.preventDefault();

        alert(`Submitted ${nom} ${description}`);
    };

    return (
        <div>
            <form className="form">
                <label htmlFor="nom">Nom</label>
                <input onChange={(e) => setNom(e.target.value)}/>
                <label htmlFor="description">Description</label>
                <input value={description} onChange={(e) => setDescription(e.target.value)}/>
                <label htmlFor="prix">Prix</label>
                <input value={prix} onChange={(e) => setPrix(parseFloat(e.target.value))}/>
                <label htmlFor="calendar">Calendrier</label>
                <Calendar onChange={onChange} value={value} />
                <button onClick={onSubmit}>Submit</button>
            </form>
        </div>
    );
}

export default Connexion;