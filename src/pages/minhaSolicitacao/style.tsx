import { Box, CircularProgress, Fade, Switch, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ApiService from "../../API/RegrasDeNegocio";
import { ButtonSmall } from "../../Components/botao";
import { DivColuna, } from "../../Components/Divisões/div";
import { Lista } from "../../Components/Divisões/lista";
import { Hstatus } from "../../Components/texto";
import { ColaboradorContext } from "../../context/contextColaborador";
import { enqueueSnackbar } from "notistack";


////////////////////////////////////////////////Cadastro
export function CadastrarSolcitacao() {
    const [value, setValue] = useState<Dayjs>(dayjs());
    const { id } = useParams()
    const [dias, setDias] = useState(15)
    const token = localStorage.getItem('token');
    const [dt, setDt] = useState(false);
    const [loading, setLoading] = useState(false)
    const colaborador = useContext(ColaboradorContext)
    const [resposta, setResposta] = useState('');
    const navigate = useNavigate();

    
    const cadastrarSolcitacao = async () => {
        setLoading(true)
        if (id !== undefined && token !== null) {
            if (value !== null && dias >= 4) {
                await ApiService.criarSolicitacao(id, dayjs().format('YYYY-MM-DD'), value.format("YYYY-MM-DD"), dias, value.add(dias, "day").format("YYYY-MM-DD"), dt, resposta, "pendente", "", token)
                navigate('')

            } else if (dias < 4) {
                enqueueSnackbar('Você só pode pedir férias acima de 4 dias!', { variant: 'warning' })
            } else {
                enqueueSnackbar('preencha todas informações!', { variant: "warning" })
            }
        }

        setLoading(false)
    }


    return (
        <>
            <Lista tamanho=''>
                <DivColuna tamanho=''>
                    <Hstatus tamanho='24px' cor='Disponivel'>Solicitar</Hstatus>
                    <h1>Inicio</h1>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker format="DD/MM/YYYY" value={value} onChange={(newValue) => {
                            if (newValue) {
                                setValue(newValue);
                            } else {
                                setValue(dayjs)
                            }
                            console.log(value);
                        }} />
                    </LocalizationProvider>
                    <h1>Quantidade de dias</h1>
                    <TextField type="number" placeholder='dias' defaultValue={15} onChange={(e) => { setDias(parseInt(e.target.value)) }} />
                    <h1>Décimo terceiro</h1>
                    <Switch
                        disabled={colaborador?.clt === true ? false : true}
                        checked={dt}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDt(e.target.checked)}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                    <TextField
                            multiline
                            focused
                            value={resposta}
                            color="success"
                            rows={2}
                            onChange={(e: any) => setResposta(e.target.value)}
                            label="Mensagem"
                            placeholder="Mensagem"
                        />
                    <ButtonSmall cor='' size='' onClick={async (e) => {
                        e.preventDefault()
                        await cadastrarSolcitacao()
                    }}>
                        Solicitar
                    </ButtonSmall>
                </DivColuna>
            </Lista>
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
        </>
    )


}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

