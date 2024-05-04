import React, {useState} from 'react';

function Article(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const onSubmit = (e) => {
        e.preventDefault();

        alert(`Submitted ${email} ${password}`);
    };
    
    return (
        <div>
            <form>
                <label htmlFor={email}></label>
                <input value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button onClick={onSubmit}>Submit</button>
            </form>
        </div>
    );
}

export default Article;