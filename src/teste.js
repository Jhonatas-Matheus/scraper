const { parse } = require('csv-parse')
const fs = require('fs');
const { dirname } = require('path') ;
const { fileURLToPath } = require('url');
const dataInstagram = require('../data_scraped_instagram.json');
const dataTiktok = require('../new_data_teste.json');

const scraperTiktok =  require("./tiktok")

function readFileJson() {
    try {
      const data = fs.readFileSync('scraper_by_csv.json', 'utf8');
      return JSON.parse(data);
    } catch (err) {
      if (err.code === 'ENOENT') {
        // O arquivo não existe, retornar um objeto vazio
        return { data: [] };
      }
      throw err;
    }
  }
  
  function pushNewUsersToJSON(newUsers) {
    const arquivoExistente = readFileJson();
    arquivoExistente.data = arquivoExistente.data.concat(newUsers);
  
    fs.writeFileSync('scraper_by_csv.json', JSON.stringify(arquivoExistente, null, 2), 'utf8');
  }
  
  






const parser = parse({delimiter: ','}, async function(err, data){
    const filtredCsv = data.filter((row,i)=> {
        if(row[1] && i > 2){
            return  row[1]
        }
    })
    // const filtredCsv = [
    //     "andressareiis",
    //     "lorenafreitasc",
    //     "gabidepretas",
    //     "macetesdemae",
    // ]
    let arrayResponse = [];
    console.log(filtredCsv.length)
    for (const username of filtredCsv) {
        const result = await scraperTiktok(username[1]);
        if(result !== null){
            arrayResponse.push(result);
        }
        }
    pushNewUsersToJSON(arrayResponse)
});
const convertCsvToArray = (fileName) => { 
    fs.createReadStream(`${__dirname}/${fileName}`).pipe(parser);
}


convertCsvToArray('profiles_to_scraper.csv');




