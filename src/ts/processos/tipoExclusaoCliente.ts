import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import Cliente from "../modelos/cliente";

export default class TipoExclusaoCliente extends Processo {
    private clientes: Cliente[]

    constructor() {
        super()
        this.clientes = Armazem.InstanciaUnica.Clientes
    }

    processar(): void {
        console.clear()
        console.log('Exclusão de clientes...\n')

        if (this.clientes.length === 0) {
            console.log('Não há clientes cadastrados.')
            return
        }

        this.clientes.forEach((cliente, index) => {
            let tipo = cliente.Titular == undefined ? 'Titular' : 'Dependente'
            console.log(`${index + 1} - ${cliente.Nome} (${tipo})`)
        })

        let indice = this.entrada.receberNumero('Escolha o cliente para excluir:') - 1

        if (indice < 0 || indice >= this.clientes.length) {
            console.log('Cliente inválido.')
            return
        }

        let cliente = this.clientes[indice]

        // exclusao de titular
        if (cliente.Titular == undefined) {
            let dependentes = cliente.Dependentes

            console.log(`\nVocê está excluindo o titular "${cliente.Nome}"`)

            if (dependentes.length > 0) {
                console.log('Os seguintes dependentes também serão excluídos:')

                dependentes.forEach(dep => {
                    console.log(`- ${dep.Nome}`)
                })
            } else {
                console.log('Este titular não possui dependentes.')
            }

            let confirmacao = this.entrada.receberTexto('Deseja continuar? (s/n)')

            if (confirmacao.toLowerCase() !== 's') {
                console.log('Operação cancelada.')
                return
            }

            dependentes.forEach(dep => {
                let indexDep = this.clientes.indexOf(dep)
                if (indexDep !== -1) {
                    this.clientes.splice(indexDep, 1)
                }
            })

            this.clientes.splice(indice, 1)

            console.log('Titular e seus dependentes foram excluídos.')
            return
        }

        // exclusao de dependente
        let titular = cliente.Titular

        console.log(`\nEste cliente é dependente de: ${titular.Nome}`)

        let confirmacao = this.entrada.receberTexto(
            `Deseja excluir o dependente "${cliente.Nome}"? (s/n)`
        )

        if (confirmacao.toLowerCase() !== 's') {
            console.log('Operação cancelada.')
            return
        }

        let indexDep = titular.Dependentes.indexOf(cliente)
        if (indexDep !== -1) {
            titular.Dependentes.splice(indexDep, 1)
        }

        this.clientes.splice(indice, 1)

        console.log('Dependente excluído.')
    }
}