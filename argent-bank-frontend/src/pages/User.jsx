import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile, updateUserProfile } from '../redux/userSlice';
import Accounts from '../components/Accounts/Accounts'
import { useState } from 'react';


export default function User() {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.userReducer);

    const [isEditing, setIsEditing] = useState(false); // État local pour gérer l'édition
    const [editedUsername, setEditedUsername] = useState(""); // Nouveau nom d'utilisateur en édition

    const handleEditClick = () => {
        setIsEditing(true); // Activer l'édition lors du clic sur le bouton "Edit Name"
    };

    const handleSaveClick = () => {
        dispatch(updateUserProfile({userName: editedUsername }))
        .then(() => {
            // Si la mise à jour a réussi, mettre à jour l'userName dans l'état local
            // Note : Si nécessaire, utilisez l'action setUsername pour mettre à jour l'userName dans l'état Redux
            setEditedUsername(user ? user.userName : '');
            setIsEditing(false);
        })
    };

    const handleCancelClick = () => {
        setIsEditing(false); // Annuler l'édition sans sauvegarder les modifications
        setEditedUsername(user ? user.userName : ''); // Réinitialiser le champ d'édition avec l'ancien nom d'utilisateur
    };

    useEffect(() => {
        dispatch(getUserProfile());
    }, [dispatch]);

   useEffect(() => {
    if (user && user.userName) {
        setEditedUsername(user.userName);
    }
}, [user]);

    return (
        <main className="main bg-dark">
            <div className="header">  
            {isEditing ? (
                    <h1>Edit user info</h1>
                ) : (
                    <h1>Welcome back</h1>
                )} 
                {isEditing && editedUsername ? ( 
                    <div className='edit-form'>  
                        <div>
                            <label htmlFor='userName'>User name: </label>               
                            <input 
                                type="text" 
                                value={editedUsername} 
                                onChange={(e) => setEditedUsername(e.target.value)} 
                            />
                        </div>
                        <div>
                            <label htmlFor='firstName'>First name: </label>               
                            <input type='text' value={user.firstName} className='edit-input'readOnly></input>
                        </div>
                        <div>
                            <label htmlFor='lastName'>Last name: </label>               
                            <input type='text' value={user.lastName}  className='edit-input' readOnly></input>
                        </div>
                    </div>  
                    
                ) : (
                    <h2>{user && user.userName}</h2>
                )}
                {isEditing ? (
                    <div>
                        <button className="edit-button save-button" onClick={handleSaveClick}>Save</button>
                        <button className="edit-button cancel-button" onClick={handleCancelClick}>Cancel</button>
                    </div>
                ) : (
                    <button className="edit-button" onClick={handleEditClick}>Edit Name</button>
                )}
                
            </div>
            <Accounts />
        </main>
    );
}