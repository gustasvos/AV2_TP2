import Processo from "../abstracoes/processo";
import Cliente from "../modelos/cliente";
import Armazem from "../dominio/armazem";
import CadastrarDocumentosCliente from "./cadastrarDocumentosCliente";

export default class CadastroClienteDependente extends Processo {
    processar(): void {
        console.log('Iniciando o cadastro de dependente...')

        let armazem = Armazem.InstanciaUnica

        let titulares = armazem.Clientes.filter(cliente => cliente.Titular == undefined)

        if (titulares.length === 0) {
            console.log('Não há clientes titulares cadastrados.')
            return
        }

        console.log('\nTitulares disponíveis:')
        titulares.forEach((cliente, index) => {
            console.log(`${index + 1} - ${cliente.Nome}`)
        })

        let indice = this.entrada.receberNumero('Escolha o número do titular:') - 1

        if (indice < 0 || indice >= titulares.length) {
            console.log('Titular inválido!')
            return
        }

        let titular = titulares[indice]

        let nome = this.entrada.receberTexto('Nome do dependente:')
        let nomeSocial = this.entrada.receberTexto('Nome social do dependente:')
        let dataNascimento = this.entrada.receberData('Data de nascimento:')

        let dependente = new Cliente(nome, nomeSocial, dataNascimento)

        dependente.Endereco = titular.Endereco

        this.processo = new CadastrarDocumentosCliente(dependente)
        this.processo.processar()

        titular.Dependentes.push(dependente)
        dependente.Titular = titular

        armazem.Clientes.push(dependente)

        console.log('Dependente cadastrado.')
    }
}