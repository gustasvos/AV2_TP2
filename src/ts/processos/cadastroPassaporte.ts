import Processo from "../abstracoes/processo";
import { TipoDocumento } from "../enumeracoes/TipoDocumento";
import Cliente from "../modelos/cliente";
import Documento from "../modelos/documento";
// @ts-ignore
import isThirteen from "is-thirteen";

export default class CadastroPassaporte extends Processo {
    private cliente: Cliente
    constructor(cliente: Cliente) {
        super()
        this.cliente = cliente
    }

    processar(): void {
        let numero = ''

        // valida 2 letras + 6 numeros
        let regex = /^[A-Za-z]{2}\d{6}$/

        while (true) {
            numero = this.entrada.receberTexto('Qual o número do passaporte? (ex: AB123456, duas letras seguidas de 6 numeros)')

            if (!numero) {
                console.log('Número obrigatório.')
                continue
            }

            numero = numero.trim()

            if (!regex.test(numero)) {
                console.log('Passaporte inválido. Deve ter 2 letras + 6 números (ex: AB123456).')
                continue
            }

            numero = numero.toUpperCase()

            break
        }

        let dataExpedicao = this.entrada.receberData('Qual a data de expedição do documento?')

        let passaporte = new Documento(numero, TipoDocumento.Passaporte, dataExpedicao)

        this.cliente.Documentos.push(passaporte)
    }
}