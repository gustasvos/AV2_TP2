import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import Cliente from "../modelos/cliente";

export default class TipoEdicaoCliente extends Processo {
    private clientes: Cliente[]

    constructor() {
        super()
        this.clientes = Armazem.InstanciaUnica.Clientes
    }

    processar(): void {
        console.clear()
        console.log('Edição de clientes...\n')

        if (this.clientes.length === 0) {
            console.log('Não há clientes cadastrados.')
            return
        }

        this.clientes.forEach((cliente, index) => {
            let tipo = cliente.Titular == undefined ? 'Titular' : 'Dependente'
            console.log(`${index + 1} - ${cliente.Nome} (${tipo})`)
        })

        let indice = this.entrada.receberNumero('Escolha o cliente para editar:') - 1

        if (indice < 0 || indice >= this.clientes.length) {
            console.log('Cliente inválido!')
            return
        }

        let cliente = this.clientes[indice]

        console.log(`\nEditando cliente: ${cliente.Nome}\n`)


        let novoNome = this.entrada.receberTexto('Novo nome (ENTER para manter):')

        if (novoNome.trim() !== '') {
            if (novoNome.trim().length < 2) {
                console.log('Nome deve ter pelo menos 2 caracteres.')
            } else {
                cliente.Nome = novoNome.trim()
            }
        }

        let novoNomeSocial = this.entrada.receberTexto('Novo nome social (ENTER para manter):')

        if (novoNomeSocial.trim() !== '') {
            if (novoNomeSocial.trim().length < 2) {
                console.log('Nome Social deve ter pelo menos 2 caracteres.')
            } else {
                cliente.NomeSocial = novoNomeSocial
            }
        }

        let alterarDataNascimento = this.entrada.receberTexto('Alterar data de nascimento? (s/n)')

        if (alterarDataNascimento.toLowerCase() === 's') {
            let novaDataNascimento = this.entrada.receberData('Nova data de nascimento:')

            let hoje = new Date()

            if (novaDataNascimento > hoje) {
                console.log('Data de nascimento não pode ser futura.')
            } else {
                cliente.DataNascimento = novaDataNascimento
            }
        }

        if (cliente.Titular != undefined) {
            console.log('Obs: Este cliente é um dependente.')
            console.log('Endereço não pode ser alterado (herdado do titular).')
        }

        console.log('\nCliente atualizado.')
    }
}