import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom'
import {FiPower, FiArrowLeft, FiTrash2} from 'react-icons/fi'
import api from '../../services/api'


import './styles.css'
import logoImg from '../../assets/logo.svg'

const NewIncident = () => {

    const ongId = localStorage.getItem('ongID')
    const history = useHistory()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [value, setValue] = useState('')

    async function handleNewIncident(e){
        e.preventDefault();
        const data = {title, description, value}
        try{
            await api.post('incidents',data,{
                headers: {
                    Authorization : ongId
                }
            })

            history.push('/profile')
        }catch(err){
            alert("Erro, tente novamente")
        }
        
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#e02041" />
                        Voltar para Home
                    </Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input type="text" 
                    value={title}
                    onChange={e =>setTitle(e.target.value)}
                    placeholder="Título do caso"/>
                    <textarea type="text" 
                    value={description}
                    onChange={e =>setDescription(e.target.value)}
                    placeholder="Descrição"/>
                    <input type="text" 
                    value={value}
                    onChange={e =>setValue(e.target.value)}
                    placeholder="Valor em reais"/>
                    <button className="button" type="submit">
                        Cadastrar
                    </button>


                </form>
            </div>
        </div>
    );
}

export default NewIncident;
