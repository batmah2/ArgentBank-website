import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/loginSlice";
import { useNavigate } from "react-router-dom";


export default function Form() {
    // Utilisation des hooks d'état pour gérer les valeurs des champs du formulaire
    const [email, setEmail] = useState(''); // État pour l'email
    const [password, setPassword] = useState(''); // État pour le mot de passe
    const [rememberMe, setRememberMe] = useState(false); // État pour se souvenir de l'utilisateur

    // Utilisation des fonctions useSelector et useDispatch pour accéder au state Redux et dispatcher des actions
    const { isLogged, error } = useSelector((state) => state.loginReducer); // Récupération de l'état d'authentification
    const dispatch = useDispatch(); // Initialisation de la fonction dispatch pour envoyer des actions Redux
    const navigate = useNavigate(); // Utilisation du hook de navigation de React Router

    // Fonction de gestion de l'événement de connexion
    const handleLoginEvent = (e) => {
        e.preventDefault(); // Empêche le comportement par défaut de l'envoi du formulaire

        // Dispatch de l'action loginUser avec les données de connexion
        dispatch(loginUser({ email, password, rememberMe }));
    };

    // Utilisation du hook useEffect pour rediriger l'utilisateur après la connexion
    useEffect(() => {
        if (isLogged) {
            navigate('/user'); // Redirection vers la page utilisateur si connecté avec succès
        }
    }, [isLogged, navigate]); // Déclenchement de cet effet lorsque l'état isLogged ou la fonction navigate changent

    // Rendu du formulaire avec des champs pour l'email, le mot de passe, et une option "se souvenir de moi"
    return (
        <form onSubmit={handleLoginEvent}> {/* Gestion de l'événement de soumission du formulaire */}
            <div className="input-wrapper">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div className="input-wrapper">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <div className="input-remember">
                {/* Case à cocher pour "Se souvenir de moi" avec gestion de l'état correspondant */}
                <input type="checkbox" id="remember-me" checked={rememberMe} onChange={(() => setRememberMe(previous => !previous))}/>
                <label htmlFor="remember-me">Remember me</label>
            </div>
            <button className="sign-in-button" type="submit">Sign In</button> {/* Bouton de connexion */}
            {(error&&(
                <div className="alert" role="alert">{error}</div> // Affichage d'une alerte en cas d'erreur d'authentification
            ))}
        </form> 
    )
}
