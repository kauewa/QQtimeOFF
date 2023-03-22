import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { ButtonSmall } from '../../../Components/botao';
import { Colaborador, adicionarColaborador } from '../../../Entity/modeloColaboradores';
import { useNavigate, useParams } from 'react-router-dom';
import { FormControlLabel, Radio, RadioGroup, Switch } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { Conteudo, DivHorizontal, Cadastrar } from '../../../Components/Divisões/div';
import ApiService from '../../../API';


///////////////////// Deixar mais explicativo para cadastro principalmente CLT E O GESTOR
export default function CadastrarColaborador() {
  const { id } = useParams<{id: string}>();
  const navigate = useNavigate();

  // valores dos inputs
  const [matricula, setMatricula] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [inicio, setInicio] = useState<Dayjs | null>(dayjs());
  const [gestor, setGestor] = useState(false);
  const [clt, setClt] = useState(true);
  const [funcao, setFuncao] = useState('');
  const [senha, setSenha] = useState('');

  // função para cadastrar colaborador
  const cadastrarColaborador = async () => {
    const colaborador: Colaborador = {
      id: matricula,
      nome: nome,
      cpf: '',
      email: email,
      inicio_contratacao: !inicio ? dayjs() : inicio,
      fim_aquisitivo: !inicio ? dayjs().add(1, 'year') : inicio.add(1, 'year'),
      gestor: gestor,
      clt: clt,
      saldo_ferias: 0,
      senha: senha,
      status: 'Disponivel',
      funcao: '',
      solicitacoes: [],
      ferias: null
    }
    try{
      if(id !== undefined){
        await ApiService.criarColaborador(id, matricula, nome, '***', email, colaborador.inicio_contratacao.format('YYYY-MM-DD'), colaborador.fim_aquisitivo.format('YYYY-MM-DD'), gestor, clt, 0, senha)
        adicionarColaborador(colaborador);
      }
    }catch(e){
      console.error(e)
    }
    
    navigate('/gestor');
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
              value={matricula}
              onChange={(e) => setMatricula(e.target.value)}
            />
            <TextField
              id="nome"
              label="Nome"
              variant="outlined"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </DivHorizontal>
          <DivHorizontal tamanho='100%'>
            <TextField
              id="Email"
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              id="funcao"
              label="Função"
              variant="outlined"
              value={funcao}
              onChange={(e) => setFuncao(e.target.value)}
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

            onChange={(e) => setClt((e.target.value === "1"))}
          >
            <FormControlLabel value={"1"} control={<Radio />} label="CLT" />
            <FormControlLabel value={"0"} control={<Radio />} label="PJ" />

          </RadioGroup>
          <TextField
            id="senha"
            label="Senha"
            variant="outlined"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <ButtonSmall cor='' size="large" onClick={cadastrarColaborador}>
            Cadastrar
          </ButtonSmall>
        </Cadastrar>
      </Conteudo>
    </>
  );
}
