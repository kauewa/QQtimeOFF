import { Box, CircularProgress, Fade, TextField } from '@mui/material';
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../API';
import { ButtonSmall } from '../../Components/botao';
import { MainInicio, SectionInicio } from '../../Components/Divisões/pg1';
import { H1 } from '../../Components/texto';
import { enqueueSnackbar } from 'notistack';

const Logo: any = require('../../assets/TimeOFF.png');

export default function Login() {
    const navigate = useNavigate();
    const [matricula, setMatricula] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token !== null && token !== "undefined") {
            const m: any = jwtDecode(token)
            if (m.gestor === true) {
                navigate(`/gestor/${m.matricula}`)
            } else {
                navigate(`/colaborador/${m.matricula}`)
            }
        } else {
            localStorage.removeItem('token');
        }
    }, [])


    const api = async () => {
        setLoading(true)
        try {
            const resposta = await ApiService.login(matricula, senha);
           if(resposta !== undefined){
               const m: any = jwtDecode(resposta);
               setTimeout(() => {
                   if (m.gestor === true) {
                       enqueueSnackbar(`Bem vindo ${m.nome}!`, { variant: "success" })
                       navigate(`/gestor/${matricula}`)
                   } else {
                       enqueueSnackbar(`Bem vindo ${m.nome}!`, { variant: "success" })
                       navigate(`/colaborador/${matricula}`)
                   }
               }, 1000)
           }
        } catch (error) {
            console.error(error);
        }
        setLoading(false)
    }



    return (
        <MainInicio>
            <img src={Logo} alt="Logo" />
            <SectionInicio>
                <H1>Entrar</H1>
                <TextField
                    id='Matricula'
                    placeholder='Matricula'
                    label="Matricula"
                    color="success"
                    variant="outlined"
                    onChange={(e) => setMatricula(e.target.value)} value={matricula} />
                <TextField
                    id='senha'
                    label="Senha"
                    color="success"
                    placeholder='Senha'
                    variant="outlined"
                    type="password"
                    onChange={(e) => setSenha(e.target.value)} value={senha} />
                <ButtonSmall cor='' size='' onClick={api}>Entrar</ButtonSmall>
            </SectionInicio>
            <Box sx={{
                position: 'absolute', bottom: 20,
                right: 20, display: 'flex', flexDirection: 'column', alignItems: 'center'
            }}>
                <Box sx={{ height: 60 }}>
                    <Fade
                        in={loading}
                        unmountOnExit
                    >
                        <CircularProgress
                            size={60}
                            color='success'
                        />
                    </Fade>
                </Box>
            </Box>
        </MainInicio>

    )
}