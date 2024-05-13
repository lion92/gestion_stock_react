import React, {useCallback, useEffect, useState} from 'react';
import '../css/form.css'
import lien from "../Lien";
import Article from "./Article";

const ChangePassword = () => {
    const [messageLog, setMessageLog] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [mailError, setEmailError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [password3, setPassword3] = useState("");
    const [probleme, setProbleme] = useState("non connecte");
    const [catcha, setCatcha] = useState("");
    const [catchaColler, setCatchaColler] = useState("");
    useEffect(() => {
        fetchUerToken();
    }, []);


    function ValidateEmail(mail) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return (true)
        }
        setEmailError("You have entered an invalid email address!")
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
            if (!data?.id) {


                if (!isNaN(data?.id)) {
                    localStorage.setItem("utilisateur", data?.id);
                    localStorage.setItem("nom", data?.nom)
                    setMessageLog("Code Bon");
                    setProbleme('connecte')
                } else {
                    setMessageLog("Deconnecter")

                }
            } else {
                console.log("error token")
            }
        }).catch(e => console.log(e))
    });


    let fetchChangePassword = useCallback(async (e) => {
        e.preventDefault();
        let response = null;
        if (password.length < 3) {
            setPasswordError("impossible mot de passe trop court minimum 3 caractere")
        } else if (password2.length < 3) {
            setPasswordError("impossible mot de passe trop court minimum 3 caractere")
        } else if ("" + password2 !== "" + password3) {
            setPasswordError("impossible mot de passe trop court minimum 3 caractere")
        } else {
            response = await fetch(
                lien.url + "connection/change-pass",
                {
                    method: "POST",
                    body: JSON.stringify({
                        "password2": password3,
                        "password": password,
                        "email": email
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }).then(value =>
                    value.text()).then((val)=>{
                if (""+val === "ok") {
                    setMessageLog("PasswordChangé")
                } else {
                    setMessageLog("Un probleme est survenu")
                }
            })
        }


    });

    return (
        <div>
            {(probleme === "connecte") ? (<Article></Article>) : ''
            }
            {(probleme !== "connecte") ? (
                <>
                    <div>

                        <form className="form">

                            <div>{messageLog}</div>
                            <div id="iconLogin"/>
                            <input id='email' value={email} placeholder={'email'} onChange={e => {
                                setEmail(e.target.value);
                                if (ValidateEmail(email)) {
                                    setEmailError("")
                                }
                            }}
                                   type={'text'}/>
                            <p className="error">{mailError}</p>
                            <input value={password} placeholder={'Ancien password'}
                                   onChange={e => {
                                       if (e.target.value.length < 3) {
                                           setPassword(e.target.value);
                                           setPasswordError("Le mot de passe doit être d'au moins 3 caractère")
                                       } else {
                                           setPasswordError("")
                                           setPassword(e.target.value)
                                       }
                                   }} type={'password'}/>

                            <input value={password2} placeholder={'password à changer'}
                                   onChange={e => {
                                       if (e.target.value.length < 3) {
                                           setPassword2(e.target.value);
                                           setPasswordError("Le mot de passe doit être d'au moins 3 caractère")
                                       } else {
                                           setPasswordError("")
                                           setPassword2(e.target.value)
                                       }
                                   }} type={'password'}/>

                            <input value={password3} placeholder={'password à changer'}
                                   onChange={e => {
                                       if (e.target.value.length < 3) {
                                           setPassword3(e.target.value);
                                           setPasswordError("Le mot de passe doit être d'au moins 3 caractère")
                                       } else {
                                           setPasswordError("")
                                           setPassword3(e.target.value)
                                       }
                                   }} type={'password'}/>

                            <p className="error">{passwordError}</p>


                            <h2 id="blur">{catcha}</h2>

                            <button onClick={fetchChangePassword} id='btnLogin'>LOGIN</button>
                            <h1>{(probleme !== 'connecte' ? '' : 'connecte')}</h1>
                        </form>
                    </div>
                </>

            ) : ''
            }
        </div>
    );
};

export default ChangePassword;