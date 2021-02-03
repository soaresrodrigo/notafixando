# Notafixando
Gerenciador de notas, na qual é possível armazenar suas informações de forma mais organizada.

*Informações técnicas*

1. Banco de dados: MongoDB online
2. Backend: Node JS
3. Frontend: Vue JS
4. Quantidade dos copos de café: 3 
5. Inteligência real: Rodrigo Soares

--------------------------
*Software necessário para rodar o projeto*
* Node
* Yarn
* Vue-cli

-----------------------------
*Passo a passo para execução*
1. Clone o repositório
2. Navegue na pasta backend e execute: <code>yarn install</code>
3. Nessa mesma pasta "backend", levante o servidor com o comando: <code>yarn dev</code>
4. A porta utilizada, caso queira testar a requisição por algum software específico é: <code>localhost:3000</code>

5. Agora navegue na pasta frontend e execute também: <code>yarn install</code>
3. Nessa mesma pasta "frontend", levante o servidor com o comando: <code>yarn serve</code>
7. Acesse a url exibida pelo terminal e utilize seu navegador de preferência, se a porta não estiver ocupada, será <code>localhost:8080</code>

-------------------------------------
*Como é que funciona o sistema?*

O sistema é bem simples a nível de usabilidade, vamos para algumas funcionalidades.
* Na função de adicionar nota, basta apertar o botão com o sinal de + que se encontra ao lado do campo de pesquisa que logo se abrirá no lado direito.
* Para cadastrar uma nota, é necessário informar o título, a descrição e por padrão a cor da nota será azul, depois é só clicar em adicionar e será enviado automaticamente para listagem.
* Para pesquisar uma nota existente, utilize o campo de pesquisa informando o título da nota, caso não encontre essa nota, clicando no botão de cadastro, o que foi escrito no campo de busca, é copiado para o título de uma futura nota, caso queira.
* Na listagem da nota, as últimas são exibidas primeiro.
* Em cada nota é possível visualizar a data e horário de criação, basta clicar no ícone do relógio.
* Para excluir uma nota, clique no ícone da lixeira que automaticamente ela será removida.

-----------------------------------------------

*Esse sistema é contra indicado para menores de 7 anos, pois essas pessoas correm um grande risco de não saber escrever.

#Vamos anotar #Notafixando