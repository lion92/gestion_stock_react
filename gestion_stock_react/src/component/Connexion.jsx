import React, {useState} from 'react';
import '../css/form.css'
function Connexion(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const onSubmit = (e) => {
        e.preventDefault();

        alert(`Submitted ${email} ${password}`);
    };

    return (
        <div>
            <h1>Connexion</h1>
            <form className="form">
                <label htmlFor="email">Email</label>
                <input onChange={(e) => setEmail(e.target.value)}/>
                <label htmlFor="password">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button onClick={onSubmit}>Submit</button>
            </form>
        </div>
    );
}

export default Connexion;