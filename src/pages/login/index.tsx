import { TextField } from '@mui/material';
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../API';
import { ButtonSmall } from '../../Components/botao';
import { MainInicio, SectionInicio } from '../../Components/Divisões/pg1';
import { H1 } from '../../Components/texto';

const Logo: any = require('../../assets/TimeOFF.png');

export default function Login() {
    const navigate = useNavigate();
    const [matricula, setMatricula] = useState('');
    const [senha, setSenha] = useState('');


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token !== null) {
            const m: any = jwtDecode(token)
            if (localStorage.getItem('gestor') === "true") {
                navigate(`/gestor/${m.matricula}`)
            } else {
                navigate(`/colaborador/${m.matricula}`)
            }
        }
    }, [])

    const api = async () => {
        try {
            const { gestor } = await ApiService.login(matricula, senha);
            setTimeout(() => {
                if (gestor === true) {
                    navigate(`/gestor/${matricula}`)
                } else {
                    navigate(`/colaborador/${matricula}`)
                }
            }, 1000)
        } catch (error) {
            console.error(error);
        }
    }



    return (
        <MainInicio>
            <img src={Logo} alt="Logo" />
            <SectionInicio>
                <H1>Entrar</H1>
                <TextField id='Matricula' placeholder='Matricula' onChange={(e) => setMatricula(e.target.value)} value={matricula} />
                <TextField id='senha' placeholder='Senha' onChange={(e) => setSenha(e.target.value)} value={senha} />
                <ButtonSmall cor='' size='' onClick={api}>Entrar</ButtonSmall>
            </SectionInicio>
        </MainInicio>

    )
}