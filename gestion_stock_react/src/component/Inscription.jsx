import React, {useCallback, useState} from 'react';
import '../css/form.css'
import Calendar from 'react-calendar';
import lien from "../Lien";
function Inscription(props) {

    const [mdp, setMdp] = useState('');
    const [dateNaissance, setDateNaissance] = useState(new Date());
    const [email, setEmail] = useState("");
    const [inscriptionError, setInscriptionError] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [prenomError, setPrenomError] = useState("");
    const [nomError, setNomError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [confirError, setConfirmError] = useState("");
    const [modalDescription, setModalDescription] = useState(false);




    const toggleDescription = (e) => {
        e.preventDefault()
        setModalDescription(!modalDescription);
    };

    if (modalDescription) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }
    function validateEmail(mail) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            setEmailError("")
            return (true)
        }
        setEmailError("You have entered an invalid email address!")
        return (false)
    }

    let fetchInscription = useCallback(async (e) => {
        e.preventDefault();
        if (nom === "") {
            setNomError("le nom est vide")
            return
        }
        if (prenom === "") {
            setPrenomError("Le prenom est vide")
            return
        }

        if (mdp !== confirmPassword) {
            setConfirmError("Les mots de passes doivent être semblables.")
            return
        }

        if (!validateEmail(email)) {
            return
        }

        if (confirError.length > 8) {
            setConfirmError("Le password doit comporter au moins 9 caracteres")
            return
        }

        const response = await fetch(
            lien.url + "connection/signup",
            {
                method: "POST",
                body: JSON.stringify(
                    {
                        "nom": nom,
                        "prenom": prenom,
                        "password": mdp,
                        "email": email,
                        "dateNaissance":dateNaissance
                    },),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        if (response.ok) {
            setInscriptionError("Inscription ok")
        } else {
            setInscriptionError("une erreur s'est produite");
        }
    });


    return (
        <>
            <button onClick={toggleDescription}>Date de naissance</button>
            <form className="form">
                <label htmlFor="nom">Nom</label>
                <input placeholder="Nom" onChange={(e) => setNom(e.target.value)}/>
                <p>{nomError}</p>
                <label htmlFor="prenom">Prenom</label>
                <input placeholder="Prenom" value={prenom} onChange={(e) => setPrenom(e.target.value)}/>
                <p>{prenomError}</p>
                <label htmlFor="email">Email</label>
                <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <p>{emailError}</p>

                {modalDescription && <div className="modal">
                    <div onClick={toggleDescription} className="overlay"></div>
                    <div className="modal-content containerButton">

                        <div className="calendrier">
                            <label htmlFor="calendar">Date de naissance</label>
                            <Calendar value={dateNaissance} onChange={setDateNaissance}/>
                        </div>
                        <div>

                        </div>

                    </div>
                </div>}


                <label htmlFor="mdp">Mot de passe</label>
                <input type="password" value={mdp} onChange={(e) => setMdp(e.target.value)}/>
                <label htmlFor="confirPassword"> confirmation mot de passe</label>
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                <p>{confirError}</p>
                <button onClick={fetchInscription}>Inscrire</button>
            </form>

            {inscriptionError}
        </>
    );
}

export default Inscription;