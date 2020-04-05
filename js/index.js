let preT = '';
let nexT = '';
let inp = '';

$('#Search').submit(function (event) {
    event.preventDefault();
    inp = event.currentTarget['0'].value;

    delP();
    Search(inp, '');
});

$('#n').click(function (event) {
  if(nexT) {
      delP();
      Search(inp, nexT);
  }
});

$('#p').click(function (event) {
  if(preT) {
      delP();
      Search(inp, preT);
  }
});

function delP() {
    ('.vList').empty();
}

function Search(inp, page) {

    let list = [];

    $.ajax({
        url: 'https://www.googleapis.com/youtube/v3/search',
        type: 'GET',
        data: {
            'key': 'AIzaSyDBemZMhoLe50g1Mw_qGf9RX_Q24tv9lRk',
            'part': 'id, snippet',
            'q': inp,
            'maxResults': '10',
            'pageToken': page
        }
    }).done((result) => {
        console.log(result);

        nexT = result.nextPageToken;
        preT = result.prevPageToken;

        delP();
        list = result.items;

        let mostrar = [];
        for (video of list) {

            mostrar.push(
                '<div class="video">' +
                '<a target="_blank" href="https://www.youtube.com/watch?v=' + video.id.videoId + '">' +
                '<img src=" '+ video.snippet.thumbnails.default.url + ' ">' +
                '<h3>'+ video.snippet.title + '</h3>' +
                '</a>' +
                '</div>'
            );
        }

        $('.vList').append(mostrar);

    }).fail((error) => {
        console.log(error);
    });
}