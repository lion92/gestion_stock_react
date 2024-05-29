import React, {useCallback, useState} from 'react';
import '../css/form.css'
import Calendar from 'react-calendar';
import lien from "../Lien";
import {Bounce, toast} from "react-toastify";

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
             toast.success("ok", {
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
            return (true)
        }
        setEmailError("You have entered an invalid email address!")

         toast.success("You have entered an invalid email address!", {
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
        return (false)
    }

    let fetchInscription = useCallback(async (e) => {
        e.preventDefault();
        if (nom === "") {
            setNomError("le nom est vide")
            toast.error("le nom est vide", {
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
            return
        }
        if (prenom === "") {
            setPrenomError("Le prenom est vide")
             toast.error("Le prenom est vide", {
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
            return
        }

        if (mdp !== confirmPassword) {
            setConfirmError("Les mots de passes doivent être semblables.")
             toast.error("Les mots de passes doivent être semblables.", {
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
            return
        }

        if (!validateEmail(email)) {
            return
        }

        if (confirError.length > 8) {
            setConfirmError("Le password doit comporter au moins 9 caracteres")
             toast.error("Le password doit comporter au moins 9 caracteres", {
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

             toast.success("\"Inscription ok\"", {
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
        } else {
            setInscriptionError("une erreur s'est produite");
             toast.success("\"une erreur s'est produite\"", {
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
        }
    });


    return (
        <>

            <form className="form">
                <button onClick={toggleDescription}>Date de naissance</button>
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