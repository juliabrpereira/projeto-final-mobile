const URL_WIKIDATA = 'https://query.wikidata.org/sparql';

const CONSULTA = `
SELECT ?filme ?local (SAMPLE(?filmeLabel) AS ?titulo) (SAMPLE(?localLabel) AS ?nomeLocal) (SAMPLE(?paisLabel) AS ?nomePais) (SAMPLE(?coord) AS ?coordenadas) (SAMPLE(?imagem) AS ?foto) (MIN(YEAR(?data)) AS ?ano) WHERE {
  ?local wdt:P31 wd:Q27686 ;
         wdt:P625 ?coord .
  ?filme wdt:P915 ?local ;
         wdt:P31 wd:Q11424 .
  OPTIONAL { ?local wdt:P18 ?imagem . }
  OPTIONAL { ?local wdt:P17 ?pais . }
  OPTIONAL { ?filme wdt:P577 ?data . }
  SERVICE wikibase:label {
    bd:serviceParam wikibase:language "pt-br,pt,en".
    ?filme rdfs:label ?filmeLabel .
    ?local rdfs:label ?localLabel .
    ?pais rdfs:label ?paisLabel .
  }
}
GROUP BY ?filme ?local
LIMIT 300
`;

function extrairId(uri) {
  return uri.split('/').pop();
}

function converterCoordenadas(ponto) {
  const [longitude, latitude] = ponto.replace('Point(', '').replace(')', '').split(' ').map(Number);
  return { latitude, longitude };
}

function converterImagem(foto) {
  if (!foto) {
    return null;
  }
  return `${foto.replace('http://', 'https://')}?width=400`;
}

function converterResultado(linha) {
  const { latitude, longitude } = converterCoordenadas(linha.coordenadas.value);

  return {
    id: `${extrairId(linha.filme.value)}-${extrairId(linha.local.value)}`,
    filme: linha.titulo.value,
    hotel: linha.nomeLocal.value,
    pais: linha.nomePais?.value ?? 'País desconhecido',
    ano: linha.ano?.value ?? null,
    imagemUrl: converterImagem(linha.foto?.value),
    latitude,
    longitude,
  };
}

function temNome(item) {
  return !/^Q\d+$/.test(item.filme) && !/^Q\d+$/.test(item.hotel);
}

export async function buscarHoteisDeFilmagem() {
  const resposta = await fetch(`${URL_WIKIDATA}?query=${encodeURIComponent(CONSULTA)}`, {
    headers: {
      Accept: 'application/sparql-results+json',
      'User-Agent': 'iPlace/1.0 (projeto academico)',
    },
  });

  if (!resposta.ok) {
    throw new Error(`Erro ${resposta.status} ao consultar o Wikidata`);
  }

  const dados = await resposta.json();

  return dados.results.bindings
    .map(converterResultado)
    .filter(temNome)
    .sort((a, b) => a.filme.localeCompare(b.filme));
}
