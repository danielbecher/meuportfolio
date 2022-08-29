const chaveApi = 'ea1f091c29ed4b699f3b5126b2cee2ee'

$(window).on('load', function() {
    $('.termoPesquisa').text('Pesquisa de notícias')
})

$('.botaoPesquisa').on('click', function(){
    let assuntoPesquisado = $('.assuntoPesquisa').val()
    $('.termoPesquisa').text('Pesquisa de notícias: '+ assuntoPesquisado)
    getNews(assuntoPesquisado).then(resposta => {
        $('.main__noticias').empty()
        console.log(resposta)
        if (resposta.articles.length > 0) {
            for (i = 0; i < 7; i++) {
                artigoTitulo = resposta.articles[i].title
                artigoURI = resposta.articles[i].url
                artigoAutor = resposta.articles[i].author
                artigoData = resposta.articles[i].publishedAt
                artigoExcerpt = resposta.articles[i].description
                $('.main__noticias').append('<ul><li><a href="'+artigoURI+'">'+artigoTitulo+'</a></li><li><span>Publicado em: '+artigoData+'</span><span> por: '+artigoAutor+'<span></li></ul>')
            }
        } else {
            $('.main__noticias').append('<ul><li>Vish! Não existem notícias cadastradas para este termo. Gostaria de pesquisar sobre outro assunto?</li></ul>')
        }        
    })
    console.log(getNews(assuntoPesquisado));
})


async function getNews(assuntoPesquisado) {
        const results = await fetch(
            `https://newsapi.org/v2/everything?q='+${assuntoPesquisado}+'&totalResults=5&language=pt&apiKey=${chaveApi}`
        )
        const resultadoPesquisa = await results.json()
        return resultadoPesquisa
}




