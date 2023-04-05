import { Box, CircularProgress, Fade, TextField } from '@mui/material';
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../API/RegrasDeNegocio';
import { ButtonSmall } from '../../Components/botao';
import { MainInicio, SectionInicio } from '../../Components/Divisões/pg1';
import { H1 } from '../../Components/texto';
import { enqueueSnackbar } from 'notistack';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const Logo: any = require('../../assets/TimeOFF.png');

export default function Login() {
    const navigate = useNavigate();
    const [matricula, setMatricula] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    

    //Método para verificar se o usuário está logado
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


    
    const login = async () => {
        setLoading(true)
        try {
            const resposta = await ApiService.login(matricula, senha);
           if(resposta !== undefined){
               const payload: any = jwtDecode(resposta);
               setTimeout(() => {
                   if (payload.gestor === true) {
                       enqueueSnackbar(`Bem vindo ${payload.nome}!`, { variant: "success" })
                       navigate(`/gestor/${matricula}`)
                   } else {
                       enqueueSnackbar(`Bem vindo ${payload.nome}!`, { variant: "success" })
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
            <img src={Logo} alt="Logo" style={isMobile ? {width: '150%'} : {}} />
            <SectionInicio>
                <H1>Entrar</H1>
                <TextField
                    id='Matricula'
                    placeholder='Matricula'
                    label="Matricula"
                    color="success"
                    sx={isMobile ? { width: '150%' } : {}}
                    variant="outlined"
                    onChange={(e) => setMatricula(e.target.value)} value={matricula} />
                <TextField
                    id='senha'
                    label="Senha"
                    color="success"
                    sx={isMobile ? { width: '150%' } : {}}
                    placeholder='Senha'
                    variant="outlined"
                    type="password"
                    onChange={(e) => setSenha(e.target.value)} value={senha} />
                <ButtonSmall cor='' size='' onClick={login}>Entrar</ButtonSmall>
            </SectionInicio>

            {/* Carregamento */}
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