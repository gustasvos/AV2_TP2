import promptSync from "prompt-sync";

export default class Entrada {
    public receberNumero(mensagem: string): number {
        let prompt = promptSync();
        let valor = prompt(`${mensagem} `)
        let numero = new Number(valor)
        return numero.valueOf()
    }
    public receberTexto(mensagem: string): string {
        let prompt = promptSync();
        let texto = prompt(`${mensagem} `)
        return texto
    }
    public receberData(mensagem: string): Date { // validacao adicionada, direto no metodo
    let prompt = promptSync();
    while (true) {
        let texto = prompt(`${mensagem} (dd/mm/yyyy): `)

        if (!texto) {
            console.log('Data obrigatória.')
            continue
        }
        // validação do formato da data dd/mm/yyyy
        let regex = /^(\d{2})\/(\d{2})\/(\d{4})$/
        let match = texto.match(regex)

        if (!match) {
            console.log('Formato inválido. Use dd/mm/yyyy.')
            continue
        }

        let dia = Number(match[1])
        let mes = Number(match[2]) - 1
        let ano = Number(match[3])

        let data = new Date(ano, mes, dia)

        if (
            data.getDate() !== dia ||
            data.getMonth() !== mes ||
            data.getFullYear() !== ano
        ) {
            console.log('Data inválida.')
            continue
        }

        return data
    }
}
    // public receberData(mensagem: string): Date {
    //     let prompt = promptSync();
    //     let texto = prompt(`${mensagem}, no padrão dd/MM/yyyy: `)
    //     let partes = texto.split('/')
    //     let ano = new Number(partes[2])
    //     let mes = new Number(partes[1])
    //     let dia = new Number(partes[0])
    //     let data = new Date(ano.valueOf(), mes.valueOf() - 1, dia.valueOf())
    //     return data
    // }
}