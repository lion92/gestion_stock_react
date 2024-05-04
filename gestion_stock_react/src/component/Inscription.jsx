import React, {useState} from 'react';
import '../css/form.css'
import Calendar from 'react-calendar';
function Connexion(props) {

    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [mdp, setMdp] = useState('');
    const [confirmMdp, setconfirmMdp] = useState('');
    const [email, setEmail] = useState(0);
    const [dateNaissance, setDateNaissance] = useState(new Date());
    const inscrire = (e) => {
        e.preventDefault();

        alert(`Submitted ${nom} ${prenom} ${email} ${dateNaissance}`);
    };

    return (
        <div>
            <form className="form">
                <label htmlFor="nom">Nom</label>
                <input onChange={(e) => setNom(e.target.value)}/>
                <label htmlFor="prenom">Prenom</label>
                <input value={prenom} onChange={(e) => setPrenom(e.target.value)}/>
                <label htmlFor="prix">Email</label>
                <input type="number" value={email} onChange={(e) => setEmail(parseFloat(e.target.value))}/>
                <div className="calendrier">
                    <label htmlFor="calendar">Date de naissance</label>
                    <Calendar value={dateNaissance} onChange={setDateNaissance}/>
                </div>
                <label htmlFor="mdp">Mot de passe</label>
                <input value={mdp} onChange={(e) => setMdp(e.target.value)}/>
                <label htmlFor="mdp"> confirmation mot de passe</label>
                <input value={confirmMdp} onChange={(e) => setconfirmMdp(e.target.value)}/>
                <button onClick={inscrire}>Inscrire</button>
            </form>
        </div>
    );
}

export default Connexion;