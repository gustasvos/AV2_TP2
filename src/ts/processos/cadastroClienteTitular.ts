import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import Cliente from "../modelos/cliente";
import CadastrarDocumentosCliente from "./cadastrarDocumentosCliente";
import CadastroEnderecoTitular from "./cadastroEnderecoTitular";

export default class CadastroClienteTitular extends Processo {
    processar(): void {
        console.log('Iniciando o cadastro de um novo cliente...')

        let nome = ''
        do {
            nome = this.entrada.receberTexto('Qual o nome do novo cliente?')
            if (!nome || nome.trim().length < 2) {
                console.log('Nome inválido. Deve ter pelo menos 2 caracteres.')
            }
        } while (!nome || nome.trim().length < 2)

        let nomeSocial = ''
        do {
            nomeSocial = this.entrada.receberTexto('Qual o nome social do novo cliente?')
            if (!nomeSocial || nomeSocial.trim().length < 2) {
                console.log('Nome social inválido, insira ao menos dois caracteres.')
            }
        } while (!nomeSocial || nomeSocial.trim().length < 2)

        let dataNascimento: Date
        while (true) {
            dataNascimento = this.entrada.receberData('Qual a data de nascimento?')

            let hoje = new Date()
            let anoMin = new Date(1900, 0, 1)

            if (dataNascimento > hoje) {
                console.log('Data não pode ser futura.')
            } else if (dataNascimento < anoMin) {
                console.log('Data inválida.')
            } else {
                break
            }
        }

        let cliente = new Cliente(nome.trim(), nomeSocial.trim(), dataNascimento)

        this.processo = new CadastroEnderecoTitular(cliente)
        this.processo.processar()

        this.processo = new CadastrarDocumentosCliente(cliente)
        this.processo.processar()

        if (cliente.Documentos.length === 0) {
            console.log('Cliente deve possuir ao menos um documento.')
            return
        }

        let armazem = Armazem.InstanciaUnica
        armazem.Clientes.push(cliente)

        console.log('Finalizando o cadastro do cliente...')
    }
}