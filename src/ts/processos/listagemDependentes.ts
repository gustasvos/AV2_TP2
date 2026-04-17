import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import Cliente from "../modelos/cliente";
import ImpressaorCliente from "../impressores/impressorCliente";
import Impressor from "../interfaces/impressor";

export default class ListagemDependentes extends Processo {
    private clientes: Cliente[]
    private impressor!: Impressor

    constructor() {
        super()
        this.clientes = Armazem.InstanciaUnica.Clientes
    }

    processar(): void {
        console.clear()
        console.log('Listagem de dependentes por titular...\n')

        let titulares = this.clientes.filter(cliente => this.titular(cliente))

        if (titulares.length === 0) {
            console.log('Não há titulares cadastrados.')
            return
        }

        titulares.forEach((titular, index) => {
            console.log(`${index + 1} - ${titular.Nome}`)
        })

        let indice = this.entrada.receberNumero('Escolha o titular:') - 1

        if (indice < 0 || indice >= titulares.length) {
            console.log('Titular inválido!')
            return
        }

        let titularSelecionado = titulares[indice]

        console.log(`\nDependentes de ${titularSelecionado.Nome}:\n`)

        let dependentes = titularSelecionado.Dependentes

        if (dependentes.length === 0) {
            console.log('Este titular não possui dependentes.')
            return
        }

        dependentes.forEach(dep => {
            this.impressor = new ImpressaorCliente(dep)
            console.log(this.impressor.imprimir())
        })
    }

    private titular(cliente: Cliente): boolean {
        let verificacao = false
        if (cliente.Titular == undefined) {
            verificacao = true
        }
        return verificacao
    }
}