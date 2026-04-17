import Processo from "../abstracoes/processo";
import { TipoDocumento } from "../enumeracoes/TipoDocumento";
import Cliente from "../modelos/cliente";
import Documento from "../modelos/documento";

export default class CadastroCpf extends Processo {
    private cliente: Cliente

    constructor(cliente: Cliente) {
        super()
        this.cliente = cliente
    }

    processar(): void {
        let numero = ''

        while (true) {
            numero = this.entrada.receberTexto('Qual o CPF? (somente números)')

            if (!numero) {
                console.log('CPF obrigatório.')
                continue
            }

            numero = numero.trim()

            if (!/^\d+$/.test(numero)) {
                console.log('Digite apenas números.')
                continue
            }

            // validação apenas de quantidade de digitos, sem validar cpfs reais
            if (numero.length !== 11) {
                console.log('CPF deve conter 11 dígitos.')
                continue
            }

            break
        }

        // mascara
        let cpfFormatado = numero.replace(
            /(\d{3})(\d{3})(\d{3})(\d{2})/,
            '$1.$2.$3-$4'
        )

        let dataExpedicao = this.entrada.receberData(
            'Qual a data de expedição do documento?'
        )

        let cpf = new Documento(
            cpfFormatado,
            TipoDocumento.CPF,
            dataExpedicao
        )

        this.cliente.Documentos.push(cpf)
    }
}