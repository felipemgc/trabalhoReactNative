import moment from 'moment'


//"nome": "ACOMPANHANTE TERAPEUTA (AT)"
export const getEspecialidades = async () => {
  const response = await fetch(`https://app.tisaude.com/api/rest/agenda/especialidades`)
  return response.json()
}
//  "id": 66,
//"nome": "PARTICULAR",
//"logo": "https://app.tisaude.com/images/convenios/indisponivel.jpg"
export const getConvenios = async () => {
  const response = await fetch(`https://app.tisaude.com/api/rest/agenda/convenios`)
  return response.json()
}

//  "cidade": "RECIFE"
export const getCidades = async () => {
  const response = await fetch(`https://app.tisaude.com/api/rest/agenda/cidades/pe`)
  return response.json()
}


/*        "id": 4,
        "nome": "JOSÉ CÂMARA",
        "descricao": "",
        "especialidade": "Cirurgião do aparelho digestivo",
        "texto": " ",
        "marcacaoviaapp": true,
        "cliente": {
            "cliente": 5,
            "cidade": "Recife",
            "estado": "PE",
            "nome": "José Câmara",
            "img_logo": "https://app.tisaude.com/c/logo/josecamara.png",
            "uf": "PE"
        }
*/
export const getProfissionais = async () => {
  const response = await fetch(`https://app.tisaude.com/api/rest/agenda/profissionais`)
  return response.json()
}


/*

"id": 4,
    "nome": "JOSÉ CÂMARA",
    "dias": [
        {
            "dia": "2",
            "horarios": [
                {
                    "periodo": "Tarde",
                    "local": "CONSULTÓRIO LUCILO AVILA",
                    "endereco": "Av. João de Barros, 50, 2o andar, sala 216 Bl C Boa Vista - Recife/PE, CEP: 50050-180"
                }
            ]
        },
        {
            "dia": "3",
            "horarios": [
                {
                    "periodo": "Tarde",
                    "local": "CONSULTÓRIO LUCILO AVILA",
                    "endereco": "Av. João de Barros, 50, 2o andar, sala 216 Bl C Boa Vista - Recife/PE, CEP: 50050-180"
                }
            ]
        },
        {
            "dia": "5",
            "horarios": [
                {
                    "periodo": "Tarde",
                    "local": "CONSULTORIO SANTA JOANA",
                    "endereco": " "
                }
            ]
        }
    ],
    "datascanceladas": [
        "2017-04-20",
        "2017-06-14",
        "2017-06-15",
        "2017-06-21",
        "2017-06-22",
        "2017-07-26",
        "2017-07-27",
        "2017-09-07",
        "2017-10-11",
        "2017-11-06",
        "2017-11-09",
        "2017-11-09",
        "2017-12-25",
        "2018-01-01",
        "2018-02-12",
        "2018-06-12",
        "2018-06-19",
        "2018-07-24",
        "2018-07-26",
        "2018-07-31"
    ],
    "especialidade": "Cirurgião do aparelho digestivo",
    "texto": " ",
    "cliente": {
        "cliente": 5,
        "nome": "José Câmara",
        "img_logo": "https://app.tisaude.com/c/logo/josecamara.png"
    }

*/
/*
    inputs: busca, convenio, cliente, especialidade, uf, cidade
*/
export const getProfissional = async (id) => {
  const response = await fetch(`https://app.tisaude.com/api/rest/agenda/profissional/${(id)}`)
  return response.json()
}


/*
export const getMedicos = async (page = 0) => {
  const response = await fetch(`https://api.Medicomarketcap.com/v2/ticker/?structure=array&convert=BTC&limit=20&start=${(page * 20) + 1}`)
  return response.json()
}


export const getLast7Days = async (symbol) => {
  const result = {
    labels: [],
    values: []
  }

  for (let i = 6; i >= 0; i--) {
    const date = moment().subtract(i, 'days')
    const response = await fetch(`https://min-api.cryptocompare.com/data/pricehistorical?fsym=${symbol}&tsyms=USD&ts=${date.unix()}`)
    const data = await response.json()
    result.labels.push(date.format('D. MMM'))
    result.values.push(data[symbol].USD)
  }  

  return result

}

*/