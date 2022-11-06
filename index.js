async function get_stuff(idCounter) {
  const url = new URL(window.location.href);
  const isNSFW = url.search.includes('nsfw') ? 'true' : 'false';
  const resp = await fetch('https://api.waifu.im/random/?is_nsfw='+isNSFW+'&orientation=PORTRAIT&many=true');
  const links = await resp.json();
  links.images.forEach((link) => {
    const element = document.createElement('div');
    element.className = 'slide';
    element.id = '' + idCounter + links.images.indexOf(link);
    const img = document.createElement('img');
    img.src = link.url;
    element.appendChild(img);
    document.getElementById('slides-container').appendChild(element);
  });
}

let idCounter = 0;
onload = async (event) => {
  await get_stuff(idCounter);
};





