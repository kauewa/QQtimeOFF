import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { ButtonSmall } from '../../../Components/inputs/inputs';
import { Cadastrar } from '../../../Components/Divisões/SectionCadastro';
import { Colaborador, adicionarColaborador, colaboradores } from '../modeloColaboradores';
import { useNavigate } from 'react-router-dom';
import { MenuItem, Select } from '@mui/material';


export default function CadastrarColaborador() {
  const navigate = useNavigate();

  //valores dos inputs
  const [nome, setNome] = useState('');
  const [funcao, setFuncao] = useState('');
  const [status, setStatus] = useState('');
  const id = colaboradores.length+1;

  //função para cadastrar colaborador
  const cadastrarColaborador = () => {
    const colaborador:Colaborador = {id: id ,nome: nome, funcao: funcao, status: status }
    adicionarColaborador(colaborador);
    //voltar para página 
    navigate('/gestor');
  };


  return (
    <>
      <h1>Cadastrar Colaborador</h1>
      <Cadastrar>
        <TextField
          id="nome"
          label="Nome"
          variant="outlined"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <TextField
          id="email"
          label="funcao"
          variant="outlined"
          value={funcao}
          onChange={(e) => setFuncao(e.target.value)}
        />
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status}
          label="Age"
          onChange={(e) => setStatus(e.target.value)}>
          <MenuItem value={'Disponivel'}>Disponível</MenuItem>
          <MenuItem value={'Aceito'}>Aceito</MenuItem>
          <MenuItem value={'Ferias'}>Férias</MenuItem>
          <MenuItem value={'Atraso'}>Atraso</MenuItem>
        </Select>
        <ButtonSmall size='large' onClick={cadastrarColaborador}>
          Cadastrar
        </ButtonSmall>
      </Cadastrar>
      
    </>
  );
}