const namesToCompare = [
    "vivendomundoafora",
    "viajecomigooficial",
    "196sonhos",
    "canaldoscacadores",
    "numpulo",
    "poraidekombi",
    "turistandosp",
    "prefiroviajar",
    "travelandshare",
    "paulomuzy",
    "viviwinkler",
    "carolborba1",
    "marcioatalla",
    "bellafalconi",
    "thassianaves",
    "camilacoutinho",
    "magavilhas",
    "camilacoelho",
    "laricunegundes",
    "viihtube",
    "naiumigoldoni",
    "macetesdemae",
    "andressareiis",
    "gabidepretas",
    "amorimvivian",
    "diariasdogui",
    "humakimak",
    "ednara_ribeirinha",
    "estacaohd",
    "paolacarosella",
    "mohindi",
    "ritalobo",
    "henrique_fogaca74",
    "rafael_camatta",
    "victoriasaceanu",
    "parkstefany",
    "lucianahosoi",
    "dissolvido",
    "chicapeto",
    "amandamonteirods",
    "_danielalaender",
    "leleburnier",
    "luizatardin",
    "ma.ngarosa",
    "gpoulain",
    "cesinha",
    "ticianaporto",
    "debbiecorrano",
    "fepacheco",
    "diegodrush",
    "rbbviagem",
    "paulodelvalle",
    "nicollemerhy",
    "nobru",
    "flakespower",
    "alanzoka",
    "loud_babi",
    "baianolol",
    "pedrocaxa",
    "ayrezmariana",
    "thamatsu",
    "brazilicans",
    "ines.lafosse",
    "donorteaonorte",
    "rafaballerini",
    "adriana.saty",
    "camilaagro",
    "hellenottonelli",
    "vanderleiholzlermen",
    "aff.luana",
    "olhaoapedeles",
    "puraarquiteturabh",
    "gabrielcamargo_102",
    "grandepremio",
    "projetomotor",
    "gessinadine",
    "lairistrindade",
    "euthalitacruz",
    "ana.passaretti",
    "franduartemakeup",
    "isabelapiierre",
    "heygabsf",
    "patiavelinoo",
    "medibulandia",
    "byliarahorie",
    "polianabragab",
    "tasobrandodinheiro",
    "granapretaoficial",
    "jessicacastrosc",
    "_ogabrielbarbosa",
    "brendascalco",
    "franlima.me",
    "dicadadoca",
    "nataliakreuser",
    "tabathalacerda",
    "alice_yuri_",
    "doisporcento",
    "basquetepravida",
    "familiapessoatardivo",
    "clariceeantonella",
    "caroolfigueiras",
    "francampos92",
    "kakaufarias_",
    "arnaldodk",
    "_carolmcosta",
    "fazendo_nerdice",
    "cidinha_santiago",
    "daysepaparoto_oficial",
    "uiararaujo",
    "canalgaynerd",
    "jonasmariaa",
    "wanessawolf",
    "beatrizpaludetto",
    "brunamartiolli",
    "lupazos",
    "plantacao.de.lavanda",
    "casasemlixo",
    "canalsersustentavel",
    "alinibosko",
    "andrezasiltos",
    "pretaluuz",
    "prapretoler",
    "euthalitacruz",
    "tinnarios",
    "omenorcasaldomundo",
    "mundo.autista",
    "caonutella",
    "trigatos",
    "ser.intime",
    "drguilhermeneif",
    "renato_cassol",
    "pellaes",
    "tenhametas_",
    "evelin_oliveirac",
    "susanabarbosa",
    "brisaletro",
    "maedotriodonadecasa",
    "rogerseabra",
    "vinidalpino",
    "clarinha_summer",
    "riiguetto",
    "rosatersi",
    "biafernandesoriginal",
    "carlosrickoficial",
    "rebecacastro05",
    "drlouisgoldstein",
    "dompablitto",
    "home_anna.diniz35",
    "vanzinhav",
    "adrianamagalhaes.of",
    "andreecarti",
    "bielazevedo",
    "mayafrota",
    "tatafurtado",
    "sassarocha",
    "natanbalieiro",
    "otaviomesquita",
    "penelopyjean",
    "djaronabikzer",
    "mariobeckman",
    "candicefragosofestas",
    "hwmens",
    "homens_prazer",
    "gloriafperez",
    "elgafigueiredo",
    "reyvercosa",
    "euleopida",
    "renanpollak",
    "paguimaraess",
    "thaislamarques",
    "martaflores.pt",
    "almeida.iasmin",
    "lyviaroberta_",
    "biancadacias",
    "joanaccanteiro",
    "miarelogio",
    "alexh.carvalho",
    "camilaglatthardt",
    "onirablac",
    "audhreysf",
    "jvmartinsa",
    "coisamaislinda",
    "izabella.aguiar_",
    "natashapugliesi",
    "alinecalheirosb",
    "willyrodriguess",
    "anapaulasiebert",
    "claudiabartelle",
    "fatimascarpa",
    "lalarudge",
    "neyzona",
    "nativozza",
    "robfreitas",
    "sabrinasato",
    "silviabraz",
    "thassianaves",
    "louisemilanez",
    "engenheirosdozero",
    "felipenomad",
    "gabsbot",
    "lutt0_",
    "lorenaruizfernandes",
    "rafinha.design",
    "psifealmeida",
    "poli_freire",
    "alvaciresendephd",
    "ninatalks",
    "aquela.guriaa",
    "soulbaker_",
    "faveladoinvestidor",
    "davidbargom",
    "gustavomee",
    "fernanda.ruzza",
    "lorenademettrio",
    "igorocha_",
    "vagnerfinato",
    "nosenossoape504",
    "dev_gusta",
    "pewdro.design",
    "va_designer",
    "mundodavelocidade",
    "alepratesoficial",
    "black.bankers",
    "esthertimoteo",
    "eng.anaamallia",
    "patricialagesoficial",
    "leticia.mecanica",
    "gleeibnss",
    "agarotadeproduto",
    "amercavalcant",
    "pushmatcha",
    "jurandirsilvar",
    "tudinhoparasuacasa",
    "danilo.engenheiro",
    "fizgodigital",
    "pb_pacifico",
    "rafaelapovoa_",
    "t4vistorias",
    "bloomberglineabrasil",
    "brunasimoesarquitetura",
    "vianamaa",
    "reisrt_andre",
    "mululoequipe",
    "russa_no_acre",
    "brunooliveiraoficial",
    "silkatelierrj",
    "julia.friendly",
    "gisa.on",
    "matheusmendesss",
    "procrastinando.br",
    "millys_rodrigues",
    "ilustralle",
    "binhara",
    "jaciaralacerdac",
    "zoasca",
    "rodrigolopesempreendedor",
    "amandastellac",
    "kiyomi.therapy",
    "abrunamarieli",
    "clubedoporkinho",
    "eufabicaruso",
    "casamento_gastandopouco",
    "deolhonaengenharia",
    "sociedade.visionaria",
    "_andreyray",
    "biscoitoseno",
    "mazzola",
    "euvivianesabino",
    "cafecomjas",
    "casadalility",
    "aranhahue",
    "rapoutcontext",
    "gabrielasobral",
    "pulamuralha",
    "covilgb",
    "moonlunarxy",
    "cleannew",
    "oestagiariodati",
    "kevynieduardo",
    "abarbaratorres",
    "luizfernandoroxo",
    "thiagorodrigopsiquiatra",
    "edderdiaz",
    "gleicysaccoman",
    "anacarolinavcp",
    "achadosdalila.br",
    "andressapossamai",
    "anajessuptravels",
    "mariperzi",
    "seguindo.gurus",
    "brancaaf_",
    "nosrestaviajar",
    "thalytakoller",
    "caxa_pinturas",
    "telinhoborges73",
    "oficialthecereal",
    "trade.de.livro",
    "fernandafeitoza",
    "vitoriacardosogomez",
    "neuro.nutri",
    "drguilhermeneif",
    "resultoconsultorias",
    "daricanela",
    "devcomcafe_",
    "collection.arq",
    "vivamkt_",
    "idrackxx",
    "nicolefreya_",
    "vanderziin",
    "leandrofigueiredolf",
    "rodrigosantinelli",
    "quemelepuxou",
    "bycomprascriativas",
    "larapgarcia",
    "thomasshelbysosia",
    "lbc.ink",
    "academiadouniversitario",
    "aakkari",
    "descobriporai.com.br",
    "jesskedima",
    "juh.schramm",
    "gleicegabriel_",
    "douglasviegas",
    "sociedade.visionaria",
    "sagadogordinho",
    "felipesantolini",
    "corleone.mp4",
    "hiiagocoelho",
    "laarivalzacchi",
    "bianca.politecnica",
    "itsrenatasilva",
    "francomansur",
    "carperformance.com.br",
    "oficialmanualjr",
    "juliogamer119",
    "made_in_bailao",
    "deverik_",
    "juhblz",
    "pinhastudio",
    "verdadeinexplicavel",
    "gustavooliveirag",
    "marceneiroforadacurva",
    "arq_nayanne",
    "pewdro.design",
    "fs_negao",
    "nataliabeauty",
    "radioalphafm",
    "waffle.suricake",
    "apriscilla.guerra",
    "oconhecimentomilenar",
    "drjhones.implantes",
    "sandrosouzaro",
    "otto.professor",
    "mineirodasvendas",
    "manodeyvin",
    "sereaparecer",
    "draclaudiakochenborger",
    "kaumirandab",
    "joaogorri",
    "tonocosmos",
    "matheusdavilanutri",
    "dezefaixaoutlet",
    "mariadesign__",
    "mavinho_acoroni",
    "drapatriciamayo",
    "arqlouisekonzen",
    "viscera.co",
    "leticiapinheirosk",
    "juliiamartini",
    "cristovivesp",
    "sarahbonizoli",
    "agencia.mapadajornada",
    "decoorart.mdf",
    "medicinabrasill",
    "player1",
    "_bellelobato",
    "suzana.nascimento.adv",
    "alexf.beliche",
    "vanicia_palhares",
    "henri.nori",
    "gilpinna",
    "artcelulares",
    "gabrielsouusa",
    "enzopacces",
    "girobatini",
    "casaltransforma",
    "metodoactingles",
    "jefe.vilanova",
    "thaisguimaraes.design",
    "omattgazzola",
    "nutri.ronannakau",
    "anajords",
    "guiadapl",
    "futebol_engracado60",
    "leopinheiro.lp",
    "marcelomanutencao_",
    "soueunosesportes",
    "margarida.vii",
    "memes.manual.fisica",
    "sentido.geek",
    "brunogordoooo",
    "guilhermehubertreinador",
    "lucam0relli",
    "dailly_gab",
    "dripfate",
    "eduardo.godinho",
    "apeferraolima",
    "jotajotapodcast",
    "arquivocinema",
    "fabriciomoresco",
    "agencia.abx",
    "pinhastudio",
    "nadimesamaha",
    "psi.leonardorodrigues",
    "laurataege",
    "byicones",
    "jessicaandrade.eu",
    "larabfeitozaa",
    "isacmp",
    "clube_os_parcas",
    "fuinhar",
    "karina.minoda",
    "gabbyfavilla",
    "dicasdenatty",
    "pereiraamorimoficial",
    "estudeanah",
    "ojackverso",
    "nocedanielle",
    "thagnerramos",
    "brunosaldanhafoto",
    "estrat_consultoria",
    "josedosreiscardio",
    "tamararfreitas",
    "marcadopenalt",
    "maviagenciabr",
    "lorenafreitasc",
    "rdmemes.mix",
    "atividade.complementares",
    "noticeswift",
    "fomedenovidade_",
    "thiago.reis.gm",
    "g4podcasts",
    "basquetetalks",
    "anjobrunobr",
    "ritieli_natane",
    "teclat.of",
    "paradigma.education",
    "gs.agencia",
    "vinicius.4364",
    "nucleodedancadosnoivos",
    "felipekersch",
    "oapecentoedois",
    "babruna",
    "beautydaduda",
    "brasileiros.nos.eua",
    "malureadingworld",
    "clebermarketeiro",
    "mariamarcolinafilmes",
    "brunohdh",
    "jainecarvaalho",
    "enfbeatrizm",
    "whitehat.forum",
    "drizzle_sp",
    "voltarapidaf1",
    "curiosidadedabola",
    "cine_fandom",
    "biamascotto",
    "david_solucoes",
    "dirigindocommaraschneider",
    "petrolhead.oficial",
    "daltonfpcabral",
    "gabcodes",
    "flacarboni",
    "laraselem",
    "farialima.elevato",
    "sokenstefany",
    "portaldosmateriais",
    "pancreasartificial",
    "companyhero_br",
    "thuanedoerner",
    "hotelariaironica",
    "ancapkobra",
    "gustavo.business_",
    "rogerionaamerica",
    "olha.praisso.ofc",
    "formulaeesc",
    "entrevistamento",
    "natielebertapeli",
    "mairiporamilgrau",
    "tonnypk_",
    "denismiyabara",
    "pastorjeffersonfulvio",
    "obrigadeirodosartistaas",
    "noticiasoficinag3",
    "renataecchertacca",
    "netmotors.com.br",
    "agarotadoxadrez",
    "t4torlando",
    "podpah",
    "brasilcode_",
    "vaganerd",
    "carinafragozo",
    "cristaocacheado",
    "enjoycast",
    "bonin.arquitetura",
    "megahahoo",
    "aalcateianerd",
    "duwbusiness",
    "pizzariadeliverydesucesso",
    "viapositiva32",
    "tdahzando",
    "salinhadomrad",
    "kallianyreal",
    "dentistamusical",
    "tvcultura",
    "engdouglaseverton22",
    "luizfernandoroxo",
    "geniodapagina",
    "estevampelomundo",
    "farialima.estagiario",
    "juliarmazevedo",
    "travisinbrazil",
    "faeldiogo",
    "uberdepre",
    "bemsucedidooficial"
    ]
const verify = () =>{
    let arrayTeste = []

    namesToCompare.forEach((name)=>{
            const userFind = dataTiktok.data.find((element)=> element.uniqueId === name)
            if(userFind === undefined){
                arrayTeste.push(name)
            }
    })
    // console.log(namesToCompare.length)
    // console.log(dataTiktok.data.length);
    // console.log(dataInstagram.users.length);
    // console.log(namesToCompare.length);
    // console.log(arrayTeste.length);
    fs.writeFile('comparacao_arrays_2.json', JSON.stringify(arrayTeste),(error)=>{
        console.log(error)
    })

}
verify()