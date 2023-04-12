## Documentação do Sistema QQtimeOFF

## Introdução
O Sistema de Gerenciamento de Férias é uma ferramenta desenvolvida para auxiliar gestores e colaboradores no controle e planejamento das férias, garantindo a conformidade com a legislação trabalhista vigente e possibilitando um melhor gerenciamento das entregas e cronogramas dos times.


## Explicação do Projeto e Divisão de Branches
O Sistema de Gerenciamento de Férias é composto por um front-end, um back-end e duas APIs adicionais. O projeto está organizado em branches separadas no repositório Git, conforme descrito abaixo:

# Branch master
Nesta branch, encontra-se o código-fonte do front-end do projeto. O front-end foi desenvolvido utilizando a biblioteca React e é responsável pela interface do usuário e interação com as APIs do sistema.

# Branch API
Esta branch contém o código-fonte da API desenvolvida em NestJS, que atua como back-end do projeto. A API é responsável por gerenciar os dados do sistema, processar solicitações do front-end e fornecer informações sobre funcionários, gestores e férias.

# Branch apiPython
A branch apiPython abriga o código da API de notificação e relatórios, desenvolvida em Python. Esta API é responsável por enviar notificações aos gestores quando um funcionário solicita férias e gerar relatórios analíticos em formato CSV.

# Branch apiAgenda
Nesta branch, encontra-se o código da API específica para marcação das férias no Google Agenda. Esta API é responsável por criar eventos no calendário do Google dos funcionários após a aprovação das férias pelo gestor.



## Funcionalidades
# RQ001 - Cadastro de Funcionários
O sistema permitirá o cadastro de funcionários, incluindo o registro se o colaborador é contratado pelo regime CLT ou como Pessoa Jurídica (PJ). Os dados cadastrais devem conter informações básicas como nome, e-mail, data de admissão, cargo e regime de contratação.

# RQ002 - Relacionamento entre Funcionários e Gestores
O sistema deve permitir a vinculação entre funcionários e seus respectivos gestores, facilitando a gestão das férias e a comunicação entre ambos.

# RQ003 - Solicitação de Agendamento de Férias
O funcionário deverá ter acesso a um formulário para solicitar o agendamento de férias, informando as datas de início e fim desejadas.

# RQ004 - Antecipação do 13º Salário
Funcionários CLT deverão ter a opção de solicitar a antecipação do 13º salário no momento do agendamento das férias.

# RQ005 - Aprovação de Férias pelos Gestores
Os gestores deverão ter acesso a um painel onde poderão visualizar todas as solicitações de férias do seu time e, a partir disso, aprovar ou reprovar cada solicitação.

# RQ006 - Dashboard para Gestores
Os gestores terão acesso a um Dashboard com informações e gráficos que mostrem o cenário de férias agendadas para o seu time, facilitando o planejamento e a tomada de decisões.

# RQ007 - Validação do Agendamento de Férias
O agendamento das férias só será considerado válido após a aprovação do gestor responsável.

# RQ008 - Quantidade de Dias de Férias
O sistema deve permitir que o funcionário escolha a quantidade de dias de férias que deseja tirar (5, 10, 15, 20 ou 30 dias), respeitando as limitações legais (mínimo de 4 dias e pelo menos um período de 15 dias).

# RQ009 - Condição de Tempo para Solicitar Férias
Os colaboradores só poderão solicitar férias após completarem um ano de empresa.

# RQ010 - Alerta de Acúmulo de Período de Férias
O sistema deverá sinalizar tanto para o colaborador quanto para o gestor quando o funcionário estiver próximo de acumular período de férias, conforme as regras trabalhistas.

# RQ011 - Informação de 11 Meses após Último Período de Férias
O sistema deve informar o colaborador quando passarem 11 meses do seu último período de férias gozado, não permitindo que vença o próximo período aquisitivo.

# RQ012 - Notificação de Agendamento de Férias por E-mail
O gestor deverá ser notificado por e-mail sempre que um colaborador do seu time solicitar férias para aprovação.

# RQ013 - Integração com a Agenda do Gmail
Ao ter as férias aprovadas, o sistema deverá marcar automaticamente os compromissos na agenda do Gmail do colaborador (caso ele possua uma conta). O compromisso deve ser registrado um dia antes da saída e um dia antes do retorno do funcionário.

# RQ014 - Relatório Analítico em CSV ou XLSX
O gestor deverá ter a opção de emitir um relatório analítico com os dados referentes às férias do seu time, em formato CSV ou XLSX, para facilitar a análise e acompanhamento das informações.

# RQ015 - Notificação por Workspace
Além das notificações por e-mail, a aplicação deverá enviar uma notificação via API do Workspace (Google Workspace) para o gestor quando um colaborador solicitar férias para aprovação. A aplicação utilizará a linguagem Python para consumir a API.


## Considerações Finais
Esta documentação descreve as funcionalidades e requisitos do Sistema de Gerenciamento de Férias. O projeto visa auxiliar na organização e planejamento das férias dos colaboradores, garantindo a conformidade com a legislação trabalhista e promovendo uma melhor gestão das entregas e cronogramas dos times. Com a implementação deste sistema, espera-se melhorar a comunicação entre gestores e funcionários e otimizar o processo de solicitação, aprovação e controle das férias.


