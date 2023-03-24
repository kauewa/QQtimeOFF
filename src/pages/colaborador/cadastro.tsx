import { Switch, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { useParams } from "react-router-dom";
import ApiService from "../../API";
import { ButtonSmall } from "../../Components/botao";
import { DivColuna } from "../../Components/Divisões/div";
import { Lista } from "../../Components/Divisões/lista";
import { Hstatus } from "../../Components/texto";



export function CadastrarSolcitacao() {
    const [value, setValue] = useState<Dayjs | null>(null);
    const { id } = useParams()
    const [dias, setDias] = useState(4)
    const token = localStorage.getItem('token');
    const [dt, setDt] = useState(false);

    const cadastrarSolcitacao = async () => {
        if(value !== null && dias >= 4){
            try {
                const inicio = value ? value.format("YYYY-MM-DD") : "";
                const fim = value ? value.add(dias, "day").format("YYYY-MM-DD") : "";
                if (id !== undefined && token !== null) {
                    await ApiService.criarSolicitacao(id, dayjs().format('YYYY-MM-DD'), inicio, dias, fim, dt, "", "pendente", "", token)
                    alert('Cadastro concluido')
                }
            } catch (error) {
                console.error(error)
            }
        }else if(dias < 4) {
            alert('Você só pode pedir férias acima de 4 dias!')
        }else{
            alert('preencha todas informações!')
        }
        

    }


    return (
        <Lista tamanho=''>
            <DivColuna tamanho=''>
                <Hstatus tamanho='24px' cor='Disponivel'>Solicitar</Hstatus>
                <h1>Inicio</h1>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker format="DD/MM/YYYY" value={value} onChange={(newValue) => {
                        setValue(newValue);
                        console.log(value);
                    }} />
                </LocalizationProvider>
                <h1>Quantidade de dias</h1>
                <TextField type="number" placeholder='dias' defaultValue={4} onChange={(e) => { setDias(parseInt(e.target.value)) }} />
                <h1>Décimo terceiro</h1>
                <Switch
                    checked={dt}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDt(e.target.checked)}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
                <ButtonSmall cor='' size='' onClick={async (e) => {
                    e.preventDefault()
                    await cadastrarSolcitacao()
                }}>
                    Solicitar
                </ButtonSmall>
            </DivColuna>
        </Lista>
    )


}