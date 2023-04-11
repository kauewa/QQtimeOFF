import { useState, useContext } from 'react';
import TextField from '@mui/material/TextField';
import { ButtonSmall } from '../../../Components/botao';
import { useNavigate, useParams } from 'react-router-dom';
import { Autocomplete, Box, Fade, FormControlLabel, Radio, RadioGroup, Switch, useMediaQuery, useTheme } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { Conteudo, DivHorizontal, Cadastrar } from '../../../Components/Divisões/div';
import ApiService from '../../../API/RegrasDeNegocio';
import { FuncoesContext } from '../../../context/contextGestor';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import { enqueueSnackbar } from 'notistack';



export default function CadastrarColaborador() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


  // valores dos inputs
  const [matricula, setMatricula] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [inicio, setInicio] = useState<Dayjs | null>(dayjs());
  const [gestor, setGestor] = useState(false);
  const [clt, setClt] = useState(true);
  const [funcao, setFuncao] = useState<number>();
  const [senha, setSenha] = useState('');
  const inicio_contratacao = !inicio ? dayjs() : inicio;
  const fim_aquisitivo = !inicio ? dayjs().add(1, 'year') : inicio.add(1, 'year');
  const token = localStorage.getItem('token');
  const funcoes = useContext(FuncoesContext);
  const [inputValue, setInputValue] = useState('')


  // opções para o autocomplete com as funções ja cadastradas
  const optionsFuncoes: any[] = []
  funcoes.forEach((func) => {
    const option = {
      label: func.nome_funcao,
      id: func.idfuncao,
      value: func.idfuncao
    }
    optionsFuncoes.push(option)
  })



  const cadastrarColaborador = async () => {
    setLoading(true)
    const verificacaoInputs = !matricula || !nome || !email || !senha;
    const funcaoExiste = funcao !== undefined;


    if (verificacaoInputs) {
      enqueueSnackbar('Por favor, preencha todos os campos obrigatórios.', { variant: "warning" })
      setLoading(false)
      return
    }
    if (id !== undefined && token !== null) {
      if (funcaoExiste) {
        await ApiService.criarColaborador(id, matricula, nome, '***', email, inicio_contratacao.format('YYYY-MM-DD'), fim_aquisitivo.format('YYYY-MM-DD'), gestor, clt, 0, senha, funcao, token)
        navigate(`/gestor/${id}`);
      } else {
        const response = await ApiService.cadastrarFuncao(inputValue)
        if (typeof response === "number") {
          await ApiService.criarColaborador(id, matricula, nome, '***', email, inicio_contratacao.format('YYYY-MM-DD'), fim_aquisitivo.format('YYYY-MM-DD'), gestor, clt, 0, senha, response, token)
          navigate(`/gestor/${id}`);
        }
        enqueueSnackbar(response, { variant: "warning" });

      }
    }
    
    setLoading(false)
  };



  return (
    <>
      <h1>Cadastrar Colaborador</h1>
      <br />
      <br />
      <br />
      <br />
      <Conteudo>
        <Cadastrar>
          <DivHorizontal tamanho='100%'>
            <TextField
              id="matricula"
              label="Matricula"
              variant="outlined"
              color="success"
              value={matricula}
              onChange={(e) => setMatricula(e.target.value)}
            />
            <TextField
              id="nome"
              label="Nome"
              variant="outlined"
              color="success"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </DivHorizontal>
          <DivHorizontal tamanho='100%'>
            <TextField
              id="Email"
              label="Email"
              variant="outlined"
              color="success"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Autocomplete
              disablePortal
              freeSolo
              options={optionsFuncoes}
              onChange={(e, newValue) => { setFuncao(newValue.value); }}
              inputValue={inputValue}
              onInputChange={(e, newValue) => { setFuncao(undefined); setInputValue(newValue); }}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Funções" color="success" />}
            />
          </DivHorizontal>
          <h1>Inicio da contratação</h1>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker format="DD/MM/YYYY" value={inicio} onChange={(e) => setInicio(e)} />
          </LocalizationProvider>
          <h1>Gestor</h1>
          <Switch
            checked={gestor}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setGestor(e.target.checked); console.log(e.target.checked) }}
            inputProps={{ 'aria-label': 'controlled' }}
          />
          <h1>Tipo de contrato</h1>
          <RadioGroup
            row
            defaultValue={"1"}
            onChange={(e) => setClt((e.target.value === "1"))}
          >
            <FormControlLabel value={"1"} control={<Radio />} label="CLT"/>
            <FormControlLabel value={"0"} control={<Radio />} label="PJ" />

          </RadioGroup>
          <TextField
            id="senha"
            label="Senha"
            variant="outlined"
            color="success"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <ButtonSmall cor='' size="large" onClick={async (e) => {
            e.preventDefault()
            await cadastrarColaborador()
          }}>
            Cadastrar
          </ButtonSmall>
        </Cadastrar>
      </Conteudo>
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
  );
}
