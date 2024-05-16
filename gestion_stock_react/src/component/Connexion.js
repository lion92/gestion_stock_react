import React, {useCallback, useEffect, useState} from 'react';
import '../css/form.css'
import lien from "../Lien";
import Article from "./Article";
import {MessageStore} from "./messageInfo/MessageStore";
import {PaginatedItems} from "./PaginatedItems";

const Connexion = () => {
    const [messageLog, setMessageLog] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [mailError, setEmailError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [probleme, setProbleme] = useState("non connecte");
    const [catcha, setCatcha] = useState("");
    const [catchaColler, setCatchaColler] = useState("");
    const { message, setMessage } = MessageStore()
    useEffect(() => {
        fetchUerToken();
    }, []);



    function ValidateEmail(mail) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return (true)
        }
        setEmailError("You have entered an invalid email address!")
        setMessage("You have entered an invalid email address!")
        return (false)
    }

    let fetchUerToken = useCallback(async (e) => {
        let str = "" + localStorage.getItem('jwt2')
        let response = null;

        response = await fetch(
            lien.url + "connection/user",
            {
                method: "POST",
                body: JSON.stringify({
                    jwt: str
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            })
        await response?.json().then(data => {
            if(!data?.id) {


                if (!isNaN(data?.id)) {
                    localStorage.setItem("utilisateur", data?.id);
                    localStorage.setItem("nom", data?.nom)
                    setMessageLog("Code Bon");
                    setProbleme('connecte')
                } else {
                    setMessageLog("Deconnecter")

                }
            }else{
                console.log("error token")
            }
        }).catch(e=>console.log(e))
    });


    let fetchConnection = useCallback(async (e) => {
        e.preventDefault();
        let response = null;
        if (password.length < 3) {
            setPasswordError("impossible mot de passe trop court minimum 3 caractere")
            setMessage("impossible mot de passe trop court minimum 3 caractere")
        } else {
            response = await fetch(
                lien.url + "connection/login",
                {
                    method: "POST",
                    body: JSON.stringify({

                        "password": password,
                        "email": email
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
        }


        try {
            await response?.json()?.then(data => {

                if (!isNaN(data?.id)) {
                    localStorage.setItem("utilisateur", data?.id);
                    setMessageLog("Code Bon");
                    localStorage.setItem('jwt2', data?.jwt);
                    setProbleme('connecte')
                    setMessage("Vous êtes connecté")
                } else {
                    setMessageLog("Combinaison code et mot de passe incorrect")
                    setMessage("Combinaison code et mot de passe incorrect")

                }

            })
        }catch (e){
            setMessageLog("Un probleme est survenu ou les identifiants ne sont pas corrects")
            setMessage("Un probleme est survenu ou les identifiants ne sont pas corrects")
        }
    });

    return (
        <div>
            {(probleme === "connecte") ? (<div><Article/><PaginatedItems/></div>) : ''
            }
            {(probleme !== "connecte") ? (
                <>
                    <div>

                        <form className="form">
                            {"" + probleme}
                            <div>{messageLog}</div>
                            <div id="iconLogin"/>
                            <input value={email} placeholder={'email'} onChange={e => {
                                setEmail(e.target.value);
                                if (ValidateEmail(email)) {
                                    setEmailError("")
                                    setMessage("")
                                }
                            }}
                                   type={'text'}/>
                            <p className="error">{mailError}</p>
                            <input value={password} placeholder={'password'}
                                   onChange={e => {
                                       if (e.target.value.length < 3) {
                                           setPassword(e.target.value);
                                           setPasswordError("Le mot de passe doit être d'au moins 3 caractère")
                                       } else {
                                           setPasswordError("")
                                           setPassword(e.target.value)
                                       }
                                   }} type={'password'}/>

                            <p className="error">{passwordError}</p>


                            <h2 id="blur">{catcha}</h2>

                           <button onClick={fetchConnection} id='btnLogin'>Connexion</button>
                            <h1>{(probleme !== 'connecte' ? '' : 'connecte')}</h1>
                        </form>
                    </div>
                </>

            ) : ''
            }
        </div>
    );
};

export default Connexion;